import { stringify } from 'qs';
import axios from 'axios';

export default class CredentialService {
  authToken;

  authTokenExpiresIn;

  authUrl = strapi.config.get('server.auth.authUrl');

  constructor() {
    if (!this.authUrl) {
      throw new Error('Either auth uri is not set!');
    }
  }

  async getAuthToken() {
    await this.checkRefresh();
    return this.authToken;
  }

  async initService() {
    await this.fetchAuthToken();
  }

  async fetchAuthToken() {
    try {
      const body = {
        client_id: 'anonymous-user',
        client_secret: '4bfeb73f-1c4a-4e9f-a7fa-96aa1ad3d94c',
        grant_type: 'client_credentials',
      };

      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };
      const { data } = await axios.post(this.authUrl, stringify(body), config);
      this.authToken = `Bearer ${data.access_token}`;
      this.authTokenExpiresIn = new Date(
        Date.now() + (data.expires_in - 60) * 1000
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error message: ', error.message);
        throw new Error(error.message);
      } else {
        console.error('unexpected error: ', error);
        throw new Error('An unexpected error occurred. Error: ' + error);
      }
    }
  }

  async checkRefresh() {
    if (
      !this.authTokenExpiresIn ||
      this.dateCompare(this.authTokenExpiresIn, new Date())
    ) {
      await this.initService();
    }
  }

  dateCompare(beforeDate, laterDate) {
    return laterDate > beforeDate;
  }
}
