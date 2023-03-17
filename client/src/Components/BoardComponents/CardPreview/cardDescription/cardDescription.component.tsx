import React, {ForwardedRef, useEffect, useRef, useState} from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./cardDescription.module.scss"
import {IconButton} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

export interface ICardDescriptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    valueProp: string
    changeValue: (value: string) => void
    restrictOpen: () => void
}

export const CardDescriptionComponent = ({
                                          className,
                                          valueProp,
                                          changeValue,
                                          restrictOpen,
                                          ...attrs
                                        }:ICardDescriptionProps):React.ReactElement => {
    const [value, setValue] = useState<string>(valueProp)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const editRef = useRef<HTMLTextAreaElement | null>(null)

    const setValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const editActivateHandler = () => {
        restrictOpen()
        setIsMenuVisible(false)
        setIsEditable(true)
    }

    const onBlurHandler = () => {
        setIsEditable(false)
        const currentValue = value.length > 0 ? value : "Задача"
        setValue(currentValue)
        changeValue(currentValue)
    }

    useEffect(()=>{
        if (isEditable) {
            // @ts-ignore
            if (editRef.current){
                editRef.current.focus()
                editRef.current.setSelectionRange(editRef.current.value.length,editRef.current.value.length);
            }
        }
    }, [isEditable])

    useEffect(() => {
        if (editRef && editRef.current) {
            const scrollHeight = editRef.current.scrollHeight;
            editRef.current.style.height = scrollHeight + "px";
        }
    }, [value, isEditable]);

    return (
        <div {...attrs} className={styles.container}>
                <div
                    className={cn(styles.prev, {[styles.visible]: isEditable})}
                    onMouseEnter={()=>setIsMenuVisible(true)}
                    onMouseLeave={()=>setIsMenuVisible(false)}
                >
                <div className={styles.prev}>
                    {value}
                {
                    isMenuVisible &&
                        <IconButton
                            id={"menu-button"}
                            size={"small"}
                            classes={{root: styles.editButton}}
                            onClick={editActivateHandler}
                        >
                            <BorderColorIcon/>
                        </IconButton>

                }
                </div>

                </div>

                <div
                    className={cn(styles.editInput, {[styles.visible]: !isEditable})}
                >
                    <textarea id={"input-descr"}
                              spellCheck={false}
                              ref={editRef}
                              value={value}
                              onChange={setValueHandler}
                              onBlur={onBlurHandler}
                    />
                </div>

        </div>
    );
}


