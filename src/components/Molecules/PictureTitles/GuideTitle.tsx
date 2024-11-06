import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";

const GuideTitle = () => {
  return (
    <PictureTitle
      title="How to start mining"
      titleStyles={{ fontWeight: "800", fontFamily: "Exo" }}
      secondaryText="Step by step guide to mine your first XCB."
      secondaryTextStyle={{ fontSize: "var(--regular-font-size)" }}
    />
  );
};

export default GuideTitle;
