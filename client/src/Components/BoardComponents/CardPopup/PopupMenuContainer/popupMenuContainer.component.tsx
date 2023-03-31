import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, RefObject, useEffect, useRef, useState} from "react";
import styles from "./popupMenuContainer.module.scss"

export interface PopupMenuContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    addButtonRef: RefObject<HTMLDivElement>
    closeWindow: () => void
    isOpen: boolean
}

export const PopupMenuContainerComponent = ({
                                                children,
                                                addButtonRef,
                                                closeWindow,
                                                isOpen
                                            }: PopupMenuContainerProps): React.ReactElement => {
    const ref = useRef<HTMLDivElement>(null)
    const [xCoord, setXCoord] = useState<number>(0)
    const [yCoord, setYCoord] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [display, setDisplay] = useState("none")

    useEffect(() => {
        if (addButtonRef.current && ref.current) {
            const popupWindow = addButtonRef.current.closest("#cardPopupContainer")
            if (popupWindow) {
                setYCoord(popupWindow.getBoundingClientRect().y)
                setHeight(popupWindow.getBoundingClientRect().height)
                const popupWindowStart = popupWindow.getBoundingClientRect().x
                const buttonXCoord = addButtonRef.current.getBoundingClientRect().x
                const menuWidth = 280
                if (((buttonXCoord + ref.current.getBoundingClientRect().width / 2) - menuWidth / 2) < popupWindowStart) {
                    setXCoord(popupWindowStart)
                } else {
                    setXCoord(buttonXCoord + addButtonRef.current.getBoundingClientRect().width / 2 - menuWidth / 2)
                }
                setDisplay("flex")

            }
        }
    }, [])

    const closeHandler = (e: MouseEvent) => {
        if (e.target && ref.current) {
            // @ts-ignore
            if (!ref.current.contains(e.target)) {
                closeWindow()
                return () => window.removeEventListener("click", closeHandler)
            }
        }
    }

    useEffect(() => {
        setTimeout(() => window.addEventListener("click", closeHandler), 500)
    }, [])


    const inlineStyles = {
        left: xCoord + "px",
        top: yCoord + "px",
        height: height + "px",
        display
    }

    if (!isOpen) {
        if (!isOpen) return <div></div>
    }

    return (
        <div className={styles.container} style={inlineStyles} ref={ref}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

