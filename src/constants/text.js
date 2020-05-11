const React = require('react');

/** A map of emphasis constants */
const EMPHASIS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  BOLDITALIC: 'boldItalic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  HYPERLINK: 'hyperlink'
};

/** A map of section constants */
const SECTIONS = {
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  IMAGE: 'image',
  DIVIDER: 'divider',
  BULLET_LIST_ITEM: 'bullet',
  HYPHEN_LIST_ITEM: 'hyphen',
  BLOCKQUOTE: 'blockQuote'
};

/** The regex mapping for emphasis constants */
const emphasisRegexMapping = {
  [EMPHASIS.BOLDITALIC]: {
    pure: new RegExp(/\*{3}(.*?)\*{3}/),
    split: new RegExp(/(\*{3}.*?\*{3})/)
  },
  [EMPHASIS.BOLD]: {
    pure: new RegExp(/\*{2}(.*?)\*{2}/),
    split: new RegExp(/(\*{2}.*?\*{2})/)
  },
  [EMPHASIS.ITALIC]: {
    pure: new RegExp(/\*{1}(.*?)\*{1}/),
    split: new RegExp(/(\*{1}.*?\*{1})/)
  },
  [EMPHASIS.UNDERLINE]: {
    pure: new RegExp(/\_(.*?)\_/),
    split: new RegExp(/(\_.*?\_)/)
  },
  [EMPHASIS.STRIKETHROUGH]: {
    pure: new RegExp(/\~(.*?)\~/),
    split: new RegExp(/(\~.*?\~)/)
  },
  [EMPHASIS.HYPERLINK]: {
    pure: new RegExp(/\[(.*?)\]\((.*?)\)/),
    split: new RegExp(/(\[.*?\]\(.*?\))/)
  }
};

/** The regex mapping for section constants */
const sectionRegexMapping = {
  [SECTIONS.HEADING]: new RegExp(/^\#\s(.*?)$/),
  [SECTIONS.SUBHEADING]: new RegExp(/^\#{2}\s(.*?)$/),
  [SECTIONS.IMAGE]: new RegExp(/^\!\[(.*?)\]\((.*?)\)$/),
  [SECTIONS.DIVIDER]: new RegExp(/^(\-{3}|\_{3})$/),
  [SECTIONS.BULLET_LIST_ITEM]: new RegExp(/^[\*\+]\s(.*?)$/),
  [SECTIONS.HYPHEN_LIST_ITEM]: new RegExp(/^\-\s(.*?)$/),
  [SECTIONS.BLOCKQUOTE]: new RegExp(/^\>\s(.*?)$/)
};

/**
 * Apply markdown-like formatting to a piece of text.
 * @param {string} fullText - The text to which hierarchical formatting will be applied.
 * @param {Object} css - The CSS classes of styling.
 * @returns {React.Component} The text with formatting applied.
 */
exports.formatText = (fullText, css) => {
  if (!fullText) return '';

  const formattedText = fullText.split('\n').map((paragraph, key) => {
    if (!paragraph) return null;

    let transformedParagraph;

    const foundSection = Object.entries(sectionRegexMapping).find(([, regex]) =>
      regex.test(paragraph)
    );

    if (foundSection) {
      const [section, regex] = foundSection;
      const [, text] = paragraph.match(regex);

      switch (section) {
        case SECTIONS.HEADING:
          transformedParagraph = (
            <h1 className={css.heading} key={key}>
              {text}
            </h1>
          );
          break;
        case SECTIONS.SUBHEADING:
          transformedParagraph = (
            <h2 className={css.subheading} key={key}>
              {text}
            </h2>
          );
          break;
        case SECTIONS.IMAGE:
          const source = paragraph.match(regex)[2];
          transformedParagraph = (
            <div className={css.image} key={key}>
              <img src={source} alt={text} style={STYLES.SECTIONS.IMAGE} />
            </div>
          );
          break;
        case SECTIONS.DIVIDER:
          transformedParagraph = (
            <hr
              className={css.divider}
              style={STYLES.SECTIONS.DIVIDER}
              key={key}
            />
          );
          break;
        case SECTIONS.BULLET_LIST_ITEM:
          transformedParagraph = (
            <div
              className={css.listItem}
              style={STYLES.SECTIONS.LIST_ITEM}
              key={key}>
              <span>●</span>
              <span>{text}</span>
            </div>
          );
          break;
        case SECTIONS.HYPHEN_LIST_ITEM:
          transformedParagraph = (
            <div
              className={css.listItem}
              style={STYLES.SECTIONS.LIST_ITEM}
              key={key}>
              <span>-</span>
              <span>{text}</span>
            </div>
          );
          break;
        case SECTIONS.BLOCKQUOTE:
          transformedParagraph = (
            <div
              className={css.blockQuote}
              style={STYLES.SECTIONS.BLOCKQUOTE}
              key={key}>
              {applyEmphasisFormatting(text, css)}
            </div>
          );
          break;
        default:
          break;
      }
    } else {
      transformedParagraph = (
        <p className={css.paragraph} key={key}>
          {applyEmphasisFormatting(paragraph, css)}
        </p>
      );
    }

    return transformedParagraph;
  });

  return formattedText;
};

/**
 * // TODO: Prevent hyperlink link remaining present in deformatting
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
          case SECTIONS.BULLET_LIST_ITEM:
          case SECTIONS.HYPHEN_LIST_ITEM:
            detransformedParagraph += text;
            break;
          case SECTIONS.IMAGE:
          case SECTIONS.DIVIDER:
            detransformedParagraph = null;
            break;
          case SECTIONS.BLOCKQUOTE:
            detransformedParagraph += removeEmphasisFormatting(text);
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
 * @param {Object} substitutions - The mapping specifying the values to substitute the placeholder variables.
 * @returns {string} The full text with variables substitutions applied.
 */
exports.applySubstitutions = (text, substitutions) => {
  if (text) {
    const variableRegex = new RegExp(/\$\{(.*?)\}/g); // Regex for substitutions
    text = text.replace(variableRegex, (match, p1) => substitutions[p1]);
  }
  return text;
};

/**
 * Truncate a piece of text to a certain number of words.
 * @param {string} originalText - The text to be truncated.
 * @param {int} [limit] - The number of words to be truncated to. Default value is 45.
 * @returns {string} The truncated text.
 */
exports.truncateText = (originalText, limit = 45) => {
  if (!originalText) return '';
  const deformattedText = this.deformatText(originalText);
  const truncatedText = deformattedText.split(' ').slice(0, limit).join(' ');
  if (truncatedText.length <= limit) return originalText;
  return `${truncatedText}....`;
};

/**
 * Extract an excerpt, which is a single deformatted paragraph, of a piece of text.
 * @param {string} text - The original text.
 * @returns {string} The excerpt shown in previews.
 */
exports.extractExcerpt = (originalText) => {
  if (!originalText) return '';
  const deformattedText = this.deformatText(originalText);
  const excerpt = deformattedText.split('\n').filter((e) => e != null)[0];
  return excerpt;
};

/**
 * Apply emphasis formatting to paragraph of text.
 * @param {string} paragraph - The text to which formatting needs to be applied.
 * @param {Object} css - The CSS classes of styling.
 * @returns {React.Component} The formatted text as a component.
 */
const applyEmphasisFormatting = (paragraph, css) => {
  if (!paragraph) return '';

  // Combine all emphasis regular expressions for splitting
  const emphasisRegexList = Object.values(emphasisRegexMapping).map(
    (regex) => regex.split.source
  );
  const combinedEmphasisRegex = new RegExp(emphasisRegexList.join('|'), 'g');

  // Split by regex and replace with formatted values
  const fragments = paragraph
    .split(combinedEmphasisRegex)
    .filter((e) => e != null);
  const formattedParagraph = fragments.map((fragment, key) => {
    let transformation = fragment;

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

const removeEmphasisFormatting = (paragraph) => {
  if (!paragraph) return '';

  // Combine all emphasis regular expressions for splitting
  const emphasisRegexList = Object.values(emphasisRegexMapping).map(
    (regex) => regex.pure.source
  );
  const combinedEmphasisRegex = new RegExp(emphasisRegexList.join('|'), 'g');

  // Split by regex and replace with deformatted values
  const fragments = paragraph
    .split(combinedEmphasisRegex)
    .filter((e) => e != null);

  const deformattedParagraph = fragments.map((fragment) => fragment).join(' ');
  return deformattedParagraph;
};

const STYLES = {
  SECTIONS: {
    BLOCKQUOTE: {
      borderLeft: '3px solid #dadada',
      color: '#dadada',
      paddingLeft: '1em',
      margin: '1em 0'
    },
    DIVIDER: {
      borderStyle: 'solid',
      borderWidth: '1px',
      margin: '2rem 0 1rem'
    },
    LIST_ITEM: {
      display: 'grid',
      gridTemplateColumns: '1.2em 1fr'
    },
    IMAGE: { width: '100%' }
  },
  EMPHASIS: {
    UNDERLINE: { textDecoration: 'underline' }
  }
};
