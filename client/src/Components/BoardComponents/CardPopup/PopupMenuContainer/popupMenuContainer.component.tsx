import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, RefObject, useEffect, useRef, useState} from "react";
import styles from "./popupMenuContainer.module.scss"

export interface PopupMenuContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string
    addButtonRef: RefObject<HTMLDivElement>
}

export const PopupMenuContainerComponent = ({children, title, addButtonRef}: PopupMenuContainerProps): React.ReactElement => {
    const ref = useRef<HTMLDivElement>(null)
    const [xCoord, setXCoord] = useState<number>(0)


    useEffect(()=> {
        if (addButtonRef.current) {
            const popupWindow = addButtonRef.current.closest("#cardPopupContainer")
            if (popupWindow) {
                const popupWindowStart = popupWindow.getBoundingClientRect().x
                const popupWindowEnd = popupWindow.getBoundingClientRect().width + popupWindowStart
                setXCoord(popupWindowStart)
            }
        }
    }, [])
    // @ts-ignore

    const inlineStyles = {
        left: xCoord + "px",
        // top: yCoord ? yCoord + "px" : "",
        // width: width ? width + "px" : "",
        // height: height ? height + "px" : "",
    }

    return (
        <div className={styles.container} style={inlineStyles} ref={ref}>
            <div>{title}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

