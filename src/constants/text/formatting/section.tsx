import React, { ReactElement } from 'react';
import { FormatTextOptions } from '..';
import { applyEmphasisFormatting, removeEmphasisFormatting } from './emphasis';
import { sectionRegexMapping, Section, FormatCSSImage } from '../regex';

/**
 * Formats a paragraph of text.
 * @param paragraph The paragraph to be formatted.
 * @param key The paragraph index.
 * @param options The formatting options.
 */
export const formatParagraph = (
  paragraph: string,
  key: number,
  options: FormatTextOptions = {}
): ReactElement => {
  if (!paragraph) return <></>;

  const {
    css = {},
    inline = false,
    socialWrappers: { Tweet, InstagramPost } = {}
  } = options;

  const foundSection = Object.entries(sectionRegexMapping).find(([, regex]) =>
    regex.test(paragraph)
  );

  const [section, regex] = foundSection!;
  const [, text] = paragraph.match(regex)!;

  if (foundSection) {
    switch (section) {
      case Section.HEADING:
        return (
          <h1 className={css['heading']} key={key}>
            {text}
          </h1>
        );
      case Section.SUBHEADING:
        return (
          <h2 className={css['subheading']} key={key}>
            {text}
          </h2>
        );
      case Section.IMAGE:
        const [, alt, src, isFloat] = paragraph.match(regex)!;
        const { float, full } = (css['image'] as FormatCSSImage) || {};
        const className = isFloat ? float : full;
        return (
          <div className={className} key={key}>
            <img src={src} alt={alt} />
          </div>
        );
      case Section.DIVIDER:
        return (
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
      case Section.BULLET_LIST:
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

        return (
          <ul style={{ paddingInlineStart: '1em' }} key={key}>
            {bulletListItems}
          </ul>
        );
      case Section.HYPHEN_LIST_ITEM:
        return (
          <div className={css['list-item']} key={key}>
            <span>-</span>
            <span>{applyEmphasisFormatting(text, css)}</span>
          </div>
        );
      case Section.NUMBERED_LIST:
        const [, isSpacedNumberedBlock, numberedList] = paragraph.match(regex)!;
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

        return (
          <ol style={{ paddingInlineStart: '1.5em' }} key={key}>
            {numberedListItems}
          </ol>
        );
      case Section.BLOCKQUOTE:
        return (
          <div className={css['blockquote']} key={key}>
            {applyEmphasisFormatting(text, css)}
          </div>
        );
      case Section.TWEET:
        const tweetId = paragraph.match(regex)![1];
        if (Tweet) {
          return <Tweet id={tweetId} key={key} />;
        } else {
          const url = `https://www.twitter.com/zzavidd/status/${tweetId}`;
          return (
            <div className={css['twitter-button']} key={key}>
              <a href={url} rel={'noopener noreferrer'}>
                View Tweet
              </a>
            </div>
          );
        }
      case Section.INSTAGRAM:
        const igUrl = paragraph.match(regex)![1];
        if (InstagramPost) {
          return <InstagramPost url={igUrl} key={key} />;
        } else {
          return (
            <div className={css['instagram-button']} key={key}>
              <a href={igUrl} rel={'noopener noreferrer'}>
                View Instagram Post
              </a>
            </div>
          );
        }
      case Section.SPOTIFY:
        const spotifyUrl = paragraph.match(regex)![1];
        return (
          <iframe
            src={spotifyUrl}
            height={'400'}
            width={'100%'}
            frameBorder={'0'}
            allow={'encrypted-media'}
          />
        );
      case Section.SOUNDCLOUD:
        const soundcloudUrl = paragraph.match(regex)![1];
        return (
          <iframe
            width={'100%'}
            height={'300'}
            scrolling={'no'}
            frameBorder={'no'}
            src={
              `https://w.soundcloud.com/player/?url=${soundcloudUrl}&color=%23ff5500&` +
              `auto_play=false&hide_related=true&show_comments=false&show_user=true&` +
              `show_reposts=false&show_teaser=true&visual=true`
            }></iframe>
        );
      default:
        return <></>;
    }
  } else {
    return inline ? (
      <span className={css['paragraph']} key={key}>
        {applyEmphasisFormatting(paragraph, css)}
      </span>
    ) : (
      <p className={css['paragraph']} key={key}>
        {applyEmphasisFormatting(paragraph, css)}
      </p>
    );
  }
};

/**
 * Deformats a paragraph of text.
 * @param paragraph The paragraph to be deformatted.
 * @param key The paragraph index.
 */
export const deformatParagraph = (paragraph: string, key: number): string => {
  if (!paragraph) return '';

  // Initialise with space separate paragraphs
  const init = key > 0 ? ' ' : '';
  let detransformedParagraph: string = init;

  const foundSection = Object.entries(sectionRegexMapping).find(([, regex]) =>
    regex.test(paragraph)
  );

  if (foundSection) {
    const [section, regex] = foundSection;
    const [, text] = paragraph.match(regex)!;

    switch (section) {
      case Section.HEADING:
      case Section.SUBHEADING:
      case Section.BULLET_LIST:
        detransformedParagraph += text.replace(/\:\:(?:ul(b)|end)/g, '').trim();
        break;
      case Section.HYPHEN_LIST_ITEM:
        detransformedParagraph += text;
        break;
      case Section.NUMBERED_LIST:
        detransformedParagraph += text.replace(/\:\:(?:ol(b)|end)/g, '').trim();
        break;
      case Section.IMAGE:
      case Section.DIVIDER:
      case Section.TWEET:
      case Section.INSTAGRAM:
      case Section.SPOTIFY:
      case Section.SOUNDCLOUD:
        detransformedParagraph = '';
        break;
      case Section.BLOCKQUOTE:
        detransformedParagraph += `"${removeEmphasisFormatting(text)}"`;
        break;
      default:
        break;
    }
  } else {
    detransformedParagraph += removeEmphasisFormatting(paragraph);
  }

  return detransformedParagraph;
};
