import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, Loader } from 'lucide-react';
import { analyzeWaterConditions } from '../services/aiService';
import { AiAnalysisResult, SensorDataPoint } from '../types';

interface SalinityChartProps {
  historyData: SensorDataPoint[];
  currentSalinity: number;
}

const SalinityChart: React.FC<SalinityChartProps> = ({ historyData }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeWaterConditions(historyData);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis Failed", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">River Salinity Trends</h3>
          <p className="text-sm text-slate-400">Last 24 Hours</p>
        </div>
        
        <button 
          onClick={handleAnalyze}
          disabled={analyzing}
          className="flex items-center gap-2 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-full text-sm font-semibold transition-colors disabled:opacity-50 w-fit"
        >
          {analyzing ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {analyzing ? 'Analyzing...' : 'Analyze with Buoy AI'}
        </button>
      </div>

      {/* AI Analysis Result */}
      {analysis && (
        <div className="mb-6 bg-gradient-to-r from-sky-50 to-white border border-sky-100 p-4 rounded-2xl flex gap-3 animate-fade-in">
          <div className="bg-white p-2 rounded-full h-fit shadow-sm shrink-0">
            <Sparkles size={16} className="text-sky-500" />
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-sky-900 block mb-1">AI Report</span>
            {analysis.summary}
            <ul className="mt-1 list-disc list-inside opacity-80 text-xs">
              {analysis.insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
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
              domain={[0, 15]}
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              label={{ value: 'PPT', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
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
              fill="url(#colorMain)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalinityChart;