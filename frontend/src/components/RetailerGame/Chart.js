/** obsolete file, no need to maintain it */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { INIT_STOCK } from '../../const/variables';

const TOTAL_WEEKS = 15;

const canvasWidth = 1200;
const canvasWidthBuffer = 100;
const canvasHeight = 600;
const canvasHeightBuffer = 40;
const cellColor = '#cfcfcf';
const strokeColor = 'black';
const totalWGrid = TOTAL_WEEKS;
const totalVGrid = 20;

const CanvasWrapper = styled.div`
  width: ${canvasWidth + canvasWidthBuffer}px;
  margin: 20px auto;
`;

const Chart = ({ data }) => {
  const chartRoot = useRef(null);

  const draw = useCallback(() => {
    const rootEle = chartRoot.current;
    const chartEle = rootEle.querySelector('#chart').getContext('2d');

    chartEle.canvas.width = canvasWidth + canvasWidthBuffer;
    chartEle.canvas.height = canvasHeight + canvasHeightBuffer;
    chartEle.clearRect(0, 0, canvasWidth, canvasHeight);
    chartEle.translate(50, 20);

    //actual graph
    chartEle.beginPath();
    chartEle.strokeStyle = strokeColor;
    chartEle.lineWidth = 2;
    for (let i = 0; i < data.length; i++) {
      const x = (i * canvasWidth) / TOTAL_WEEKS;
      // 2000 -> 0,
      // 1500 -> (1 - 3/4) * canvasHeight
      // 1000 -> (1 - 1/2) * canvasHeight
      // 0 -> canvasHeight
      const y = (1 - data[i].y / INIT_STOCK) * canvasHeight;
      chartEle.lineTo(x, y);
      chartEle.arc(x, y, 5, 0, 2 * Math.PI, false);
      chartEle.font = '15px arial';
      chartEle.strokeText(data[i].y, x + 10, y);
    }
    chartEle.stroke();

    // vertical lines
    for (var i = 0; i < totalWGrid + 1; i++) {
      chartEle.strokeStyle = cellColor;
      chartEle.lineWidth = 1;
      const x = (i * canvasWidth) / totalWGrid;
      chartEle.moveTo(x, 0);
      chartEle.lineTo(x, canvasHeight);
      chartEle.strokeText(i, x, canvasHeight + 20);
    }
    chartEle.stroke();

    //horizontal lines
    for (var i = 0; i < totalVGrid + 1; i++) {
      chartEle.strokeStyle = cellColor;
      chartEle.lineWidth = 1;
      const y = (i * canvasHeight) / totalVGrid;
      chartEle.moveTo(0, y);
      chartEle.lineTo(canvasWidth, y);
      chartEle.textAligh = 'right';
      chartEle.strokeText(INIT_STOCK - i * (INIT_STOCK / totalVGrid), -50, y);
    }
    chartEle.stroke();
  }, [data]);

  useEffect(() => {
    draw();
  }, [data]);

  return (
    <CanvasWrapper ref={chartRoot}>
      <canvas id="chart"></canvas>
    </CanvasWrapper>
  );
};

export default Chart;
