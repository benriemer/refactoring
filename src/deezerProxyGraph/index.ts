import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ALBUM_QUERY,
  ARTIST_QUERY,
  ASSET_QUERY,
  PLAYLIST_QUERY,
  RADIO_QUERY,
  TRACK_QUERY,
} from './query';

export default class DeezerProxyGraph {
  graphUrl = strapi.config.get('server.deezerProxy.graphUrl');

  authTokenExpiresIn;

  client;

  constructor() {
    if (!this.graphUrl) {
      throw new Error('Either graph or auth uri not set!');
    }
  }

  async initClient() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const authToken = await strapi.authService.getAuthToken();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.authTokenExpiresIn = strapi.authService.authTokenExpiresIn;

    const httpLink = createHttpLink({
      uri: this.graphUrl,
      fetch: fetch,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: authToken,
          'rtlplus-client-id': 'RTL+ Music Strapi',
          'rtlplus-client-version': '1.0.0',
        },
      };
    });

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }

  async _graphRequestForQuery(query, id) {
    if (!this.client) await this.checkRefresh();

    return this.client
      .query({
        query: query,
        variables: { id: id },
      })
      .then((result) => {
        return result.data.musicAsset;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async getArtistForRRN(rrn) {
    return this._graphRequestForQuery(ARTIST_QUERY, rrn);
  }

  async getTrackForRRN(rrn) {
    return this._graphRequestForQuery(TRACK_QUERY, rrn);
  }

  async getAlbumForRRN(rrn) {
    return this._graphRequestForQuery(ALBUM_QUERY, rrn);
  }

  async getPlaylistForRRN(rrn) {
    return this._graphRequestForQuery(PLAYLIST_QUERY, rrn);
  }

  async getRadioForRRN(rrn) {
    return this._graphRequestForQuery(RADIO_QUERY, rrn);
  }

  async getAssetIdForRRN(rrn) {
    return this._graphRequestForQuery(ASSET_QUERY, rrn);
  }

  async checkRefresh() {
    if (
      !this.authTokenExpiresIn ||
      this.dateCompare(this.authTokenExpiresIn, new Date())
    ) {
      await this.initClient();
    }
  }

  dateCompare(beforeDate, laterDate) {
    return laterDate > beforeDate;
  }
}
