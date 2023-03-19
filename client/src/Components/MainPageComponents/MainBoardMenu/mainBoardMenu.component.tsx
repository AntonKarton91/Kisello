import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./mainBoardMenu.module.scss"


export interface MainBoardMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const MainBoardMenuComponent = ({}: MainBoardMenuProps): React.ReactElement => {
    return (
        <div className={styles.container}>
            Boards
        </div>
    )
};

