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
      actions.addRoute({
        path: '/go-live/:walletAddress',
        component: '@site/src/pages/go-live',
        exact: true,
      });
      actions.addRoute({
        path: '/go-live/:walletAddress/:pool',
        component: '@site/src/pages/go-live',
        exact: true,
      });
      actions.addRoute({
        path: '/go-live/:walletAddress/:pool/:secondPool',
        component: '@site/src/pages/go-live',
        exact: true,
      });
    },
  };
}
