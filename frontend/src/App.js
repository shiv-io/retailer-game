import React from 'react';
import RetailerGame from './components/RetailerGame';

import 'gestalt/dist/gestalt.css';
import './App.css';

export const IndexContext = React.createContext({});

const App = props => {
  return (
    <IndexContext.Provider>
      <RetailerGame />
    </IndexContext.Provider>
  );
};

export default App;
