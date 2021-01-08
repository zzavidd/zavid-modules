import React, { ReactElement, MouseEvent } from 'react';
import { deformatParagraph, formatParagraph } from './formatting/section';
import { FormatCSS, newLinesExceptNumberedListsRegex } from './regex';

/**
 * Apply rich formatting to text.
 * @param fullText The text to format
 * @param options The formatitng options.
 */
export const formatText = (
  fullText: string,
  options: FormatTextOptions = {}
): ReactElement => {
  if (!fullText) return <></>;

  const formattedText = fullText
    .split(newLinesExceptNumberedListsRegex)
    .map((paragraph, key) => formatParagraph(paragraph, key, options));

  return <>{formattedText}</>;
};

/**
 * Remove rich formatting from text, stripping it down to plain text.
 * @param fullText The text to deformat.
 * @param options The deformatting options.
 */
export const deformatText = (
  fullText: string,
  options: DeformatTextOptions = {}
): string => {
  if (!fullText) return '';

  const { joinDelimiter = ' ' } = options;

  const deformattedText = fullText
    .split('\n')
    .map(deformatParagraph)
    .join(joinDelimiter);

  return deformattedText;
};

/**
 * Apply substitutions to placeholder variables in text.
 * @param text The text which contains variables to be substituted.
 * @param substitutions The map of substitutions.
 */
export const applySubstitutions = (
  text: string,
  substitutions: Record<string, string>
): string => {
  if (text) {
    const variableRegex = new RegExp(/\$\{(.*?)\}/g); // Regex for substitutions
    text = text.replace(variableRegex, (match, p1) => {
      return substitutions[p1] || '';
    });
  }
  return text;
};

/**
 * Truncates text to a certain number of characters.
 * @param originalText The text to be truncated.
 * @param options The truncation options.
 */
export const truncateText = (
  originalText: string,
  options: TruncateOptions = {}
): string => {
  if (!originalText) return '';

  const { limit = 45, keepRichFormatting = false } = options;

  let text = originalText;
  if (!keepRichFormatting) text = deformatText(originalText);
  const truncatedText = text.split(' ').slice(0, limit).join(' ');
  if (truncatedText.length <= limit) return originalText;

  return `${truncatedText}....`;
};

/**
 * Extracts an excerpt from text by deformatting it and retrieving the first paragraph.
 * @param originalText The text to extract the excerpt from.
 */
export const extractExcerpt = (originalText: string): string => {
  if (!originalText) return '';
  const deformattedText = deformatText(originalText);
  const [excerpt] = deformattedText.split(/\n|\s{2,}/).filter((e) => e);
  return excerpt;
};

export type FormatTextOptions = {
  css?: FormatCSS;
  inline?: boolean;
  socialWrappers?: SocialWrappers;
  onLongPress?: onLongPress;
};

export type DeformatTextOptions = {
  joinDelimiter?: string;
};

export type TruncateOptions = {
  limit?: number;
  keepRichFormatting?: boolean;
};

type SocialWrappers = {
  Tweet?: any;
  InstagramPost?: any;
};

export type onLongPress = {
  action?: (text: string) => void;
  duration?: number;
};
