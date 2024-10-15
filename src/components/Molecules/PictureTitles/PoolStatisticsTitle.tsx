import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { RabbitPoolStatistics } from "@site/src/icons";

const PoolStatisticsTitle = () => {
  return (
    <PictureTitle
      title="Pool statistics"
      image={<RabbitPoolStatistics />}
      secondaryText="Core mining pool in the lotusland of Ores"
    />
  );
};

export default PoolStatisticsTitle;
