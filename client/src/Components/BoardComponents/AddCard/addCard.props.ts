import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface AddCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    columnId: string
}