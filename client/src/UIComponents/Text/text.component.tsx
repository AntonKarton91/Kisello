import React from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./textComponent.module.scss"

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLImageElement> {
    color: string
}

export const TextComponent = ({className, children, ...attrs}:TextProps):React.ReactElement => {

    const classes = cn(
        className,
        styles.text
    )

    return (
        <div className={classes} >
            {children}
        </div>
    );
};


