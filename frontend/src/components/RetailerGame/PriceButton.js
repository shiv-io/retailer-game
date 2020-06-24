import React from 'react';
import { Button, Box, Card } from 'gestalt';
import { Text } from './Text';
import { POSSIBLE_PRICES } from '../../const/variables';

const PriceButton = ({ lastPrice, onClickBtn }) => (
  <>
    <Box display="flex" justifyContent="evenly">
      <Card>
        <Text align="center" weight="bold">
          <Box paddingX={3} paddingY={2}>
            請選擇本週價格
          </Box>
        </Text>
        {POSSIBLE_PRICES.map((p) => (
          <Box display="inlineBlock" paddingX={3}>
          <Button
            onClick={() => onClickBtn(p)}
            text={`$${p}`}
            inline
            disabled={p > lastPrice}
            color="blue"
          />
          </Box>
        ))}
      </Card>
    </Box>
  </>
);

export default PriceButton;
