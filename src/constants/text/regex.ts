/**
 * A map of emphasis constants.
 * Ordered chronologically.
 */
export enum EMPHASIS {
  ESCAPE = 'escape',
  BOLD = 'bold',
  ITALIC = 'italic',
  BOLDITALIC = 'bold-italic',
  UNDERLINE = 'underline',
  STRIKETHROUGH = 'strikethrough',
  HYPERLINK = 'hyperlink',
  COLOR = 'color',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript'
}

/**
 * A map of section constants.
 * Ordered chronologically
 */
export enum SECTION {
  HEADING = 'heading',
  SUBHEADING = 'subheading',
  IMAGE = 'image',
  DIVIDER = 'divider',
  BULLET_LIST = 'bullet',
  HYPHEN_LIST_ITEM = 'hyphen',
  NUMBERED_LIST = 'numbered',
  BLOCKQUOTE = 'blockquote',
  TWEET = 'tweet',
  INSTAGRAM = 'instagram-post',
  SPOTIFY = 'spotify-track',
  SOUNDCLOUD = 'soundcloud-track'
}

/**
 * The regex mapping for emphasis constants.
 * Ordered in terms of power.
 */
export const emphasisRegexMapping: EmphasisRegexMapping = {
  [EMPHASIS.ESCAPE]: {
    pure: new RegExp(/\\(.*?)\\/),
    split: new RegExp(/(\\.*?\\)/)
  },
  [EMPHASIS.HYPERLINK]: {
    pure: new RegExp(/\[(.*?)\]\((.*?)\)/),
    split: new RegExp(/(\[.*?\]\(.*?\))/)
  },
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
  [EMPHASIS.SUPERSCRIPT]: {
    pure: new RegExp(/\^{2}(.*?)\^{2}/),
    split: new RegExp(/(\^{2}.*?\^{2})/)
  },
  [EMPHASIS.SUBSCRIPT]: {
    pure: new RegExp(/\^{1}(.*?)\^{1}/),
    split: new RegExp(/(\^{1}.*?\^{1})/)
  },
  [EMPHASIS.COLOR]: {
    pure: new RegExp(/\<(\#[a-fA-F0-9]{6})\>\{(.*?)\}/),
    split: new RegExp(/(\<\#[a-fA-F0-9]{6}\>\{.*?\})/)
  }
};

/**
 * The regex mapping for section constants.
 * Ordered in terms of power.
 */
export const sectionRegexMapping: SectionRegexMapping = {
  [SECTION.HEADING]: new RegExp(/^\#\s(.*?)$/),
  [SECTION.SUBHEADING]: new RegExp(/^\#{2}\s(.*?)$/),
  [SECTION.IMAGE]: new RegExp(/^\!\[(.*?)\]\((.*?)\)(F?)$/),
  [SECTION.DIVIDER]: new RegExp(/^(\-{3}|\_{3})$/),
  [SECTION.BULLET_LIST]: new RegExp(/\:\:ul(b)?\n((?:\+\s*.*\n+)*)\:\:end/),
  [SECTION.HYPHEN_LIST_ITEM]: new RegExp(/^\-\s*(.*?)$/),
  [SECTION.NUMBERED_LIST]: new RegExp(
    /\:\:ol(b)?\n((?:(?:[0-9]+[\.\)]|\+)\s*.*\n+)*)\:\:end/
  ),
  [SECTION.BLOCKQUOTE]: new RegExp(/^\>\s(.*?)$/),
  [SECTION.TWEET]: new RegExp(/^\!\{Tweet\}\(([0-9]+)\)$/i),
  [SECTION.INSTAGRAM]: new RegExp(/^\!\{Insta\}\((.*?)\)$/i),
  [SECTION.SPOTIFY]: new RegExp(/^\!\{Spotify\}\((.*?)\)$/i),
  [SECTION.SOUNDCLOUD]: new RegExp(/^\!\{Soundcloud\}\((.*?)\)$/i)
};

/** Regular expression for new lines except numbered lists. */
export const newLinesExceptNumberedListsRegex = new RegExp(
  /\n\n(?![0-9]+[\.\)])/
);

type EmphasisRegexMapping = {
  [key in EMPHASIS]: EmphasisRegexValue;
};

type SectionRegexMapping = {
  [key in SECTION]: RegExp;
};

export interface EmphasisRegexValue {
  pure: RegExp;
  split: RegExp;
}

export interface FormatCSS {
  heading?: string;
  subheading?: string;
  paragraph?: string;
  image?: string;
  divider?: string;
  blockquote?: string;
  hyperlink?: string;
  superscript?: string
  subscript?: string
  'list-item'?: string;
  'twitter-button'?: string;
  'instagram-button'?: string;
}

export interface FormatCSSImage {
  float?: string;
  full?: string;
}
