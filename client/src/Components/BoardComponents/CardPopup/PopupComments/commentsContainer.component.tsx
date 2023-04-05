import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import styles from "./commentsContainer.module.scss"
import {CommentFormComponent} from "./CommentForm/commentForm.component";
import {ICartPrev} from "../../../../models/models";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks";
import {fetchComments} from "../../../../Store/Reducers/comment/thunks";
import ListIcon from "@mui/icons-material/List";
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import {CommentItemComponent} from "./CommentItem/commentItem.component";


export interface MainFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev
}


export const CommentsContainerComponent = ({cardData}: MainFieldProps): React.ReactElement => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(true)
    const dispatch = useAppDispatch()
    const {loading, comments} = useAppSelector(state => state.comments)

    useEffect(() => {
        dispatch(fetchComments(cardData._id))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ListIcon/>
                <div className={styles.title}>Действия</div>
                <div onClick={e => {
                }}>
                    <TextButtonComponent
                        onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                        className={styles.buttonContainer}
                        height={32}
                    >
                        {isDetailsVisible ? "Скрыть подробности" : "Показать подробности"}
                    </TextButtonComponent>
                </div>
            </div>
            <div className={styles.form}>
                <CommentFormComponent cardData={cardData}/>
            </div>
            {
                isDetailsVisible &&
                <div className={styles.list}>
                    {
                        loading
                            ? <div>Загрузка</div>
                            : [...comments]
                                .sort((a, b) => {
                                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() >= 0
                                        ? -1
                                        : 1
                                    }
                                )
                                .map(comment => <CommentItemComponent key={comment._id} commentData={comment}/>)
                    }

                </div>
            }
        </div>
    )
};

