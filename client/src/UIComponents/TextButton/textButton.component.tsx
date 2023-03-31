import React from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./textButton.module.scss"



export interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    width?: number
    height?: number
    onClick?: () => void
    disabled?: boolean
}

export const TextButtonComponent = ({
                                        className,
                                        children,
                                        width,
                                        height,
                                        onClick,
                                        disabled,
                                        ...attrs
                                    }: TextProps): React.ReactElement => {

    const classes = cn(
        className,
        [styles.button]
    )

    const clickHandler = onClick ? onClick : ()=>{}
    const buttonStyle = {
        width: width + "px",
        height: height + "px",
    }

    return (
        <button {...attrs} className={classes} style={buttonStyle} onClick={clickHandler} disabled={disabled}>
            {children}
        </button>
    );
};


