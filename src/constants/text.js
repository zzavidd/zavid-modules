const React = require('react');

/** A map of emphasis constants */
const EMPHASIS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  HYPERLINK: 'hyperlink'
};

const SECTIONS = {
  TITLE: 'title',
  SUBTITLE: 'subtitle',
  IMAGE: 'image'
};

/** The regex for an emphasis constant */
const emphasisRegexMapping = {
  [EMPHASIS.BOLD]: {
    pure: new RegExp(/\*\*(.*?)\*\*/),
    split: new RegExp(/(\*\*.*?\*\*)/)
  },
  [EMPHASIS.ITALIC]: {
    pure: new RegExp(/\*(.*?)\*/),
    split: new RegExp(/(\*.*?\*)/)
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

const sectionRegexMapping = {
  [SECTIONS.TITLE]: new RegExp(/^\#\s(.*?)$/),
  [SECTIONS.SUBTITLE]: new RegExp(/^\#\#\s(.*?)$/),
  [SECTIONS.IMAGE]: new RegExp(/^\!\[(.*?)\]\((.*?)\)$/)
};

const emphasisRegexList = Object.values(emphasisRegexMapping).map(
  (regex) => regex.split.source
);
const combinedRegex = new RegExp(emphasisRegexList.join('|'), 'g');

/**
 * Apply markdown-like formatting to text.
 * @param {string} fullText - The text to which formatting needs to be applied.
 * @param {Object} hyperlinkClass - The CSS class for hyperlinks.
 * @returns The formatted text.
 */
const applyEmphasisFormatting = (fullText, hyperlinkClass) => {
  if (!fullText) return '';

  const fragments = fullText.split(combinedRegex).filter((e) => e != null);
  const finalText = fragments.map((fragment, key) => {
    let transformation;

    const foundEmphasis = Object.entries(
      emphasisRegexMapping
    ).find(([, regex]) => regex.pure.test(fragment));

    if (foundEmphasis) {
      const [emphasis, { pure: regex }] = foundEmphasis;
      const [, text] = fragment.match(regex);

      switch (emphasis) {
        case EMPHASIS.BOLD:
          transformation = <strong key={key}>{text}</strong>;
          break;
        case EMPHASIS.ITALIC:
          transformation = <em key={key}>{text}</em>;
          break;
        case EMPHASIS.UNDERLINE:
          transformation = (
            <a key={key} style={{ textDecoration: 'underline' }}>
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
              className={hyperlinkClass}>
              {text}
            </a>
          );
          break;
        default:
          break;
      }
    } else {
      transformation = fragment;
    }

    return transformation;
  });

  return finalText;
};

/**
 * Apply the prefix formatting for hierarchical or listed text.
 * Text needs this formatting first before markdown formatting is applied.
 * @param {string} text - The text to which hierarchical formatting will be applied.
 * @param {Object} hyperlinkClass - The CSS class to be passed into the next function.
 * @returns The text with formatting applied.
 */
exports.prefixFormatting = (text, hyperlinkClass) => {
  if (text === null) return '';

  const finalText = text.split('\n').map((paragraph, key) => {
    if (!paragraph) return null;

    let transformedParagraph;

    const foundSection = Object.entries(sectionRegexMapping).find(([, regex]) =>
      regex.test(paragraph)
    );

    if (foundSection) {
      const [section, regex] = foundSection;
      const [, text] = paragraph.match(regex);

      switch (section) {
        case SECTIONS.TITLE:
          transformedParagraph = <h1 key={key}>{text}</h1>;
          break;
        case SECTIONS.SUBTITLE:
          transformedParagraph = <h2 key={key}>{text}</h2>;
          break;
        case SECTIONS.IMAGE:
          const imgSrc = paragraph.match(regex)[2];
          console.log(text, imgSrc);
          transformedParagraph = (
            <div key={key}>
              <img src={imgSrc} alt={text} style={{ width: '100%' }} />
            </div>
          );
          break;
        default:
          break;
      }
    } else {
      transformedParagraph = (
        <p key={key}>{applyEmphasisFormatting(paragraph, hyperlinkClass)}</p>
      );
    }

    // switch (paragraph.charAt(0)) {

    //   // For images
    //   case ';':
    //     const isFullImage = paragraph.charAt(1) === ';';
    //     const imageType = isFullImage ? 'fullImage' : 'floatImage';
    //     const offset = isFullImage ? 2 : 1;

    //     return (
    //       <div className={css[imageType]} key={key}>
    //         <img
    //           src={`${cloudinary.url}/public/fillers/${paragraph.substring(
    //             offset
    //           )}`}
    //         />
    //       </div>
    //     );

    //   // For dividers
    //   case '_':
    //     return <Divider key={key} style={{ margin: '2rem 0 1rem' }} />;

    //   // For list items
    //   case '•':
    //     return (
    //       <div className={css.listitem} key={key}>
    //         <span>●</span>
    //         <span>{this.applyEmphasisFormatting(paragraph.substring(1).trim())}</span>
    //       </div>
    //     );

    //   // For normal paragraph text
    //   default:
    //     const finalText = this.applyEmphasisFormatting(paragraph, hyperlinkClass);
    //     return (
    //       <p className={css.body} key={key}>
    //         {finalText}
    //       </p>
    //     );
    // }

    return transformedParagraph;
  });

  return finalText;
};
