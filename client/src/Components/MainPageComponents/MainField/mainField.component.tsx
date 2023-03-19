import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./mainField.module.scss"
import {MainLeftMenuComponent} from "../MainLeftMenu/mainLeftMenu.component";
import {MainBoardMenuComponent} from "../MainBoardMenu/mainBoardMenu.component";
import {MainProfileComponent} from "../MainProfile/mainProfile.component";

export enum TypeContent {
    Profile,
    Boards
}

export interface MainFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const MainFieldComponent = ({}: MainFieldProps): React.ReactElement => {
    const [content, setContent] = useState<TypeContent>(TypeContent.Profile)

    const changeContentType = (type: TypeContent) => {
        setContent(type)
    }

    const selectedContent = (): React.ReactElement => {
        switch (content) {
            case TypeContent.Boards: return <MainBoardMenuComponent/>
            case TypeContent.Profile: return <MainProfileComponent/>
            default: return <div></div>
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftMenu}>
                <MainLeftMenuComponent changeContent={changeContentType}/>
            </div>
            <div className={styles.content}>
                {selectedContent()}
            </div>
        </div>
    )
};

