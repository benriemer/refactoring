import { ServerConfig } from '../types/config-types';

export default function createServerConfig(
  serverHost: string,
  serverPort: number,
  serverUrl: string,
  appKeys: string[],
  adminJwtSecret: string
): ServerConfig {
  const host: string = serverHost || '0.0.0.0';
  const port: number = serverPort || 1337;
  const url: string = serverUrl || `http://localhost:${port}`;

  return {
    host,
    port,
    url,
    app: {
      keys: appKeys,
    },
    admin: {
      url: `${url}/admin`,
      auth: {
        secret: adminJwtSecret || 'f7a924e6c65ee1e93ac84303c40c107a',
      },
      watchIgnoreFiles: [
        '**/public/**',
        '**/types/**',
        '**/typings/**',
        '**/template/**',
        '**/docs/**',
        '**/tests/**',
        '**/*.test.js',
        'jest.*.js',
      ],
    },
    deezerProxy: {
      graphUrl:
        'https://deezer-proxy-graph.music.dev.r5s.aws-cbc.cloud/graphql',
    },
    auth: {
      authUrl:
        'https://preprod.auth.rtl.de/auth/realms/rtlplus/protocol/openid-connect/token',
    },
    cron: {
      enabled: true,
    },
  };
}
