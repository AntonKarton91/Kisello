import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./avatarPlaceholder.module.scss"
import cn from "classnames"


export interface AvatarPlaceholderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size: number
    circle: boolean
    title: string
    fontSize: number
}


export const AvatarPlaceholderComponent = ({size, className, circle, title, fontSize}: AvatarPlaceholderProps): React.ReactElement => {

    const extraStyles = {
        width: size + "px",
        height: size + "px",
        fontSize: fontSize + "px"
    }

    const classes = cn(
        className,
        styles.container,
        {[styles.circle]: circle}
    )

    return (
        <div style={extraStyles} className={classes}>
            <div>{title[0].toUpperCase()}</div>
        </div>
    )
};

