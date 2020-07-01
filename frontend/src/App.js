import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Box, Text, Divider } from 'gestalt';
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
      <Box
        color="blue"
        height={60}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
      >
        <Text align="center" color="white" size="lg" weight="bold">
          Retailer Game
        </Text>
      </Box>
      <Router>
        <Route exact path="/" component={RetailerGame} />
        <Route exact path="/upload" component={Upload} />
      </Router>
      <Box marginBottom={10} />
      <Divider />
      <Box
        height={60}
        display="flex"
        alignItems="center"
        justifyContent="end"
        padding={8}
      >
        <Text align="left" size="lg" weight="bold">
          Made by the IEDO Lab, NTU IM
        </Text>
      </Box>
    </IndexContext.Provider>
  );
};

export default App;
