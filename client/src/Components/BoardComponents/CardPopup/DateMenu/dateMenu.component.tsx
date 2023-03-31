import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState, forwardRef, RefObject, useEffect} from "react";
import styles from "./dateMenu.module.scss"
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import {ICartPrev, ITagList} from "../../../../models/models";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks";
import {PopupMenuContainerComponent} from "../PopupMenuContainer/popupMenuContainer.component";
import {Checkbox} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {monthArray, monthArray1} from "../../../../utils/monthArray";
import {sendCardUpdate} from "../../../../Store/Reducers/board/boardSlice";

export interface DateMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev

}

export const DateMenuComponent = ({cardData}: DateMenuProps): React.ReactElement => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    // const {} = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()


    const completToggle = () => {
        dispatch(sendCardUpdate({cardId: cardData._id, data: {completed: !cardData.completed}}))
    }

    const getDate = (): string => {
        const date = new Date(cardData.date)
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const month = monthArray1[date.getMonth()]
        return `${day} ${month} в ${hours}:${minutes<10 ? 0 : ""}${minutes}`
    }


    return (
        <div className={styles.container}>
            <div className={styles.title}>Срок</div>
            <div className={styles.list}>
                <Checkbox
                    onClick={completToggle}
                    checked={cardData.completed}
                    size={"small"}
                    classes={{root: styles.checkBox}}
                />
                <div ref={ref}>
                    <TextButtonComponent className={styles.buttonContainer} onClick={() => setMenuIsOpen(true)}>
                        <div>{getDate()}</div>
                        <KeyboardArrowDownIcon/>
                    </TextButtonComponent>
                </div>
            </div>
            {
                menuIsOpen &&
                <PopupMenuContainerComponent
                    isOpen={menuIsOpen}
                    closeWindow={() => setMenuIsOpen(false)}
                    addButtonRef={ref}
                >
                    <div className={styles.menuContainer}>
                        <div className={styles.menuTitle}>Даты</div>

                    </div>
                </PopupMenuContainerComponent>
            }
        </div>
    );
};

