import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  ChartBar,
  ChartAxis,
  ChartGroup,
  ChartThemeColor,
} from '@patternfly/react-charts';
import { noop } from '../../../../common/helpers';
import { translate as __ } from '../../../../common/I18n';
import MessageBox from '../../MessageBox';

const BarChart = ({
  data,
  onclick,
  noDataMsg,
  config,
  title,
  unloadData,
  xAxisLabel,
  yAxisLabel,
}) => {
  // Transform data for PatternFly 5 format
  const transformData = rawData => {
    if (!rawData || !Array.isArray(rawData)) return [];

    return rawData.map((item, index) => ({
      x: item[0], // label
      y: item[1], // value
      name: item[0],
      color: item[2] || undefined, // custom color if provided
    }));
  };

  const chartData = transformData(data);

  // Handle empty data
  if (!chartData.length) {
    return <MessageBox msg={noDataMsg} icontype="info" />;
  }

  // Configuration based on size
  const getChartDimensions = () => {
    switch (config) {
      case 'small':
        return { height: 250, width: 400 };
      case 'medium':
        return { height: 280, width: 450 };
      case 'regular':
      default:
        return { height: 300, width: 350 };
    }
  };

  const dimensions = getChartDimensions();

  // Handle click events
  const handleBarClick = (event, clickedData) => {
    if (onclick && typeof onclick === 'function') {
      // Transform back to original format for compatibility
      const originalData = [clickedData.name, clickedData.y];
      onclick(originalData);
    }
  };

  return (
    <div style={{ height: dimensions.height + 60, width: dimensions.width }}>
      <Chart
        ariaDesc={title?.text || 'Bar chart'}
        ariaTitle={title?.text || 'Bar chart'}
        domainPadding={{ x: [30, 25] }}
        height={dimensions.height}
        width={dimensions.width}
        themeColor={ChartThemeColor.multi}
        padding={{
          bottom: 60,
          left: 70,
          right: 20,
          top: 10,
        }}
      >
        <ChartAxis
          dependentAxis
          showGrid
          label={yAxisLabel}
          tickFormat={t => String(Math.round(t))}
        />
        <ChartAxis
          label={xAxisLabel}
          tickFormat={t => {
            const str = String(t);
            return str.length > 10 ? `${str.substring(0, 10)}...` : str;
          }}
        />
        <ChartGroup>
          <ChartBar data={chartData} onClick={handleBarClick} />
        </ChartGroup>
      </Chart>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  onclick: PropTypes.func,
  noDataMsg: PropTypes.string,
  config: PropTypes.string,
  title: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }),
  unloadData: PropTypes.bool,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
};

BarChart.defaultProps = {
  data: null,
  onclick: noop,
  noDataMsg: __('No data available'),
  config: 'regular',
  title: { type: 'percent' },
  unloadData: false,
  yAxisLabel: '',
  xAxisLabel: '',
};

export default BarChart;
