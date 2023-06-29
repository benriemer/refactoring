'use strict';

module.exports = {
  eachMessage: async ({ topic, partition, offset, message }) => {
    const payload = message.value.toString();
    strapi.log.info(`I am sample handler file ${__filename}, edit me..`);
    strapi.log.info(
      `Received message from topic: ${topic} partition: ${partition} offset: ${offset}`
    );
    try {
      let object;
      if ((object = JSON.parse(payload))) {
        strapi.log.info('Do something...');
        // Do something..
        strapi.log.info('Done!');
      }
    } catch (err) {
      strapi.log.info('Pass!');
    }
  },
};
