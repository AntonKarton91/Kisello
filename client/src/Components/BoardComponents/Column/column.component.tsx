import * as React from "react";
import styles from "./column.module.scss"
import {ColumnProps} from "./column.props";
import {CardPreview} from "../CardPreview/cardPreview.component";
import {useEffect, useRef, useState} from "react";
import {AddCardComponent} from "../AddCard/addCard.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {sendDNDCard, sendUpdateColumn} from "../../../Store/Reducers/board/boardSlice";
import {useDrag, useDragLayer, useDrop} from "react-dnd";
import {DndTypes} from "../../../DND/types";
import {ICartPrev, IColumn} from "../../../models/models";
import {updateDnd} from "../../../Store/Reducers/dnd/dndSlice";
import {DndCardPreview} from "../DndCardPreview/cardPreview.component";


export const ColumnComponent = ({columnData}: ColumnProps): React.ReactElement => {
    const {_id: columnId, name, cardList} = columnData
    const {cardList: boardCardList, columns} = useAppSelector(state => state.board)
    const [columnName, setColumnName] = useState<string>(name)
    const [openedCard, setOpenedCard] = useState<string>("")
    const dispatch = useAppDispatch()




    useEffect(() => {
        setColumnName(name)
    }, [columnData])

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

    function CustomDragLayer() {
        const {item, itemType, isDragging, currentOffset} = useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))
        function renderItem() {
            switch (itemType) {
                case DndTypes.CARD:
                    return <DndCardPreview item={item}/>
                default:
                    return null
            }
        }

        if (!isDragging) {
            return null
        }

        return (
            <div style={{
                position: "fixed",
                pointerEvents: "none",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                zIndex: "1000"
            }}>
                <div style={{
                    position: "absolute",
                    top: currentOffset?.y,
                    left: currentOffset?.x
                }}>
                    {renderItem()}
                </div>
            </div>
        )
    }


    return (
        <div className={styles.columnWrapper}>
            <div className={styles.container}>
                <div className={styles.columnName}>
                    <input className={styles.columnNameInput} value={columnName} onChange={changeColumnName}
                           onBlur={onSendColumnName}/>
                </div>
                <div className={styles.cartListContainer}>
                    {
                        currentCardList() && currentCardList().map((cart, index) => {
                                return (
                                    <CardPreview
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
                <div className={styles.addMenuContainer}>
                    <AddCardComponent columnId={columnId}/>
                </div>
            </div>
            <CustomDragLayer/>
        </div>

    );
};

