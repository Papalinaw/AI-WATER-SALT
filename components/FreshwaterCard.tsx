import React from 'react';
import { Fish } from 'lucide-react';

const FreshwaterCard: React.FC = () => {
  return (
    <div className="h-full min-h-[280px] bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden group">
      
      {/* Background decoration circles */}
      <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 bg-emerald-900/10 rounded-full blur-xl"></div>

      {/* Icon with Floating Animation */}
      <div className="mb-6 animate-float">
        <div className="transform group-hover:scale-110 transition-transform duration-300">
          <Fish size={64} strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold tracking-tight mb-4 text-center">FRESHWATER</h2>

      {/* Badge/Pill */}
      <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">
        <p className="text-sm font-medium text-emerald-50">Ideal for Tilapia, Hito, & Dalag.</p>
      </div>
    </div>
  );
};

export default FreshwaterCard;