import React from "react";
import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { HeadDown } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

const CreateConfigTitle = () => {
  const { mobile } = useMediaQueries();
  const titleStyles = {
    fontWeight: "800",
    fontFamily: "Exo",

    ...(mobile && { fontSize: "32px" }),
  };
  return (
    <PictureTitle
      title="Create config file"
      image={<HeadDown />}
      titleStyles={titleStyles}
    />
  );
};

export default CreateConfigTitle;
