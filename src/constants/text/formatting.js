const React = require('react');

const {
  applyEmphasisFormatting,
  removeEmphasisFormatting
} = require('./emphasis');
const {
  SECTIONS,
  sectionRegexMapping,
  newLinesExceptNumberedListsRegex
} = require('./regex');

/**
 * Apply markdown-like formatting to a piece of text.
 * @param {string} fullText - The text to which hierarchical formatting will be applied.
 * @param {object} options - A map of options to be applied.
 * @param {object} [options.css] - The CSS styling for the emphasis.
 * @param {boolean} [options.inline] - Whether the component will be inline.
 * @param {object} [options.socialWrappers] - Contains a map of the components for social media embeds.
 * @returns {React.Component} The text with formatting applied.
 */
exports.formatText = (fullText, options = {}) => {
  const { css = {}, inline = false, socialWrappers = {} } = options;
  const { Tweet, InstagramPost } = socialWrappers;
  if (!fullText) return '';

  const formattedText = fullText
    .split(newLinesExceptNumberedListsRegex)
    .map((paragraph, key) => {
      if (!paragraph) return null;

      let transformedParagraph;

      const foundSection = Object.entries(
        sectionRegexMapping
      ).find(([, regex]) => regex.test(paragraph));

      if (foundSection) {
        const [section, regex] = foundSection;
        const [, text] = paragraph.match(regex);

        switch (section) {
          case SECTIONS.HEADING:
            transformedParagraph = (
              <h1 className={css['heading']} key={key}>
                {text}
              </h1>
            );
            break;
          case SECTIONS.SUBHEADING:
            transformedParagraph = (
              <h2 className={css['subheading']} key={key}>
                {text}
              </h2>
            );
            break;
          case SECTIONS.IMAGE:
            const [, alt, src, isFloat] = paragraph.match(regex);
            const className = isFloat ? css['image'].float : css['image'].full;
            transformedParagraph = (
              <div className={className} key={key}>
                <img src={src} alt={alt} />
              </div>
            );
            break;
          case SECTIONS.DIVIDER:
            transformedParagraph = (
              <hr
                className={css['divider']}
                style={{
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  margin: '2rem 0 1rem'
                }}
                key={key}
              />
            );
            break;
          case SECTIONS.BULLET_LIST:
            const [, isSpacedBulletBlock, bulletList] = paragraph.match(regex);
            const bulletListItems = bulletList
              .split('\n')
              .filter((e) => e)
              .map((item, key) => {
                const [, value] = item.match(/^\+\s*(.*)$/);
                return (
                  <li
                    style={{
                      padding: isSpacedBulletBlock ? '.5em 0' : 0,
                      paddingLeft: '.5em'
                    }}
                    key={key}>
                    {applyEmphasisFormatting(value, css)}
                  </li>
                );
              });

            transformedParagraph = (
              <ul style={{ paddingInlineStart: '1em' }} key={key}>
                {bulletListItems}
              </ul>
            );
            break;
          case SECTIONS.HYPHEN_LIST_ITEM:
            transformedParagraph = (
              <div
                className={css['listItem']}
                key={key}>
                <span>-</span>
                <span>{applyEmphasisFormatting(text, css)}</span>
              </div>
            );
            break;
          case SECTIONS.NUMBERED_LIST:
            const [, isSpacedNumberedBlock, numberedList] = paragraph.match(
              regex
            );
            const numberedListItems = numberedList
              .split('\n')
              .filter((e) => e)
              .map((item, key) => {
                const [, value] = item.match(/^[0-9]+[\.\)]\s*(.*)$/);
                return (
                  <li
                    style={{
                      padding: isSpacedNumberedBlock ? '.5em 0' : 0,
                      paddingLeft: '1em'
                    }}
                    key={key}>
                    {applyEmphasisFormatting(value, css)}
                  </li>
                );
              });

            transformedParagraph = (
              <ol style={{ paddingInlineStart: '1.5em' }} key={key}>
                {numberedListItems}
              </ol>
            );
            break;
          case SECTIONS.BLOCKQUOTE:
            transformedParagraph = (
              <div
                className={css['blockquote']}
                key={key}>
                {applyEmphasisFormatting(text, css)}
              </div>
            );
            break;
          case SECTIONS.TWEET:
            if (Tweet) {
              const id = paragraph.match(regex)[1];
              transformedParagraph = <Tweet id={id} key={key} />;
            } else {
              transformedParagraph = null;
            }
            break;
          case SECTIONS.INSTAPOST:
            if (InstagramPost) {
              const url = paragraph.match(regex)[1];
              transformedParagraph = <InstagramPost url={url} key={key} />;
            } else {
              transformedParagraph = null;
            }
            break;
          default:
            break;
        }
      } else {
        transformedParagraph = inline ? (
          <span className={css['paragraph']} key={key}>
            {applyEmphasisFormatting(paragraph, css)}
          </span>
        ) : (
          <p className={css['paragraph']} key={key}>
            {applyEmphasisFormatting(paragraph, css)}
          </p>
        );
      }

      return transformedParagraph;
    });

  return formattedText;
};

/**
 * Strip the formatting from a piece of text.
 * @param {string} fullText - The original text with formatting.
 * @returns {string} The new text void of all formatting.
 */
exports.deformatText = (fullText) => {
  if (!fullText) return '';

  const deformattedText = fullText
    .split('\n')
    .map((paragraph, index) => {
      if (!paragraph) return null;

      // Initialise with space separate paragraphs
      let detransformedParagraph = index > 0 ? ' ' : '';

      const foundSection = Object.entries(
        sectionRegexMapping
      ).find(([, regex]) => regex.test(paragraph));

      if (foundSection) {
        const [section, regex] = foundSection;
        const [, text] = paragraph.match(regex);

        switch (section) {
          case SECTIONS.HEADING:
          case SECTIONS.SUBHEADING:
          case SECTIONS.BULLET_LIST:
            detransformedParagraph += text
              .replace(/\:\:(?:ul(b)|end)/g, '')
              .trim();
            break;
          case SECTIONS.HYPHEN_LIST_ITEM:
            detransformedParagraph += text;
            break;
          case SECTIONS.NUMBERED_LIST:
            detransformedParagraph += text
              .replace(/\:\:(?:ol(b)|end)/g, '')
              .trim();
            break;
          case SECTIONS.IMAGE:
          case SECTIONS.DIVIDER:
          case SECTIONS.TWEET:
            detransformedParagraph = null;
            break;
          case SECTIONS.BLOCKQUOTE:
            detransformedParagraph += `"${removeEmphasisFormatting(text)}"`;
            break;
          default:
            break;
        }
      } else {
        detransformedParagraph += removeEmphasisFormatting(paragraph);
      }

      return detransformedParagraph;
    })
    .join(' ');

  return deformattedText;
};

/**
 * Apply the variable substitutions to the text, swapping placeholders for dynamic values.
 * @param {string} text - The original text containing the variables to be substituted.
 * @param {object} substitutions - The mapping specifying the values to substitute the placeholder variables.
 * @returns {string} The full text with variables substitutions applied.
 */
exports.applySubstitutions = (text, substitutions) => {
  if (text) {
    const variableRegex = new RegExp(/\$\{(.*?)\}/g); // Regex for substitutions
    text = text.replace(variableRegex, (match, p1) => {
      return substitutions[p1] || '';
    });
  }
  return text;
};

/**
 * Truncate a piece of text to a certain number of words.
 * @param {string} originalText - The text to be truncated.
 * @param {object} [options] - The options for truncation.
 * @param {number} [options.limit] - The number of words to be truncated to. Default value is 45.
 * @returns {string} The truncated text.
 */
exports.truncateText = (originalText, options = {}) => {
  if (!originalText) return '';

  const { limit = 45 } = options;
  const deformattedText = this.deformatText(originalText);
  const truncatedText = deformattedText.split(' ').slice(0, limit).join(' ');
  if (truncatedText.length <= limit) return originalText;

  return `${truncatedText}....`;
};

/**
 * Extract an excerpt, which is a single deformatted paragraph, of a piece of text.
 * @param {string} originalText - The original text.
 * @returns {string} The excerpt shown in previews.
 */
exports.extractExcerpt = (originalText) => {
  if (!originalText) return '';
  const deformattedText = this.deformatText(originalText);
  const excerpt = deformattedText.split('\n').filter((e) => e != null)[0];
  return excerpt;
};