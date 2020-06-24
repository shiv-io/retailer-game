import React from 'react';
import { Table } from 'gestalt';
import { getRemainStock, getTotalRevenue } from '../../utils/fn';
import { DollarText } from './DollarText';
import { Text } from './Text';
import { PRICE_SALVAGE } from '../../const/variables';

const SummaryRow = ({ prices, demands, maxRevenue }) => {
  const remainingStock = getRemainStock(demands);
  const salvageRevenue = remainingStock * PRICE_SALVAGE;
  const totalRevenue = getTotalRevenue(prices, demands) + salvageRevenue;

  // 本次決策品質
  // total / max
  return (
    <Table.Row>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell>
        <Text>殘值：</Text>
        <DollarText>{salvageRevenue}</DollarText>
      </Table.Cell>
      <Table.Cell>
        <Text>總營收：</Text>
        <DollarText>{totalRevenue}</DollarText>
      </Table.Cell>
      <Table.Cell>
        <Text>最大可能營收：</Text>
        <DollarText>{maxRevenue}</DollarText>
      </Table.Cell>
    </Table.Row>
  );
};

const TableView = ({ prices, demands, showSummary = false }) => {
  let cumulatedRevenue = 0;
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Text weight="bold">週</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">價錢</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">存貨</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">銷售</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">剩餘存貨</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">營收</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">累積營收</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {prices.map((price, i) => {
          const demand = demands[i];
          const remainingStock = getRemainStock(demands.slice(0, i));
          const revenue = price * demand;
          cumulatedRevenue += revenue;
          return (
            <Table.Row key={`${price}${i}`}>
              <Table.Cell>
                <Text>{i + 1}</Text>
              </Table.Cell>
              <Table.Cell>
                <DollarText>{price}</DollarText>
              </Table.Cell>
              <Table.Cell>
                <Text>{remainingStock}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{demand}</Text>
              </Table.Cell>
              <Table.Cell>
                <DollarText>{remainingStock - demand}</DollarText>
              </Table.Cell>
              <Table.Cell>
                <DollarText>{revenue}</DollarText>
              </Table.Cell>
              <Table.Cell>
                <DollarText>{cumulatedRevenue}</DollarText>
              </Table.Cell>
            </Table.Row>
          );
        })}
        {showSummary && <SummaryRow prices={prices} demands={demands} />}
      </Table.Body>
    </Table>
  );
};

export default TableView;
