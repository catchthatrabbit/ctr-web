import React from "react";
import styles from "./styles.module.css";
import { Text } from "@site/src/components/Atoms/Text";
import { Search } from "@site/src/components/Molecules/Search";
import { Warning } from "@site/src/components/Atoms/Warning";
import { DownloadPanel } from "@site/src/components/Molecules/DownloadPanel";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { OpenInNew } from "@site/src/icons";
import Button from "@site/src/components/Atoms/Button/Button";
import { useWalletPage } from "@site/src/hooks/useWallet";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import { Link } from "react-router-dom";

import clsx from "clsx";

interface Step {
  number: number;
  title: string;
  text: string;
  link?: string;
  linkText?: string;
  image?: boolean;
  button?: string;
  buttonTitle?: string;
  buttonLink?: string; // Add buttonLink property
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
    link: "https://corepass.net/",
    linkText: "Open Corepass site",
    image: true,
  },
  {
    number: 2,
    title: "Download mining software",
    text: "CoreMiner is a RandomY CPU mining worker - with CoreMiner you can mine every coin which relies on a RandomY Proof of Work.",
    warning: true,
    button: "Download CoreMiner",
    buttonTitle: "CoreMiner for Linux",
    link: "#",
    linkText: "Auto-instal script (docusaurus)",
  },
  {
    number: 3,
    title: "Create configuration file",
    text: "It's time to configure the miner so that everything works as it should.",
    button: "Create config file",
    buttonLink: "/create-config",
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
  const { mobile, tablet, desktop } = useMediaQueries();
  return (
    <div className={`flex flex-column ${styles.stepsContainer}`}>
      {stepsData.map((step, index) => (
        <div
          key={step.number}
          className={`flex flex-column ${styles.step} ${mobile ? styles.mobileStep : ""}
         ${index === stepsData.length - 1 ? styles.lastStep : ""}
        `}
        >
          <h2 className={clsx(styles.title, { [styles.mobileTitle]: mobile })}>
            {step.number}.&nbsp;&nbsp;{step.title}
          </h2>
          <Text
            variant={desktop ? "heading3" : "body"}
            weight="normal"
            color="white"
            style={{
              marginLeft: "33px",
              lineHeight: "var(--small-line-height)",
            }}
          >
            {step.text}
          </Text>
          {step.warning && (
            <>
              <Spacer variant="md" />
              <Warning
                text="In case you do not own a Linux device, we recommend using the
                  Linux virtual operating system."
              />
            </>
          )}

          {step.link && step.linkText && (
            <>
              {!step.buttonTitle && <Spacer variant="xxs" />}
              <div className={`flex ${styles.buttonLinkContainer}`}>
                {step.button && (
                  <>
                    {step.buttonTitle && (
                      <Spacer variant={desktop ? "lg" : "sm"} />
                    )}
                    <div className={styles.button}>
                      {step.buttonTitle ? (
                        <Text
                          variant="heading3"
                          weight="semiBold"
                          color="white"
                          disableMobileStyles
                        >
                          {step.buttonTitle}
                        </Text>
                      ) : (
                        <>{desktop ? <Spacer variant="sm" /> : null}</>
                      )}
                      <Spacer variant="xs" />
                      {step.buttonLink ? (
                        <Link to={step.buttonLink}>
                          <Button
                            backgroundColor="#062A1C"
                            textColor="#16C784"
                            value={step.button}
                          />
                        </Link>
                      ) : (
                        <Button
                          backgroundColor="#062A1C"
                          textColor="#16C784"
                          value={step.button}
                        />
                      )}
                    </div>
                    <Spacer direction="hor" variant="xs" />
                  </>
                )}

                <div className={styles.linkContainer}>
                  {step.button && <Spacer variant={desktop ? "xl" : "sm"} />}
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center ${styles.linkSteps} ${styles.link}`}
                  >
                    <OpenInNew />
                    <Text
                      size="regular"
                      color="primary"
                      weight="bold"
                      style={{ marginLeft: "8px" }}
                      disableMobileStyles
                    >
                      {step.linkText}
                    </Text>
                  </a>
                </div>
                {desktop ? <Spacer variant="xxs" /> : <Spacer variant="xs" />}
              </div>
            </>
          )}

          {step.image && (
            <>
              {desktop ? <Spacer variant="md" /> : <Spacer variant="xs" />}
              <DownloadPanel />
              {desktop ? null : <Spacer variant="md" />}
            </>
          )}
          {step.showSearch && (
            <>
              {desktop ? <Spacer variant="lg" /> : <Spacer variant="md" />}
              <Search context="startMining" onSearch={onSetWalletAddress} />
            </>
          )}
          {desktop ? <Spacer variant="md" /> : <Spacer variant="xxs" />}
        </div>
      ))}
    </div>
  );
};

export default Steps;
