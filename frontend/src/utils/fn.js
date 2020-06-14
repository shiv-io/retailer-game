import {
  N_POSSIBILITY,
  M_POSSIBILITY,
  INIT_STOCK,
  POSSIBLE_PRICES,
} from '../const/variables';
import { possibleDemands } from '../const/demand';

export const demandPicker = () => {
  const n = Math.floor(Math.random() * N_POSSIBILITY) + 1;
  const m = Math.floor(Math.random() * M_POSSIBILITY) + 0;
  const p = POSSIBLE_PRICES.length;
  const index = n * m * p;
  if (!possibleDemands[index]) return possibleDemands.slice(0, p);
  return possibleDemands.slice(index, index + p);
};

export const getRemainStock = (demands) => {
  const sold = demands.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  return INIT_STOCK - sold;
};

export const getTotalRevenue = (prices, demands) => {
  return prices.reduce((acc, cur, i) => {
    return acc + cur * demands[i];
  }, 0);
};

export const getWeekDemand = (demandsArr, price, week) => {
  return demandsArr[POSSIBLE_PRICES.indexOf(price)][week];
};

export const getChartData = (demands) => {
  const stocks = demands.map((d, i) => {
    const y = getRemainStock(demands.slice(0, i + 1));
    return { x: i + 1, y };
  });
  return [{ x: 0, y: INIT_STOCK }, ...stocks];
};
