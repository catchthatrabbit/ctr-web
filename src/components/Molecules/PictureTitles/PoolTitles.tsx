import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { Dive } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

const PoolTitle = () => {
  const { mobile } = useMediaQueries();

  return (
    <PictureTitle
      title="Pools"
      titleStyles={{ fontWeight: "800", fontFamily: "Exo" }}
      secondaryText="We have several geo-locations to choose from:"
      secondaryTextStyle={{
        fontSize: "var(--regular-font-size)",
        marginTop: mobile ? "8px" : "0px",
      }}
    />
  );
};

export default PoolTitle;
