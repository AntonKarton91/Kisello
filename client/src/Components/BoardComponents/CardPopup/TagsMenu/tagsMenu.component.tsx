import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState, forwardRef, RefObject} from "react";
import styles from "./tagsMenu.module.scss"
import {TextButtonComponent} from "../../../../UIComponents/TextButton/textButton.component";
import AddIcon from '@mui/icons-material/Add';
import {ICartPrev, ITagList} from "../../../../models/models";
import {CardTagComponent} from "../../../../UIComponents";
import {useAppSelector} from "../../../../Store/hooks";
import {PopupMenuContainerComponent} from "../PopupMenuContainer/popupMenuContainer.component";

export interface TagsMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cardData: ICartPrev
    forwardedRef: RefObject<HTMLDivElement>
}

export const TagsMenuComponent = ({cardData, forwardedRef}: TagsMenuProps): React.ReactElement => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [xCoord, setXCoord] = useState(0)
    const [menuHeight, setMenuHeight] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const {cardTags} = useAppSelector(state => state.board)

    const openMenuHandler = () => {

        // @ts-ignore
        if (ref.current && forwardedRef.current) {
            setXCoord(ref.current.getBoundingClientRect().x-50)
            // @ts-ignore
            setMenuHeight(forwardedRef.current.getBoundingClientRect().height)
            console.log(forwardedRef.current)
        }
        setMenuIsOpen(true)
    }

    const currentTagList = (): ITagList[] => {
        return cardTags.filter(tag => {
            return cardData.tagList.includes(tag._id)
        })
            .sort((a, b) => {
                return b.title.length - a.title.length
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Метки</div>
            <div className={styles.list}>

                {
                    currentTagList()
                        .map(tag => {
                            return (
                                <CardTagComponent
                                    key={tag._id}
                                    id={tag._id}
                                    title={tag.title}
                                    color={tag.color}
                                />
                            )
                        })
                }
                    <div ref={ref} >
                        <TextButtonComponent className={styles.buttonContainer} onClick={()=>openMenuHandler()}>
                            <AddIcon classes={{root: styles.addIcon}}/>
                        </TextButtonComponent>
                    </div>
            </div>
            {
                menuIsOpen &&
                    <PopupMenuContainerComponent
                        title={"Метки"}
                        addButtonRef={ref}
                    >
                        <div>Menu</div>
                    </PopupMenuContainerComponent>
            }
        </div>
    );
};

