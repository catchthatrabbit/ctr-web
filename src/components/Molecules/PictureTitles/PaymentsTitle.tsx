import React from "react";
import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { HeadAndNeckHandAbove } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

const PaymentsTitle = () => {
  const { mobile } = useMediaQueries();

  const titleStyles = {
    fontWeight: "800",
    fontFamily: "Exo",
    marginTop: "8px",
    ...(mobile && { fontSize: "var(--large-font-size)" }),
  };
  return (
    <PictureTitle
      title="Payments"
      image={<HeadAndNeckHandAbove />}
      titleStyles={titleStyles}
    />
  );
};

export default PaymentsTitle;
