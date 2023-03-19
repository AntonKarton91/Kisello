import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./login.module.scss"
import {Button,TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginUser} from "../../../Store/Reducers/user/thunks";

export interface AddCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    toRegister: ()=>void
}


export const LoginComponent = ({toRegister}: AddCardProps): React.ReactElement => {
    const { loading, error } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const schema = yup.object().shape({
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
        dispatch(loginUser(data))
    }

    const toRegisterHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        setTimeout(()=>toRegister(), 300)
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.title}>Вход в Kisello</div>
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
                            disabled={loading}
                            type={"submit"}
                            color="success"
                            variant="contained"
                            classes={{root: styles.submit}}
                        >Войти
                        </Button>
                        { error && <div style={{color: "red"}}>{error}</div>}
                    </form>
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
        </div>
    );
};

