import InstagramEmbed from '@aarnila/react-instagram-embed';
import 'bootstrap/scss/bootstrap.scss';
import React, { PropsWithChildren, useEffect } from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
  RootStateOrAny,
  useDispatch,
  useSelector
} from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { PersistGate } from 'redux-persist/integration/react';
import zTextBuilder from '../src/constants/text/builder';
import { persistor, store } from './lib/reducers';
import './styles.scss';

const Home = () => {
  const dispatch = useDispatch();
  const text = useSelector(({ text }: RootStateOrAny) => text);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    dispatch({
      type: 'SET_TEXT',
      payload: value
    });
  };

  useEffect(() => {
    document.body.className = 'body';
  }, []);

  return (
    <Provider store={store}>
      <div className={'container'}>
        <div className={'editor'}>
          <textarea
            className={'textarea'}
            onChange={handleText}
            value={text}
            placeholder={'Type some text...'}
          />
        </div>
        <div>
          <div>
            <Title>Preview:</Title>
            <Paragraph>{text}</Paragraph>
          </div>
        </div>
      </div>
    </Provider>
  );
};

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
        Tweet: ({ id }: Tweet) => {
          return <TwitterTweetEmbed tweetId={id} />;
        },
        InstagramPost: ({ url }: InstagramPost) => {
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
      onLongPress: (text: string) => {
        alert(text);
      }
    })
    .build() as ReactNode;

  return <pre className={'preview-text'}>{text}</pre>;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

interface Paragraph {
  children: string;
  substitutions?: ParagraphSubstitutions;
  truncate?: number;
}

interface ParagraphSubstitutions {
  [key: string]: string;
}

interface Tweet {
  id: number;
}

interface InstagramPost {
  url: string;
}
