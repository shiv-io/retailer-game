import React from 'react';
import { Button, Box, Card } from 'gestalt';
import { Text } from './Text';
import { POSSIBLE_PRICES } from '../../const/variables';

const PriceButton = ({ lastPrice, onClickBtn }) => (
  <>
    <Text align="center" weight="bold">
      <Box paddingX={3} paddingY={2}>
        請選擇本週價格
      </Box>
    </Text>
    <Box display="flex" justifyContent="evenly">
      {POSSIBLE_PRICES.map((p) => (
        <Box width="24%">
          <Button
            onClick={() => onClickBtn(p)}
            text={`$${p}`}
            disabled={p > lastPrice}
            color="blue"
          />
        </Box>
      ))}
    </Box>
  </>
);

export default PriceButton;
