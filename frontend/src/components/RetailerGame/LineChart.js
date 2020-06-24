import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from 'gestalt';
import styled from 'styled-components';
import LineChart from 'react-linechart';
import { TOTAL_WEEKS } from '../../const/demand';
import { INIT_STOCK } from '../../const/variables';

const AbsText = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const Chart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartPos, setChartPos] = useState({});

  useEffect(() => {
    if (!chartRef.current) return;
    const svgNode = chartRef.current.querySelector('svg');
    const rect = svgNode.getBoundingClientRect();
    setChartPos(rect);
  }, []);

  const { top, right, bottom, left } = chartPos;
  return (
    <Box display="flex" justifyContent="center" marginTop={5} ref={chartRef}>
      <AbsText top={top} left={left}>剩餘存貨量</AbsText>
      <AbsText top={bottom - 20} left={right - 50}>剩餘週數</AbsText>
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
      />
    </Box>
  );
};

export default Chart;
