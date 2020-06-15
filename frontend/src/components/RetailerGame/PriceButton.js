import React from 'react';
import { Button, Box } from 'gestalt';
import { POSSIBLE_PRICES } from '../../const/variables';

const PriceButton = ({ lastPrice, onClickBtn }) => (
  <Box display="flex" justifyContent="evenly">
    {POSSIBLE_PRICES.map((p) => (
    <Button
      onClick={() => onClickBtn(p)}
      text={`$${p}`}
      inline
      disabled={p > lastPrice}
      color="blue"
    />
    ))}
  </Box>
);

export default PriceButton;
