import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState, forwardRef, RefObject, useEffect} from "react";
import styles from "./tagsMenu.module.scss"
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import AddIcon from '@mui/icons-material/Add';
import {ICartPrev, ITagList} from "../../../../models/models";
import {CardTagComponent} from "../../../../UIComponents";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks";
import {PopupMenuContainerComponent} from "../PopupMenuContainer/popupMenuContainer.component";
import {Checkbox} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {sendCardUpdate} from "../../../../Store/Reducers/board/boardSlice";

export interface TagsMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev

}

export const TagsMenuComponent = ({cardData}: TagsMenuProps): React.ReactElement => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const {cardTags} = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()


    const currentTagList = (): ITagList[] => {
        return cardTags.filter(tag => {
            return cardData.tagList.includes(tag._id)
        })
            .sort((a, b) => {
                return b.title.length - a.title.length
            })
    }

    const isSelected = (tagId: string): boolean => {
        return cardData.tagList.includes(tagId)
    }

    const addRemoveHandler = (tagId: string) => {
        let tagList = [...cardData.tagList]
        if (cardData.tagList.includes(tagId)) {
            tagList =  tagList.filter(tag=>tag !== tagId)
        } else tagList.push(tagId)
        dispatch(sendCardUpdate({cardId: cardData._id, data: {tagList}}))
    }


    return (
        <div className={styles.container}>
            <div className={styles.title}>Метки</div>
            <div className={styles.list}>

                {
                    currentTagList()
                        .map(tag => {
                            return (
                                <CardTagComponent
                                    key={tag._id}
                                    id={tag._id}
                                    title={tag.title}
                                    color={tag.color}
                                />
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
                        <div className={styles.menuTitle}>Метки</div>
                        {
                            cardTags.map(tag => {

                                return (
                                    <div className={styles.menuItem}>
                                        <div className={styles.tagItem} onClick={()=>addRemoveHandler(tag._id)}>
                                            <TextButtonComponent className={styles.buttonContainer} width={24}
                                                                 height={24}>
                                            <Checkbox checked={isSelected(tag._id)} size={"small"}
                                                      classes={{root: styles.checkBox}}/>
                                            </TextButtonComponent>
                                            <CardTagComponent
                                                className={styles.cardTag}
                                                id={tag._id}
                                                title={tag.title}
                                                color={tag.color}
                                            />
                                        </div>
                                        <TextButtonComponent className={styles.buttonContainer} width={24} height={24}>
                                            <EditIcon classes={{root: styles.editIcon}}/>
                                        </TextButtonComponent>
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

