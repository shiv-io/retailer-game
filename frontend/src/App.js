import React, { useState, useEffect } from 'react';

import 'gestalt/dist/gestalt.css';
import './App.css';

export const IndexContext = React.createContext({});

const App = props => {
  return (
    <IndexContext.Provider>
    </IndexContext.Provider>
  );
};

export default App;
