import React from 'react';
import Sidebar from './components/Sidebar';
import FreshwaterCard from './components/FreshwaterCard';
import MetricCard from './components/MetricCard';
import SmartFishChecker from './components/SmartFishChecker';
import SalinityChart from './components/SalinityChart';
import { currentMetrics, mockSensorHistory } from './data/mockSensorData';

const App: React.FC = () => {
  // Extract chart data for the mini-sparkline in MetricCard
  const salinitySparkData = mockSensorHistory.map(d => ({ value: d.salinity }));

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Scrollable Content */}
      <main className="ml-64 flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
          
          {/* Top Row: Status & Metrics */}
          {/* Using min-h instead of fixed h to prevent overflow issues on resizing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:min-h-[320px]">
            
            {/* Main Status Card (Spans 7 cols) */}
            <div className="lg:col-span-7 h-full">
              <FreshwaterCard />
            </div>

            {/* Metrics Column (Spans 5 cols) - Stacked vertically */}
            <div className="lg:col-span-5 flex flex-col gap-6 h-full">
              
              {/* Metric 1: Salinity */}
              <div className="flex-1 min-h-[140px]">
                <MetricCard 
                  type="salinity" 
                  value={currentMetrics.salinity} 
                  unit="ppt"
                  chartData={salinitySparkData}
                />
              </div>
              
              {/* Metric 2: Temperature */}
              <div className="flex-1 min-h-[140px]">
                <MetricCard 
                  type="temperature" 
                  value={currentMetrics.temperature} 
                  unit="°C"
                  maxValue={32}
                />
              </div>

            </div>
          </div>

          {/* Middle Row: Smart Fish Checker */}
          {/* Ensure standard block flow with no absolute positioning */}
          <div className="w-full relative z-10">
            <SmartFishChecker />
          </div>

          {/* Bottom Row: Large Chart */}
          <div className="w-full relative z-0">
            <SalinityChart />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;