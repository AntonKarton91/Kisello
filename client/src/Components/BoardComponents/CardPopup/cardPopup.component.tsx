import * as React from "react";
import {useRef, useState} from "react";
import styles from "./cardPopup.module.scss"
import {CardPopupProps} from "./cardPopup.props";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {TextButtonComponent} from "../../../UIComponents/TextButton/textButton.component";
import {RightMenuComponent} from "./RightMenu/rightMenu.component";
import {PopupContainerComponent} from "./PopupContainer/popupContainer.component";
import {TagsMenuComponent} from "./TagsMenu/tagsMenu.component";


export const CardPopupComponent = ({data, closePopup, columnData}: CardPopupProps): React.ReactElement => {
    const [title, setTitle] = useState<string>(data.title)

    return (
        <PopupContainerComponent closePopup={closePopup}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <input
                            type="text"
                            value={title}
                            onChange={e=>setTitle(e.target.value)} className={styles.title}
                        />
                        <div className={styles.columnName}>в листе {columnData.name || ""}</div>
                    </div>
                    <TagsMenuComponent cardId={data.id}/>
                </div>
                <div className={styles.rightMenu}>
                    <RightMenuComponent/>
                </div>
            </div>

        </PopupContainerComponent>
    );
};

