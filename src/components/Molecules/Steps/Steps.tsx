import React from "react";
import styles from "./styles.module.css"; // Ensure this import is correct
import { Text } from "@site/src/components/Atoms/Text"; // Ensure this import is correct
import { Search } from "@site/src/components/Molecules/Search";
import { DownloadPanel } from "@site/src/components/Molecules/DownloadPanel";
import { Spacer } from "@site/src/components/Atoms/Spacer"; // Ensure this import is correct
import { OpenInNew } from "@site/src/icons";
import Button from "@site/src/components/Atoms/Button/Button"; // Ensure this import is correct
import { useWalletPage } from "@site/src/hooks/useWallet";

interface Step {
  number: number;
  title: string;
  text: string;
  link?: string;
  linkText?: string;
  image?: boolean;
  button?: string;
  buttonTitle?: string;
  warning?: boolean;
  showSearch?: boolean;
}

interface StepsProps {
  steps: Step[];
  onSetWalletAddress: (address: string) => void;
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
    button: "Download CoreMiner",
    buttonTitle: "CoreMiner for Linux",
    link: "#",
    linkText: "Auto-instal script (docusaurus)",
  },
  {
    number: 3,
    title: "Create configuration file",
    text: "It's time to configure the miner so that everything works as it should. ",
    button: "Create config file",
    link: "#",
    linkText: "Open configuration manual (github)",
  },
  {
    number: 4,
    title: "View your dashboard",
    text: "When it’s all ready, all you need to do is view your rewards and stats at the dashboard. Type your address below.",
    showSearch: true,
  },
];
const Steps: React.FC<StepsProps> = ({ onSetWalletAddress }) => {
  return (
    <div className={`flex flex-column ${styles.stepsContainer}`}>
      {stepsData.map((step) => (
        <div key={step.number} className={`flex flex-column ${styles.step}`}>
          <h2 className={styles.title}>
            {step.number}.&nbsp;{step.title}
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
          {step.warning && (
            <>
              <Spacer variant="md" />
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
            </>
          )}

          {step.link && step.linkText && (
            <>
              {!step.buttonTitle && <Spacer variant="xxs" />}
              <div className={`flex ${styles.buttonLinkContainer}`}>
                {step.button && (
                  <>
                    {step.buttonTitle && <Spacer variant="lg" />}
                    <div className={styles.button}>
                      {step.buttonTitle ? (
                        <Text
                          variant="heading3"
                          weight="semiBold"
                          color="white"
                        >
                          {step.buttonTitle}
                        </Text>
                      ) : (
                        <Spacer variant="sm" />
                      )}
                      <Spacer variant="xs" />
                      <Button
                        backgroundColor="#062A1C"
                        textColor="#16C784"
                        value={step.button}
                      />
                    </div>
                    <Spacer direction="hor" variant="xs" />
                  </>
                )}

                <div className={styles.linkContainer}>
                  {step.button && <Spacer variant="xl" />}
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
                <Spacer variant="xxs" />
              </div>
            </>
          )}

          {step.image && (
            <>
              <Spacer variant="md" />
              <DownloadPanel />
            </>
          )}
          {step.showSearch && (
            <>
              <Spacer variant="lg" />
              <Search context="startMining" onSearch={onSetWalletAddress} />
            </>
          )}
          <Spacer variant="md" />
        </div>
      ))}
    </div>
  );
};

export default Steps;
