import React, {useEffect} from 'react';
import styles from "./loginPage.module.scss"
import {
    LoginRegisterFieldComponent
} from "../../Components/LoginComponents/LoginRegisterField/loginRegisterField.component";
import {useAuth} from "../../hooks/use-auth";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const {isAuth} = useAuth();
    let navigate = useNavigate();

    useEffect(()=> {
        if (isAuth) {
            return navigate("/")
        }
    }, [isAuth])



    return (
        <div className={styles.container} style={{backgroundImage: "url('http://localhost:3000/images/login.jpg')"}}>
            <LoginRegisterFieldComponent/>
        </div>
    );
};

export default LoginPage;