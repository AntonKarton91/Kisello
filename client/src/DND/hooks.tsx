import {useDrag, useDrop} from "react-dnd";
import {DndTypes} from "./types";

// @ts-ignore
export const useCardDrag = (type, item) => {
    // @ts-ignore
    return useDrag(() => ({
        type,
        item,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        previewOptions: {
            visible: false
        },
    }))
}


