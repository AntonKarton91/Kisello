import * as React from "react";
import styles from "./column.module.scss"
import {ColumnProps} from "./column.props";
import {CardPreview} from "../CardPreview/cardPreview.component";
import {useEffect, useState} from "react";
import {AddCardComponent} from "../AddCard/addCard.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {sendUpdateColumn} from "../../../Store/Reducers/board/boardSlice";


export const ColumnComponent = ({columnData}: ColumnProps): React.ReactElement => {
    const {_id: columnId, name, cardList} = columnData
    const {columns} = useAppSelector(state => state.board)
    const { cardList: boardCardList, loading } = useAppSelector(state => state.board)
    const [columnName, setColumnName] = useState<string>(name)
    const [openedCard, setOpenedCard] = useState<string>("")
    const dispatch = useAppDispatch()


    useEffect(()=> {
        setColumnName(name)
    }, [columnData])

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
        dispatch(sendUpdateColumn({columnName, columnId}))
    }

    return (
        <div className={styles.columnWrapper}>
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

