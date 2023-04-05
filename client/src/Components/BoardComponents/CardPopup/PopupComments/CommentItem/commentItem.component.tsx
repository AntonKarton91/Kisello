import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import styles from "./commentItem.module.scss"
import {IComment} from "../../../../../models/models";
import {useAppDispatch, useAppSelector} from "../../../../../Store/hooks";
import {ImageComponent} from "../../../../../UIComponents";
import {AvatarPlaceholderComponent} from "../../../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";
import {IBoardUser} from "../../../../../Store/Reducers/board/types";
import {monthArray, monthArray1} from "../../../../../utils/monthArray";
import {sendDeleteComment} from "../../../../../Store/Reducers/comment/commentSlice";



export interface CommentItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    commentData: IComment
}


export const CommentItemComponent = ({commentData}: CommentItemProps): React.ReactElement => {
    const { users } = useAppSelector(state => state.board)
    const dispatch = useAppDispatch()
    const [createdAt] = useState(() => {
                                            const date = new Date(commentData.createdAt)
                                            const day = date.getDate()
                                            const hours = date.getHours()
                                            const minutes = date.getMinutes()
                                            const month = monthArray[date.getMonth()].slice(0, 3)
                                            return `${day} ${month} в ${hours}:${minutes<10 ? 0 : ""}${minutes}`
                                        })

    const deleteHandler = () => {
        dispatch(sendDeleteComment(commentData._id))
    }

    const [user] = useState(()=>{
        const user = users.find(u => u._id === commentData.userId)
        if (user) return user
        else return {} as IBoardUser
    })

    return (
        <div className={styles.container}>
            <div className={styles.ava}>
                {
                    user.avatar
                        ? <ImageComponent
                            height={35}
                            width={35}
                            circle
                            src={user.avatar}
                            key={commentData._id} description={`${user.surname} ${user.name}`}
                        />
                        : <AvatarPlaceholderComponent circle size={35}
                                                      title={user.name ? user.name : ""}
                                                      fontSize={18}/>
                }
            </div>
            <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.name}>{user.name} {user.surname}</div>
                    <div className={styles.date}>{createdAt || ""}</div>
                </div>
                <div className={styles.comment}>
                    {commentData.body}
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerButton} onClick={deleteHandler}>Удалить</div>
                </div>
            </div>
        </div>
    )
};

