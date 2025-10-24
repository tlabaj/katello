import { shallow } from 'enzyme';
import React from 'react';
import BarChart from './';
import {
  barChartData,
  emptyData,
} from './BarChart.fixtures';

jest.unmock('./');
describe('renders BarChart', () => {
  it('render bar chart', () => {
    const wrapper = shallow(<BarChart data={barChartData.data} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render empty state', () => {
    const wrapper = shallow(<BarChart data={emptyData} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with custom labels', () => {
    const wrapper = shallow(
      <BarChart 
        data={barChartData.data}
        xAxisLabel="Custom X Label"
        yAxisLabel="Custom Y Label"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with different config sizes', () => {
    const smallWrapper = shallow(<BarChart data={barChartData.data} config="small" />);
    const mediumWrapper = shallow(<BarChart data={barChartData.data} config="medium" />);
    const regularWrapper = shallow(<BarChart data={barChartData.data} config="regular" />);
    
    expect(smallWrapper).toMatchSnapshot();
    expect(mediumWrapper).toMatchSnapshot();
    expect(regularWrapper).toMatchSnapshot();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <BarChart 
        data={barChartData.data}
        onclick={mockOnClick}
      />
    );
    
    // Simulate click on chart bar
    const chartBar = wrapper.find('ChartBar');
    expect(chartBar).toHaveLength(1);
    expect(chartBar.prop('onClick')).toBeDefined();
  });

  it('transforms data correctly', () => {
    const testData = [
      ['Label 1', 10],
      ['Label 2', 20],
      ['Label 3', 30],
    ];
    
    const wrapper = shallow(<BarChart data={testData} />);
    const chartBar = wrapper.find('ChartBar');
    const transformedData = chartBar.prop('data');
    
    expect(transformedData).toEqual([
      { x: 'Label 1', y: 10, name: 'Label 1', color: undefined },
      { x: 'Label 2', y: 20, name: 'Label 2', color: undefined },
      { x: 'Label 3', y: 30, name: 'Label 3', color: undefined },
    ]);
  });

  it('handles custom colors in data', () => {
    const testData = [
      ['Label 1', 10, '#ff0000'],
      ['Label 2', 20, '#00ff00'],
    ];
    
    const wrapper = shallow(<BarChart data={testData} />);
    const chartBar = wrapper.find('ChartBar');
    const transformedData = chartBar.prop('data');
    
    expect(transformedData).toEqual([
      { x: 'Label 1', y: 10, name: 'Label 1', color: '#ff0000' },
      { x: 'Label 2', y: 20, name: 'Label 2', color: '#00ff00' },
    ]);
  });
});