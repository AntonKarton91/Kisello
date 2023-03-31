import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import styles from "./popupDescription.module.scss"
import {ICartPrev} from "../../../../models/models";
import ListIcon from '@mui/icons-material/List';
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import {EditorState, ContentState, convertFromRaw, convertToRaw, createFromText} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import cn from "classnames";
import {sendCardUpdate} from "../../../../Store/Reducers/board/boardSlice";
import {useAppDispatch} from "../../../../Store/hooks";

export interface PopupDescriptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev
}


export const PopupDescriptionComponent = ({cardData}: PopupDescriptionProps): React.ReactElement => {
    const [isEdit, setIsEdit] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const [editorState, setEditorState] = useState(()=> {
        // if (cardData.description.length>0) {
        // console.log(convertFromRaw(JSON.parse(cardData.description)))
        //     // return EditorState.createWithContent(convertFromRaw(JSON.parse(cardData.description)))
        //     return EditorState.createWithContent(ContentState.createFromText("sdfsdf"))
        // } else return EditorState.createEmpty()
        if (localStorage.getItem("aa")) {
            return EditorState.createWithContent(convertFromRaw(JSON.parse(localStorage.getItem("aa") as string)))
        } else return EditorState.createEmpty()

    });


    const enableEditHandler = (e: React.MouseEvent<HTMLElement>) => {
        if (isEdit) return

        const closeHandler = (event: MouseEvent) => {
            if (wrapperRef.current && e.target) {

                // @ts-ignore
                if (!wrapperRef.current.contains(event.target)) {
                    console.log(11111)
                    localStorage.setItem("aa", JSON.stringify(convertToRaw(editorState.getCurrentContent())))
                    // dispatch(sendCardUpdate({cardId: cardData._id, data: {description: JSON.stringify(convertToRaw(editorState.getCurrentContent()))}}))
                    setIsEdit(false)
                    document.removeEventListener("click", closeHandler)
                }
            }

        }
        setIsEdit(true)
        document.addEventListener("click", closeHandler)
    }

    const wrapperClasses = cn(
        [styles.wrapper],
        {[styles.wrapperEditable]: isEdit}
    )

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
            <div className={styles.body} onClick={e=>enableEditHandler(e)} ref={wrapperRef}>
                <Editor
                    toolbarHidden={!isEdit}
                    wrapperClassName={wrapperClasses}
                    editorClassName={styles.editor}
                    toolbarClassName={styles.toolbar}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    // toolbar={{
                    //     options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'emoji'],
                    //     inline: {inDropdown: true},
                    //     list: {inDropdown: true},
                    //     textAlign: {inDropdown: true},
                    //     link: {inDropdown: true},
                    //     history: {inDropdown: true},
                    // }}
                />
            </div>
        </div>
    )
};

