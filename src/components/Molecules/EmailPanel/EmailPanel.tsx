import React from 'react';
import { Panel } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import Link from "@docusaurus/Link";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import clsx from "clsx";
import styles from "./styles.module.css";

interface IEmailPanel {
  title?: string;
  text?: string;
  emailAddress?: string | (string | { [email: string]: string })[];
}

const EmailPanel = ({ title, text, emailAddress }: IEmailPanel) => {
  const { desktop, laptop, tablet, mobile } = useMediaQueries();

  const renderEmailButtons = (emails: string | (string | { [email: string]: string })[]) => {
    if (typeof emails === 'string') {
      emails = [emails];
    }

    return emails.map((emailItem, index) => {
      if (typeof emailItem === 'string') {
        return (
          <React.Fragment key={index}>
            <Link to={`mailto:${emailItem}?subject=Web%20contact`} className="link-button" style={{ marginRight: index < emails.length - 1 ? '8px' : '0' }}>
              {emailItem}
            </Link>
          </React.Fragment>
        );
      } else {
        const email = Object.keys(emailItem)[0];
        const keyLink = emailItem[email];
        return (
          <React.Fragment key={index}>
            <div className={styles.emailRow}>
              <Link to={`mailto:${email}?subject=Web%20contact`} className="link-button" style={{ marginRight: '8px' }}>
                {email}
              </Link>
              {keyLink && (
                <Link to={keyLink} className="link-button" download style={{ marginLeft: '8px' }}>
                  🔑 Key
                </Link>
              )}
            </div>
          </React.Fragment>
        );
      }
    });
  };

  return (
    <Panel title={title}>
      <div
        className={clsx({
          [styles.emailValueDesktop]: desktop || laptop,
          [styles.emailValueTablet]: tablet,
          [styles.emailValueMobile]: mobile,
        })}
      >
        <Text variant="body" type="value">
          {text}
        </Text>
        <Spacer variant="sm" />
        <div className={styles.emailButtonsContainer}>
          {renderEmailButtons(emailAddress)}
        </div>
      </div>
    </Panel>
  );
};

export default EmailPanel;
