import * as React from "react";
import styles from "./cardPreview.module.scss"
import {CardPreviewProps} from "./cardPreview.props";
import {CardTagComponent, ImageComponent, TooltipComponent} from "../../../UIComponents";
import {IColumn, ITagList, IUser} from "../../../models/models";
import {DateTagComponent} from "../../../UIComponents/DateTag/dateTag.component";
import {useEffect, useRef, useState} from "react";
import {CardDescriptionComponent} from "./cardDescription/cardDescription.component";
import {CardPopupComponent} from "../CardPopup/cardPopup.component";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {IBoardUser} from "../../../Store/Reducers/board/types";
import {AvatarPlaceholderComponent} from "../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";
import {useDrag, useDragDropManager, useDrop} from "react-dnd";
import {DndTypes} from "../../../DND/types";
import cn from "classnames";
import {DNDCard, sendDNDCard} from "../../../Store/Reducers/board/boardSlice";


export const CardPreview = ({
                                data,
                                openCard,
                                closeCard,
                                openedCard,
                                columnData
                            }: CardPreviewProps): React.ReactElement => {
    const [isOpenAllow, setIsOpenAllow] = useState(true)
    const refContainer = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const {cardTags, users, columns} = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        console.log(columnData.cardList)
    }, [columnData])

    const [{isDragging}, drag] = useDrag(() => ({
        type: DndTypes.CARD,
        item: {cardFrom: data._id, columnFrom: columnData},
        collect: monitor => ({
            isDragging: monitor.isDragging(),

        }),

    }))

    const [{isOverCard}, drop] = useDrop(() => ({
        accept: DndTypes.CARD,
        collect: (monitor) => ({
            isOverCard: monitor.isOver(),
        }),

        drop: (item, monitor) => {

            // @ts-ignore
            // console.log(item.columnFrom.cardList)
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect()
                const middleRect = rect.top + ((rect.bottom - rect.top) / 2)
                // @ts-ignore
                const diff = monitor.getClientOffset().y - middleRect
                // dropToColumn(item, diff >= 0 ? 'post' : 'prev')
                dispatch(sendDNDCard({item, option: diff >= 0 ? 'post' : 'prev', data, columnData}))



            }
        },

        hover: (item, monitor) => {
            // @ts-ignore
            if (cardRef.current) {
                // @ts-ignore
                if (item.cardFrom === data._id) {
                    return
                }
                const rect = cardRef.current.getBoundingClientRect()
                const middleRect = rect.top + ((rect.bottom - rect.top) / 2)
                // @ts-ignore
                const diff = monitor.getClientOffset().y - middleRect


                if (diff >= 0) {
                    cardRef.current.style.paddingTop = '0'
                    cardRef.current.style.paddingBottom = `70px`

                } else {
                    cardRef.current.style.paddingBottom = '0'
                    cardRef.current.style.paddingTop = '70px'
                }
            }
        },

    }))
    drag(drop(cardRef))


    function dropToColumn (item, option) {
        console.log(" ")
        console.log(columns.find(c=>c._id===item.columnFrom._id)?.cardList)
        const cardsFrom = {...item}.columnFrom.cardList.filter(c=>c !== item.cardFrom)
        // console.log(item.cardFrom, data._id);
        let newState = columns.map(c=>{
            if (c._id === item.columnFrom._id) {
                return {...c, cardList: cardsFrom}
            } else return c
        })
        const newSState = newState.map(c=> {
            if (c._id !== columnData._id) return c
            else {
                const index = c.cardList.indexOf(data._id)
                const newCards = [...c.cardList]
                if (option === "prev") {
                    newCards.splice(index, 0, item.cardFrom)
                } else newCards.splice(index+1, 0, item.cardFrom)
                return {...c, cardList: newCards}
            }
        })
        dispatch(sendDNDCard(newSState))

    }


    useEffect(() => {
        if (cardRef.current && !isOverCard) {
            cardRef.current.style.paddingBottom = '0'
            cardRef.current.style.paddingTop = '0'
        }
    }, [isOverCard])

    const changeDescription = () => {
        setTimeout(() => setIsOpenAllow(true), 500)
    }

    const openCardHandler = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        if (refContainer.current && isOpenAllow && e.target) {
            // @ts-ignore
            if (!e.target.closest("#menu-button") && !e.target.closest("#input-descr") && !e.target.closest("#date-tag")) {
                openCard(id)
            }
        }
    }


    const currentTagList = (): ITagList[] => {
        return cardTags.filter(tag => {
            return data.tagList.includes(tag._id)
        })
            .sort((a, b) => {
                return b.title.length - a.title.length
            })
    }

    const currentParticipants = () => {
        return users.filter(user => {
            return data.participants.includes(user._id)
        })
    }

    const classes = cn(
        styles.container,
        {[styles.drag]: !isDragging}
    )

    return (
        <div ref={cardRef} style={{display: isDragging ? "none" : "block", transition: "0.2s all"}}>
            <div
                className={classes}
                onClick={e => openCardHandler(e, data._id)}
            >
                {
                    currentTagList().length > 0 && <div className={styles.tagsContainer}>
                        {
                            currentTagList()
                                .map(tag => {
                                    return (
                                        <CardTagComponent
                                            key={tag._id}
                                            id={tag._id}
                                            title={tag.title}
                                            color={tag.color}
                                        />
                                    )
                                })
                        }
                    </div>
                }
                <div>{data._id}</div>

                <div className={styles.description}>
                    <CardDescriptionComponent
                        cardId={data._id}
                        restrictOpen={() => setIsOpenAllow(false)}
                        valueProp={data.title}
                        changeValue={changeDescription}
                    />
                </div>

                <div className={styles.partsDateContainer}>
                    <div className={styles.date} id={"date-tag"}>
                        <DateTagComponent
                            isDone={data.completed}
                            selectDate={data.date}
                            cardId={data._id}
                        />
                    </div>
                    <div className={styles.parts}>
                        {
                            (currentParticipants() || [] as IBoardUser[])
                                .map((user, index, array) => {
                                    const gap = index !== 0 ? -array.length * 2 : 0
                                    return (
                                        <TooltipComponent
                                            key={`${user.surname} ${index}`}
                                            description={`${user.surname} ${user.name}`}
                                        >
                                            {
                                                user.avatar
                                                    ? <ImageComponent
                                                        style={{marginLeft: gap + "px"}}
                                                        height={30}
                                                        width={30}
                                                        circle
                                                        src={user.avatar}
                                                        key={user._id} description={`${user.surname} ${user.name}`}
                                                    />
                                                    : <AvatarPlaceholderComponent circle size={30}
                                                                                  title={user.name ? user.name : ""}
                                                                                  fontSize={20}/>
                                            }

                                        </TooltipComponent>
                                    )
                                })
                        }
                    </div>
                </div>

            </div>
            {data._id === openedCard && <CardPopupComponent
                columnData={columnData}
                closePopup={closeCard} data={data}/>}
        </div>
    );
};

