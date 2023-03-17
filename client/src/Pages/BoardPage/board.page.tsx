import React from 'react';
import LayoutComponent from "../../Layout/layout.component";
import {BoardContentComponent} from "../../Components/BoardComponents/BoardContent/boardContent.component";

const BoardPage = () => {
    return (
        <LayoutComponent>
            <BoardContentComponent/>
        </LayoutComponent>
    );
};

export default BoardPage;