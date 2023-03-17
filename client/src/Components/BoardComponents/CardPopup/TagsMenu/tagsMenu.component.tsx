import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import styles from "./tagsMenu.module.scss"
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import AddIcon from '@mui/icons-material/Add';

export interface TagsMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardId: string
}

export const TagsMenuComponent = ({cardId}: TagsMenuProps): React.ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

    const closeHandler = (e: React.MouseEvent<HTMLDivElement>) => {

    }

    return (
        <div className={styles.container}>
            <div ref={ref} >
                <TextButtonComponent className={styles.buttonContainer}>
                    <AddIcon classes={{root: styles.addIcon}}/>
                </TextButtonComponent>
            </div>
        </div>
    );
};

