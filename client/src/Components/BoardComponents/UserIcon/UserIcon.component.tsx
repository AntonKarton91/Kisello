import React from 'react';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"
import styles from "./UserIcon.module.scss"
import {ImageComponent} from "../../../UIComponents";

export interface IUserIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    height: number
    width: number
    name: string
    surname: string
    onClick?: ()=>void
}

export const UserIconComponent = ({ ...attrs}):React.ReactElement => {


    // const classes = cn(
    //     className,
    //
    // )

    return (
        <div>
            {/*<TooltipComponent height={} width={}/>*/}
        </div>
    );
};


