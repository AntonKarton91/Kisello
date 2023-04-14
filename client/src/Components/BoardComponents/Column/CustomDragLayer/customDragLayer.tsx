import {useDragLayer} from "react-dnd";
import {DndTypes} from "../../../../DND/types";
import {DndCardPreview} from "../../DndCardPreview/dndCardPreview.component";
import * as React from "react";


export const CustomDragLayer = () => {
    const {item, itemType, isDragging, currentOffset} = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }))
    function renderItem() {
        switch (itemType) {
            case DndTypes.CARD:
                return <DndCardPreview item={item}/>
            default:
                return null
        }
    }

    if (!isDragging) {
        return null
    }

    return (
        <div style={{
            position: "fixed",
            pointerEvents: "none",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            zIndex: "1000"
        }}>
            <div style={{
                position: "absolute",
                top: currentOffset?.y,
                left: currentOffset?.x
            }}>
                {renderItem()}
            </div>
        </div>
    )
}