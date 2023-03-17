import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IColumn} from "../../../models/models";

export interface ColumnProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    columnData: IColumn
}