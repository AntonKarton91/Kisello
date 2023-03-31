import React, {useState} from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./dateTag.module.scss"
import {monthArray} from "../../utils/monthArray";
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import {sendCardUpdate} from "../../Store/Reducers/board/boardSlice";

export interface IDateTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    selectDate: string
    isDone?: boolean
    cardId: string
}



export const DateTagComponent = ({className, selectDate, isDone=false, cardId, ...attrs}:IDateTagProps):React.ReactElement => {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const dispatch = useAppDispatch()

    const mouseEnterHandler = (e: React.MouseEvent) => {
        setIsMouseOver(true)
    }
    const mouseLeaveHandler = (e: React.MouseEvent) => {
        setIsMouseOver(false)
    }

    const getFullDate = (): Date => {
        return new Date(selectDate)
    }

    function getColor() {
        if (isDone) return "#61bd4f"
        // @ts-ignore
        const currentDate = selectDate - new Date()
        if (currentDate > 86400000) return "transparent"
        if (currentDate < 86400000 && currentDate > 0) return "yellow"
        return "#EB5A46"
    }

    const isCompleteChange = () => {
        dispatch(sendCardUpdate({cardId, data: {completed: !isDone}}))
    }

    const color = getColor()

    const fontColor = color !== "transparent" ? "white" : "#656575"

    const Icon = () => {
        if (isMouseOver) return <CheckCircleOutlineIcon fontSize={"inherit"}/>
        return isDone ? <CheckIcon fontSize={"inherit"}/> : <AccessTimeIcon fontSize={"inherit"}/>
    }

    return (
        <div
            onClick={()=>isCompleteChange()}
            {...attrs}
            className={styles.container}
            style={{backgroundColor: color, color: fontColor}}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <Icon/>
            <div>{getFullDate().getDate()} {monthArray[getFullDate().getMonth()].slice(0,3)}</div>
        </div>
    );
};


