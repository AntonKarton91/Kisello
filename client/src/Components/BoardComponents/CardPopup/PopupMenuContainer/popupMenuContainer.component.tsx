import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./tagsMenu.module.scss"

export interface PopupMenuContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    xCoord: number
    yCoord?: number
    width?: number
    height?: number
    title: string
}

export const PopupMenuContainerComponent = ({children, xCoord, yCoord, width, height, title}: PopupMenuContainerProps): React.ReactElement => {


    const inlineStyles = {
        left: yCoord + "px",
        top: yCoord ? yCoord + "px" : "",
        width:
        height:
    }

    return (
        <div className={styles.container} style={}>
            <div>{title}</div>
        </div>
    );
};

