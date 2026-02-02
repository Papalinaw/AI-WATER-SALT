import React from 'react';

interface StatusProps {
  status: {
    type: string;
    message: string;
    sub: string;
    color: string;
    shadow: string;
    icon: React.ReactNode;
  };
}

const FreshwaterCard: React.FC<StatusProps> = ({ status }) => {
  return (
    <div className={`
      h-full w-full rounded-3xl p-8 flex flex-col items-center justify-center text-center text-white shadow-xl transition-all duration-500
      bg-gradient-to-br ${status.color} ${status.shadow} relative overflow-hidden group
    `}>
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Icon with Animation */}
      <div className="z-10 animate-float transform group-hover:scale-105 transition-transform duration-300">
        {status.icon}
      </div>
      
      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide leading-tight z-10 drop-shadow-sm mb-4">
        {status.message}
      </h2>
      
      {/* Subtitle Pill */}
      <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 z-10 max-w-full">
        <p className="font-medium text-xs md:text-sm text-white/90 truncate">
          {status.sub}
        </p>
      </div>
    </div>
  );
};

export default FreshwaterCard;