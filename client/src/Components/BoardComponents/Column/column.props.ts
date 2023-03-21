import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IColumn} from "../../../models/models";
import {Socket} from "socket.io-client";

export interface ColumnProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    columnData: IColumn
    socket: Socket
}