/**
 * Checks if a value is falsy.
 * @param {any} value The value to check.
 * @returns {boolean} True if falsy.
 */
exports.isFalsy = (value) => {
  if (value === undefined) return true;
  if (value === null) return true;
  if (value === false) return true;
  if (value === '') return true;
  if (value === 0) return true;
  if (isNaN(value)) return true;

  if (value.length === 0) return true;
  return false;
};
