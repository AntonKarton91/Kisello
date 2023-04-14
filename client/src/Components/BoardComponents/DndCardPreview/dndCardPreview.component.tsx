import * as React from "react";
import styles from "./cardPreview.module.scss"
import {CardTagComponent, ImageComponent, TooltipComponent} from "../../../UIComponents";
import {ICartPrev, IColumn, ITagList, IUser} from "../../../models/models";
import {DateTagComponent} from "../../../UIComponents/DateTag/dateTag.component";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {IBoardUser} from "../../../Store/Reducers/board/types";
import {AvatarPlaceholderComponent} from "../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";
import {CardPreviewParts} from "../CardPreview/CardPreviewParts/cardPreviewParts";


export interface DndCardPreviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: {cardFrom: string, columnFrom: IColumn} | undefined
}


export const DndCardPreview = ({item}: DndCardPreviewProps): React.ReactElement => {
    const {cardList, cardTags, users} = useAppSelector(state => state.board)
    const [card] = useState(() => {
            const card = cardList.find(c => c._id === item?.cardFrom)
            return card ? card : {} as ICartPrev
    })



    const currentTagList = (): ITagList[] => {
        return cardTags.filter(tag => {
            return card.tagList.includes(tag._id)
        })
            .sort((a, b) => {
                return b.title.length - a.title.length
            })
    }

    const currentParticipants = () => {
        return users.filter(user => {
            return card.participants.includes(user._id)
        })
    }

    return (
       <div className={styles.container}>
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
                    {card.title}
                </div>

                <div className={styles.partsDateContainer}>
                    <div className={styles.date} id={"date-tag"}>
                        <DateTagComponent
                            isDone={card.completed}
                            selectDate={card.date}
                            cardId={card._id}
                        />
                    </div>


                    <CardPreviewParts currentParticipants={currentParticipants}/>
                </div>

            </div>
    );
};

