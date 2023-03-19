import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./mainLeftMenu.module.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {ImageComponent} from "../../../UIComponents";
import {TypeContent} from "../MainField/mainField.component";


export interface MainLeftMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    changeContent: (type: TypeContent)=>void
}


export const MainLeftMenuComponent = ({changeContent}: MainLeftMenuProps): React.ReactElement => {

    return (
        <div className={styles.container}>
            <div style={{marginBottom: "10px"}}>
                <ImageComponent src={'http://localhost:3000/images/Kisello.png'} width={100}/>
            </div>
            <div className={styles.menuItem} onClick={()=>changeContent(TypeContent.Profile)}>
                <AccountBoxIcon/>
                <div>Профиль</div>
            </div>
            <div className={styles.menuItem} onClick={()=>changeContent(TypeContent.Boards)}>
                <DashboardIcon/>
                <div>Доски</div>
            </div>
        </div>
    )
};

