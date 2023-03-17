import * as React from "react";
import styles from "./column.module.scss"
import {ColumnProps} from "./column.props";
import {CardPreview} from "../CardPreview/cardPreview.component";
import {useState} from "react";
import {AddCardComponent} from "../AddCard/addCard.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";

export const ColumnComponent = ({columnData}: ColumnProps): React.ReactElement => {
    const {id: columnId, name, cardList} = columnData
    const { cards, loading } = useAppSelector(state => state.board)
    const [columnName, setColumnName] = useState<string>(name)
    const [openedCard, setOpenedCard] = useState<string>("")

    const changeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length<32) {
            setColumnName(e.target.value)
        }
    }

    const currentCardList = () => {
        return cards.filter(card=> {
            return cardList.includes(card.id)
        })
    }

    return (
        <div className={styles.columnWrapper}>
            <div className={styles.container} >
                <div className={styles.columnName}>
                    <input className={styles.columnNameInput} value={columnName} onChange={changeColumnName}/>
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

