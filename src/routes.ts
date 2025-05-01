import React from "react";
import { Route, Switch } from "react-router-dom";
import WalletOverviewPage from "@site/src/pages/wallet-overview";
import CreateConfig from "@site/src/pages/go-live";

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
      path: "/wallet/:walletAddress",
      component: WalletOverviewPage
    }),
    React.createElement(Route, {
      exact: true,
      path: "/w/:walletAddress",
      component: WalletOverviewPage
    }),
    React.createElement(Route, {
      exact: true,
      path: "/coreid/:walletAddress/:pool",
      component: WalletOverviewPage
    }),
    React.createElement(Route, {
      exact: true,
      path: "/go-live/:walletAddress/:pool/:secondPool",
      component: CreateConfig
    })
  );

export default Routes;
