import { N_POSSIBILITY, M_POSSIBILITY, INIT_STOCK, POSSIBLE_PRICES } from '../const/variables';
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

export const getWeekDemand = (demandsArr, price, week) => {
  return demandsArr[POSSIBLE_PRICES.indexOf(price)][week];
};
