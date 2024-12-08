import { LoadContext, Plugin } from "@docusaurus/types";

export default function dynamicRouter(
  context: LoadContext,
  options: {},
): Plugin<void> {
  return {
    name: "dynamic-router-plugin",
    async contentLoaded({ actions }) {
      actions.addRoute({
        path: "/wallet-overview/:walletAddress/:pool",
        component: "@site/src/pages/wallet-overview",
        exact: false,
      });
    },
  };
}
