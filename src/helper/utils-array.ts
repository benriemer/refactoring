function toArray(input) {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
}

module.exports = toArray;


