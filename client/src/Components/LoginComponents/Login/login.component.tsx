import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import styles from "./login.module.scss"
import {ImageComponent} from "../../../UIComponents";
import {Button, Paper, TextField} from "@mui/material";

export interface AddCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    toRegister: ()=>void
}


export const LoginComponent = ({toRegister}: AddCardProps): React.ReactElement => {
    const toRegisterHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        setTimeout(()=>toRegister(), 300)
    }

    return (
        <form className={styles.form}>
                    <div className={styles.title}>Вход в Kisello</div>
                    <TextField
                        autoComplete={"o"}
                        id="email"
                        label="Email"
                        variant="outlined"
                        size={"small"}
                        classes={{root: styles.email}}
                    />
                    <TextField
                        autoComplete={"o"}
                        id="password"
                        label="Пароль"
                        variant="outlined"
                        size={"small"}
                        classes={{root: styles.password}}/>
                    <Button
                        type={"submit"}
                        color="success"
                        variant="contained"
                        classes={{root: styles.submit}}
                    >Войти
                    </Button>
                    <Button
                        classes={{root: styles.option1}}
                        size={"small"}
                        variant="text"
                    >
                        Не удается войти?
                    </Button>
                    <Button
                        onClick={e=>toRegisterHandler(e)}
                        classes={{root: styles.option2}}
                        size={"small"}
                        variant="text"
                    >
                        Зарегистрировать аккаунт
                    </Button>
                </form>
    );
};

