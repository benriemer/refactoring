import { getIdFromRRN } from '../../../../helper/resolveRRN';

interface TeaserRow {
  id: string;
  __component: string;
  content: Teaser[];
}

interface Teaser {
  id: string;
  RRN: string;
  manualSubtitles: boolean;
}

interface SubField {
  teaserId: string;
  subTitleOne: string | null;
  subTitleTwo: string | null;
}

const updateTeaserAndStoreInDb = async (
  teaser: Teaser | undefined,
  subfield: SubField
): Promise<void> => {
  try {
    if (!teaser) {
      throw new Error(`Missing teaser for teaser id of ${subfield.teaserId}.`);
    }
    if (!subfield) {
      throw new Error(`Missing subfield for teaser id of ${teaser.id}.`);
    }

    const updatedTeaser = { ...teaser, ...subfield };
    await strapi.db.query('cms.editorial-teaser').update({
      where: { id: updatedTeaser.id },
      data: updatedTeaser,
    });
  } catch (err) {
    console.error(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `There has been an error while updating teasers with subfields for rrn: ${teaser?.RRN}. Error message: ${err.message}`
    );
  }
};

const checkManualSubtitlesEnabled = (teaser: Teaser): boolean => {
  return teaser.manualSubtitles;
};

const getTeaserRelatedSubfields = async (
  teaser: Teaser
): Promise<SubField | null> => {
  let response: SubField | null = null;

  try {
    const { assetType } = getIdFromRRN(teaser.RRN);
    switch (assetType) {
      case 'Artist':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const artist = await strapi.deezerProxy.getArtistForRRN(teaser.RRN);
        response = {
          subTitleOne: artist.name,
          subTitleTwo: 'Künstler:in',
          teaserId: teaser.id,
        };
        break;
      case 'Album':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const album = await strapi.deezerProxy.getAlbumForRRN(teaser.RRN);
        response = {
          subTitleOne: album.title,
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          subTitleTwo: `${convertAlbumTypeToSubfield(album.type)} • ${
            album.artist.name
          }`,
          teaserId: teaser.id,
        };
        break;
      case 'Playlist':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const playlist = await strapi.deezerProxy.getPlaylistForRRN(teaser.RRN);
        response = {
          subTitleOne: playlist.title,
          subTitleTwo: `Playlist • ${playlist.tracksCount} Titel`,
          teaserId: teaser.id,
        };
        break;
      case 'Track':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const track = await strapi.deezerProxy.getTrackForRRN(teaser.RRN);
        response = {
          subTitleOne: track.title,
          subTitleTwo: `Track • ${track.artist.name}`,
          teaserId: teaser.id,
        };
        break;
      case 'Radio':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const radio = await strapi.deezerProxy.getRadioForRRN(teaser.RRN);
        response = {
          subTitleOne: radio.title,
          subTitleTwo: 'Radio',
          teaserId: teaser.id,
        };
        break;
    }

    return response;
  } catch (err) {
    console.error(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `There has been an error while getting subfields for rrn: ${teaser.RRN}. Error message: ${err.message}`
    );
    return { subTitleOne: null, subTitleTwo: null, teaserId: teaser.id };
  }
};

const initDeezerProxyAndUpdateTeasers = async (
  teaserRows: TeaserRow[]
): Promise<void> => {
  const queries = {
    teaserFromDB: [] as Promise<{ value: TeaserRow } | null>[],
    subFieldsFromDeezer: [] as Promise<SubField | null>[],
  };

  for (const teaserRow of teaserRows) {
    queries.teaserFromDB.push(
      strapi.db.query('cms.teaserrow').findOne({
        where: { id: teaserRow.id },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        populate: { content: true },
      })
    );
  }

  Promise.allSettled(queries.teaserFromDB)
    .then((promiseArray) => {
      const teasers: Teaser[] = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      promiseArray.forEach(({ value: dbTeaserValue }) => {
        for (const dbTeaser of dbTeaserValue?.content || []) {
          teasers.push(dbTeaser);

          if (!checkManualSubtitlesEnabled(dbTeaser)) {
            queries.subFieldsFromDeezer.push(
              getTeaserRelatedSubfields(dbTeaser)
            );
          }
        }
      });
      return teasers;
    })
    .then((teasers) => {
      Promise.allSettled(queries.subFieldsFromDeezer).then((promiseArray) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseArray.forEach(({ value: subField }) => {
          updateTeaserAndStoreInDb(
            teasers.find((t) => t.id === subField?.teaserId),
            subField
          );
        });
      });
    });
};

const convertAlbumTypeToSubfield = (albumType: string): string => {
  switch (albumType) {
    case 'SINGLES':
      return 'Single';
    case 'EP':
      return 'EP';
    case 'COMPILATIONS':
      return 'Compilation';
    case 'MIXTAPE':
      return 'Mixtape';
    case 'UNKNOWN':
    case 'ALBUM':
    default:
      return 'Album';
  }
};

export default {
  async beforeCreate(event: any): Promise<void> {
    const { params } = event;
    await initDeezerProxyAndUpdateTeasers(params.data.teaserrows);
  },

  async beforeUpdate(event: any): Promise<void> {
    const { params } = event;
    await initDeezerProxyAndUpdateTeasers(params.data.teaserrows);
  },
};
