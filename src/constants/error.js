const TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  OBJECT: 'object',
  BOOLEAN: 'boolean',
  DATE: 'Date',
}

/**
 * Throw type error if invalid argument.
 * @param {any} value - The value to be validated.
 * @param {string[]} types - The type(s) the value is validated against.
 * @param {string} message - The error message if the value is invalid.
 * @returns {boolean} True if valid. False is not.
 */
const validateArgumentType = (value, types, message) => {
  const isValid = types.some(element => typeof(value) === element);
  if (!isValid) throw new TypeError(message);
  return true;
}

module.exports = {
  TYPE,

  validateArgumentType
}