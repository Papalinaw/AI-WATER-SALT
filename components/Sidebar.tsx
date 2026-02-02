import React from 'react';
import { Activity, History, Bell, Sparkles, FishSymbol } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white fixed left-0 top-0 border-r border-gray-100 flex flex-col p-6 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="text-blue-500">
           {/* Stylized Logo Icon */}
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-500">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">Aqualiv</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-200/50 transition-all">
          <Activity size={20} />
          <span className="font-medium">Monitor</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
          <History size={20} />
          <span className="font-medium">Trends</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
          <Bell size={20} />
          <span className="font-medium">Alerts</span>
        </a>
      </nav>

      {/* Bottom AI Info Card */}
      <div className="mt-auto bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/30 relative overflow-hidden">
        {/* Decorative sparkles */}
        <Sparkles className="absolute top-3 right-3 text-white/30" size={16} />
        
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-yellow-200" />
          <h3 className="font-semibold text-sm">AI Analysis</h3>
        </div>
        <p className="text-xs text-blue-50 leading-relaxed opacity-90">
          Smart Buoy connected for river salinity monitoring.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;