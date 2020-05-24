import React from 'react';
import { Button } from 'gestalt';
import { POSSIBLE_PRICES } from '../../const/variables';

const PriceButton = ({ lastPrice, onClickBtn }) =>
  POSSIBLE_PRICES.map((p) => (
    <Button
      onClick={() => onClickBtn(p)}
      text={p}
      inline
      disabled={p > lastPrice}
    />
  ));

export default PriceButton;
