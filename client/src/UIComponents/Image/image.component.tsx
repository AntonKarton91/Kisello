import React, {useState} from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./imageComponent.module.scss"
import {TooltipComponent} from "../Tooltip/tooltip.component";

export interface ImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src?: string
    height?: number
    width: number
    circle?: boolean
    alt?: string
    description?: string
}

export const ImageComponent = ({className, src, height, width, circle, alt, description, ...attrs}:ImageProps):React.ReactElement => {
    const [isMouseOver, setIsMouseOver] = useState(false)

    const mouseEnterHandler = (e: React.MouseEvent) => {
        setIsMouseOver(true)
    }
    const mouseLeaveHandler = (e: React.MouseEvent) => {
        setIsMouseOver(false)
    }


    if (!src) {
        src = `https://via.placeholder.com/${height}x${width}`
    }

    if (!alt) {
        alt = "placeholder"
    }

    const classes = cn(
        className,
        styles.image,
        {[styles.circle]: circle}
    )

    return (
        <div className={styles.container}>
            <img
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                alt={alt}
                src={src}
                width={width}
                height={!height ? "auto" : height}
                className={classes}
                {...attrs}
            />
        </div>

    );
};


