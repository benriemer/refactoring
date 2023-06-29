const helper = require('../has-rrn-property')

describe('isValidRRNObject', () => {
  it('returns true when input object has RRN property', () => {
    const input = { RRN: 123456 };
    expect(helper.isValidRRNObject(input)).toBe(true);
  });

  it('returns false when input object does not have RRN property', () => {
    const input = {};
    expect(helper.isValidRRNObject(input)).toBe(false);
  });

  it('returns false when input is not an object', () => {
    const input = 'not an object';
    expect(helper.isValidRRNObject(input)).toBe(false);
  });
});
