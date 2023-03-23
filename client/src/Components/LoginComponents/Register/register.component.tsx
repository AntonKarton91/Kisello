import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./register.module.scss"
import {Button, Paper, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {login} from "../../../Store/Reducers/user/userSlice";
import {useNavigate} from "react-router-dom";

export interface AddCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    toLogin: () => void
}

// type Inputs = {
//     email: string,
//     password: string,
// };


export const RegisterComponent = ({toLogin}: AddCardProps): React.ReactElement => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    let navigate = useNavigate();
    const dispatch = useAppDispatch()

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Имя обязательно"),
        surname: yup
            .string()
            .required("Фамилия обязательна"),
        email: yup
            .string()
            .required("Email обязателен")
            .email('Неверный формат почты'),
        password: yup
            .string()
            .required("Пароль обязателен")
    }).required();

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })


    const onSubmit = async ( userData ) => {
        try {
            setError("")
            setLoading(true)
            const { data } = await axios.post(process.env.REACT_APP_NEXT_PUBLIC_DOMAIN + "auth/register", userData)
            await dispatch(login(data))
            navigate("/")
            setLoading(false)
        } catch (e) {
            if (e instanceof Error)
                setError(e.message)
        } finally {
            setLoading(false)
        }
    }


    const toLoginHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        setTimeout(() => toLogin(), 300)
    }


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.title}>Регистрация аккаунта</div>
                <TextField
                    {...register("name", {
                        required: "Поле обязательно",
                    })}
                    error={!!errors.name}
                    autoComplete={"off"}
                    label="Имя"
                    variant="outlined"
                    size={"small"}
                    // @ts-ignore
                    helperText={errors?.name?.message}
                    classes={{root: styles.input}}
                />
                <TextField
                    {...register("surname", {
                        required: "Поле обязательно",
                    })}
                    error={!!errors.surname}
                    autoComplete={"off"}
                    label="Имя"
                    variant="outlined"
                    size={"small"}
                    // @ts-ignore
                    helperText={errors?.surname?.message}
                    classes={{root: styles.input}}
                />
                <TextField
                    {...register("email", {
                        required: "Поле обязательно",
                    })}
                    error={!!errors.email}
                    autoComplete={"off"}
                    label="Email"
                    variant="outlined"
                    size={"small"}
                    // @ts-ignore
                    helperText={errors?.email?.message}
                    classes={{root: styles.input}}
                />

                <TextField
                    {...register("password", {
                        required: "Поле обязательно"
                    })}
                    error={!!errors.password}
                    autoComplete={"off"}
                    label="Пароль"
                    type={"password"}
                    variant="outlined"
                    size={"small"}
                    classes={{root: styles.input}}/>
                <Button
                    disabled={loading}
                    type={"submit"}
                    color="success"
                    variant="contained"
                    classes={{root: styles.submit}}
                >Зарегистрироваться
                </Button>
                { error && <div style={{color: "red"}}>{error}</div>}
            </form>
            <Button
                onClick={e => toLoginHandler(e)}
                classes={{root: styles.option}}
                size={"small"}
                variant="text"
            >
                Уже есть аккаунт? Войти
            </Button>
        </div>
    );
};

