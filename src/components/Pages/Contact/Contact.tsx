import React, { useState, useEffect, useMemo } from 'react';
import { ContactTitle } from '@site/src/components/Molecules/PictureTitles';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { EmailPanel } from '@site/src/components/Molecules/EmailPanel';
import useControls from './controls';
import { Text } from '@site/src/components/Atoms/Text';
import { Dropdown } from '@site/src/components/Atoms/Dropdown';
import { ConfiguredInfoBox } from '../../Molecules/ConfiguredInfoBox';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import clsx from 'clsx';
import styles from './styles.module.css';

const Contact = () => {
  const { infoBoxMapData, isLoadingMapChart } = useControls();
  const { siteConfig } = useDocusaurusContext();
  const { mobile, tablet, desktop } = useMediaQueries();
  const [selectedTitle, setSelectedTitle] = useState('Support');
  const [message, setMessage] = useState('');

  const emailPanels = useMemo(() => {
    const emails = siteConfig.customFields.EMAILS as Record<string, Array<{ email: string; description: string; key?: string }>>;
    return Object.entries(emails).map(([category, contacts]) => ({
      value: category,
      label: category,
      email: contacts[0].email,
      description: contacts[0].description,
      key: contacts[0].key,
      allEmails: contacts.map(contact => contact.email)
    }));
  }, [siteConfig]);

  const handleDropdownChange = (newValue: { value: string; label: string }) => {
    setSelectedTitle(newValue.value);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    const selectedTopic = emailPanels.find(panel => panel.value === selectedTitle);
    if (!selectedTopic) return '';
    return `mailto:${selectedTopic.email}?subject=${encodeURIComponent(selectedTopic.label)}&body=${encodeURIComponent(message)}`;
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
      <Spacer variant={desktop ? 'xxl' : 'xl'} />
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
            items={emailPanels}
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
          <a href={handleSubmit()} target="_blank" className="button">
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
                title={panel.label}
                emailAddress={(siteConfig.customFields.EMAILS as Record<string, Array<{ email: string; description: string; keyLink?: string; keyId?: string }>>)[panel.value]}
                text={panel.description}
              />
              {index < emailPanels.length - 1 && <Spacer variant="xs" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Spacer variant="xl" />
    </>
  );
};

export default Contact;
