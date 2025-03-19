import React from "react";
import { Route, Switch } from "react-router-dom";
import WalletOverviewPage from "@site/src/pages/wallet-overview";

const Routes = () =>
  React.createElement(
    Switch,
    null,
    React.createElement(Route, {
      exact: true,
      path: "/wallet-overview/:walletAddress",
      component: WalletOverviewPage
    }),
    React.createElement(Route, {
      exact: true,
      path: "/coreid/:walletAddress/:pool",
      component: WalletOverviewPage
    })
  );

export default Routes;
