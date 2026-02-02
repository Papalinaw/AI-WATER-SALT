import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles } from 'lucide-react';
import { mockSensorHistory } from '../data/mockSensorData';
import { analyzeWaterConditions } from '../services/aiService';
import { AiAnalysisResult } from '../types';

const SalinityChart: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeWaterConditions(mockSensorHistory);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis Failed", error);
    } finally {
      setAnalyzing(false);
    }
  };

  // Custom Dot component to render a pulsing effect on the last data point
  const CustomDot = (props: any) => {
    const { cx, cy, index } = props;
    const isLast = index === mockSensorHistory.length - 1;

    if (isLast) {
      return (
        <g>
          {/* Pulsing Outer Circle */}
          <circle cx={cx} cy={cy} r="4" fill="#0ea5e9" opacity="0.5">
            <animate attributeName="r" values="4;12" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Solid Inner Dot */}
          <circle cx={cx} cy={cy} r="4" fill="#0ea5e9" stroke="#fff" strokeWidth="2" />
        </g>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 w-full relative">
      {/* Header & Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">River Salinity Trends</h2>
          <p className="text-slate-400 text-sm mt-1">Last 24 Hours</p>
        </div>
        
        <button 
          onClick={handleAnalyze}
          disabled={analyzing}
          className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {analyzing ? (
             <span className="animate-spin mr-1">
               <Sparkles size={16} />
             </span>
          ) : (
            <Sparkles size={16} />
          )}
          {analyzing ? 'Analyzing...' : 'Analyze with Buoy AI'}
        </button>
      </div>

      {/* AI Analysis Overlay/Result */}
      {analysis && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 animate-fade-in">
          <h4 className="flex items-center gap-2 text-blue-700 font-bold mb-2">
            <Sparkles size={16} /> AI Insights
          </h4>
          <ul className="space-y-1">
            {analysis.insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full block"></span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockSensorHistory}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSalinity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={[0, 15]}
              label={{ value: 'PPT', angle: -90, position: 'insideLeft', fill: '#cbd5e1', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="salinity" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSalinity)" 
              animationDuration={2000}
              isAnimationActive={true}
              dot={<CustomDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalinityChart;