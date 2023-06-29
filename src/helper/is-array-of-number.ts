function isArrayOfNumbers(input) {
  if (Array.isArray(input)) {
    return input.every(element => typeof element === 'number');
  } else {
    return false;
  }
}

exports.isArrayOfNumbers = isArrayOfNumbers
