import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import styles from "./loginRegisterField.module.scss"
import {ImageComponent} from "../../../UIComponents";
import {Button, Paper, TextField} from "@mui/material";
import {LoginComponent} from "../Login/login.component";
import {RegisterComponent} from "../Register/register.component";

export interface AddCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const LoginRegisterFieldComponent = ({}: AddCardProps): React.ReactElement => {
    const [way, setWay] = useState<"login" | "register">("login")

    return (
        <div className={styles.container}>
            <ImageComponent height={43} width={200}/>
            <Paper classes={{root: styles.paper}}>
                {
                    way === "login"
                        ? <LoginComponent toRegister={()=>setWay("register")}/>
                        :<RegisterComponent toLogin={()=>setWay("login")}/>
                }
            </Paper>
        </div>
    );
};

