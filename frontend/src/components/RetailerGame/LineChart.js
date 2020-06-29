import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text } from 'gestalt';
import styled from 'styled-components';
import LineChart from 'react-linechart';
import { INIT_STOCK } from '../../const/variables';
import { IndexContext } from '../../App';

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AbsText = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  bottom: ${props => props.bottom}px;
`;

const Chart = ({ data }) => {
  const { TOTAL_WEEKS } = useContext(IndexContext);

  const chartRef = useRef(null);
  const [chartPos, setChartPos] = useState({});

  useEffect(() => {
    if (!chartRef.current) return;
    const svgNode = chartRef.current.querySelector('svg');
    const rect = svgNode.getBoundingClientRect();
    setChartPos(rect);
  }, []);

  const onPointHover = ({ x, y }) => {
    return `(${x}, ${y})`;
  }

  const { width, left } = chartPos;
  return (
    <ChartContainer ref={chartRef}>
      <AbsText top={0} left={left}>剩餘存貨量</AbsText>
      <AbsText bottom={10} left={width - 50}>剩餘週數</AbsText>
      <LineChart
        width={window.innerWidth * 0.9 }
        height={window.innerHeight * 0.9}
        data={data}
        xMin={0}
        xMax={TOTAL_WEEKS}
        yMax={INIT_STOCK}
        yMin={0}
        hideYLabel
        hideXLabel
        xLabel="剩餘週數"
        margins={{ top: 50, bottom: 50}}
        onPointHover={onPointHover}
        tooltipClass="tooltip"
      />
    </ChartContainer>
  );
};

export default Chart;
