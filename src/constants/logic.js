/**
 * Checks if a value is falsy.
 * @param {any} input The value to check.
 * @returns {boolean} True if falsy.
 */
exports.isFalsy = (input) => {
  if (input === undefined) return true;
  if (input === null) return true;
  if (input === false) return true;
  if (input === '') return true;
  if (input === 0) return true;
  if (input.length === 0) return true;
  if (typeof input === 'object'){
    if (Object.values(input).length === 0) return true;
  } 
  return false;
};
