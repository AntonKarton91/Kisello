import React, {useEffect} from 'react';
import LayoutComponent from "../../Layout/layout.component";
import {BoardContentComponent} from "../../Components/BoardComponents/BoardContent/boardContent.component";
import {useAppDispatch} from "../../Store/hooks";
import {wsDisconnect} from "../../Store/Reducers/webSocket/webSocket.slice";
import {useAuth} from "../../hooks/use-auth";


const BoardPage = () => {
    const {isAuth, email} = useAuth();
    const dispatch = useAppDispatch()

    useEffect(()=> {
        function disconnect() {
            dispatch(wsDisconnect())
        }
        return disconnect
    }, [])



    return (
        <LayoutComponent>
            <BoardContentComponent/>
        </LayoutComponent>
    )
};

export default BoardPage;