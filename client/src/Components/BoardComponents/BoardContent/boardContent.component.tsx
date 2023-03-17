import * as React from "react";
import styles from "./boardContent.module.scss"
import {BoardContentProps} from "./boardContent.props";
import {LeftMenuComponent} from "../LeftMenu/leftMenu.component";
import {useState} from "react";
import cn from "classnames"
import {BoardFieldComponent} from "../BoardField/boardField.component";

export const BoardContentComponent = ({}: BoardContentProps): React.ReactElement => {
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)

    const openCloseMenu = ():void => {
        setIsLeftMenuOpen(prevState => {
            return !prevState
        })
    }


    return (
        <div className={cn(styles.container, {[styles.open]: isLeftMenuOpen})}>
            <LeftMenuComponent
                className={styles.leftMenu}
                openMenuHandler={openCloseMenu}
                isOpen={isLeftMenuOpen}
            />
            <div className={styles.field}>
                <BoardFieldComponent/>
            </div>
        </div>
    );
};

