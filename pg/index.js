import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'react-bootstrap';

import { LongTextArea } from '../src/components/form/textarea.js';
import zText from '../src/constants/text/index';

import 'bootstrap/scss/bootstrap.scss';

import css from './styles.scss';

const App = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    document.body.className = 'body';
  }, []);

  return (
    <div className={'container'}>
      <div className={'editor'}>
        <textarea
          className={'textarea'}
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </div>
      <div className={'preview'}>
        <Paragraph>{text}</Paragraph>
      </div>
    </div>
  );
};

export const Paragraph = ({ children, substitutions, truncate = 0 }) => {
  let text = zText.truncateText(children, { limit: truncate });
  text = zText.applySubstitutions(text, substitutions);
  text = zText.formatText(text, {
    css: {
      paragraph: 'paragraph'
    }
  });

  return <pre>{text}</pre>;
};

ReactDOM.render(<App />, document.getElementById('root'));
