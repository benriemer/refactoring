export const getIdFromRRN = (rrn) => {
  // Exact number of parts an RRN must have
  const RRN_TEMPLATE_CHUNKS = 5;
  const RRN_DEFAULT_FIRST_CHUNK = 'rrn';

  if (!rrn) throw new Error(`Invalid rrn. RRN ${rrn}`);

  const validAssets = new Map([
    ['album', 'Album'],
    ['track', 'Track'],
    ['station', 'Radio'],
    ['artist', 'Artist'],
    ['playlist', 'Playlist'],
  ]);

  const chunks = rrn.split(':');
  if (
    chunks.length > RRN_TEMPLATE_CHUNKS ||
    chunks.length < RRN_TEMPLATE_CHUNKS
  )
    throw new Error(`Invalid rrn. RRN ${rrn}`);

  const [isRRN, isMusicRRN, isDeezerRRN, assetKey, assetId] = chunks;

  if (isRRN !== RRN_DEFAULT_FIRST_CHUNK)
    throw new Error(`Invalid rrn. RRN ${rrn}`);
  if (!isDeezerRRN || isDeezerRRN !== 'deezer')
    throw new Error(`Invalid rrn. RRN ${rrn}`);
  if (!assetId) throw new Error(`Invalid rrn. RRN ${rrn}`);

  const assetType = validAssets.get(assetKey);

  if (isMusicRRN !== 'music' || !assetType) {
    throw new Error(`Invalid rrn. RRN ${rrn}`);
  }

  return { assetId, assetType };
};

const buildRRNForIdAndType = (id, type) => {
  if (!id || !type) throw new Error(`Invalid input: id: ${id}, type: ${type}`);

  const rrnMap = {
    Artist: 'artist',
    Playlist: 'playlist',
    Album: 'album',
    Track: 'track',
    RadioStation: 'station',
  };

  const assetKey = rrnMap[type];

  if (!assetKey) {
    throw new Error(`Unknown type! Given Type: ${type}`);
  }

  return `rrn:music:deezer:${assetKey}:${id}`;
};

export default { getIdFromRRN, buildRRNForIdAndType };
