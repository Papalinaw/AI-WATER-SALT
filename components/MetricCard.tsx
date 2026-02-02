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
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 font-medium text-sm">
            {isSalinity ? 'River Salinity' : 'Water Temperature'}
          </p>
          <div className="flex items-baseline mt-1">
            <h3 className={`text-4xl font-bold ${isSalinity ? 'text-sky-600' : 'text-slate-800'}`}>
              {value}
            </h3>
            <span className="text-lg text-slate-400 font-medium ml-1">{unit}</span>
          </div>
        </div>
        <div className={`p-2 rounded-xl ${isSalinity ? 'bg-sky-50 text-sky-500' : 'bg-rose-50 text-rose-500'}`}>
          {isSalinity ? <Droplets size={24} /> : <Thermometer size={24} />}
        </div>
      </div>

      <div className="mt-4 h-16 w-full">
        {isSalinity && chartData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0ea5e9" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col justify-end h-full">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-rose-400 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(((value) / (maxValue || 40)) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">Max {maxValue}°C recommended</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;