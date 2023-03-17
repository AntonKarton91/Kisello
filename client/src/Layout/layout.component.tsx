import * as React from "react";
import styles from "./layout.module.scss"
import {HeaderProps} from "./layout.props";
import {useLocation} from "react-router-dom";
import HeaderComponent from "./Header/header.component";

const LayoutComponent = ({children}: HeaderProps): React.ReactElement => {
    const location = useLocation()
    return (
        <div
            className={styles.container}
            style={{backgroundImage: "url('http://localhost:3000/images/snegovik.jpg')"}}
        >
            <div className={styles.header}>
                <HeaderComponent/>
            </div>
            <div className={styles.content} >
                {children}
            </div>
        </div>
    );
};

export default LayoutComponent;