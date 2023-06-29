export default ({ env }) => ({
  'strapi-prometheus': {
    enabled: true,
    config: {
      // add prefix to all the prometheus metrics names.
      prefix: '',
      // use full url instead of matched url
      // true  => path label: `/api/models/1`
      // false => path label: `/api/models/:id`
      fullURL: false,
      // include url query in the url label
      // true  => path label: `/api/models?limit=1`
      // false => path label: `/api/models`
      includeQuery: false,
      // metrics that will be enabled, by default they are all enabled.
      enabledMetrics: {
        koa: true, // koa metrics
        process: true, // metrics regarding the running process
        http: true, // http metrics like response time and size
        apollo: false, // metrics regarding graphql
      },
      // interval at which rate metrics are collected in ms
      interval: 10_000,
      // set custom/default labels to all the prometheus metrics
      customLabels: {
        name: 'strapi-cms',
      },
    },
    kafkajs: {
      enabled: true,
      config: {
        publishers: [
          {
            enabled: true,
            clientId: 'rtlplus-music',
            topic: 'public.rtlplus.music.channels',
            brokers: [
              'b-1.eventstreamingdev.d7ntkm.c6.kafka.eu-central-1.amazonaws.com:9096',
              'b-2.eventstreamingdev.d7ntkm.c6.kafka.eu-central-1.amazonaws.com:9096',
              'b-3.eventstreamingdev.d7ntkm.c6.kafka.eu-central-1.amazonaws.com:9096',
            ],
            loglevel: 'info',
            ssl: true,
            sasl: {
              mechanism: 'scram-sha-512',
              username: env('KAFKA_USERNAME'),
              password: env('KAFKA_PASSWORD'),
            },
          },
        ],
        subscribers: [
          {
            enabled: true,
            clientId: 'rtlplus-music',
            topic: 'public.rtlplus.music.channels',
            brokers: [
              'b-1.eventstreamingdev.d7ntkm.c6.kafka.eu-central-1.amazonaws.com:9096',
              'b-2.eventstreamingdev.d7ntkm.c6.kafka.eu-central-1.amazonaws.com:9096',
              'b-3.eventstreamingdev.d7ntkm.c6.kafka.eu-central-1.amazonaws.com:9096',
            ],
            handler: 'kafka/handler.js',
            loglevel: 'info',
            ssl: true,
            sasl: {
              mechanism: 'scram-sha-512',
              username: env('KAFKA_USERNAME'),
              password: env('KAFKA_PASSWORD'),
            },
          },
        ],
      },
      resolve: './src/plugins/kafkajs',
    },
    publisher: {
      enabled: true,
      config: {
        hooks: {
          beforePublish: async ({ strapi, uid, entity }) => {},
          afterPublish: async ({ strapi, uid, entity }) => {},
          beforeUnpublish: async ({ strapi, uid, entity }) => {},
          afterUnpublish: async ({ strapi, uid, entity }) => {},
        },
      },
      resolve: './src/plugins/publisher',
    },
    seo: {
      enabled: true,
      resolve: './src/plugins/seo',
    },
  },
});
