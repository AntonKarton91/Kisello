import * as React from "react";
import {DetailedHTMLProps, FormEvent, HTMLAttributes, useRef, useState} from "react";
import styles from "./popupDescription.module.scss"
import {ICartPrev} from "../../../../models/models";
import ListIcon from '@mui/icons-material/List';
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import cn from "classnames";
import {useAppDispatch} from "../../../../Store/hooks";
import {Button} from "@mui/material";
import {sendCardUpdate} from "../../../../Store/Reducers/board/boardSlice";

export interface PopupDescriptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev
}


export const PopupDescriptionComponent = ({cardData}: PopupDescriptionProps): React.ReactElement => {
    const [isEdit, setIsEdit] = useState(false)
    const [resetData, setResetData] = useState("")
    const wrapperRef = useRef<HTMLFormElement>(null)
    const saveButtonRef = useRef<HTMLButtonElement>(null)
    const dispatch = useAppDispatch()
    const [editorState, setEditorState] = useState(()=> {
        if (cardData.description.length>0) {
            return EditorState.createWithContent(convertFromRaw(JSON.parse(cardData.description)))
        } else return EditorState.createEmpty()
    });

    const enableEditHandler = (e: React.MouseEvent<HTMLElement>) => {
        setResetData(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        if (isEdit) return
        e.stopPropagation()
        const closeHandler = async (event: MouseEvent) => {
            if (wrapperRef.current && e.target && saveButtonRef.current) {
                // @ts-ignore
                if (!wrapperRef.current.contains(event.target)) {
                    saveButtonRef.current.click()
                    setIsEdit(false)
                    document.removeEventListener("mousedown", closeHandler)
                }
            }
        }
        setIsEdit(true)
        document.addEventListener("mousedown", closeHandler)
    }

    const wrapperClasses = cn(
        [styles.wrapper],
        {[styles.wrapperEditable]: isEdit}
    )

    function resetHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(resetData))))
        setIsEdit(false)
    }

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const a = editorState.getCurrentContent()
        dispatch(sendCardUpdate({cardId: cardData._id, data: {description: JSON.stringify(convertToRaw(a))}}))
        setIsEdit(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <ListIcon/>
                <div className={styles.title}>Описание</div>
                <div onClick={e=>enableEditHandler(e)}>
                    <TextButtonComponent
                        className={styles.buttonContainer}
                        height={32}
                        width={90}
                    >
                        Изменить
                    </TextButtonComponent>
                </div>
            </div>

            <form onSubmit={e=>submitHandler(e)} className={styles.body} onClick={e=>enableEditHandler(e)}  ref={wrapperRef}>
                <Editor
                    toolbarHidden={!isEdit}
                    wrapperClassName={wrapperClasses}
                    editorClassName={styles.editor}
                    toolbarClassName={styles.toolbar}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'emoji'],
                        inline: {inDropdown: true},
                        list: {inDropdown: true},
                        textAlign: {inDropdown: true},
                        link: {inDropdown: true},
                        history: {inDropdown: true},
                    }}
                />
                <div className={styles.buttonBlock} style={{display: isEdit ? "flex" : "none"}}>
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        color={"blueColor"}
                        ref={saveButtonRef}
                        size={"small"}
                    >
                        Сохранить
                    </Button>
                    <Button
                        variant={"contained"}
                        color={"grayColor"}
                        size={"small"}
                        onClick={e=>resetHandler(e)}
                    >
                        Отмена
                    </Button>
                </div>

            </form>
        </div>
    )
};

