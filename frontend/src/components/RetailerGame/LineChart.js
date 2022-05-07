import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text } from 'gestalt';
import styled from 'styled-components';
import LineChart from 'react-linechart';
import { INIT_STOCK } from '../../const/variables';
import { IndexContext } from '../../App';
import showTooltip from '../../utils/showTooltip';

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AbsText = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  bottom: ${(props) => props.bottom}px;
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

  const onPointClick = (e, { x, y }) => {
    showTooltip({ anchor: e.target, content: `(${x}, ${y})` });
  };

  const { width, left } = chartPos;
  return (
    <ChartContainer ref={chartRef}>
      <AbsText top={0} left={left}>
        Remaining inventory 
      </AbsText>
      <AbsText bottom={10} left={width - 50}>
        Weeks in progress
      </AbsText>
      <LineChart
        width={window.innerWidth * 0.9}
        height={window.innerHeight * 0.9}
        data={data}
        xMin={0}
        xMax={TOTAL_WEEKS}
        yMax={INIT_STOCK}
        yMin={0}
        hideYLabel
        hideXLabel
        margins={{ top: 50, bottom: 50 }}
        onPointClick={onPointClick}
      />
    </ChartContainer>
  );
};

export default Chart;
