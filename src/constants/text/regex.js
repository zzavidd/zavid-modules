/** A map of emphasis constants */
exports.EMPHASIS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  BOLDITALIC: 'boldItalic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  HYPERLINK: 'hyperlink',
  COLOR: 'color'
};

/** A map of section constants */
exports.SECTIONS = {
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  IMAGE: 'image',
  DIVIDER: 'divider',
  BULLET_LIST: 'bullet',
  HYPHEN_LIST_ITEM: 'hyphen',
  NUMBERED_LIST: 'numbered',
  BLOCKQUOTE: 'blockQuote',
  TWEET: 'tweet',
  INSTAPOST: 'instagramPost'
};

/** The regex mapping for emphasis constants */
exports.emphasisRegexMapping = {
  [this.EMPHASIS.BOLDITALIC]: {
    pure: new RegExp(/\*{3}(.*?)\*{3}/),
    split: new RegExp(/(\*{3}.*?\*{3})/)
  },
  [this.EMPHASIS.BOLD]: {
    pure: new RegExp(/\*{2}(.*?)\*{2}/),
    split: new RegExp(/(\*{2}.*?\*{2})/)
  },
  [this.EMPHASIS.ITALIC]: {
    pure: new RegExp(/\*{1}(.*?)\*{1}/),
    split: new RegExp(/(\*{1}.*?\*{1})/)
  },
  [this.EMPHASIS.UNDERLINE]: {
    pure: new RegExp(/\_(.*?)\_/),
    split: new RegExp(/(\_.*?\_)/)
  },
  [this.EMPHASIS.STRIKETHROUGH]: {
    pure: new RegExp(/\~(.*?)\~/),
    split: new RegExp(/(\~.*?\~)/)
  },
  [this.EMPHASIS.HYPERLINK]: {
    pure: new RegExp(/\[(.*?)\]\((.*?)\)/),
    split: new RegExp(/(\[.*?\]\(.*?\))/)
  },
  [this.EMPHASIS.COLOR]: {
    pure: new RegExp(/\<(\#[a-zA-Z0-9]{6})\>\[(.*?)\]/),
    split: new RegExp(/(\<\#[a-zA-Z0-9]{6}\>\[.*?\])/)
  }
};

/** The regex mapping for section constants */
exports.sectionRegexMapping = {
  [this.SECTIONS.HEADING]: new RegExp(/^\#\s(.*?)$/),
  [this.SECTIONS.SUBHEADING]: new RegExp(/^\#{2}\s(.*?)$/),
  [this.SECTIONS.IMAGE]: new RegExp(/^\!\[(.*?)\]\((.*?)\)(F?)$/),
  [this.SECTIONS.DIVIDER]: new RegExp(/^(\-{3}|\_{3})$/),
  [this.SECTIONS.BULLET_LIST]: new RegExp(
    /\:\:ul(b)?\n((?:\+\s*.*\n+)*)\:\:end/
  ),
  [this.SECTIONS.HYPHEN_LIST_ITEM]: new RegExp(/^\-\s*(.*?)$/),
  [this.SECTIONS.NUMBERED_LIST]: new RegExp(
    /\:\:ol(b)?\n((?:[0-9]+[\.\)]\s*.*\n+)*)\:\:end/
  ),
  [this.SECTIONS.BLOCKQUOTE]: new RegExp(/^\>\s(.*?)$/),
  [this.SECTIONS.TWEET]: new RegExp(/^\!\{Tweet\}\(([0-9]+)\)$/i),
  [this.SECTIONS.INSTAPOST]: new RegExp(/^\!\{Insta\}\((.*?)\)$/i)
};

exports.newLinesExceptNumberedListsRegex = new RegExp(/\n\n(?![0-9]+[\.\)])/);
