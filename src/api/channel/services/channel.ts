// /**
//  * @typedef {import('@strapi/strapi').Entity} Entity
//  * @typedef {import('@strapi/strapi').Channel} Channel
//  * @typedef {import('@strapi/strapi').Section} Section
//  */
//
// import createCoreService from "@strapi/strapi";
//
// /**
//  * @param {Section[]} sections
//  * @returns {object[]}
//  */
// const mapSectionsToTeaserRows = (sections) => {
//   return sections.map(section => {
//     const title = section.title;
//     const type = 'EDITORIAL';
//     const layout = 'STANDARD';
//     const subscription = 'all';
//     const component = 'cms.teaserrow';
//     const hidden = false;
//     const content = section.items.map(item => {
//       return {'RRN': item.rrn}
//     });
//
//     return {
//       title,
//       type,
//       layout,
//       hidden,
//       subscription,
//       __component: component,
//       content: content
//     }
//   });
// };
//
// /**
//  * @param {Entity} entity
//  * @param {Strapi} strapi
//  * @returns {Promise<Channel|null>}
//  */
// const findChannel = async (entity, strapi) => {
//   try {
//     const channelArray = await strapi.entityService.findMany('api::channel.channel', {
//       filters: {deezerId: {$eq: entity.id}}
//     });
//
//     return (channelArray.length > 0) ? channelArray[0] : null;
//   } catch (error) {
//     console.error(`An error occurred while fetching channel ${entity.name} with id: ${entity.id}. Stacktrace: ${error}`);
//     return null;
//   }
// };
//
// /**
//  * @param {Channel} channel
//  * @param {Section[]} sections
//  * @param {Strapi} strapi
//  * @returns {Promise<boolean>}
//  */
// const updateChannel = async (channel, sections, strapi) => {
//   try {
//     channel.teaserrows = mapSectionsToTeaserRows(sections);
//     await strapi.entityService.update('api::channel.channel', channel.id, {data: channel});
//     console.info(`Updated channel: ${channel.title} with Id ${channel.deezerId}`);
//     return true;
//   } catch (error) {
//     console.error(`An error occurred while updating channel ${channel.name} with id: ${channel.id}. Stacktrace: ${error}`);
//     return false;
//   }
// };
//
// /**
//  * @param {Entity} entity
//  * @param {Strapi} strapi
//  * @returns {Promise<boolean>}
//  */
// const createChannel = async (entity, strapi) => {
//   try {
//     const deezerId = entity.id;
//     const slug = entity.slug;
//     const title = entity.name;
//     const teaserrows = mapSectionsToTeaserRows(entity.sections);
//
//     const channel = {deezerId, slug, title, teaserrows};
//     await strapi.entityService.create('api::channel.channel', {data: channel});
//     console.info(`Created channel: ${channel.title} with Id ${channel.deezerId}`);
//     return true;
//   } catch (error) {
//     console.error(`An error occurred while creating channel ${entity.name} with id: ${entity.id}. Stacktrace: ${error}`);
//     return false;
//   }
// };
//
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// export default createCoreService('api::channel.channel', ({strapi}) => ({
//   /**
//    * @param {string} key
//    * @param {string} value
//    * @returns {Promise<boolean>}
//    */
//   async handleKafkaEvent(key, value) {
//     const event = JSON.parse(value);
//     const entity = event.entity;
//
//     return findChannel(entity, strapi).then(channel => {
//       if (!channel) {
//         return createChannel(entity, strapi);
//       } else {
//         return updateChannel(channel, entity.sections, strapi);
//       }
//     }).catch(console.error);
//   }
// }));
