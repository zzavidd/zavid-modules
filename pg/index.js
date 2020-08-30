import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './lib/reducers';

import zText from '../src/constants/text';

import 'bootstrap/scss/bootstrap.scss';
import './styles.scss';

const Home = () => {
  const dispatch = useDispatch();
  const text = useSelector(({ text }) => text);

  const handleText = (event) => {
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

export const Title = ({ children }) => {
  return <div className={'preview-heading'}>{children}</div>;
};

export const Paragraph = ({ children, substitutions, truncate = 0 }) => {
  let text = zText.truncateText(children, { limit: truncate });
  text = zText.applySubstitutions(text, substitutions);
  text = zText.formatText(text, {
    css: {
      paragraph: 'paragraph'
    }
  });

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
