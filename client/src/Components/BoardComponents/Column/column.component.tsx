import * as React from "react";
import styles from "./column.module.scss"
import {ColumnProps} from "./column.props";
import {CardPreview} from "../CardPreview/cardPreview.component";
import {useEffect, useRef, useState} from "react";
import {AddCardComponent} from "../AddCard/addCard.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {sendDNDCard, sendUpdateColumn} from "../../../Store/Reducers/board/boardSlice";
import {ICartPrev} from "../../../models/models";
import {CustomDragLayer} from "./CustomDragLayer/customDragLayer";
import {useDrop} from "react-dnd";
import {DndTypes} from "../../../DND/types";


export const ColumnComponent = ({columnData}: ColumnProps): React.ReactElement => {
    const {_id: columnId, name, cardList} = columnData
    const {cardList: boardCardList, columns} = useAppSelector(state => state.board)
    const [columnName, setColumnName] = useState<string>(name)
    const [isDrag, setIsDrag] = useState<boolean>(false)
    const [openedCard, setOpenedCard] = useState<string>("")
    const dispatch = useAppDispatch()

    useEffect(() => {
        setColumnName(name)
    }, [columnData])



    const [{ isOver, isOverCurrent }, drop] = useDrop(
        () => ({
            accept: DndTypes.CARD,
            drop(_item: unknown, monitor) {
                if (!monitor.didDrop())
                    dispatch(sendDNDCard({
                        _item,
                        options: {type: "empty"},
                        columnData: columnData._id
                    }))
              },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
            }),
        }),

    )



    const changeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 32) {
            setColumnName(e.target.value)
        }
    }

    const currentCardList = () => {
        const b = cardList.map(c=>{
            return boardCardList.find(col=>col._id === c)
        })
        return b as ICartPrev[]
    }

    function onSendColumnName() {
        const name = columnName
        dispatch(sendUpdateColumn({data: {name}, columnId}))
    }

    return (
        <div className={styles.columnWrapper} ref={drop}>
            <div className={styles.container}>
                <div className={styles.columnName}>
                    <input className={styles.columnNameInput} value={columnName} onChange={changeColumnName}
                           onBlur={onSendColumnName}/>
                </div>
                <div className={styles.cartListContainer}>
                    {
                        currentCardList().map((cart, index) => {
                                return (
                                    <CardPreview
                                        isDrag={isDrag}
                                        dragChecking={(e)=>setIsDrag(e)}
                                        id={cart._id} key={cart._id} column={columnId}
                                        columnData={columnData}
                                        openedCard={openedCard}
                                        closeCard={() => setOpenedCard("")}
                                        openCard={setOpenedCard}
                                        data={cart}/>
                                )
                        })
                    }
                </div>
                <div style={{
                    width: "96.5%",
                    backgroundColor: "#d2d0d0",
                    borderRadius: "5px",
                    height: isOverCurrent ? "70px" : 0,
                    marginLeft: "4px",
                    marginTop: "-2px",
                    marginBottom: isOverCurrent ? "10px" : 0
                }}></div>
                <div className={styles.addMenuContainer}>
                    <AddCardComponent columnId={columnId}/>
                </div>
            </div>
            <CustomDragLayer/>
        </div>

    );
};

