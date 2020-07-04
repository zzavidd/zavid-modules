const React = require('react');
const STYLES = require('./_styles');
const { EMPHASIS, emphasisRegexMapping } = require('./regex');

/**
 * Apply emphasis formatting to paragraph of text.
 * @param {string} paragraph - The text to which formatting needs to be applied.
 * @param {object} css - The CSS classes of styling.
 * @returns {React.Component} The formatted text as a component.
 */
exports.applyEmphasisFormatting = (paragraph, css) => {
  if (!paragraph) return '';

  // Combine all emphasis regular expressions for splitting
  const emphasisRegexList = Object.values(emphasisRegexMapping).map(
    (regex) => regex.split.source
  );
  const combinedEmphasisRegex = new RegExp(emphasisRegexList.join('|'), 'g');

  // Split by combined regex into fragments.
  const fragments = paragraph
    .split(combinedEmphasisRegex)
    .filter((e) => e != null);
  const formattedParagraph = fragments.map((fragment, key) => {
    let transformation = fragment;

    // Find and replace all fragments with components.
    const foundEmphasis = Object.entries(
      emphasisRegexMapping
    ).find(([, regex]) => regex.pure.test(fragment));

    if (foundEmphasis) {
      const [emphasis, { pure: regex }] = foundEmphasis;
      const [, text] = fragment.match(regex);

      switch (emphasis) {
        case EMPHASIS.BOLDITALIC:
          transformation = (
            <strong key={key}>
              <em>{text}</em>
            </strong>
          );
          break;
        case EMPHASIS.BOLD:
          transformation = <strong key={key}>{text}</strong>;
          break;
        case EMPHASIS.ITALIC:
          transformation = <em key={key}>{text}</em>;
          break;
        case EMPHASIS.UNDERLINE:
          transformation = (
            <a key={key} style={STYLES.EMPHASIS.UNDERLINE}>
              {text}
            </a>
          );
          break;
        case EMPHASIS.STRIKETHROUGH:
          transformation = <del key={key}>{text}</del>;
          break;
        case EMPHASIS.HYPERLINK:
          const link = fragment.match(regex)[2];
          transformation = (
            <a
              target={'_blank'}
              rel={'noopener noreferrer'}
              href={link}
              key={key}
              className={css.hyperlink}>
              {text}
            </a>
          );
          break;
        default:
          break;
      }
    }

    return transformation;
  });

  return formattedParagraph;
};

/**
 * Strip emphasis formatting from paragraph of text.
 * @param {string} paragraph - The paragraph text to be deformatted.
 * @returns {string} The resulting deformatted text.
 */
exports.removeEmphasisFormatting = (paragraph) => {
  if (!paragraph) return '';

  // Combine all emphasis regular expressions for splitting.
  // Also, prevent display of hyperlink text on deformat.
  const emphasisRegexList = Object.values(emphasisRegexMapping).map((regex) => {
    if (regex === emphasisRegexMapping[EMPHASIS.HYPERLINK]) {
      regex.pure = new RegExp(/\[(.*?)\]\(.*?\)/);
    }
    return regex.pure.source;
  });
  const combinedEmphasisRegex = new RegExp(emphasisRegexList.join('|'), 'g');

  // 1. Split by regex and replace with deformatted values.
  // 2. Remove blank values.
  // 3. Join separate text by whitespace.
  // 4. Remove unnecessary whitespace characters.
  // 5. Remove whitespace before commas.
  const deformattedParagraph = paragraph
    .split(combinedEmphasisRegex)
    .filter((e) => e)
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\,/g, ',');

  return deformattedParagraph;
};
