import { LoadContext, Plugin } from '@docusaurus/types';

export default function dynamicRouterPlugin(
  context: LoadContext,
  options: {}
): Plugin<void> {
  return {
    name: 'dynamic-router-plugin',
    async contentLoaded({ actions }) {
      actions.addRoute({
        path: '/coreid/:walletAddress/:pool',
        component: '@site/src/pages/wallet-overview',
        exact: true,
      });
    },
  };
}
