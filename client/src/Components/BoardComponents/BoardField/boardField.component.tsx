import * as React from "react";
import styles from "./boardField.module.scss"
import {BoardFieldProps} from "./boardField.props";
import {useEffect} from "react";
import {ColumnComponent} from "../Column/column.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {CircularProgress} from "@mui/material";
import {fetchBoardData} from "../../../Store/Reducers/board/thunks";
import {sendAddNewColumn} from "../../../Store/Reducers/board/boardSlice";
import {wsConnect} from "../../../Store/Reducers/webSocket/webSocket.slice";
import {useParams} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


export const BoardFieldComponent = ({}: BoardFieldProps): React.ReactElement => {
    let { id: boardId } = useParams();
    const { columns, loading } = useAppSelector(state => state.board)
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

