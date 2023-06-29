const {isArrayOfNumbers} = require("../is-array-of-number");
describe('isArrayOfNumbers - Happy Path', () => {
  it('should return true for an array of numbers', () => {
    expect(isArrayOfNumbers([1, 2, 3])).toBe(true);
  });
});

describe('isArrayOfNumbers - Edge Cases', () => {

  it('should return false for an array with non-numbers', () => {
    expect(isArrayOfNumbers([1, '2', 3])).toBe(false);
  });

  it('should return false for a single number', () => {
    expect(isArrayOfNumbers(42)).toBe(false);
  });

  it('should return false for a string', () => {
    expect(isArrayOfNumbers('hello')).toBe(false);
  });

  it('should return false for an object', () => {
    expect(isArrayOfNumbers({ a: 1 })).toBe(false);
  });

  it('should return false for a boolean', () => {
    expect(isArrayOfNumbers(true)).toBe(false);
  });
});
