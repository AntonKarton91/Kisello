import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ICartPrev, IColumn} from "../../../models/models";

export interface CardPreviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    columnData: IColumn
    data: ICartPrev
    openCard: (cardId: string) => void
    closeCard: () => void
    dragChecking: (isDragging: boolean) => void
    isDrag: boolean
    openedCard: string
    column: string
}