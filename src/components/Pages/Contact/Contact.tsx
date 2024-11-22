import React, { useState } from "react";
import { ContactTitle } from "@site/src/components/Molecules/PictureTitles";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { EmailPanel } from "@site/src/components/Molecules/EmailPanel";
import { useControls } from "./controls";
import { Text } from "@site/src/components/Atoms/Text";
import { Dropdown } from "@site/src/components/Atoms/Dropdown";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";

const Contact = () => {
  const {
    maintainersCommercialDescription,
    maintainersCommercialEmail,
    maintainersSecurityDescription,
    maintainersSecurityEmail,
    maintainersSupportDescription,
    maintainersSupportEmail,
  } = useControls();

  const [selectedTitle, setSelectedTitle] = useState("Support");
  const [message, setMessage] = useState("");

  const emailPanels = [
    {
      title: "Support",
      emailAddress: maintainersSupportEmail,
      text: maintainersSupportDescription,
    },
    {
      title: "Security",
      emailAddress: maintainersSecurityEmail,
      text: maintainersSecurityDescription,
    },
    {
      title: "Commercial",
      emailAddress: maintainersCommercialEmail,
      text: maintainersCommercialDescription,
    },
  ];

  const handleDropdownChange = (value: string) => {
    setSelectedTitle(value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessage(event.target.value);
  };

  const selectedEmailPanel = emailPanels.find(
    (panel) => panel.title === selectedTitle,
  );
  const emailAddress = selectedEmailPanel?.emailAddress;
  const mailtoLink = `mailto:${emailAddress}?subject=Web%20contact&body=${encodeURIComponent(message)}`;

  return (
    <>
      <Spacer variant="xxxl" />
      <ContactTitle />
      <Spacer variant="lg" />
      <div className={clsx("row", styles.contactContainer)}>
        <div className={clsx("col col--4", styles.leftContainer)}>
          <Dropdown
            items={emailPanels.map((panel) => ({
              label: panel.title,
              value: panel.title,
            }))}
            onChange={handleDropdownChange}
            defaultValue={selectedTitle}
          />
          <Spacer variant="md" />
          <textarea
            className={styles.textarea}
            value={message}
            onChange={handleTextareaChange}
            placeholder="Type your message here..."
          />
          <Spacer variant="md" />
          <Link to={mailtoLink} className={styles.linkButton}>
            <Text variant="smallBody" color="primary" weight="bold">
              Send
            </Text>
          </Link>
        </div>
        <div className={clsx("col col--5", styles.rightContainer)}>
          {emailPanels.map((panel, index) => (
            <React.Fragment key={index}>
              <EmailPanel
                title={panel.title}
                emailAddress={panel.emailAddress}
                text={panel.text}
              />
              {index < emailPanels.length - 1 && <Spacer variant="lg" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Spacer variant="xl" />
    </>
  );
};

export default Contact;
