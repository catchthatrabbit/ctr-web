import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';
import clsx from 'clsx';
import styles from './styles.module.css';
import { DownloadFile } from '@site/src/icons';

interface IEmailPanel {
  title?: string;
  text?: string;
  emailAddress?: string | (string | { [email: string]: string })[];
}

const EmailPanel = ({ title, text, emailAddress }: IEmailPanel) => {
  const { desktop, laptop, tablet, mobile } = useMediaQueries();

  const renderEmailButtons = (
    emails: string | (string | { [email: string]: string })[]
  ) => {
    if (typeof emails === 'string') {
      emails = [emails];
    }

    return emails.map((emailItem, index) => {
      if (typeof emailItem === 'string') {
        return (
          <React.Fragment key={index}>
            <a
              href={`mailto:${emailItem}`}
              target="_blank"
              className={styles.link}
            >
              {emailItem}
            </a>
          </React.Fragment>
        );
      } else {
        const email = Object.keys(emailItem)[0];
        const keyLink = emailItem[email];
        return (
          <React.Fragment key={index}>
            <div className={`flex flex-column ${styles.emailRow}`}>
              <>
                <Spacer variant="xxs" />
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  className={styles.link}
                >
                  {email}
                </a>
              </>
              {keyLink && (
                <a
                  href={keyLink}
                  className={styles.downloadLink}
                  rel="noopener noreferrer"
                  download
                  style={{ marginTop: '0.2em' }}
                >
                  <DownloadFile />
                  Download GPG Key
                </a>
              )}
            </div>
          </React.Fragment>
        );
      }
    });
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
          {renderEmailButtons(emailAddress)}
        </div>
      </div>
    </div>
  );
};

export default EmailPanel;
