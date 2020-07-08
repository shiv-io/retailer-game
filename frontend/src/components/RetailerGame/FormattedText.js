import React from 'react';
import { Text } from './Text';

export const DollarText = ({ children }) => {
  return (
    <Text>
      {(children || 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </Text>
  );
};

export const LocaleText = ({ children }) => {
  return (
    <Text>
      {(children || 0).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </Text>
  );
};
