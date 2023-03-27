import React, {useEffect} from 'react';
import {MainFieldComponent} from "../../Components/MainPageComponents/MainField/mainField.component";
import {useAuth} from "../../hooks/use-auth";

const MainPage = () => {
    const {isAuth, email} = useAuth();

    return (
            <div>
                <MainFieldComponent/>
            </div>
    );
};

export default MainPage;