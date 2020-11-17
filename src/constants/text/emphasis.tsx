import React from 'react';
import { EMPHASIS, emphasisRegexMapping, EmphasisRegexValue, FormatCSS } from './regex';

export const applyEmphasisFormatting = (
  paragraph: string,
  css?: FormatCSS
) => {
  if (!paragraph) return '';

  // Combine all emphasis regular expressions for splitting.
  const emphasisRegexList = Object.values(emphasisRegexMapping).map(
    (regex: EmphasisRegexValue) => regex.split.source
  );
  const combinedEmphasisRegex = new RegExp(emphasisRegexList.join('|'), 'g');

  // Split by combined regex into fragments.
  const fragments = paragraph
    .split(combinedEmphasisRegex)
    .filter((e) => e != null);
  const formattedParagraph = fragments.map((fragment, key) => {
    let transformation: string | JSX.Element = fragment;

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
            const textToBoldItalize = applyEmphasisFormatting(matches![1]);
            transformation = (
              <strong key={key}>
                <em>{textToBoldItalize}</em>
              </strong>
            );
            break;
          case EMPHASIS.ITALIC:
            const textToItalize = applyEmphasisFormatting(matches![1]);
            transformation = <em key={key}>{textToItalize}</em>;
            break;
          case EMPHASIS.BOLD:
            const textToBold = applyEmphasisFormatting(matches![1]);
            transformation = <strong key={key}>{textToBold}</strong>;
            break;
          case EMPHASIS.UNDERLINE:
            const textToUnderline = applyEmphasisFormatting(matches![1]);
            transformation = (
              <span key={key} style={{ textDecoration: 'underline' }}>
                {textToUnderline}
              </span>
            );
            break;
          case EMPHASIS.STRIKETHROUGH:
            const textToStrikethrough = applyEmphasisFormatting(
              matches![1]
            );
            transformation = <del key={key}>{textToStrikethrough}</del>;
            break;
          case EMPHASIS.HYPERLINK:
            const textToHyperlink = applyEmphasisFormatting(matches![1]);
            const link = matches![2];
            transformation = (
              <a
                rel={'noopener noreferrer'}
                href={link}
                key={key}
                className={css!['hyperlink']}>
                {textToHyperlink}
              </a>
            );
            break;
          case EMPHASIS.COLOR:
            const color = matches![1];
            const textToColor = applyEmphasisFormatting(matches![2]);
            transformation = (
              <span style={{ color }} key={key}>
                {textToColor}
              </span>
            );
            break;
          case EMPHASIS.SUPERSCRIPT:
            const textToSuper = applyEmphasisFormatting(matches![1]);
            transformation = (
              <sup key={key} className={css!['superscript']}>
                {textToSuper}
              </sup>
            );
            break;
          case EMPHASIS.SUBSCRIPT:
            const textToSub = applyEmphasisFormatting(matches![1]);
            transformation = (
              <sub key={key} className={css!['subscript']}>
                {textToSub}
              </sub>
            );
            break;
          case EMPHASIS.ESCAPE:
            transformation = matches![1];
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

export const removeEmphasisFormatting = (paragraph: string): string => {
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

  const deformattedParagraph = paragraph
    .split(combinedEmphasisRegex)
    .map((fragment) => {
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
            case EMPHASIS.ITALIC:
            case EMPHASIS.BOLD:
            case EMPHASIS.UNDERLINE:
            case EMPHASIS.STRIKETHROUGH:
            case EMPHASIS.HYPERLINK:
            case EMPHASIS.SUPERSCRIPT:
            case EMPHASIS.SUBSCRIPT:
            case EMPHASIS.ESCAPE:
              transformation = matches![1];
              break;
            case EMPHASIS.COLOR:
              transformation = matches![2];
              break;
            default:
              break;
          }
        } catch (e) {
          console.error(e);
        }
      }
      return transformation;
    })
    .filter((e) => e)
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s\./g, '.')
    .replace(/\s+\,/g, ',');

  // 1. Split by regex and replace with deformatted values.
  // 2. Remove blank values.
  // 3. Join separate text by whitespace.
  // 4. Remove unnecessary whitespace characters.
  // 5. Remove whitespace before commas.
  // const deformattedParagraph = paragraph
  //   .split(combinedEmphasisRegex)
  //   .filter((e) => e)
  //   .join(' ')
  //   .replace(/\s{2,}/g, ' ')
  //   .replace(/\s+\,/g, ',');

  return deformattedParagraph;
};