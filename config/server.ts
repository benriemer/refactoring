import serverConfig from './assets/server-config';

export default ({ env }) =>
  serverConfig(
    env('HOST'),
    env.int('PORT'),
    env('URL'),
    env.array('APP_KEYS'),
    env('ADMIN_JWT_SECRET')
  );
