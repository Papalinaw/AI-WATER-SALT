import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import FreshwaterCard from './components/FreshwaterCard';
import MetricCard from './components/MetricCard';
import SmartFishChecker from './components/SmartFishChecker';
import SalinityChart from './components/SalinityChart';
import { currentMetrics, mockSensorHistory } from './data/mockSensorData';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract chart data for the mini-sparkline in MetricCard
  const salinitySparkData = mockSensorHistory.map(d => ({ value: d.salinity }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="w-10 h-10">
          <img src="images/image.png" alt="Aqualiv" className="w-full h-full object-contain" />
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar & Overlay */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Overlay Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Scrollable Content */}
      <main className="md:ml-64 flex-1 p-6 md:p-12 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8 pb-12">
          
          {/* Top Row: Status & Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:min-h-[320px]">
            
            {/* Main Status Card */}
            <div className="lg:col-span-7 h-auto">
              <FreshwaterCard />
            </div>

            {/* Metrics Column */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-6 h-full">
              
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