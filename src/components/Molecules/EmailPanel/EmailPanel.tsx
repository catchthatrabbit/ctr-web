import React from "react";
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

  const renderEmailButtons = (
    emails: string | (string | { [email: string]: string })[],
  ) => {
    if (typeof emails === "string") {
      emails = [emails];
    }

    return emails.map((emailItem, index) => {
      if (typeof emailItem === "string") {
        return (
          <React.Fragment key={index}>
            <Link
              to={`mailto:${emailItem}?subject=Web%20contact`}
              className={styles.link}
              style={{ marginRight: index < emails.length - 1 ? "8px" : "0" }}
            >
              <Text variant="smallBody" color="primary" weight="bold">
                {emailItem}
              </Text>
            </Link>
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
                <Link
                  to={`mailto:${email}?subject=Web%20contact`}
                  className={styles.link}
                  style={{ marginRight: "8px" }}
                >
                  <Text variant="smallBody" color="primary" weight="bold">
                    {email}
                  </Text>
                </Link>
              </>
              {keyLink && (
                <>
                  <Spacer variant="sm" />
                  <Link
                    to={keyLink}
                    className={`${styles.link} ${styles.linkKey}`}
                    download
                    style={{ marginLeft: "8px" }}
                  >
                    <Text variant="smallBody" color="primary" weight="bold">
                      🔑 Key
                    </Text>
                  </Link>
                </>
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
        style={{ marginBottom: "4px" }}
      >
        {title}
      </Text>
      <Text variant="subheading" color="subheadingColor">
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
