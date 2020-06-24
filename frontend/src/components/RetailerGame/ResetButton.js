import React from 'react';
import { Button, Box, Card } from 'gestalt';
import { Text } from './Text';

const ResetButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      text="重玩一次"
      color="blue"
    />
  );
};

export default ResetButton;
