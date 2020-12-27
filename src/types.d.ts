export interface FormatCSS {
  heading?: string;
  subheading?: string;
  paragraph?: string;
  image?: FormatCSSImage;
  divider?: string;
  blockquote?: string;
  hyperlink?: string;
  superscript?: string;
  subscript?: string;
  'list-item'?: string;
  'twitter-button'?: string;
  'instagram-button'?: string;
  custom?: string;
}

type FormatCSSImage = {
  float?: string;
  full?: string;
};
