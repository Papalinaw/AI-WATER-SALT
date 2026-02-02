import React from 'react';
import { Droplets, Thermometer } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  type: 'salinity' | 'temperature';
  value: number;
  unit: string;
  chartData?: { value: number }[]; // For salinity sparkline
  maxValue?: number; // For temp progress bar
}

const MetricCard: React.FC<MetricCardProps> = ({ type, value, unit, chartData, maxValue }) => {
  const isSalinity = type === 'salinity';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-slate-500 text-sm font-medium">
          {isSalinity ? 'River Salinity' : 'Water Temperature'}
        </h3>
        <div className={`p-2 rounded-full ${isSalinity ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
          {isSalinity ? <Droplets size={18} /> : <Thermometer size={18} />}
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold text-slate-800">{value}</span>
        <span className="text-lg text-slate-400 font-medium">{unit}</span>
      </div>

      <div className="h-12 w-full">
        {isSalinity && chartData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-red-400 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(((value) / (maxValue || 40)) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-400 text-right">Max {maxValue}°C recommended</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;