import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { Dive } from "@site/src/icons";

const PoolTitle = () => {
  return (
    <PictureTitle
      title="Pools"
      titleStyles={{ fontWeight: "800", fontFamily: "Exo" }}
      secondaryText="We have several geo-locations to choose from:"
      secondaryTextStyle={{
        fontSize: "var(--regular-font-size)",
        marginTop: "0px",
      }}
    />
  );
};

export default PoolTitle;
