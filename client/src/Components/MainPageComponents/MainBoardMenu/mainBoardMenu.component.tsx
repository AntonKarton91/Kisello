import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import styles from "./mainBoardMenu.module.scss"
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import axios from "axios";
import {IBoardList} from "../../../Store/Reducers/board/types";
import {Link} from "react-router-dom";


export interface MainBoardMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const MainBoardMenuComponent = ({}: MainBoardMenuProps): React.ReactElement => {
    const [boardList, setBoardList] = useState<IBoardList[]>([])
    const { id, boards } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        const getBoardList = async () => {
            const {data} = await axios.post("http://localhost:5000/board/fetchboardlist", {userId: id})
            setBoardList(data)
        }
        getBoardList()

    }, [])

    return (
        <div className={styles.container}>
            {
                !!boardList && boardList.map(board => {
                    return <Link to={`/board/${board._id}`}><div>{board.title}</div></Link>
                })
            }
        </div>
    )
};

