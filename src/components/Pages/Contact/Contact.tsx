import React, { useState, useEffect } from 'react';
import { ContactTitle } from '@site/src/components/Molecules/PictureTitles';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { EmailPanel } from '@site/src/components/Molecules/EmailPanel';
import useControls from './controls';
import { Text } from '@site/src/components/Atoms/Text';
import { Dropdown } from '@site/src/components/Atoms/Dropdown';
import { ConfiguredInfoBox } from '../../Molecules/ConfiguredInfoBox';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

import clsx from 'clsx';
import styles from './styles.module.css';

const Contact = () => {
  const {
    maintainersCommercialDescription,
    maintainersCommercialEmail,
    maintainersSecurityDescription,
    maintainersSecurityEmail,
    maintainersSupportDescription,
    maintainersSupportEmail,
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls();

  const { mobile, tablet, desktop } = useMediaQueries();
  const [selectedTitle, setSelectedTitle] = useState('Support');
  const [message, setMessage] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');

  const emailPanels = [
    {
      title: 'Support',
      emailAddress: maintainersSupportEmail,
      text: maintainersSupportDescription,
    },
    {
      title: 'Security',
      emailAddress: maintainersSecurityEmail,
      text: maintainersSecurityDescription,
    },
    {
      title: 'Commercial',
      emailAddress: maintainersCommercialEmail,
      text: maintainersCommercialDescription,
    },
  ];
  useEffect(() => {
    const selectedEmailPanel = emailPanels.find(
      (panel) => panel.title === selectedTitle
    );
    if (selectedEmailPanel) {
      const emailAddress = selectedEmailPanel.emailAddress;

      setMailtoLink(
        `mailto:${emailAddress}?subject=${encodeURIComponent(
          selectedTitle
        )}&body=${encodeURIComponent(message)}`
      );
    }
  }, [selectedTitle, message]);

  const handleDropdownChange = (newValue: { value: string; label: string }) => {
    setSelectedTitle(newValue.value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  return (
    <>
      {(mobile || tablet) && (
        <>
          <ConfiguredInfoBox
            infoItems={infoBoxMapData}
            isLoading={isLoadingMapChart}
          />
        </>
      )}
      <Spacer variant={desktop ? 'xxxxl' : 'xxxl'} />
      {mobile && <Spacer variant="xs" />}
      <ContactTitle />
      {desktop ? <Spacer variant="sm" /> : null}
      {desktop ? <Spacer variant="md" /> : <Spacer variant="xs" />}
      <div className={clsx('row', styles.contactContainer)}>
        <div className={clsx('col col--6', styles.leftContainer)}>
          <Text
            variant="body"
            weight="normal"
            color="subheadingColor"
          >
            Select topic
          </Text>
          <Spacer variant="xxs" />
          <Dropdown
            items={emailPanels.map((panel) => ({
              label: panel.title,
              value: panel.title,
            }))}
            onChange={handleDropdownChange}
            defaultValue={selectedTitle}
          />
          <Spacer variant="md" />
          <Text
            variant="body"
            weight="normal"
            color="subheadingColor"
          >
            Message
          </Text>
          <Spacer variant="xxs" />
          <textarea
            className={styles.textarea}
            value={message}
            onChange={handleTextareaChange}
            placeholder="Compose your message here…"
          />
          {desktop ? <Spacer variant="md" /> : <Spacer variant="sm" />}
          <a href={mailtoLink} target="_blank" className="button">
            <Text variant="body" color="black" weight="medium">
              Send via Email Client
            </Text>
          </a>
        </div>
        {desktop ? null : (
          <>
            <Spacer variant="lg" /> <Spacer variant="xs" />
          </>
        )}

        <div className={styles.rightContainer}>
          <Text
            variant="body"
            weight="normal"
            color="subheadingColor"
          >
            Contact Details
          </Text>
          <Spacer variant="xxs" />
          {emailPanels.map((panel, index) => (
            <React.Fragment key={index}>
              <EmailPanel
                title={panel.title}
                emailAddress={panel.emailAddress}
                text={panel.text}
              />
              {index < emailPanels.length - 1 && <Spacer variant="xs" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Spacer variant="xxxl" />
    </>
  );
};

export default Contact;
