import styles from "./cardPreviewParts.module.scss";
import {IBoardUser} from "../../../../Store/Reducers/board/types";
import {ImageComponent, TooltipComponent} from "../../../../UIComponents";
import {AvatarPlaceholderComponent} from "../../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";
import * as React from "react";

export const CardPreviewParts = ({currentParticipants}) => {

    return (
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
    )
}
