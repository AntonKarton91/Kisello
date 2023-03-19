import * as React from "react";
import styles from "./header.module.scss"
import {HeaderProps} from "./header.props";
import {Link, useLocation} from "react-router-dom";
import {ImageComponent, TextComponent} from "../../UIComponents";

const HeaderComponent = ({children}: HeaderProps): React.ReactElement => {
    const location = useLocation()
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <ImageComponent
                    src={'http://localhost:3000/images/KiselloBoard.png'}
                    height={22.08}
                    width={80}
                />
            </div>
            <div className={styles.navigation}>
                <Link to={"/"} >
                    <TextComponent color={"white"} className={styles.navItem}>Доски</TextComponent>
                </Link>
                <Link to={"/"}>
                    <TextComponent color={"white"} className={styles.navItem}>Оборудование</TextComponent>
                </Link>
            </div>
            <div className={styles.ava}>
                <ImageComponent
                    src={'http://localhost:3000/images/ava1.webp'}
                    height={40}
                    width={40}
                    circle
                />
            </div>
        </div>
    );
};

export default HeaderComponent;