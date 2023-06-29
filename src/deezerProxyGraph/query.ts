import { gql } from 'graphql-tag';

export const ARTIST_QUERY = gql`
  query GetMusicArtistForTeaser($id: ID!) {
    musicAsset(id: $id) {
      ... on MusicArtist {
        id
        name
      }
    }
  }
`;

export const ALBUM_QUERY = gql`
  query GetMusicAlbumForTeaser($id: ID!) {
    musicAsset(id: $id) {
      ... on MusicAlbum {
        id
        title
        type
        artist {
          id
          name
        }
      }
    }
  }
`;

export const TRACK_QUERY = gql`
  query GetMusicTrackForTeaser($id: ID!) {
    musicAsset(id: $id) {
      ... on MusicTrack {
        id
        title
        artist {
          name
        }
      }
    }
  }
`;

export const PLAYLIST_QUERY = gql`
  query GetMusicPlaylistForTeaser($id: ID!) {
    musicAsset(id: $id) {
      ... on MusicPlaylist {
        id
        title
        tracksCount
      }
    }
  }
`;

export const ASSET_QUERY = gql`
  query GetMusicAssetForTeaser($id: ID!) {
    musicAsset(id: $id) {
      ... on MusicPlaylist {
        id
      }

      ... on MusicAlbum {
        id
      }

      ... on MusicArtist {
        id
      }

      ... on MusicTrack {
        id
      }
    }
  }
`;

export const RADIO_QUERY = gql`
  query GetMusicRadioForTeaser($id: ID!) {
    musicAsset(id: $id) {
      ... on MusicRadio {
        name
      }
    }
  }
`;
