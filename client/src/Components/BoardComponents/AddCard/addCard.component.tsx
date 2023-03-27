import * as React from "react";
import {useRef, useState} from "react";
import styles from "./addCard.module.scss"
import {AddCardProps} from "./addCard.props";
import {Button, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from "../../../Store/hooks";
import {sendAddCardToColumn} from "../../../Store/Reducers/board/boardSlice";
import {useParams} from "react-router-dom";

export const AddCardComponent = ({columnId}: AddCardProps): React.ReactElement => {
    let { id: boardId } = useParams();
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const formRef = useRef<HTMLFormElement>(null)
    const dispatch = useAppDispatch()


    const openForm = (e: React.MouseEvent<HTMLDivElement>) => {
        const closeHandler = () => {
            // @ts-ignore
            if (!formRef.current?.contains(e.target)) {
                return
            }
        }
        window.addEventListener("click", closeHandler)
        setIsOpen(!isOpen)
    }

    const closeFormAddCard = () => {
        setIsOpen(false)
        setTitle("")
    }

    const changeCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const addCardHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(sendAddCardToColumn({title, columnId, boardId}))
        setTitle("")
        setIsOpen(false)
    }

    return (
        isOpen
            ? <form className={styles.addForm} ref={formRef} id={"addCardForm"}>
                    <div className={styles.inputField}>
                        <TextField
                            autoFocus={true}
                            placeholder={"Введите название карточки"}
                            value={title}
                            sx={{backgroundColor: "white"}}
                            multiline
                            maxRows={4}
                            onChange={changeCardName}
                        />
                    </div>
                    <Button
                        classes={{root: styles.addCardButton}}
                        size={"small"} variant="contained" onClick={e=>addCardHandler(e)}
                    >Создать карточку</Button>
                    <IconButton onClick={closeFormAddCard} size={"small"} classes={{root: styles.closeAddCardButton}}>
                        <CloseIcon/>
                    </IconButton>

                </form>
            : <div onClick={openForm} className={styles.addCardOpenButton}>Создать карточку</div>

    );
};

