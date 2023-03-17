import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface LeftMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    openMenuHandler: ()=>void
    isOpen: boolean
}