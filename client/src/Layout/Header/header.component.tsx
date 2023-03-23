import * as React from "react";
import styles from "./header.module.scss"
import {HeaderProps} from "./header.props";
import {Link, useLocation} from "react-router-dom";
import {ImageComponent, TextComponent} from "../../UIComponents";
import {useAppSelector} from "../../Store/hooks";
import {AvatarPlaceholderComponent} from "../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";

const HeaderComponent = ({children}: HeaderProps): React.ReactElement => {
    const {name, surname, email, avatar, } = useAppSelector(state => state.user)
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
                <Link to={"/"}>
                    <TextComponent color={"white"} className={styles.navItem}>Доски</TextComponent>
                </Link>
                <Link to={"/"}>
                    <TextComponent color={"white"} className={styles.navItem}>Оборудование</TextComponent>
                </Link>
            </div>
            <Link to={{pathname: "/"}} className={styles.ava}>
                {
                    avatar
                        ? <ImageComponent width={40} height={40} circle src={avatar}/>
                        : <AvatarPlaceholderComponent circle size={40} title={name ? name : ""} fontSize={20}/>
                }
            </Link>
        </div>
    );
};

export default HeaderComponent;