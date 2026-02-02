import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle, AlertTriangle, XCircle, Loader } from 'lucide-react';
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

  return (
    <div className="h-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles size={100} className="text-sky-500" />
      </div>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
          <Sparkles size={20} />
        </div>
        <h3 className="font-bold text-slate-700">Smart Fish Checker</h3>
      </div>

      {/* Input Group */}
      <div className="flex gap-2 z-10 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="e.g. Tilapia, Bangus..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-sm"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button 
          onClick={handleCheck}
          disabled={loading}
          className="bg-slate-900 text-white px-4 rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 min-w-[80px] flex justify-center items-center"
        >
          {loading ? <Loader className="animate-spin" size={18} /> : 'Check'}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`mt-auto p-3 rounded-xl flex items-start gap-3 animate-fade-in border ${
          result.status === 'safe' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 
          result.status === 'danger' ? 'bg-red-50 border-red-100 text-red-900' : 
          'bg-amber-50 border-amber-100 text-amber-900'
        }`}>
          <div className="shrink-0 mt-0.5">
            {result.status === 'safe' && <CheckCircle className="text-emerald-500" size={20} />}
            {result.status === 'danger' && <XCircle className="text-red-500" size={20} />}
            {result.status === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
          </div>
          <div>
            <p className="font-bold text-sm">
              {result.status === 'safe' ? 'Compatible!' : result.status === 'danger' ? 'Not Recommended' : 'Use Caution'}
            </p>
            <p className="text-xs opacity-80 mt-1 leading-relaxed">{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartFishChecker;