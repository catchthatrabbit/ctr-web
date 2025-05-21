export default function customPostCssPlugin() {
  return {
    name: 'custom-postcss',
    configurePostCss(options) {
      // Append new PostCSS plugins here.
      options.plugins.push(require('postcss-preset-env')); // allow newest CSS syntax
      return options;
    },
  };
}
