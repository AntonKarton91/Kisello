import * as React from "react";
import styles from "./column.module.scss"
import {ColumnProps} from "./column.props";
import {CardPreview} from "../CardPreview/cardPreview.component";
import {useEffect, useRef, useState} from "react";
import {AddCardComponent} from "../AddCard/addCard.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {sendUpdateColumn} from "../../../Store/Reducers/board/boardSlice";
import {useDrop} from "react-dnd";
import {DndTypes} from "../../../DND/types";
import {ICartPrev, IColumn} from "../../../models/models";


export const ColumnComponent = ({columnData}: ColumnProps): React.ReactElement => {
    const {_id: columnId, name, cardList} = columnData
    const {cardList: boardCardList, columns} = useAppSelector(state => state.board)
    const [columnName, setColumnName] = useState<string>(name)
    const [openedCard, setOpenedCard] = useState<string>("")
    const dispatch = useAppDispatch()
    const postRef = useRef<HTMLDivElement>(null)


    const [{isOverCurrent}, drop] = useDrop(() => ({
            accept: DndTypes.CARD,
            collect: (monitor) => ({
                isOverCurrent: monitor.isOver() && !columnData.cardList.length
            }),
            drop: (item: { cardFrom: string, columnFrom: IColumn }) => {
                const cardListFrom = item.columnFrom.cardList.filter(card => card !== item.cardFrom)
            },
            hover: (item, monitor) => {

            },
        }
    ))

    const [{isOverPost}, dropPost] = useDrop(() => ({
        accept: DndTypes.CARD,
        collect: (monitor) => ({
            isOverPost: monitor.isOver({shallow: true}),
        }),

        drop: (item, monitor) => {
            console.log(columnData.name)
        },

        hover: (item, monitor) => {
            if (postRef.current) {
                postRef.current.style.height = "70px"
                postRef.current.style.position = "relative"
            }
        },

    }))
    dropPost(postRef)

    useEffect(() => {
        if (postRef.current && !isOverPost) {
            postRef.current.style.height = "40px"
            postRef.current.style.position = "absolute"
        }
    }, [isOverPost])


    useEffect(() => {
        setColumnName(name)
    }, [columnData])

    const changeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 32) {
            setColumnName(e.target.value)
        }
    }

    const currentCardList = () => {
        // console.log(cardList, boardCardList)
        const b = cardList.map(c=>{
            return boardCardList.find(col=>col._id === c)
        })
        const a =  boardCardList.filter(card => {
            return cardList.includes(card._id)
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
                        currentCardList() && currentCardList().map((cart, index) => {
                            return <CardPreview
                                columnData={columnData}
                                openedCard={openedCard}
                                closeCard={() => setOpenedCard("")}
                                openCard={setOpenedCard}
                                key={columnId + index}
                                data={cart}/>
                        })
                    }
                </div>
                <div style={{transition: "0.2s all", gridArea: "dnd", height: isOverCurrent ? "70px" : "0"}}></div>
                <div className={styles.addMenuContainer}>
                    <AddCardComponent columnId={columnId}/>
                </div>
            </div>
        </div>

    );
};

