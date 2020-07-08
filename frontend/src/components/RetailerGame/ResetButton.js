import React from 'react';
import Button from './GreenButton';
import { Text } from './Text';

const ResetButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      text="重玩一次"
    />
  );
};

export default ResetButton;
