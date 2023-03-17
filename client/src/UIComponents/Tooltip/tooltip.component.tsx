import React, {useRef, useState} from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./tooltip.module.scss"

interface ITooltipProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    description: string
}

export const TooltipComponent = ({className, children, description, ...attrs}:ITooltipProps):React.ReactElement => {
    const [isVisible, setIsVisible] = useState(false)
    const refTimeout = useRef<NodeJS.Timeout>()


    const overHandler = () => {
        refTimeout.current = setTimeout(()=>{
            setIsVisible(true)
        }, 1000)

    }

    const leaveHandler = () => {
        clearTimeout(refTimeout.current)
        setIsVisible(false)
    }

    return (
        <div className={styles.container} onMouseEnter={overHandler} onMouseLeave={leaveHandler}>
            <div className={styles.element}>
                {children}
            </div>
            {
                isVisible &&
                    <div className={styles.tooltip}>
                        {description}
                    </div>
            }
        </div>

    );
};


