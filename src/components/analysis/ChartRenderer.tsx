
import React from 'react';
import { 
  AreaChart, 
  Area, 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample chart data
export const sampleChartData = [
  { date: '2023-01-01', value: 171.22, volume: 45000000 },
  { date: '2023-01-02', value: 172.45, volume: 48000000 },
  { date: '2023-01-03', value: 173.86, volume: 51000000 },
  { date: '2023-01-04', value: 174.30, volume: 55000000 },
  { date: '2023-01-05', value: 172.91, volume: 62000000 },
  { date: '2023-01-06', value: 173.45, volume: 58000000 },
  { date: '2023-01-07', value: 173.94, volume: 54000000 },
  { date: '2023-01-08', value: 173.57, volume: 51000000 },
];

interface ChartRendererProps {
  activeChart: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ activeChart }) => {
  // Function to render the appropriate chart based on active chart type
  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Bar dataKey="volume" fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'candlestick':
      default:
        // For candlestick, we'd use a candlestick chart library
        // but for this demo, let's use a placeholder with the line chart
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="relative bg-black/70">
      <div className="flex justify-between p-4 absolute top-0 left-0 right-0 z-10 text-sm">
        <div>
          <div className="text-xs text-gray-400">Open</div>
          <div className="text-white">171.22</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">High</div>
          <div className="text-white">174.30</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Low</div>
          <div className="text-white">171.96</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Close</div>
          <div className="text-white">173.57</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Volume</div>
          <div className="text-white">74.58M</div>
        </div>
      </div>
      
      <div className="h-96 flex items-center justify-center p-6 pt-16">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartRenderer;
