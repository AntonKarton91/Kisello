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
            style={{backgroundImage: "url('https://images.wallpaperscraft.ru/image/single/trava_gazon_pole_891294_1920x1080.jpg')"}}
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