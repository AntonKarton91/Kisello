import * as React from "react";
import styles from "./leftMenu.module.scss"
import {LeftMenuProps} from "./leftMenu.props";
import {ImageComponent} from "../../../UIComponents";

export const LeftMenuComponent = ({openMenuHandler, isOpen}: LeftMenuProps): React.ReactElement => {


    const arrow = isOpen
        ? 'http://localhost:3000/images/arrow_back.svg'
        : 'http://localhost:3000/images/arrow_forward.svg'



    return (
        <div className={styles.container} >
            <div className={styles.openCloseIcon} onClick={openMenuHandler}>
                <ImageComponent height={10} width={10} src={arrow}/>
            </div>
            {isOpen &&
                <div>
                    LeftMenu
                </div>
            }
        </div>
    );
};

