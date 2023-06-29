import { Strapi } from '@strapi/strapi';
import DeezerProxyGraph from '../../src/deezerProxyGraph';
import CredentialService from '../../src/credentialService';

export interface StrapiCms extends Strapi {
  authService: CredentialService;
  deezerProxy: DeezerProxyGraph;
}
export interface ServerConfig {
  host: string;
  port: number;
  url: string;
  app: {
    keys: string[];
  };
  admin: {
    url: string;
    auth: {
      secret: string;
    };
    watchIgnoreFiles: string[];
  };
  deezerProxy: {
    graphUrl: string;
  };
  auth: {
    authUrl: string;
  };
  cron: {
    enabled: boolean;
  };
}

export interface DatabaseConnection {
  connectionString: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean | DatabaseSSL | undefined;
  schema?: string;
}

interface DatabaseSSL {
  key?: string;
  cert?: string;
  ca?: string;
  capath?: string;
  cipher?: string;
  rejectUnauthorized: boolean;
}

interface DatabasePool {
  min: number;
  max: number;
}

export interface DatabaseConfig {
  connection: DatabaseConnection;
  pool: DatabasePool;
}

export interface Connections {
  [key: string]: DatabaseConfig;
}

export interface KafkaJSConfig {
  kafkajs: {
    enabled: boolean;
    config: {
      publishers: {
        enabled: boolean;
        clientId: string;
        topic: string;
        brokers: string[];
        loglevel?: string;
        ssl: boolean;
        sasl: {
          mechanism: string;
          username: string;
          password: string;
        };
      }[];
      subscribers: {
        enabled: boolean;
        clientId: string;
        topic: string;
        brokers: string[];
        handler: string;
        loglevel?: string;
        ssl: boolean;
        sasl: {
          mechanism: string;
          username: string;
          password: string;
        };
      }[];
    };
    resolve: string;
  };
}
