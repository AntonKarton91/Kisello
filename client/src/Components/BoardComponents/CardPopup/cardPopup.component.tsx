import * as React from "react";
import {useEffect, useRef, useState} from "react";
import styles from "./cardPopup.module.scss"
import {CardPopupProps} from "./cardPopup.props";
import {RightMenuComponent} from "./RightMenu/rightMenu.component";
import {PopupContainerComponent} from "./PopupContainer/popupContainer.component";
import {TagsMenuComponent} from "./TagsMenu/tagsMenu.component";
import {sendCardUpdate} from "../../../Store/Reducers/board/boardSlice";
import {useAppDispatch} from "../../../Store/hooks";
import {PartsMenuComponent} from "./PartsMenu/partsMenu.component";
import {DateMenuComponent} from "./DateMenu/dateMenu.component";
import {PopupDescriptionComponent} from "./PopupDescription/popupDescription.component";
import {TextField} from "@mui/material";
import {CommentsContainerComponent} from "./PopupComments/commentsContainer.component";


export const CardPopupComponent = ({data, closePopup, columnData}: CardPopupProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>(data.title)
    const [isEdit, setIsEdit] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)
    const titleInputRef = useRef<HTMLInputElement>(null)

    const onBlurHandler = () => {
        const currentValue = title.length > 0 ? title : "Задача"
        dispatch(sendCardUpdate({cardId: data._id, data: {title: currentValue}}))
        setIsEdit(false)
    }

    useEffect(()=>{
        localStorage.setItem("openedCard", data._id)
        return ()=>localStorage.removeItem("openedCard")
    }, [])

    return (
        <PopupContainerComponent closePopup={closePopup}>
            <div ref={popupRef} className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        {
                            isEdit
                                ? <TextField
                                autoFocus={true}
                                    multiline
                                    inputRef={titleInputRef}
                                    value={title}
                                    classes={{root: styles.titleInput}}
                                    sx={{padding: "-3px"}}
                                    inputProps={{
                                        sx: {
                                            color: "#656575",
                                            fontSize: "20px",
                                            fontWeight: "600"
                                        },
                                    }}
                                    onChange={e=>setTitle(e.target.value)}
                                    onBlur={()=>onBlurHandler()}
                                />
                                : <div className={styles.title} onClick={()=>setIsEdit(true)}>{title}</div>
                        }
                        <div className={styles.columnName}>в листе {columnData.name || ""}</div>
                    </div>

                    <div className={styles.attributes}>
                        <TagsMenuComponent cardData={data}/>
                        <PartsMenuComponent cardData={data}/>
                        <DateMenuComponent cardData={data}/>
                    </div>
                    <div className={styles.description}>
                        <PopupDescriptionComponent cardData={data}/>
                    </div>
                    <div>
                        <CommentsContainerComponent cardData={data}/>
                    </div>
                </div>
                <div className={styles.rightMenu}>
                    <RightMenuComponent/>
                </div>
            </div>

        </PopupContainerComponent>
    );
};

