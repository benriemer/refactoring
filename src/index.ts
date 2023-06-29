import DeezerProxyGraph from './deezerProxyGraph/';
import CredentialService from './credentialService';
import { Strapi } from '@strapi/strapi';
import { StrapiCms } from '../config/types/config-types';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {
    // Add your code here
  },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: StrapiCms }) {
    const authService = new CredentialService();
    const deezerProxy = new DeezerProxyGraph();

    await authService.initService();
    strapi.authService = authService;

    await deezerProxy.initClient();
    strapi.deezerProxy = deezerProxy;
  },
};
