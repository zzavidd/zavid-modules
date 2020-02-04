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

module.exports = {
  toPunctuatedList
}