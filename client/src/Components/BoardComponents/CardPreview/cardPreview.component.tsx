import * as React from "react";
import styles from "./cardPreview.module.scss"
import {CardPreviewProps} from "./cardPreview.props";
import {CardTagComponent, ImageComponent, TooltipComponent} from "../../../UIComponents";
import {ITagList, IUser} from "../../../models/models";
import {DateTagComponent} from "../../../UIComponents/DateTag/dateTag.component";
import {useEffect, useRef, useState} from "react";
import {CardDescriptionComponent} from "./cardDescription/cardDescription.component";
import {CardPopupComponent} from "../CardPopup/cardPopup.component";
import {useAppSelector} from "../../../Store/hooks";
import {IBoardUser} from "../../../Store/Reducers/board/types";
import {AvatarPlaceholderComponent} from "../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";

export const CardPreview = ({
                                data,
                                openCard,
                                closeCard,
                                openedCard,
                                columnData
                            }: CardPreviewProps): React.ReactElement => {
    // const [stateData, setStateData] = useState(data)
    const [isOpenAllow, setIsOpenAllow] = useState(true)
    const refContainer = useRef<HTMLDivElement>(null)
    const {cardTags, users, loading} = useAppSelector(state => state.board)

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

    return (
        <>
            <div className={styles.container} onClick={e => openCardHandler(e, data._id)} ref={refContainer}>
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
        </>
    );
};

