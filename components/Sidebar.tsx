import React from 'react';
import { Activity, History, Bell, Sparkles, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`
      w-64 h-screen bg-white fixed left-0 top-0 border-r border-gray-100 flex flex-col p-6 z-40
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0
    `}>
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 md:hidden"
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="mb-10 px-2 mt-2 md:mt-0">
        <img 
          src="images/image.png" 
          alt="Aqualiv" 
          className="w-full h-auto max-w-[160px] object-contain" 
        />
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