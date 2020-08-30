const React = require('react');
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
      const matches = fragment.match(regex);

      try {
        switch (emphasis) {
          case EMPHASIS.BOLDITALIC:
            const textToBoldItalize = this.applyEmphasisFormatting(matches[1]);
            transformation = (
              <strong key={key}>
                <em>{textToBoldItalize}</em>
              </strong>
            );
            break;
          case EMPHASIS.ITALIC:
            const textToItalize = this.applyEmphasisFormatting(matches[1]);
            transformation = <em key={key}>{textToItalize}</em>;
            break;
          case EMPHASIS.BOLD:
            const textToBold = this.applyEmphasisFormatting(matches[1]);
            transformation = <strong key={key}>{textToBold}</strong>;
            break;
          case EMPHASIS.UNDERLINE:
            const textToUnderline = this.applyEmphasisFormatting(matches[1]);
            transformation = (
              <span key={key} style={{ textDecoration: 'underline' }}>
                {textToUnderline}
              </span>
            );
            break;
          case EMPHASIS.STRIKETHROUGH:
            const textToStrikethrough = this.applyEmphasisFormatting(
              matches[1]
            );
            transformation = <del key={key}>{textToStrikethrough}</del>;
            break;
          case EMPHASIS.HYPERLINK:
            const textToHyperlink = this.applyEmphasisFormatting(matches[1]);
            const link = matches[2];
            transformation = (
              <a
                target={'_blank'}
                rel={'noopener noreferrer'}
                href={link}
                key={key}
                className={css['hyperlink']}>
                {textToHyperlink}
              </a>
            );
            break;
          case EMPHASIS.COLOR:
            const color = matches[1];
            const textToColor = this.applyEmphasisFormatting(matches[2]);
            transformation = (
              <span style={{ color }} key={key}>
                {textToColor}
              </span>
            );
            break;
          case EMPHASIS.SUPERSCRIPT:
            const textToSuper = this.applyEmphasisFormatting(matches[1]);
            transformation = (
              <sup key={key} className={css['superscript']}>
                {textToSuper}
              </sup>
            );
            break;
          case EMPHASIS.SUBSCRIPT:
            const textToSub = this.applyEmphasisFormatting(matches[1]);
            transformation = (
              <sub key={key} className={css['subscript']}>
                {textToSub}
              </sub>
            );
            break;
          default:
            break;
        }
      } catch (e) {
        console.error(e);
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
      regex.split = new RegExp(/(\[.*?\]\(.*?\))/);
    }
    return regex.split.source;
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
