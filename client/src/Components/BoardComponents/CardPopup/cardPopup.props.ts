import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ICartPrev, IColumn} from "../../../models/models";

export interface CardPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    columnData: IColumn
    data: ICartPrev,
    closePopup: ()=>void
}