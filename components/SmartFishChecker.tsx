import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { checkFishCompatibility } from '../services/aiService';
import { FishCompatibilityResult } from '../types';

const SmartFishChecker: React.FC = () => {
  const [species, setSpecies] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FishCompatibilityResult | null>(null);

  const handleCheck = async () => {
    if (!species.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const data = await checkFishCompatibility(species);
      setResult(data);
    } catch (error) {
      console.error("AI Service Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  const getStatusColor = (status: 'safe' | 'warning' | 'danger') => {
    switch (status) {
      case 'safe': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'warning': return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'danger': return 'text-red-500 bg-red-50 border-red-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getStatusIcon = (status: 'safe' | 'warning' | 'danger') => {
    switch (status) {
      case 'safe': return <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={20} />;
      case 'warning': return <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" size={20} />;
      case 'danger': return <XCircle className="text-red-500 mt-1 flex-shrink-0" size={20} />;
      default: return null;
    }
  };

  const getStatusLabel = (result: FishCompatibilityResult) => {
    if (result.status === 'safe') return '✅ Suitable';
    if (result.status === 'danger') return '⛔ Not Suitable';
    return '⚠️ Not Ideal';
  };

  return (
    // Removed absolute positioning constraints and using relative for internal flow
    // overflow-hidden is kept for border-radius but the height is auto to grow with content
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Smart Fish Checker</h3>
        </div>
        
        {/* Decorative subtle visual */}
        <div className="hidden sm:block">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l0 14"/><path d="M18 13l-6-6"/><path d="M6 13l6-6"/></svg>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative flex items-center mb-6">
        <div className="absolute left-4 text-slate-400">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Tilapia, Bangus, Hito..."
          className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-blue-500 text-slate-800 rounded-2xl py-3 pl-12 pr-28 transition-all outline-none"
        />
        <button 
          onClick={handleCheck}
          disabled={loading}
          className="absolute right-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Check'}
        </button>
      </div>

      {/* AI Result Area - Renders in normal flow to push content down */}
      {result && (
        <div className={`rounded-2xl p-5 animate-fade-in border ${getStatusColor(result.status).replace('text-', 'border-').split(' ')[2]} ${result.status === 'danger' ? 'bg-red-50' : 'bg-slate-50'}`}>
          <div className="flex items-start gap-3">
             {getStatusIcon(result.status)}
             
             <div className="flex-1">
                <p className={`font-medium text-lg mb-1 ${result.status === 'danger' ? 'text-red-800' : 'text-slate-800'}`}>
                  {result.message}
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                  <div className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                    <span className="block text-xs text-slate-400 uppercase tracking-wide">Ideal Salinity</span>
                    <span className="font-semibold text-slate-700">{result.idealSalinity}</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                    <span className="block text-xs text-slate-400 uppercase tracking-wide">Ideal Temp</span>
                    <span className="font-semibold text-slate-700">{result.idealTemp}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-md border flex items-center shadow-sm ${getStatusColor(result.status)}`}>
                    <span className="font-bold">{getStatusLabel(result)}</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartFishChecker;