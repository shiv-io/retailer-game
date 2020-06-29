import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { get } from 'lodash';
import RetailerGame from './components/RetailerGame';
import Upload from './components/Upload';
import { demandPicker } from './utils/fn';

import 'gestalt/dist/gestalt.css';
import './App.css';

export const IndexContext = React.createContext({});

const App = (props) => {
  const [demandsApiData, setDemandsApiData] = useState({});

  useEffect(() => {
    axios.get('/api/demands').then((resp) => {
      const data = resp.data;
      const { demands: possibleDemands, max: possibleMax } = data;
      const [demandsArr, max] = demandPicker(possibleDemands, possibleMax);
      const TOTAL_WEEKS = get(demandsArr, '0.length');

      setDemandsApiData({
        possibleDemands,
        demandsArr,
        TOTAL_WEEKS,
        possibleMax,
        max,
      });
    });
  }, []);

  const pickDemandsAgain = () => {
    const [demandsArr, max] = demandPicker(
      demandsApiData.possibleDemands,
      demandsApiData.possibleMax,
    );

    setDemandsApiData({
      demandsArr,
      max,
      ...demandsApiData,
    });
  };

  return (
    <IndexContext.Provider value={{ ...demandsApiData, pickDemandsAgain }}>
      <Router>
        <Route exact path="/" component={RetailerGame} />
        <Route exact path="/upload" component={Upload} />
      </Router>
    </IndexContext.Provider>
  );
};

export default App;
