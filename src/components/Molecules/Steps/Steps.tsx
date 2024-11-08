import React from "react";
import styles from "./styles.module.css"; // Ensure this import is correct
import { Text } from "@site/src/components/Atoms/Text"; // Ensure this import is correct
import { Search } from "@site/src/components/Molecules/Search";
import { DownloadPanel } from "@site/src/components/Molecules/DownloadPanel";
import { Spacer } from "@site/src/components/Atoms/Spacer"; // Ensure this import is correct
import { OpenInNew } from "@site/src/icons";

interface Step {
  number: number;
  title: string;
  text: string;
  link?: string;
  linkText?: string;
  image?: boolean;
  warning?: boolean;
  showSearch?: boolean;
}

interface StepsProps {
  steps: Step[];
}

const stepsData: Step[] = [
  {
    number: 1,
    title: "Download CorePass",
    text: "Download CorePass mobile app, wallet where you can securely store your rewards.",
    link: "#",
    linkText: "Open Corepass site",
    image: true,
  },
  {
    number: 2,
    title: "Download mining software",
    text: "CoreMiner is a RandomY CPU mining worker - with CoreMiner you can mine every coin which relies on a RandomY Proof of Work. ",
    warning: true,
    showSearch: true,
  },
  {
    number: 3,
    title: "Step 3 Title",
    text: "This is the text for step 3.",
    link: "#",
    linkText: "Learn more",
  },
];

const Steps: React.FC = () => {
  return (
    <div className={`flex flex-column ${styles.stepsContainer}`}>
      {stepsData.map((step) => (
        <div key={step.number} className={`flex flex-column ${styles.step}`}>
          <h2 className={styles.title}>
            {step.number}. &nbsp; {step.title}
          </h2>
          <Text
            size="regular"
            weight="normal"
            lineHeight="smallLineHeight"
            color="white"
            style={{ marginLeft: "29px" }}
          >
            {step.text}
          </Text>
          <Spacer variant="md" />
          {step.link && step.linkText && (
            <div>
              <a
                href={step.link}
                className={`flex items-center ${styles.linkSteps} ${styles.link}`}
              >
                <OpenInNew />
                <Text
                  size="regular"
                  color="primary"
                  weight="bold"
                  style={{ marginLeft: "8px" }}
                >
                  {step.linkText}
                </Text>
              </a>
            </div>
          )}
          <Spacer variant="md" />
          {step.warning && (
            <div className={styles.warning}>
              <Text
                variant="smallBody"
                weight="normal"
                color="white"
                lineHeight="smallLineHeight"
              >
                In case you do not own a Linux device, we recommend using the
                Linux virtual operating system.
              </Text>
            </div>
          )}
          {step.image && <DownloadPanel />}
          {step.showSearch && <Search />}
          <Spacer variant="md" />
        </div>
      ))}
    </div>
  );
};

export default Steps;
