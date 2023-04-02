import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./commentForm.module.scss"
import {ICartPrev} from "../../../../../models/models";


export interface CommentFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    cardData: ICartPrev
}


export const CommentFormComponent = ({cardData}: CommentFormProps): React.ReactElement => {
    return (
        <form className={styles.container}>

        </form>
    )
};

