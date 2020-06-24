import React from 'react';
import { Text } from './Text';

export const DollarText = ({ children }) => {
  return (
    <Text>
      {(children || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    </Text>
  );
};
