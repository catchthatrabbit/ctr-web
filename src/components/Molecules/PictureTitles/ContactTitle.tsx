import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { Ears } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

const ContactTitle = () => {
  const { mobile } = useMediaQueries();
  const titleStyles = {
    fontWeight: "800",
    fontFamily: "Exo",

    ...(mobile && { fontSize: "32px", marginTop: "8px" }),
  };
  return (
    <PictureTitle title="Contact" image={<Ears />} titleStyles={titleStyles} />
  );
};

export default ContactTitle;
