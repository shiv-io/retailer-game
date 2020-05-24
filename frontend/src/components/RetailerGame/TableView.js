import React from 'react';
import { Table, Text } from 'gestalt';
import { getRemainStock } from '../../utils/fn';

const TableView = ({ prices, demands }) => {
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
                <Text>{`$${price}`}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{remainingStock}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{demand}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{remainingStock - demand}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{`$${revenue}`}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{`$${cumulatedRevenue}`}</Text>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TableView;
