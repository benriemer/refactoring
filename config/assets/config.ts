interface StrapiConfig {
  STRAPI_DISABLE_UPDATE_NOTIFICATION?: boolean;
  STRAPI_HIDE_STARTUP_MESSAGE?: boolean;
  STRAPI_TELEMETRY_DISABLED?: boolean;
  STRAPI_LICENSE?: string;
  STRAPI_DISABLE_REMOTE_DATA_TRANSFER?: boolean;
  NODE_ENV?: string;
  BROWSER?: boolean;
  ENV_PATH?: string;
  STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE?: string;
  FAST_REFRESH?: boolean;
}

const config: StrapiConfig = {
  STRAPI_DISABLE_UPDATE_NOTIFICATION: false,
  STRAPI_HIDE_STARTUP_MESSAGE: false,
  STRAPI_TELEMETRY_DISABLED: false,
  STRAPI_LICENSE: undefined,
  STRAPI_DISABLE_REMOTE_DATA_TRANSFER: false,
  NODE_ENV: 'development',
  BROWSER: true,
  ENV_PATH: './.env',
  STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE: 'en',
  FAST_REFRESH: true,
};

export default config;
