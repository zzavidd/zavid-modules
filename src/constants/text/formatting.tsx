import React from 'react';
import { applyEmphasisFormatting, removeEmphasisFormatting } from './emphasis';
import {
  FormatCSS,
  FormatCSSImage,
  newLinesExceptNumberedListsRegex,
  SECTION,
  sectionRegexMapping
} from './regex';

export const formatText = (fullText: string, options: FormatOptions = {}) => {
  if (!fullText) return null;

  const {
    css = {} as FormatCSS,
    inline = false,
    socialWrappers = {}
  } = options;
  const { Tweet, InstagramPost } = socialWrappers;

  const formattedText = fullText
    .split(newLinesExceptNumberedListsRegex)
    .map((paragraph, key) => {
      if (!paragraph) return '';

      let transformedParagraph;

      const foundSection = Object.entries(
        sectionRegexMapping
      ).find(([, regex]) => regex.test(paragraph));

      if (foundSection) {
        const [section, regex] = foundSection;
        const [, text] = paragraph.match(regex)!;

        switch (section) {
          case SECTION.HEADING:
            transformedParagraph = (
              <h1 className={css['heading']} key={key}>
                {text}
              </h1>
            );
            break;
          case SECTION.SUBHEADING:
            transformedParagraph = (
              <h2 className={css['subheading']} key={key}>
                {text}
              </h2>
            );
            break;
          case SECTION.IMAGE:
            const [, alt, src, isFloat] = paragraph.match(regex)!;
            const { float, full } = (css['image'] as FormatCSSImage) || {};
            const className = isFloat ? float : full;
            transformedParagraph = (
              <div className={className} key={key}>
                <img src={src} alt={alt} />
              </div>
            );
            break;
          case SECTION.DIVIDER:
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
          case SECTION.BULLET_LIST:
            const [, isSpacedBulletBlock, bulletList] = paragraph.match(regex)!;
            const bulletListItems = bulletList
              .split('\n')
              .filter((e) => e)
              .map((item, key) => {
                const [, value] = item.match(/^\+\s*(.*)$/)!;
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
          case SECTION.HYPHEN_LIST_ITEM:
            transformedParagraph = (
              <div className={css['list-item']} key={key}>
                <span>-</span>
                <span>{applyEmphasisFormatting(text, css)}</span>
              </div>
            );
            break;
          case SECTION.NUMBERED_LIST:
            const [, isSpacedNumberedBlock, numberedList] = paragraph.match(
              regex
            )!;
            const numberedListItems = numberedList
              .split('\n')
              .filter((e) => e)
              .map((item, key) => {
                const [, value] = item.match(/^(?:[0-9]+[\.\)]|\+)\s*(.*)$/)!;
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
          case SECTION.BLOCKQUOTE:
            transformedParagraph = (
              <div className={css['blockquote']} key={key}>
                {applyEmphasisFormatting(text, css)}
              </div>
            );
            break;
          case SECTION.TWEET:
            const tweetId = paragraph.match(regex)![1];
            if (Tweet) {
              transformedParagraph = <Tweet id={tweetId} key={key} />;
            } else {
              const url = `https://www.twitter.com/zzavidd/status/${tweetId}`;
              transformedParagraph = (
                <div className={css['twitter-button']} key={key}>
                  <a href={url} rel={'noopener noreferrer'}>
                    View Tweet
                  </a>
                </div>
              );
            }
            break;
          case SECTION.INSTAGRAM:
            const igUrl = paragraph.match(regex)![1];
            if (InstagramPost) {
              transformedParagraph = <InstagramPost url={igUrl} key={key} />;
            } else {
              transformedParagraph = (
                <div className={css['instagram-button']} key={key}>
                  <a href={igUrl} rel={'noopener noreferrer'}>
                    View Instagram Post
                  </a>
                </div>
              );
            }
            break;
          case SECTION.SPOTIFY:
            const spotifyUrl = paragraph.match(regex)![1];
            transformedParagraph = (
              <iframe
                src={spotifyUrl}
                height={'400'}
                width={'100%'}
                frameBorder={'0'}
                allow={'encrypted-media'}
              />
            );
            break;
          case SECTION.SOUNDCLOUD:
            const soundcloudUrl = paragraph.match(regex)![1];
            transformedParagraph = (
              <iframe
                width={'100%'}
                height={'300'}
                scrolling={'no'}
                frameBorder={'no'}
                src={`https://w.soundcloud.com/player/?url=${soundcloudUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe>
            );
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

export const deformatText = (
  fullText: string,
  options: DeformatOptions = {}
) => {
  if (!fullText) return '';

  const { joinDelimiter = ' ' } = options;

  const deformattedText = fullText
    .split('\n')
    .map((paragraph, index) => {
      if (!paragraph) return null;

      // Initialise with space separate paragraphs
      const init = index > 0 ? ' ' : '';
      let detransformedParagraph: string | null = init;

      const foundSection = Object.entries(
        sectionRegexMapping
      ).find(([, regex]) => regex.test(paragraph));

      if (foundSection) {
        const [section, regex] = foundSection;
        const [, text] = paragraph.match(regex)!;

        switch (section) {
          case SECTION.HEADING:
          case SECTION.SUBHEADING:
          case SECTION.BULLET_LIST:
            detransformedParagraph += text
              .replace(/\:\:(?:ul(b)|end)/g, '')
              .trim();
            break;
          case SECTION.HYPHEN_LIST_ITEM:
            detransformedParagraph += text;
            break;
          case SECTION.NUMBERED_LIST:
            detransformedParagraph += text
              .replace(/\:\:(?:ol(b)|end)/g, '')
              .trim();
            break;
          case SECTION.IMAGE:
          case SECTION.DIVIDER:
          case SECTION.TWEET:
          case SECTION.INSTAGRAM:
          case SECTION.SPOTIFY:
          case SECTION.SOUNDCLOUD:
            detransformedParagraph = null;
            break;
          case SECTION.BLOCKQUOTE:
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
    .join(joinDelimiter);

  return deformattedText;
};

export const applySubstitutions = (
  text: string,
  substitutions: Substitutions
): string => {
  if (text) {
    const variableRegex = new RegExp(/\$\{(.*?)\}/g); // Regex for substitutions
    text = text.replace(variableRegex, (match, p1) => {
      return substitutions[p1] || '';
    });
  }
  return text;
};

export const truncateText = (
  originalText: string,
  options: TruncateOptions = {}
): string => {
  if (!originalText) return '';

  const { limit = 45 } = options;
  const deformattedText = deformatText(originalText);
  const truncatedText = deformattedText.split(' ').slice(0, limit).join(' ');
  if (truncatedText.length <= limit) return originalText;

  return `${truncatedText}....`;
};

export const extractExcerpt = (originalText: string): string => {
  if (!originalText) return '';
  const deformattedText = deformatText(originalText);
  const [excerpt] = deformattedText.split(/\n|\s{2,}/).filter((e) => e);
  return excerpt;
};

export interface FormatOptions {
  css?: FormatCSS;
  inline?: boolean;
  socialWrappers?: SocialWrappers;
}

export interface DeformatOptions {
  joinDelimiter?: string;
}

export interface TruncateOptions {
  limit?: number;
}

interface SocialWrappers {
  Tweet?: any;
  InstagramPost?: any;
}

export interface Substitutions {
  [key: string]: string;
}
