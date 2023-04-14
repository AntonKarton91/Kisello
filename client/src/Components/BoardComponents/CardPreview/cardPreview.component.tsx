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
import {sendDNDCard} from "../../../Store/Reducers/board/boardSlice";
import {removeDnd, updateDnd} from "../../../Store/Reducers/dnd/dndSlice";
import {getEmptyImage} from "react-dnd-html5-backend";
import {CardPreviewParts} from "./CardPreviewParts/cardPreviewParts";
import {useCardDrag} from "../../../DND/hooks";


export const CardPreview = ({
                                id,
                                column,
                                data,
                                openCard,
                                closeCard,
                                openedCard,
                                columnData,
                                isDrag,
                                dragChecking
                            }: CardPreviewProps): React.ReactElement => {
    const [isOpenAllow, setIsOpenAllow] = useState(true)
    const cardRef = useRef<HTMLDivElement>(null)
    const pre = useRef<HTMLDivElement>(null)
    const post = useRef<HTMLDivElement>(null)
    const {cardTags, users} = useAppSelector(state => state.board)
    const {cardFrom} = useAppSelector(state => state.dnd)
    const dispatch = useAppDispatch()
    // @ts-ignore
    const [{isDragging}, drag, preview] = useCardDrag(DndTypes.CARD, {cardFrom: id, columnFrom: columnData})


    useEffect(() => {
        dragChecking(isDragging)
    }, [isDragging])

    useEffect(() => {
        preview(getEmptyImage(),)
    }, [])

    useEffect(() => {
        if (isDragging && cardRef.current) {
            dispatch(updateDnd({cardFrom: data._id, columnFrom: columnData._id}))
        }
    }, [isDragging])

    const [{isOverCard}, drop] = useDrop(() => ({
        accept: DndTypes.CARD,
        collect: (monitor) => ({
            isOverCard: monitor.isOver(),
        }),
        drop: (item, monitor) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect()
                const middleRect = rect.top + ((rect.bottom - rect.top) / 2)
                // @ts-ignore
                const diff = monitor.getClientOffset().y - middleRect
                dispatch(sendDNDCard({
                    item,
                    options: {type: "filled", position: diff >= 0 ? 'post' : 'prev'},
                    cardTo: id,
                    columnData: column
                }))
            }

            dispatch(removeDnd())
        },
        hover: (item, monitor) => {
            if (cardRef.current && pre.current && post.current) {
                // @ts-ignore
                if (item.cardFrom === data._id) {
                    return
                }
                const rect = cardRef.current.getBoundingClientRect()
                const middleRect = rect.top + ((rect.bottom - rect.top) / 2)
                // @ts-ignore
                const diff = monitor.getClientOffset().y - middleRect

                if (diff >= 0) {
                    post.current.style.height = "70px"
                    post.current.style.marginTop = "8px"
                    pre.current.style.height = "0"
                    pre.current.style.marginBottom = "0"

                } else {
                    pre.current.style.height = "70px"
                    post.current.style.marginTop = "0"
                    pre.current.style.marginBottom = "8px"
                    post.current.style.height = "0"
                }
            }
        },
    }))

    drag(drop(cardRef))



    useEffect(() => {
        if (cardRef.current && !isOverCard && pre.current && post.current) {
            post.current.style.height = "0"
            pre.current.style.height = "0"
            post.current.style.margin = "0"
            pre.current.style.margin = "0"

        }
    }, [isOverCard])


    const changeDescription = () => {
        setTimeout(() => setIsOpenAllow(true), 500)
    }

    const openCardHandler = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        if (cardRef.current && isOpenAllow && e.target) {
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
        {[styles.drag]: !isDrag}
    )

    return (
        <>
            <div ref={cardRef}
                 style={{
                     padding: "4px",
                     cursor: isDragging ? 'move' : "auto",
                     display: cardFrom === id ? "none" : "block",
                 }}
            >
                <div ref={pre} style={{width: "100%", backgroundColor: "#d2d0d0", borderRadius: "5px"}}></div>
                <div className={classes} onClick={e => openCardHandler(e, data._id)}>
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
                        <CardPreviewParts currentParticipants={currentParticipants}/>
                    </div>

                </div>
                <div ref={post} style={{width: "100%", backgroundColor: "#d2d0d0", borderRadius: "5px"}}></div>

            </div>
            {
                data._id === openedCard && <CardPopupComponent
                    columnData={columnData}
                    closePopup={closeCard} data={data}/>
            }
        </>
    );
};

