import React, { useContext } from 'react';
import { Table } from 'gestalt';
import styled from 'styled-components';
import { getRemainStock, getTotalRevenue } from '../../utils/fn';
import { DollarText, LocaleText as Text } from './FormattedText';
import { PRICE_SALVAGE } from '../../const/variables';
import { IndexContext } from '../../App';

const BiggerText = styled.div`
  font-size: ${(props) => props.size || 20}px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.color};
`;

const SummaryRow = ({ prices, demands }) => {
  const { max } = useContext(IndexContext);
  const remainingStock = getRemainStock(demands);
  const salvageRevenue = remainingStock * PRICE_SALVAGE;
  const totalRevenue = getTotalRevenue(prices, demands) + salvageRevenue;

  return (
    <>
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
          <DollarText>{max}</DollarText>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={7}>
          <BiggerText>本次決策品質（總營收 / 最大可能營收）： </BiggerText>
          <BiggerText color="#0fa573" size="30">
            {((totalRevenue * 100) / max).toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </BiggerText>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

const TableView = ({ prices, demands, showSummary = false }) => {
  let cumulatedRevenue = 0;
  return (
    <Table>
      <Table.Header sticky>
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
                <Text>{remainingStock - demand}</Text>
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
