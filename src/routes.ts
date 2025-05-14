import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WalletOverviewPage from '@site/src/pages/wallet-overview';
import CreateConfig from '@site/src/pages/go-live';
import PoolSelectionPage from '@site/src/components/Pages/SelectPool/PoolSelectionPage';

const Routes = () =>
  React.createElement(
    Switch,
    null,
    React.createElement(Route, {
      exact: true,
      path: '/wallet-overview/:walletAddress',
      component: WalletOverviewPage,
    }),
    React.createElement(Route, {
      exact: true,
      path: '/wallet/:walletAddress',
      component: WalletOverviewPage,
    }),
    React.createElement(Route, {
      exact: true,
      path: '/w/:walletAddress',
      component: WalletOverviewPage,
    }),
    React.createElement(Route, {
      exact: true,
      path: '/coreid/:walletAddress/:pool',
      component: WalletOverviewPage,
    }),
    React.createElement(Route, {
      exact: true,
      path: '/go-live/:walletAddress',
      component: CreateConfig,
    }),
    React.createElement(Route, {
      exact: true,
      path: '/go-live/:walletAddress/:pool',
      component: CreateConfig,
    }),
    React.createElement(Route, {
      exact: true,
      path: '/go-live/:walletAddress/:pool/:secondPool',
      component: CreateConfig,
    }),

    React.createElement(Route, {
      exact: true,
      path: '/pool-selection',
      component: PoolSelectionPage,
    })
  );

export default Routes;
