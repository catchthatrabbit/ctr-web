import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessageProvider } from '@site/src/components/Providers/Message';
import { ToastContainer } from 'react-toastify';
import clsx from 'clsx';

import styles from './styles.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface IConfiguredLayout {
  children: React.ReactNode;
  hideBackground?: boolean;
  backgroundPos?: number;
}

const ConfiguredLayout = ({
  children,
  hideBackground,
  backgroundPos = 10,
}: IConfiguredLayout) => {
  const { siteConfig } = useDocusaurusContext();
  const queryClient = new QueryClient();

  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <QueryClientProvider client={queryClient}>
        <MessageProvider>
          <main
            className={clsx([
              'container',
              'content',
              { [styles.background]: !hideBackground },
              styles[`backgroundPos-${backgroundPos}`],
            ])}
          >
            {children}
          </main>
          <ToastContainer />
        </MessageProvider>
      </QueryClientProvider>
    </Layout>
  );
};

export default ConfiguredLayout;
