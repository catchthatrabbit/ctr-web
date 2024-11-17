import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { TailsAbove } from "@site/src/icons";

const BlockTitle = () => {
  return (
    <PictureTitle
      title="Pool blocks"
      titleStyles={{ marginTop: "8px" }}
      image={<TailsAbove />}
    />
  );
};

export default BlockTitle;
