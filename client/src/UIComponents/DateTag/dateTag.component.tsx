import React, {useState} from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./dateTag.module.scss"
import {monthArray} from "../../utils/monthArray";
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export interface IDateTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    selectDate: Date
    isDone?: boolean
}



export const DateTagComponent = ({className, selectDate, isDone=false, ...attrs}:IDateTagProps):React.ReactElement => {
    const [isMouseOver, setIsMouseOver] = useState(false)

    const mouseEnterHandler = (e: React.MouseEvent) => {
        setIsMouseOver(true)
    }
    const mouseLeaveHandler = (e: React.MouseEvent) => {
        setIsMouseOver(false)
    }

    function getColor() {
        if (isDone) return "green"
        // @ts-ignore
        const currentDate = selectDate - new Date()
        if (currentDate > 86400000) return "transparent"
        if (currentDate < 86400000 && currentDate > 0) return "yellow"
        return "red"
    }

    const color = getColor()

    const fontColor = color !== "transparent" ? "white" : "#656575"

    const Icon = () => {
        if (isMouseOver) return <CheckCircleOutlineIcon fontSize={"inherit"}/>
        return isDone ? <CheckIcon fontSize={"inherit"}/> : <AccessTimeIcon fontSize={"inherit"}/>
    }

    return (
        <div
            {...attrs}
            className={styles.container}
            style={{backgroundColor: color, color: fontColor}}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <Icon/>
            <div>{selectDate.getDate()} {monthArray[selectDate.getMonth()].slice(0,3)}</div>
        </div>
    );
};


