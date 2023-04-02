import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import styles from "./popupContainer.module.scss"
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";


export interface PopupContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    closePopup: ()=>void
}

export const PopupContainerComponent = ({children, closePopup}: PopupContainerProps): React.ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

    const closeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== ref.current) return
        e.stopPropagation()
        closePopup()
    }

    return (
        <div ref={ref} className={styles.wrapper} onMouseDown={e=>closeHandler(e)}>
            <div className={styles.container} id={"cardPopupContainer"}>
                {children}
                <IconButton classes={{root: styles.closePopupButton}} onClick={closePopup}>
                    <CloseIcon/>
                </IconButton>
            </div>
        </div>
    );
};

