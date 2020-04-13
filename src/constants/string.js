/**
 * Convert an array of strings to a list
 * @param {string[]} items - An array of strings.
 * @param {string} [conjunction=&] - The conjunction word or character to separate the final two elements of the list.
 */
const toPunctuatedList = (items, conjunction = '&') => {
  const elements = [items.slice(0, -1).join(', '), items.slice(-1)[0]];
  const str = elements.join(items.length < 2 ? '' : ` ${conjunction} `);
  return str;
}

/**
 * Created formatted slugs for URLs.
 * @param {string} value - The value which the slug is based off.
 * @returns {string} A clean slug.
 */
const constructCleanSlug = (value) => {
  return value.toLowerCase()      // Turn to lowercase
  .replace(/[^a-zA-Z 0-9]+/g, '')   // Remove all non-alphanumeric characters
  .replace(/\b(a|an|and|the|but|or|so)\b/g, '') // Remove stopwords
  .replace(/\s+/g, '-');            // Replace spaces with dashes
};

/**
 * Created simple slugs out of names
 * e.g. "Zavid Egbue" -> "zavide"
 * @param {string} name - The value which the slug is based off.
 * @returns {string} Formatted first name and one character of last name.
 */
const constructSimpleNameSlug = (name) => {
  let array = name.split(/[\W_]+/);

  for (let i = 0; i < array.length; i++) {
    if (i < 1) continue;
    array[i] = array[i].substring(0, 1);
  }

  const slug = array.join();

  return slug.toLowerCase()          // Turn to lowercase
  .replace(/[^a-zA-Z 0-9]+/g, '');   // Remove all non-alphanumeric characters
};

const commaSeparatedToArray = (tags) => {
  let list = [];
  tags.trim().split(',').forEach(tag => {
    list.push(tag.toLowerCase().trim());
  });

  list = list.filter(el => el);

  return list;
}

module.exports = {
  toPunctuatedList,
  constructCleanSlug,
  constructSimpleNameSlug,
  commaSeparatedToArray
}