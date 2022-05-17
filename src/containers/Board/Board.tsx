import DefaultLayout from "components/DefaultLayout";
import React, { FunctionComponent } from "react";
import BoardPage from "components/BoardPage";

interface IBoardPageProps {
}

const Board: FunctionComponent<IBoardPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <BoardPage />
    </DefaultLayout>
  );
};

export default Board;
