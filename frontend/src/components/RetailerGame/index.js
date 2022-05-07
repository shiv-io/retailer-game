import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { get } from 'lodash';
import { IndexContext } from '../../App';
import LineChart from './LineChart';
import PriceButton from './PriceButton';
import ResetButton from './ResetButton';
import TableView from './TableView';
import { PRICE_1, PRICE_4 } from '../../const/variables';
import {
  getRemainStock,
  getWeekDemand,
  getChartData,
} from '../../utils/fn';
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

const RetailerGame = (props) => {
  const { demandsArr, TOTAL_WEEKS, pickDemandsAgain } = useContext(IndexContext);

  const [prices, setPrices] = useState([]);
  const [demands, setDemands] = useState([]);
  const [isGameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const isReady = get(demandsArr, '0.0', null) !== null;
    if (isReady) onClickBtn(PRICE_1);
  }, [demandsArr]);

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

  const onClickBtn = async (price) => {
    switch (price) {
      case PRICE_4:
        const result = await showConfirmDialog({
          heading: 'The game is about to end',
          content: 'Confirm selection: $36 ？',
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

  const onClickResetBtn = () => {
    window.location.reload();
    return false;
    /*
    setPrices([]);
    setDemands([]);
    setGameEnded(false);
    pickDemandsAgain();
    */
  };

  const data = useMemo(
    () => [
      {
        color: 'steelblue',
        points: getChartData(demands),
      },
    ],
    [demands],
  );

  return (
    <div>
      {/* {data && <Chart data={data} />} */}
      <LineChart data={data} />

      {!isGameEnded && (
        <PriceButton
          onClickBtn={onClickBtn}
          lastPrice={prices[prices.length - 1]}
        />
      )}
      {prices.length > 0 && (
        <>
          <TableView
            prices={prices}
            demands={demands}
            showSummary={isGameEnded}
          />
          <ResetButton onClick={onClickResetBtn} />
        </>
      )}
    </div>
  );
};

export default RetailerGame;
