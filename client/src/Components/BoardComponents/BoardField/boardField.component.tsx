import * as React from "react";
import styles from "./boardField.module.scss"
import {BoardFieldProps} from "./boardField.props";
import {useEffect, useRef, useState} from "react";
import cn from "classnames"
import {ColumnComponent} from "../Column/column.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {CircularProgress} from "@mui/material";
import {fetchBoardData} from "../../../Store/Reducers/board/thunks";
import { io, Socket } from "socket.io-client";
import {addColumn, sendAddNewColumn} from "../../../Store/Reducers/board/boardSlice";
import {wsConnect, wsDisconnect} from "../../../Store/Reducers/webSocket/webSocket.slice";
import {IColumn} from "../../../models/models";
import {useParams} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import {log} from "@craco/craco/dist/lib/logger";
// import {webSocketConnect} from "../../../Store/Reducers/webSocket/thunks";

// let socket: Socket

export const BoardFieldComponent = ({}: BoardFieldProps): React.ReactElement => {
    let { id: boardId } = useParams();
    const { columns, loading } = useAppSelector(state => state.board)
    const { socket } = useAppSelector(state => state.webSocket)
    const dispatch = useAppDispatch()


    useEffect(()=> {
        if (boardId) {
            dispatch(fetchBoardData(boardId))
        }
        dispatch(wsConnect())

        }, [])



    const addColumnHandler = () => {
        dispatch(sendAddNewColumn(boardId))
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
                <div onClick={e=>addColumnHandler()} className={styles.addColumnButton}>
                    <AddIcon/>
                    <div>Добавьте еще одну колонку</div>
                </div>
                </div>
    );
};

