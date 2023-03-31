import React from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./cardTag.module.scss"

export interface ICartTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id: string
    title: string
    color: string
}

export const CardTagComponent = ({className, id, title, color, ...attrs}:ICartTagProps):React.ReactElement => {

    const classes = cn(
        [
            styles.container,
            className
        ]
    )

    return (
        <div {...attrs} className={classes} style={{backgroundColor: color}}>
            {title}
        </div>
    );
};


