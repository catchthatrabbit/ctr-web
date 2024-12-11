import React from "react";
import { Route, Switch } from "react-router-dom";
import WalletOverviewPage from "@site/src/pages/wallet-overview";

const Routes = () => (
    <Switch>
    <Route exact path="/wallet-overview/:walletAddress" component={WalletOverviewPage} />
    <Route exact path="/coreid/:walletAddress/:pool" component={WalletOverviewPage} />
  </Switch>
);

export default Routes;