import * as React from "react";
import styles from "./boardField.module.scss"
import {BoardFieldProps} from "./boardField.props";
import {useEffect, useState} from "react";
import cn from "classnames"
import {ColumnComponent} from "../Column/column.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {CircularProgress} from "@mui/material";
import {fetchBoardData} from "../../../Store/Reducers/board/thunks";
import { io, Socket } from "socket.io-client";
import {addColumn} from "../../../Store/Reducers/board/boardSlice";
import {wsConnect, wsDisconnect} from "../../../Store/Reducers/webSocket/webSocket.slice";
import {IColumn} from "../../../models/models";

let socket: Socket

export const BoardFieldComponent = ({}: BoardFieldProps): React.ReactElement => {
    const { columns, loading } = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()




//

    useEffect(()=> {
        socket = io("ws://localhost:5000")
        function onConnect() {
            console.log("Соединение установлено")
            dispatch(wsConnect())
        }
        function onDisconnect() {
            console.log("Соединение разорвано")
            dispatch(wsDisconnect())
        }
        function onConnectError() {
            console.log("Ошибка соединения")
        }
        function onAddNewColumn(column: IColumn): void {
            dispatch(addColumn(column))
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('connect_error', onConnectError)
        socket.on('addNewColumn', onAddNewColumn)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('connect_error', onConnectError)
            socket.off('addNewColumn', onAddNewColumn)
        }
    }, [])



    useEffect(()=>{
        dispatch(fetchBoardData())
    }, [dispatch])


    const a = () => {
        socket.emit('addNewColumn', {name: "a", id: "sdfsdf"})
    }

    return (
        loading
            ? <CircularProgress />
            : <div className={styles.container}>
                {
                    columns.map((columnData, index) => {
                        return <ColumnComponent
                            columnData={columnData}
                            key={"Column" + index}
                        />
                    })
                }
                <div onClick={e=>a()}>ggg</div>
                </div>
    );
};

