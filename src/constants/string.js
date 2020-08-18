/**
 * Generate a random string of characters.
 * @param {string} length - The length of the string.
 * @returns {string} The random string.
 */
exports.generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * // TODO: Test
 * Make a string title case.
 * @param {string} string - The string to be converted.
 * @returns {string} The string in title case.
 */
exports.toTitleCase = (string) => {
  if (!string || typeof string !== 'string') return null;

  const sentence = string.toLowerCase().split(' ');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(' ');
};

/**
 * Convert an array of strings to a list
 * @param {string[]} items - An array of strings.
 * @param {string} [conjunction] - The conjunction word or character to separate the final
 * two elements of the list. Defaults to '&'
 * @returns {string} A correct-conjoined list.
 */
exports.toPunctuatedList = (items, conjunction = '&') => {
  const elements = [items.slice(0, -1).join(', '), items.slice(-1)[0]];
  const str = elements.join(items.length < 2 ? '' : ` ${conjunction} `);
  return str;
};

/**
 * Create formatted slugs for URLs.
 * @param {...string} input - The value which the slug is based off.
 * @returns {string} A clean slug.
 */
exports.constructCleanSlug = (...input) => {
  return input
    .join(' ')
    .toLowerCase() // Turn to lowercase
    .replace(/[^a-zA-Z 0-9]+/g, '') // Remove all non-alphanumeric characters
    .replace(/\b(a|an|and|the|but|or|so)\b/g, '') // Remove stopwords
    .replace(/\s+/g, '-'); // Replace spaces with dashes
};

/**
 * Create simple slugs out of names
 * e.g. "Zavid Egbue" -> "zavide"
 * @param {string} name - The value which the slug is based off.
 * @returns {string} Formatted first name and one character of last name.
 */
exports.constructSimpleNameSlug = (name) => {
  let array = name.split(/[\W_]+/);

  for (let i = 0; i < array.length; i++) {
    if (i < 1) continue;
    array[i] = array[i].substring(0, 1);
  }

  const slug = array.join();

  return slug
    .toLowerCase() // Turn to lowercase
    .replace(/[^a-zA-Z 0-9]+/g, ''); // Remove all non-alphanumeric characters
};

/**
 * Transform a string of comma-separated values into an array.
 * @param {string} words - A string of comma-separated values.
 * @returns {string[]} A list of the values as an array.
 */
exports.convertCsvToArray = (words) => {
  if (!words) return [];

  let list = [];
  words
    .trim()
    .split(',')
    .forEach((word) => {
      list.push(word.toLowerCase().trim());
    });

  list = list.filter((el) => el);

  return list;
};

/**
 * Transform an array of strings into a comma-separated list of values.
 * @param {string[]} list - An array of string values.
 * @returns {string} A comma-separated list of values.
 */
exports.convertArrayToCsv = (list) => {
  if (!list || !list.length) return '';
  list = list.filter((el) => el);
  return list.join(', ');
};
