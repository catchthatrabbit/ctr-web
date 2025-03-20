import React from 'react';
import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { RabbitMiners } from "@site/src/icons";

const MainPageSearch = ({ flexStart }) => {
  return (
    <PictureTitle image={<RabbitMiners />} flexStart={flexStart} />
  );
};

export default MainPageSearch;
