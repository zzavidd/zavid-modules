/**
 * Converts a number to 2 significant figures.
 * @param {number} value - An integer value.
 * @returns {string} The converted number as a string.
 */
exports.makeDoubleDigit = (value) => {
  return (value = value < 10 ? '0' + value : value);
};