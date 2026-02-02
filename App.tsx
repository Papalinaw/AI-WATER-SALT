import React, { useState, useEffect } from 'react';
import { Menu, Fish, AlertTriangle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import FreshwaterCard from './components/FreshwaterCard';
import MetricCard from './components/MetricCard';
import SmartFishChecker from './components/SmartFishChecker';
import SalinityChart from './components/SalinityChart';
import { SensorDataPoint } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Live Data Simulation State ---
  const [salinity, setSalinity] = useState(1.5); 
  const [temperature, setTemperature] = useState(29.2);
  const [historyData, setHistoryData] = useState<SensorDataPoint[]>([
    { time: '00:00', salinity: 0.5, temperature: 28.5 },
    { time: '04:00', salinity: 0.8, temperature: 28.2 },
    { time: '08:00', salinity: 1.2, temperature: 28.8 },
    { time: '12:00', salinity: 2.5, temperature: 29.5 },
    { time: '16:00', salinity: 1.8, temperature: 29.2 },
    { time: '20:00', salinity: 1.1, temperature: 28.9 },
    { time: '24:00', salinity: 0.9, temperature: 28.6 },
  ]);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSalinity(prev => {
        const change = (Math.random() - 0.5) * 0.3;
        let newValue = prev + change;
        return Math.max(0.1, Math.min(12.0, newValue)); 
      });
      
      setTemperature(prev => Math.max(26, Math.min(32, prev + (Math.random() - 0.5) * 0.1)));
      
      setHistoryData(prev => {
        const newData = [...prev.slice(1), { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          salinity: salinity,
          temperature: temperature
        }];
        return newData;
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, [salinity, temperature]);

  // Determine Environment Status
  const getEnvironmentStatus = (sal: number) => {
    if (sal <= 2.0) return { 
      type: 'Freshwater', 
      message: 'FRESHWATER', 
      sub: 'Ideal for Tilapia, Hito, & Dalag.', 
      color: 'from-emerald-400 to-green-600',
      shadow: 'shadow-emerald-200',
      icon: <Fish size={90} className="mb-6 drop-shadow-md opacity-90 text-white" />
    };
    
    if (sal > 2.0 && sal <= 10.0) return { 
      type: 'Brackish', 
      message: 'BRACKISH MIX', 
      sub: 'Good for Bangus, Apahap & Hipon.', 
      color: 'from-sky-400 to-cyan-600',
      shadow: 'shadow-sky-200',
      icon: <Fish size={90} className="mb-6 drop-shadow-md opacity-90 text-white" />
    };

    return { 
      type: 'HighSalinity', 
      message: 'SALT INTRUSION', 
      sub: 'Warning: Too salty for pure freshwater fish.', 
      color: 'from-orange-400 to-red-500',
      shadow: 'shadow-orange-200',
      icon: <AlertTriangle size={80} className="mb-6 drop-shadow-md opacity-90 text-white" />
    };
  };

  const status = getEnvironmentStatus(salinity);
  const salinitySparkData = historyData.map(d => ({ value: d.salinity }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 overflow-x-hidden">
      
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="h-10 w-auto">
          <img src="assets/image.png" alt="Aqualiv" className="h-full w-auto object-contain" />
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar & Overlay */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Overlay Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 p-4 lg:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          
          {/* Top Row: Status & Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Status Card (Dynamic) */}
            <div className="lg:col-span-5 h-auto min-h-[320px]">
              <FreshwaterCard status={status} />
            </div>

            {/* Metrics & Fish Checker Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard 
                  type="salinity" 
                  value={parseFloat(salinity.toFixed(1))} 
                  unit="ppt"
                  chartData={salinitySparkData}
                />
                <MetricCard 
                  type="temperature" 
                  value={parseFloat(temperature.toFixed(1))} 
                  unit="°C"
                  maxValue={32}
                />
              </div>

              {/* Fish Checker */}
              <div className="flex-1">
                <SmartFishChecker />
              </div>
            </div>
          </div>

          {/* Bottom Row: Large Chart */}
          <div className="w-full">
            <SalinityChart historyData={historyData} currentSalinity={salinity} />
          </div>

        </div>
      </main>

      <style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;