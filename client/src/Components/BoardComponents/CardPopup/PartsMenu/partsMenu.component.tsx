import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState, forwardRef, RefObject, useEffect} from "react";
import styles from "./partsMenu.module.scss"
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import AddIcon from '@mui/icons-material/Add';
import {ICartPrev, ITagList} from "../../../../models/models";
import {CardTagComponent, ImageComponent} from "../../../../UIComponents";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks";
import {PopupMenuContainerComponent} from "../PopupMenuContainer/popupMenuContainer.component";
import {Checkbox} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {sendCardUpdate} from "../../../../Store/Reducers/board/boardSlice";
import {IBoardUser} from "../../../../Store/Reducers/board/types";
import {AvatarPlaceholderComponent} from "../../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";

export interface PartsMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev

}

export const PartsMenuComponent = ({cardData}: PartsMenuProps): React.ReactElement => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const {users} = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()


    const currentPartList = (): IBoardUser[] => {
        return users.filter(user => {
            return cardData.participants.includes(user._id)
        })
    }

    const isSelected = (userId: string): boolean => {
        return cardData.participants.includes(userId)
    }

    const addRemoveHandler = (userId: string) => {
            let participants = [...cardData.participants]
            if (cardData.participants.includes(userId)) {
                participants =  participants.filter(user=> user !== userId)
            } else participants.push(userId)
            dispatch(sendCardUpdate({cardId: cardData._id, data: {participants}}))
    }


    return (
        <div className={styles.container}>
            <div className={styles.title}>Участники</div>
            <div className={styles.list}>

                {
                    currentPartList()
                        .map(user => {
                            return (
                                user.avatar
                                    ? <ImageComponent
                                        height={25}
                                        width={25}
                                        circle
                                        src={user.avatar}
                                        key={user._id} description={`${user.surname} ${user.name}`}
                                    />
                                    : <AvatarPlaceholderComponent circle size={25}
                                                                  title={user.name ? user.name : ""}
                                                                  fontSize={15}/>
                            )
                        })
                }
                <div ref={ref}>
                    <TextButtonComponent className={styles.buttonContainer} onClick={() => setMenuIsOpen(true)}>
                        <AddIcon classes={{root: styles.addIcon}}/>
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
                        <div className={styles.menuTitle}>Участники доски</div>
                        {
                            users.map(user => {

                                return (
                                    <div className={styles.tagItem} onClick={() => addRemoveHandler(user._id)}>
                                        {
                                            isSelected(user._id) &&
                                                <Checkbox checked={true} size={"small"}
                                                          classes={{root: styles.checkBox}}/>
                                        }
                                        {
                                            user.avatar
                                                ? <ImageComponent
                                                    height={30}
                                                    width={30}
                                                    circle
                                                    src={user.avatar}
                                                    key={user._id} description={`${user.surname} ${user.name}`}
                                                />
                                                : <AvatarPlaceholderComponent circle size={30}
                                                                              title={user.name ? user.name : ""}
                                                                              fontSize={20}/>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </PopupMenuContainerComponent>
            }
        </div>
    );
};

