import React, {useEffect} from 'react';
import LayoutComponent from "../../Layout/layout.component";
import {BoardContentComponent} from "../../Components/BoardComponents/BoardContent/boardContent.component";
import {useAuth} from "../../hooks/use-auth";
import {redirect, useNavigate} from "react-router-dom";


const BoardPage = () => {
    const {isAuth, email} = useAuth();
    let navigate = useNavigate();
    // console.log(isAuth)
    //
    // useEffect(()=> {
    //     if (!isAuth) {
    //         return navigate("/login")
    //     }
    // })



    return (
        <LayoutComponent>
            <BoardContentComponent/>
        </LayoutComponent>
    )
};

export default BoardPage;