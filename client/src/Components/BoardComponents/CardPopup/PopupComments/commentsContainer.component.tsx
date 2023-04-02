import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect} from "react";
import styles from "./commentsContainer.module.scss"
import {CommentFormComponent} from "./CommentForm/commentForm.component";
import {ICartPrev} from "../../../../models/models";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks";
import {fetchComments} from "../../../../Store/Reducers/comment/thunks";


export interface MainFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev
}


export const CommentsContainerComponent = ({cardData}: MainFieldProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const { loading, comments } = useAppSelector(state => state.comments)


    useEffect(()=> {
        dispatch(fetchComments(cardData._id))
    }, [])

    return (
        <div className={styles.container}>
            <CommentFormComponent cardData={cardData}/>
            {   loading
                ? <div>Загрузка</div>
                : comments.map(comment => {
                    return (
                        <div key={comment._id}>{comment.body}</div>
                    )
                })
            }
        </div>
    )
};

