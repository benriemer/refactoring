'use strict';
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');
// WARNING: the admin panel now uses webpack 5 to bundle the application.

module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack configuration
  config.plugins.push(
    new webpack.ProvidePlugin(
      // It's a good idea to only run this plugin when you're building a bundle
      // that will be released, rather than for every development build
      new BugsnagBuildReporterPlugin(
        {
          apiKey: '5893bff50649e3c9f27727cbb830a294',
          appVersion: process.env.npm_package_version,
        },
        {
          /* opts */
        }
      )
    )
  );
  // Important: return the modified configuration
  return config;
};
