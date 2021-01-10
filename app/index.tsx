import 'bootstrap/scss/bootstrap.scss';
import React, { useEffect, useState, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
  RootStateOrAny,
  useDispatch,
  useSelector
} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './lib/reducers';
import { Paragraph, Title } from './text';
import './styles.scss';

import { zComponents } from '../_dist';
const { Tabler, TablerColumnHeader, TablerItemCell } = zComponents;

const Home = () => {
  const text = useSelector(({ text }: RootStateOrAny) => text);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = 'body';
  }, []);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    dispatch({
      type: 'SET_TEXT',
      payload: value
    });
  };

  return (
    <Provider store={store}>
      <Table />
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

const Table = () => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [isLoaded]);

  return (
    <Tabler<3>
      heading={'List of Items'}
      emptyMessage={'No items found.'}
      itemsLoaded={isLoaded}
      columns={[new TablerColumnHeader('#'), new TablerColumnHeader('Message')]}
      items={[
        [
          new TablerItemCell(1),
          new TablerItemCell('bye'),
          new TablerItemCell('hi')
        ]
      ]}
      distribution={['40%', '40%', '10%']}
    />
  );
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
