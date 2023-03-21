import * as React from "react";
import styles from "./column.module.scss"
import {ColumnProps} from "./column.props";
import {CardPreview} from "../CardPreview/cardPreview.component";
import {useEffect, useState} from "react";
import {AddCardComponent} from "../AddCard/addCard.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {io} from "socket.io-client";
import {wsConnect, wsDisconnect} from "../../../Store/Reducers/webSocket/webSocket.slice";
import {IColumn} from "../../../models/models";
import {addColumn} from "../../../Store/Reducers/board/boardSlice";

export const ColumnComponent = ({columnData, socket}: ColumnProps): React.ReactElement => {
    const {_id: columnId, name, cardList} = columnData
    const { cardList: boardCardList, loading } = useAppSelector(state => state.board)
    const [columnName, setColumnName] = useState<string>(name)
    const [openedCard, setOpenedCard] = useState<string>("")
    console.log(columnData)

    const changeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length<32) {
            setColumnName(e.target.value)
        }
    }

    const currentCardList = () => {
        return boardCardList.filter(card=> {
            return cardList.includes(card.id)
        })
    }

    function onSendColumnName() {
        console.log({columnName, columnId})
        socket.emit("changeColumnName", "{columnName, columnId}")
    }

    return (
        <div className={styles.columnWrapper}>
            <div onClick={onSendColumnName}>ljndskfjksldfj</div>
            <div className={styles.container} >
                <div className={styles.columnName}>
                    <input className={styles.columnNameInput} value={columnName} onChange={changeColumnName} onBlur={onSendColumnName}/>
                </div>
                <div className={styles.cartListContainer}>
                    {
                        currentCardList() && currentCardList().map((cart, index) => {
                            return <CardPreview
                                columnData={columnData}
                                openedCard={openedCard}
                                closeCard={()=>setOpenedCard("")}
                                openCard={setOpenedCard}
                                key={columnId + index}
                                data={cart} />
                        })
                    }
                </div>
                <div className={styles.addMenuContainer} >
                    <AddCardComponent columnId={columnId}/>
                </div>
            </div>
        </div>

    );
};

