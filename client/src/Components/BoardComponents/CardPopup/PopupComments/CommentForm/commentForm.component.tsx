import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import styles from "./commentForm.module.scss"
import {ICartPrev} from "../../../../../models/models";
import {ImageComponent} from "../../../../../UIComponents";
import {AvatarPlaceholderComponent} from "../../../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";
import {useAppDispatch, useAppSelector} from "../../../../../Store/hooks";
import cn from "classnames";
import {Button} from "@mui/material";
import {sendAddComment} from "../../../../../Store/Reducers/comment/commentSlice";


export interface CommentFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev
}


export const CommentFormComponent = ({cardData}: CommentFormProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const { id, name, surname, avatar } = useAppSelector(state => state.user)
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const closeHandler = (e: MouseEvent) => {
        if (textAreaRef.current && e.target) {
            // @ts-ignore
            if (textAreaRef.current.contains(e.target)) return
        }
        setIsEdit(false)
        return document.removeEventListener("click", closeHandler)
    }

    const openCloseHandler = () => {
        setIsEdit(true)
        document.addEventListener("click", closeHandler)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(sendAddComment({
            cardId: cardData._id,
            userId: id,
            body: value
        }))
        setValue("")
        setIsEdit(false)
        return document.removeEventListener("click", closeHandler)
    }

    const inputClasses = cn(
        [styles.commentBox],
        {[styles.inputEditable]: isEdit}
    )

    const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setValue(e.target.value)
    }

    return (
        <div className={styles.container}>
            {
                avatar
                    ? <ImageComponent
                        height={35}
                        width={35}
                        circle
                        src={avatar}
                        key={id} description={`${surname} ${name}`}
                    />
                    : <AvatarPlaceholderComponent circle size={35}
                                                  title={name ? name : ""}
                                                  fontSize={18}/>
            }
            <form className={inputClasses} onSubmit={e=>submitHandler(e)} onClick={()=>openCloseHandler()}>
                <textarea
                    ref={textAreaRef}
                    placeholder={"Напишите комментарий..."}
                    value={value}
                    onChange={(e)=>inputHandler(e)}/>
                    <Button
                        disabled={!value}
                        type={"submit"}
                        variant={"contained"}
                        color={"blueColor"}
                        size={"small"}
                        sx={{
                            fontWeight: "600",
                            fontSize: "12px",
                            display: isEdit ? "block" : "none"
                        }}
                    >
                        Сохранить
                    </Button>
            </form>
        </div>
    )
};

