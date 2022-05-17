import DetailBoard from "components/BoardPage/DetailBoard";
import DefaultLayout from "components/DefaultLayout";
import React, { FunctionComponent } from "react";

interface IBoardDetailPageProps {
}

const BoardDetail: FunctionComponent<IBoardDetailPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <DetailBoard />
    </DefaultLayout>
  );
};

export default BoardDetail;
