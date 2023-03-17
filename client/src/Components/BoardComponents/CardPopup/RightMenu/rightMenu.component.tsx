import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import styles from "./rightMenu.module.scss"
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";


export interface RightMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export const RightMenuComponent = ({}: RightMenuProps): React.ReactElement => {

    return (
        <div className={styles.container}>
            <TextButtonComponent width={140} height={30} className={styles.menuButton}> Архивировать </TextButtonComponent>
            <TextButtonComponent width={140} height={30} className={styles.menuButton}> Дерево задач </TextButtonComponent>
        </div>

    );
};

