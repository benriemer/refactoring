'use strict';
import BugsnagPluginKoa from '@bugsnag/plugin-koa';
import { BugsnagTransport } from '../src/bugsnag';

const transport = new BugsnagTransport({
  bugsnag: {
    apiKey: process.env.BUGSNAG_API_KEY ? process.env.BUGSNAG_API_KEY : '',
    endpoints: {
      notify: 'https://notify-bugs-fra1.rtl.de',
      sessions: 'https://session-bugs-fra1.rtl.de',
    },
    enabledReleaseStages: ['development', 'preprod', 'production'],
    appVersion: process.env.npm_package_version,
    plugins: [BugsnagPluginKoa],
  },
  level: 'error',
});

export default {
  transports: [transport],
};
