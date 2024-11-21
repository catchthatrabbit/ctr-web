import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { HeadAbove } from "@site/src/icons";

const MinersTitle = () => {
  return (
    <PictureTitle
      title="Miners"
      titleStyles={{ marginTop: "15px" }}
      image={<HeadAbove />}
    />
  );
};

export default MinersTitle;
