import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./mainField.module.scss"


export interface MainFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const MainFieldComponent = ({}: MainFieldProps): React.ReactElement => {
    return (
        <div className={styles.container}>

        </div>
    )
};

