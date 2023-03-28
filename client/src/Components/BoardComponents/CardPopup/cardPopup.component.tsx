import * as React from "react";
import {useEffect, useRef, useState} from "react";
import styles from "./cardPopup.module.scss"
import {CardPopupProps} from "./cardPopup.props";
import {RightMenuComponent} from "./RightMenu/rightMenu.component";
import {PopupContainerComponent} from "./PopupContainer/popupContainer.component";
import {TagsMenuComponent} from "./TagsMenu/tagsMenu.component";
import {sendCardUpdate} from "../../../Store/Reducers/board/boardSlice";
import {useAppDispatch} from "../../../Store/hooks";


export const CardPopupComponent = ({data, closePopup, columnData}: CardPopupProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>(data.title)
    const popupRef = useRef<HTMLDivElement>(null)

    const onBlurHandler = () => {
        const currentValue = title.length > 0 ? title : "Задача"
        dispatch(sendCardUpdate({cardId: data._id, data: {title: currentValue}}))
    }

    useEffect(()=> {
        setTitle(data.title)
    }, [data.title])

    return (
        <PopupContainerComponent closePopup={closePopup}>
            <div ref={popupRef} className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <input
                            type="text"
                            value={title}
                            onChange={e=>setTitle(e.target.value)} className={styles.title}
                            onBlur={()=>onBlurHandler()}
                        />
                        <div className={styles.columnName}>в листе {columnData.name || ""}</div>
                    </div>
                        <TagsMenuComponent forwardedRef={popupRef} cardData={data}/>
                </div>
                <div className={styles.rightMenu}>
                    <RightMenuComponent/>
                </div>
            </div>

        </PopupContainerComponent>
    );
};

