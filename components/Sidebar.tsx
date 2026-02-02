import React, { useState } from 'react';
import { Activity, History, Bell, Sparkles, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Monitor');

  const navItems = [
    { name: 'Monitor', icon: <Activity size={20} /> },
    { name: 'Trends', icon: <History size={20} /> },
    { name: 'Alerts', icon: <Bell size={20} /> },
  ];

  return (
    <aside className={`
      fixed lg:fixed inset-y-0 left-0 z-40
      w-64 bg-sky-50 border-r border-sky-100 flex flex-col p-6
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      max-w-[85vw]
    `}>
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 lg:hidden"
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="mb-10 px-2 mt-2 lg:mt-0 flex items-center justify-center lg:justify-start">
        <img 
          src="logo/image.png" 
          alt="Aqualiv" 
          className="h-16 w-auto object-contain"
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.style.display = 'none';
             target.parentElement!.innerHTML = '<span class="text-2xl font-bold text-sky-600">Aqualiv</span>';
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`
              w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group text-left
              ${activeTab === item.name 
                ? 'bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-200 font-semibold' 
                : 'text-slate-500 hover:bg-white hover:text-sky-600 hover:shadow-sm'
              }
            `}
          >
            <div className={activeTab === item.name ? 'text-white' : 'text-slate-400 group-hover:text-sky-500'}>
              {item.icon}
            </div>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom AI Info Card */}
      <div className="mt-auto bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl p-5 text-white shadow-lg shadow-sky-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Sparkles size={40} />
        </div>
        
        <div className="flex items-center gap-2 mb-2 relative z-10">
          <Sparkles size={18} className="text-yellow-200" />
          <h3 className="font-semibold text-sm">AI Analysis</h3>
        </div>
        <p className="text-xs text-sky-50 leading-relaxed opacity-90 relative z-10">
          Smart Buoy connected for river salinity monitoring.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;