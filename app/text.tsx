import InstagramEmbed from '@aarnila/react-instagram-embed';
import 'bootstrap/scss/bootstrap.scss';
import React, { PropsWithChildren, ReactNode } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import zTextBuilder from '../src/constants/text/builder';
import './styles.scss';

export const Title = <P extends unknown>({
  children
}: PropsWithChildren<P>) => {
  return <div className={'preview-heading'}>{children}</div>;
};

export const Paragraph = ({
  children,
  substitutions,
  truncate = 0
}: Paragraph) => {
  const text = new zTextBuilder(children)
    .truncateText({
      limit: truncate
    })
    .applySubstitutions(substitutions!)
    // .deformatText()
    .formatText({
      css: {
        paragraph: 'paragraph',
        custom: 'custom'
      },
      socialWrappers: {
        Tweet: ({ id }: TweetProps) => {
          return <TwitterTweetEmbed tweetId={id} />;
        },
        InstagramPost: ({ url }: InstagramPostProps) => {
          const accessToken = `${process.env.FB_APP_ID}|${process.env.FB_APP_CLIENT}`;
          return (
            <InstagramEmbed
              url={url}
              accessToken={accessToken}
              maxWidth={500}
            />
          );
        }
      },
      onLongPress: {
        action: alert,
        duration: 1000
      }
    })
    .build() as ReactNode;

  return <pre className={'preview-text'}>{text}</pre>;
};

type Paragraph = {
  children: string;
  substitutions?: ParagraphSubstitutions;
  truncate?: number;
};

type ParagraphSubstitutions = {
  [key: string]: string;
};

type TweetProps = {
  id: number;
};

type InstagramPostProps = {
  url: string;
};
