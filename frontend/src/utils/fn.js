import {
  N_POSSIBILITY,
  M_POSSIBILITY,
  INIT_STOCK,
  POSSIBLE_PRICES,
} from '../const/variables';

export const demandPicker = (possibleDemands, possibleMax) => {
  const n = Math.floor(Math.random() * N_POSSIBILITY) + 1;
  const m = Math.floor(Math.random() * M_POSSIBILITY) + 0;
  const p = POSSIBLE_PRICES.length;
  const maxIdx = n * m;
  const demandsIndex = n * m * p;

  console.log({ maxIdx, demandsIndex });

  if (!possibleDemands[demandsIndex])
    return [possibleDemands.slice(0, p), possibleMax[0]];

  return [
    possibleDemands.slice(demandsIndex, demandsIndex + p),
    possibleMax[maxIdx],
  ];
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
