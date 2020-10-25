/** 
 * A map of emphasis constants.
 * Ordered chronologically.
 */
exports.EMPHASIS = {
  ESCAPE: 'escape',
  BOLD: 'bold',
  ITALIC: 'italic',
  BOLDITALIC: 'bold-italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  HYPERLINK: 'hyperlink',
  COLOR: 'color',
  SUPERSCRIPT: 'superscript',
  SUBSCRIPT: 'subscript'
};

/**
 * A map of section constants.
 * Ordered chronologically
 */
exports.SECTIONS = {
  HEADING: 'heading',
  SUBHEADING: 'subheading',
  IMAGE: 'image',
  DIVIDER: 'divider',
  BULLET_LIST: 'bullet',
  HYPHEN_LIST_ITEM: 'hyphen',
  NUMBERED_LIST: 'numbered',
  BLOCKQUOTE: 'blockquote',
  TWEET: 'tweet',
  INSTAGRAM: 'instagram-post',
  SPOTIFY: 'spotify-track',
  SOUNDCLOUD: 'soundcloud-track'
};

/**
 * The regex mapping for emphasis constants.
 * Ordered in terms of power.
 */
exports.emphasisRegexMapping = {
  [this.EMPHASIS.ESCAPE]: {
    pure: new RegExp(/\\(.*?)\\/),
    split: new RegExp(/(\\.*?\\)/)
  },
  [this.EMPHASIS.HYPERLINK]: {
    pure: new RegExp(/\[(.*?)\]\((.*?)\)/),
    split: new RegExp(/(\[.*?\]\(.*?\))/)
  },
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
  [this.EMPHASIS.SUPERSCRIPT]: {
    pure: new RegExp(/\^{2}(.*?)\^{2}/),
    split: new RegExp(/(\^{2}.*?\^{2})/)
  },
  [this.EMPHASIS.SUBSCRIPT]: {
    pure: new RegExp(/\^{1}(.*?)\^{1}/),
    split: new RegExp(/(\^{1}.*?\^{1})/)
  },
  [this.EMPHASIS.COLOR]: {
    pure: new RegExp(/\<(\#[a-fA-F0-9]{6})\>\{(.*?)\}/),
    split: new RegExp(/(\<\#[a-fA-F0-9]{6}\>\{.*?\})/)
  }
};

/**
 * The regex mapping for section constants.
 * Ordered in terms of power.
 */
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
    /\:\:ol(b)?\n((?:(?:[0-9]+[\.\)]|\+)\s*.*\n+)*)\:\:end/
  ),
  [this.SECTIONS.BLOCKQUOTE]: new RegExp(/^\>\s(.*?)$/),
  [this.SECTIONS.TWEET]: new RegExp(/^\!\{Tweet\}\(([0-9]+)\)$/i),
  [this.SECTIONS.INSTAGRAM]: new RegExp(/^\!\{Insta\}\((.*?)\)$/i),
  [this.SECTIONS.SPOTIFY]: new RegExp(/^\!\{Spotify\}\((.*?)\)$/i),
  [this.SECTIONS.SOUNDCLOUD]: new RegExp(/^\!\{Soundcloud\}\((.*?)\)$/i),
};

/** Regular expression for new lines except numbered lists. */
exports.newLinesExceptNumberedListsRegex = new RegExp(/\n\n(?![0-9]+[\.\)])/);
