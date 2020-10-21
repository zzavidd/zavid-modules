/**
 * @deprecated
 * Converts a number to 2 significant figures.
 * @param {number} value - An integer value.
 * @returns {string} The converted number as a string.
 */
exports.makeDoubleDigit = (value) => {
  return (value = value < 10 ? '0' + value : value);
};

/**
 * Generates a random number between specified upper and lower bounds.
 * @param {number} start - The lower bound.
 * @param {number} end - The upper bound.
 * @returns {number} The random number generated.
 */
exports.generateRandom = (start, end) => {
  return Math.floor(Math.random() * end) + start;
};
