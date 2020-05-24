import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Table, Text } from 'gestalt';
import PriceButton from './PriceButton';
import TableView from './TableView';
import { possibleDemands, TOTAL_WEEKS } from '../../const/demand';
import {
  N_POSSIBILITY,
  M_POSSIBILITY,
  PRICE_1,
  PRICE_2,
  PRICE_3,
  PRICE_4,
  PRICE_SALVAGE,
  INIT_STOCK,
  POSSIBLE_PRICES,
} from '../../const/variables';
import { getRemainStock, getWeekDemand } from '../../utils/fn';
import { showConfirmDialog } from '../../utils/showConfirmDialog';

/**
 * pick one set of numbers out of 240 possibilities
 * price per week
 * stock per week
 * demand per week
 *
 * end game conditions:
 * 1. stock goes to 0
 * 2. choose lowest price, $36 in this case
 *
 * what need to show:
 * 1. total revenue
 * 2. max revenue
 * 3. performance -> total / max
 * 4. line chart
 */

const demandPicker = () => {
  const n = Math.floor(Math.random() * N_POSSIBILITY) + 1;
  const m = Math.floor(Math.random() * M_POSSIBILITY) + 0;
  const p = POSSIBLE_PRICES.length;
  const index = n * m * p;
  if (!possibleDemands[index]) return possibleDemands.slice(0, p);
  return possibleDemands.slice(index, index + p);
};

const RetailerGame = (props) => {
  const ref = useRef(demandPicker());
  const demandsArr = ref.current;
  const [prices, setPrices] = useState([]);
  const [demands, setDemands] = useState([]);
  const [isGameEnded, setGameEnded] = useState(false);

  const getNextState = (price, pArr, dArr) => {
    const week = pArr.length;
    const weekDemand = getWeekDemand(demandsArr, price, week);
    const remainingStock = getRemainStock(dArr);

    const nextPArr = pArr.concat(price);
    let nextDArr = [];
    if (remainingStock > weekDemand) {
      nextDArr = dArr.concat(weekDemand);
    } else {
      nextDArr = dArr.concat(remainingStock);
    }

    return [nextPArr, nextDArr];
  };

  const supplyLowestPrices = (pArr, dArr) => {
    const week = pArr.length;
    const remainingStock = getRemainStock(dArr);
    if (week === TOTAL_WEEKS || remainingStock === 0) {
      return [pArr, dArr];
    }

    const weekDemand = getWeekDemand(demandsArr, PRICE_4, week);

    const nextPArr = pArr.concat(PRICE_4);
    let nextDArr = [];
    if (remainingStock > weekDemand) {
      nextDArr = dArr.concat(weekDemand);
    } else {
      nextDArr = dArr.concat(remainingStock);
    }

    return supplyLowestPrices(nextPArr, nextDArr);
  };

  useEffect(() => {
    console.log('prices: ', prices.length);
    console.log('demands: ', demands.length);
    if (getRemainStock(demands) === 0) {
      // no stock, end game
      console.log('stock goes to 0', demands.join());
      setGameEnded(true);
      return;
    }
    if (prices.length === TOTAL_WEEKS) {
      // reach the last week, end game
      // calculate salvage value
      console.log('reach the last week', prices.join());
      setGameEnded(true);
      return;
    }
  }, [prices, demands]);

  useEffect(() => {
    if (isGameEnded) {
      // calculate salvage value
    }
  }, [isGameEnded]);

  const onClickBtn = async (price) => {
    switch (price) {
      case PRICE_4:
        const result = await showConfirmDialog({
          heading: '遊戲即將終止',
          content: '確定選取 $36 ？',
        });
        if (result) {
          const [newPrices, newDemands] = supplyLowestPrices(prices, demands);
          setPrices(newPrices);
          setDemands(newDemands);
        }
        break;
      default:
        const [newPrices, newDemands] = getNextState(price, prices, demands);
        setPrices(newPrices);
        setDemands(newDemands);
        break;
    }
  };

  return (
    <div>
      {!isGameEnded && (
        <PriceButton
          onClickBtn={onClickBtn}
          lastPrice={prices[prices.length - 1]}
        />
      )}
      {prices.length > 0 && <TableView prices={prices} demands={demands} />}
    </div>
  );
};

export default RetailerGame;
