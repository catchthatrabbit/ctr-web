import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
import styles from './styles.module.css';
import { MessageProvider } from '@site/src/components/Providers/Message';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface IConfiguredLayout {
    children: React.ReactNode
    hideBackground?: boolean
}

const ConfiguredLayout = ({children, hideBackground}:IConfiguredLayout) => {
    const {siteConfig} = useDocusaurusContext();
    const queryClient = new QueryClient();

   return (
        <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
            <QueryClientProvider client={queryClient}>
                <MessageProvider>
                    <ToastContainer />
                    <main className={!hideBackground && styles.background || ""}>
                        {children}
                    </main>
                </MessageProvider>
            </QueryClientProvider>
        </Layout>
    )
}

export default ConfiguredLayout;

 