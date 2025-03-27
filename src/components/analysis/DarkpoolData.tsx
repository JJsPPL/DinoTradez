
import React from 'react';
import { Database, Info, Activity } from 'lucide-react';

// Sample darkpool data
export const darkpoolData = [
  { time: '09:35', volume: 240000, price: 173.42, type: 'sell' },
  { time: '10:15', volume: 350000, price: 173.67, type: 'buy' },
  { time: '11:05', volume: 180000, price: 173.55, type: 'sell' },
  { time: '12:30', volume: 420000, price: 173.77, type: 'buy' },
  { time: '13:45', volume: 280000, price: 173.68, type: 'buy' },
  { time: '14:20', volume: 310000, price: 173.49, type: 'sell' },
  { time: '15:10', volume: 550000, price: 173.52, type: 'sell' },
  { time: '15:55', volume: 620000, price: 173.60, type: 'buy' },
];

// Sample block trades
export const blockTradeData = [
  { time: '09:42', shares: 150000, price: 173.45, value: '$26,017,500', origin: 'NYSE' },
  { time: '11:17', shares: 200000, price: 173.60, value: '$34,720,000', origin: 'NASDAQ' },
  { time: '12:55', shares: 175000, price: 173.72, value: '$30,401,000', origin: 'NYSE' },
  { time: '14:03', shares: 225000, price: 173.51, value: '$39,039,750', origin: 'Dark Pool' },
  { time: '15:28', shares: 300000, price: 173.58, value: '$52,074,000', origin: 'Dark Pool' },
];

interface DarkpoolDataProps {
  showDarkpoolData: boolean;
  showBlockTrades: boolean;
}

const DarkpoolData: React.FC<DarkpoolDataProps> = ({ showDarkpoolData, showBlockTrades }) => {
  return (
    <div className="glass rounded-xl shadow-md overflow-hidden border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-black/80">
        <h3 className="font-medium flex items-center text-white">
          <Database className="h-4 w-4 mr-2 text-purple-500" />
          Darkpool & Block Trade Data
          <div className="ml-2 rounded-full bg-purple-900/50 px-2 py-0.5 text-xs text-purple-300">Premium</div>
        </h3>
        <Info className="h-4 w-4 text-gray-400 cursor-help" />
      </div>

      {showDarkpoolData && (
        <div className="p-6 border-b border-gray-800 bg-black/60">
          <h4 className="text-sm font-medium mb-3 flex items-center text-white">
            <Activity className="h-4 w-4 mr-1 text-purple-500" />
            Darkpool Activity
          </h4>
          <div className="overflow-y-auto max-h-36 mb-3">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-400">
                <tr>
                  <th className="text-left pb-2">Time</th>
                  <th className="text-right pb-2">Volume</th>
                  <th className="text-right pb-2">Price</th>
                  <th className="text-right pb-2">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {darkpoolData.map((item, index) => (
                  <tr key={index} className="darkpool-row">
                    <td className="py-1.5 text-gray-300">{item.time}</td>
                    <td className="text-right py-1.5 text-gray-300">{item.volume.toLocaleString()}</td>
                    <td className="text-right py-1.5 text-gray-300">${item.price}</td>
                    <td className={`text-right py-1.5 ${item.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.type.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-gray-400">
            Darkpool ratio: <span className="font-medium text-gray-300">38.7%</span> of total volume
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '38.7%' }}></div>
            </div>
            <span className="text-xs font-medium text-gray-300">38.7%</span>
          </div>
        </div>
      )}

      {showBlockTrades && (
        <div className="p-6 bg-black/60">
          <h4 className="text-sm font-medium mb-3 flex items-center text-white">
            <Database className="h-4 w-4 mr-1 text-blue-500" />
            Significant Block Trades
          </h4>
          <div className="overflow-y-auto max-h-36">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-400">
                <tr>
                  <th className="text-left pb-2">Time</th>
                  <th className="text-right pb-2">Shares</th>
                  <th className="text-right pb-2">Price</th>
                  <th className="text-right pb-2">Value</th>
                  <th className="text-right pb-2">Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {blockTradeData.map((item, index) => (
                  <tr key={index} className="block-trade-row">
                    <td className="py-1.5 text-gray-300">{item.time}</td>
                    <td className="text-right py-1.5 text-gray-300">{item.shares.toLocaleString()}</td>
                    <td className="text-right py-1.5 text-gray-300">${item.price}</td>
                    <td className="text-right py-1.5 text-gray-300">{item.value}</td>
                    <td className={`text-right py-1.5 ${item.origin === 'Dark Pool' ? 'text-purple-400 font-medium' : 'text-gray-300'}`}>
                      {item.origin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Total block trade volume: <span className="font-medium text-gray-300">1,050,000 shares</span> ($182,252,250)
          </div>
        </div>
      )}
    </div>
  );
};

export default DarkpoolData;
