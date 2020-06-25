import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RetailerGame from './components/RetailerGame';
import Upload from './components/Upload';

import 'gestalt/dist/gestalt.css';
import './App.css';

export const IndexContext = React.createContext({});

const App = (props) => {
  return (
    <IndexContext.Provider>
      <Router>
        <Route exact path="/" component={RetailerGame} />
        <Route exact path="/upload" component={Upload} />
      </Router>
    </IndexContext.Provider>
  );
};

export default App;
