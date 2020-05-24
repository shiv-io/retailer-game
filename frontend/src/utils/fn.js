import { INIT_STOCK, POSSIBLE_PRICES } from '../const/variables';

export const getRemainStock = (demands) => {
  const sold = demands.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  return INIT_STOCK - sold;
};

export const getWeekDemand = (demandsArr, price, week) => {
  return demandsArr[POSSIBLE_PRICES.indexOf(price)][week];
};
