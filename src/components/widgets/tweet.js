import React, { useEffect, useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export const Tweet = ({id}) => {
  // const [isLoaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   setLoaded(true);
  // }, [isLoaded]);

  // if (!isLoaded) return null;

  return <TwitterTweetEmbed tweetId={id} />;
};