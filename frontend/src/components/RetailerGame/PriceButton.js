import React from 'react';
import { Box, Card } from 'gestalt';
import Button from './GreenButton';
import { Text } from './Text';
import { POSSIBLE_PRICES } from '../../const/variables';

const PriceButton = ({ lastPrice, onClickBtn }) => (
  <>
    <Text align="center" weight="bold">
      <Box paddingX={3} paddingY={2}>
        Please select this week's price
      </Box>
    </Text>
    <Box display="flex" justifyContent="evenly">
      {POSSIBLE_PRICES.map((p) => (
        <Box width="24%">
          <Button
            onClick={() => onClickBtn(p)}
            text={`$${p}`}
            disabled={p > lastPrice}
          />
        </Box>
      ))}
    </Box>
  </>
);

export default PriceButton;
