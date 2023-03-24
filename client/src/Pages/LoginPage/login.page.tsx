import React, {useEffect} from 'react';
import styles from "./loginPage.module.scss"
import {
    LoginRegisterFieldComponent
} from "../../Components/LoginComponents/LoginRegisterField/loginRegisterField.component";

const LoginPage = () => {



    return (
        <div className={styles.container} style={{backgroundImage: "url('http://localhost:3000/images/login.jpg')"}}>
            <LoginRegisterFieldComponent/>
        </div>
    );
};

export default LoginPage;