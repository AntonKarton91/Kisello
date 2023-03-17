import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./register.module.scss"
import {Button, Paper, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ErrorMessage} from '@hookform/error-message';
import {UserApi} from "../../../API/UserApi/user.api";
import {fetchBoardData} from "../../../Store/Reducers/board/thunks";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {registerUser} from "../../../Store/Reducers/user/thunks";
import {CreateUserDto} from "../../../Store/Reducers/user/types";

export interface AddCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    toLogin: () => void
}

// type Inputs = {
//     email: string,
//     password: string,
// };


export const RegisterComponent = ({toLogin}: AddCardProps): React.ReactElement => {
    const { columns, loading } = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Имя обязательно"),
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

    const onSubmit = async (data) => {
        dispatch(registerUser(data))
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
                    classes={{root: styles.name}}
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
                    classes={{root: styles.email}}
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
                    classes={{root: styles.password}}/>
                <Button
                    type={"submit"}
                    color="success"
                    variant="contained"
                    classes={{root: styles.submit}}
                >Зарегистрироваться
                </Button>
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

