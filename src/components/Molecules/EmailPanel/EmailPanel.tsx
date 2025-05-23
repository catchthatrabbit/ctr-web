import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';
import clsx from 'clsx';
import styles from './styles.module.css';
import { DownloadFile } from '@site/src/icons';

interface EmailData {
  email: string;
  description: string;
  keyLink?: string;
  keyId?: string;
}

interface IEmailPanel {
  title?: string;
  text?: string;
  emailAddress?: EmailData[];
}

const EmailPanel = ({ title, text, emailAddress }: IEmailPanel) => {
  const { desktop, laptop, tablet, mobile } = useMediaQueries();

  const renderEmailButtons = (emails: EmailData[]) => {
    return emails.map((emailData, index) => (
      <React.Fragment key={index}>
        <div className={`flex flex-column ${styles.emailRow}`}>
          <>
            <Spacer variant="xxs" />
            <a
              href={`mailto:${emailData.email}`}
              target="_blank"
              className={styles.link}
            >
              {emailData.email}
            </a>
          </>
          {emailData.keyLink && (
            <a
              href={emailData.keyLink}
              className={styles.downloadLink}
              rel="noopener noreferrer"
              download
              style={{ marginTop: '0.2em' }}
            >
              <DownloadFile />
              <span className={styles.downloadText}>Download GPG Key</span>
              <span className={styles.downloadKeyId}>
                [{emailData.keyId}]
              </span>
            </a>
          )}
        </div>
      </React.Fragment>
    ));
  };

  return (
    <div className={`flex flex-column ${styles.block}`}>
      <Text
        variant="heading3"
        weight="semiBold"
        color="white"
        style={{ marginBottom: '0.5em' }}
      >
        {title}
      </Text>
      <Text
        variant={desktop ? 'subheading' : 'body'}
        color="subheadingColor"
        style={{ lineHeight: '1.2em' }}
      >
        {text}
      </Text>

      <div
        className={clsx({
          [styles.emailValueDesktop]: desktop || laptop,
          [styles.emailValueTablet]: tablet,
          [styles.emailValueMobile]: mobile,
        })}
      >
        <Spacer variant="xs" />
        <div className={`flex flex-column ${styles.emailButtonsContainer}`}>
          {emailAddress && renderEmailButtons(emailAddress)}
        </div>
      </div>
    </div>
  );
};

export default EmailPanel;
