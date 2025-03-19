import React, { useState, useEffect } from "react";
import { InfoBox } from "@site/src/components/Molecules/InsideChart/Info";
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import { InfoBoxLoadingSkeleton } from "@site/src/components/Atoms/InfoBoxLoadingSkeleton";
import { TextFormatOutputType } from "@site/src/utils/textFormat";

interface InfoItem {
  title: string;
  value: string;
}

interface ConfiguredInfoBoxProps {
  infoItems: Array<{ title: string; value: TextFormatOutputType }>;
  isLoading?: boolean;
}

const ConfiguredInfoBox: React.FC<ConfiguredInfoBoxProps> = ({
  infoItems,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % infoItems.length);
    }, 3000); // Change item every 3 seconds

    return () => clearInterval(interval);
  }, [infoItems.length]);

  return (
    <InfoBox
      dir="hor"
      isLoading={isLoading}
      items={[infoItems[currentIndex]]}
      loadingComponent={
        <InfoBoxLoadingSkeleton loadingPlaceholder={<LoadingPlaceholder />} />
      }
      applyFullWidthBorder={true}
      context="mapChart"
    />
  );
};

export default ConfiguredInfoBox;
