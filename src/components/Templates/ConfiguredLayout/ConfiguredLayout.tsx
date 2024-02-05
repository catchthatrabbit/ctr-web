import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
import styles from './styles.module.css';


interface IConfiguredLayout {
    children: React.ReactNode
}

const ConfiguredLayout = ({children}:IConfiguredLayout) => {
    const {siteConfig} = useDocusaurusContext();
    const queryClient = new QueryClient();

   return (
        <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
            <QueryClientProvider client={queryClient}>
                <main className={styles.background}>
                    {children}
                </main>
            </QueryClientProvider>
        </Layout>
    )
}

export default ConfiguredLayout;

 