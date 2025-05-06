import React from 'react';
import styles from './styles.module.css';
import { Text } from '@site/src/components/Atoms/Text';
import { Search } from '@site/src/components/Molecules/Search';
import { DownloadPanel } from '@site/src/components/Molecules/DownloadPanel';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { OpenInNew } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';
import clsx from 'clsx';
import config from '@site/docusaurus.config';
import { getRepoUrl } from '@site/src/utils/getRepoUrl';

interface Step {
  number: number;
  title: string;
  text: string;
  link?: string;
  linkText?: string;
  image?: boolean;
  button?: string;
  buttonTitle?: string;
  buttonLink?: string;
  warning?: boolean;
  showSearch?: boolean;
}

interface StepsProps {
  steps?: Step[];
  onSetWalletAddress: (address: string) => void;
}

const stepsData: Step[] = [
  {
    number: 1,
    title: 'Download CorePass',
    text: 'Download CorePass mobile app, a wallet where you can securely store your rewards.',
    link: 'https://corepass.net',
    linkText: 'Open CorePass website',
    image: true,
  },
  {
    number: 2,
    title: 'Choose a mining software',
    text: 'CoreMiner is a RandomY CPU mining worker - with CoreMiner you can mine any coin that relies on a RandomY Proof of Work. You can choose any other mining software if you prefer.',
    button: 'Download CoreMiner',
    buttonTitle: 'CoreMiner for Linux',
    buttonLink: `${getRepoUrl(config, 'coreminer')}/releases`,
    link: `${getRepoUrl(config, 'coreminer')}?tab=readme-ov-file#automatic-installation`,
    linkText: 'Automatic installation script',
  },
  {
    number: 3,
    title: 'Create configuration file',
    text: 'Configure the miner for your wallet address (Core ID) and preferred pools.',
    button: 'Create config file',
    buttonLink: '/go-live',
    link: `${getRepoUrl(config, 'coreminer')}?tab=readme-ov-file#config-file`,
    linkText: 'Open configuration manual',
  },
  {
    number: 4,
    title: 'View your dashboard',
    text: 'When everything is ready, you can view your rewards and stats on the dashboard. Enter your address below.',
    showSearch: true,
  },
];

const Steps: React.FC<StepsProps> = ({ onSetWalletAddress }) => {
  const { mobile, desktop } = useMediaQueries();

  const renderButtonAndLink = (step: Step) => (
    <div className={`flex ${styles.buttonLinkContainer}`}>
      {step.button && (
        <>
          <div className={styles.button} style={{ textAlign: 'center' }}>
            {step.buttonLink ? (
              <a
                href={step.buttonLink}
                target="_blank"
                className="button"
                rel="noopener"
              >
                {step.button}
              </a>
            ) : (
              <span>{step.button}</span>
            )}
            {step.buttonTitle && (
              <>
                <Spacer variant="xxs" />
                <Text
                  variant="heading3"
                  color="white"
                  disableMobileStyles
                >
                  {step.buttonTitle}
                </Text>
              </>
            )}
          </div>
          <Spacer direction="hor" variant="xs" />
        </>
      )}
      <div className={styles.linkContainer}>
        <a
          href={step.link}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center ${styles.linkSteps} ${styles.link}`}
        >
          <OpenInNew />
          <span className={styles.linkText}>{step.linkText}</span>
        </a>
      </div>
      {desktop ? <Spacer variant="xxs" /> : <Spacer variant="xs" />}
    </div>
  );

  return (
    <div className={`flex flex-column ${styles.stepsContainer}`}>
      {stepsData.map((step, index) => (
        <div
          key={step.number}
          className={`flex flex-column ${styles.step} ${
            mobile ? styles.mobileStep : ''
          } ${index === stepsData.length - 1 ? styles.lastStep : ''}`}
        >
          <h2 className={clsx(styles.title, { [styles.mobileTitle]: mobile })}>
            {step.number}. {step.title}
          </h2>
          <div className={styles.stepsMargin}>
            <Text
              variant={desktop ? 'heading3' : 'body'}
              weight="normal"
              color="white"
              style={{
                lineHeight: 'var(--large-line-height)'
              }}
            >
              {step.text}
            </Text>
            <Spacer variant="lg" />
            {step.link && step.linkText && renderButtonAndLink(step)}
          </div>
          {step.image && (
            <>
              {desktop ? <Spacer variant="sm" /> : null}
              <DownloadPanel />
              {desktop ? null : <Spacer variant="md" />}
            </>
          )}
          {step.showSearch && (
            <>
              <Spacer variant="lg" />
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
