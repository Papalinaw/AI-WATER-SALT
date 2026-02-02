import { FishCompatibilityResult, AiAnalysisResult, SensorDataPoint } from '../types';
import { currentMetrics } from '../data/mockSensorData';

const DELAY_MS = 1500; // Simulate network latency

// --- Species Knowledge Base ---
interface SpeciesProfile {
  name: string;
  type: 'Freshwater' | 'Saltwater' | 'Brackish' | 'Euryhaline';
  minSalinity: number; // ppt
  maxSalinity: number; // ppt
  minTemp: number; // Celsius
  maxTemp: number; // Celsius
}

const SPECIES_DB: Record<string, SpeciesProfile> = {
  'tilapia': { name: 'Tilapia', type: 'Freshwater', minSalinity: 0, maxSalinity: 5, minTemp: 24, maxTemp: 32 },
  'nile tilapia': { name: 'Nile Tilapia', type: 'Freshwater', minSalinity: 0, maxSalinity: 5, minTemp: 24, maxTemp: 32 },
  'hito': { name: 'Hito (Catfish)', type: 'Freshwater', minSalinity: 0, maxSalinity: 2, minTemp: 25, maxTemp: 32 },
  'catfish': { name: 'Catfish', type: 'Freshwater', minSalinity: 0, maxSalinity: 2, minTemp: 25, maxTemp: 32 },
  'dalag': { name: 'Dalag (Mudfish)', type: 'Freshwater', minSalinity: 0, maxSalinity: 0.5, minTemp: 24, maxTemp: 30 },
  'mudfish': { name: 'Dalag (Mudfish)', type: 'Freshwater', minSalinity: 0, maxSalinity: 0.5, minTemp: 24, maxTemp: 30 },
  'bangus': { name: 'Bangus (Milkfish)', type: 'Euryhaline', minSalinity: 0, maxSalinity: 35, minTemp: 20, maxTemp: 35 },
  'milkfish': { name: 'Bangus (Milkfish)', type: 'Euryhaline', minSalinity: 0, maxSalinity: 35, minTemp: 20, maxTemp: 35 },
  'carp': { name: 'Carp', type: 'Freshwater', minSalinity: 0, maxSalinity: 2, minTemp: 15, maxTemp: 28 },
  'goldfish': { name: 'Goldfish', type: 'Freshwater', minSalinity: 0, maxSalinity: 1, minTemp: 15, maxTemp: 24 },
  'tuna': { name: 'Tuna', type: 'Saltwater', minSalinity: 30, maxSalinity: 40, minTemp: 18, maxTemp: 28 },
  'grouper': { name: 'Grouper (Lapu-Lapu)', type: 'Saltwater', minSalinity: 30, maxSalinity: 35, minTemp: 24, maxTemp: 30 },
  'lapu-lapu': { name: 'Grouper (Lapu-Lapu)', type: 'Saltwater', minSalinity: 30, maxSalinity: 35, minTemp: 24, maxTemp: 30 },
  'clownfish': { name: 'Clownfish', type: 'Saltwater', minSalinity: 28, maxSalinity: 35, minTemp: 24, maxTemp: 29 },
  'salmon': { name: 'Salmon', type: 'Euryhaline', minSalinity: 0, maxSalinity: 35, minTemp: 5, maxTemp: 20 },
  'guppy': { name: 'Guppy', type: 'Freshwater', minSalinity: 0, maxSalinity: 5, minTemp: 22, maxTemp: 28 },
  'maya-maya': { name: 'Maya-Maya (Snapper)', type: 'Saltwater', minSalinity: 30, maxSalinity: 40, minTemp: 22, maxTemp: 30 },
};

export const checkFishCompatibility = async (speciesInput: string): Promise<FishCompatibilityResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const query = speciesInput.toLowerCase().trim();
      
      // 1. Identify Species
      // Find the closest match in keys
      const matchedKey = Object.keys(SPECIES_DB).find(key => query.includes(key));
      const profile = matchedKey ? SPECIES_DB[matchedKey] : null;

      // Handle Unknown Species
      if (!profile) {
        resolve({
          species: speciesInput,
          suitable: false,
          idealSalinity: 'Unknown',
          idealTemp: 'Unknown',
          message: `Species data for "${speciesInput}" not found. Please verify species name.`,
          status: 'warning'
        });
        return;
      }

      // 2. Analyze against Current Metrics
      const { salinity, temperature } = currentMetrics;
      const { minSalinity, maxSalinity, minTemp, maxTemp, type, name } = profile;

      let status: 'safe' | 'warning' | 'danger' = 'safe';
      let suitable = true;
      let reasons: string[] = [];

      // Check Water Type Compatibility (Major Filter)
      if (type === 'Saltwater' && salinity < 15) {
        status = 'danger';
        suitable = false;
        reasons.push(`Fatal: ${name} is a Saltwater species. Current freshwater (${salinity} ppt) is lethal.`);
      } else if (type === 'Freshwater' && salinity > 10) {
        status = 'danger';
        suitable = false;
        reasons.push(`Fatal: ${name} is a Freshwater species. High salinity is lethal.`);
      } else {
        // Detailed Range Check
        if (salinity < minSalinity || salinity > maxSalinity) {
          suitable = false;
          status = 'warning';
          // If deviation is extreme, upgrade to danger
          if (Math.abs(salinity - (minSalinity + maxSalinity)/2) > 10) status = 'danger';
          reasons.push(`Salinity (${salinity} ppt) is outside ideal range (${minSalinity}-${maxSalinity} ppt).`);
        }
        
        if (temperature < minTemp || temperature > maxTemp) {
          suitable = false;
          // Temp usually triggers warning unless extreme
          if (status !== 'danger') status = 'warning';
          reasons.push(`Temp (${temperature}°C) is outside optimal range (${minTemp}-${maxTemp}°C).`);
        }
      }

      // Construct Message
      let message = `${name} is suitable for current river conditions.`;
      if (reasons.length > 0) {
        message = reasons.join(' ');
      }

      resolve({
        species: name,
        suitable,
        idealSalinity: `${minSalinity}–${maxSalinity} ppt`,
        idealTemp: `${minTemp}–${maxTemp}°C`,
        message,
        status
      });

    }, DELAY_MS);
  });
};

export const analyzeWaterConditions = async (history: SensorDataPoint[]): Promise<AiAnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Calculate Stats
      if (history.length === 0) {
        resolve({ summary: "Insufficient data.", insights: [] });
        return;
      }

      const latest = history[history.length - 1];
      const previous = history[history.length - 2];
      const salinities = history.map(d => d.salinity);
      
      const avgSalinity = salinities.reduce((a, b) => a + b, 0) / salinities.length;
      const minSalinity = Math.min(...salinities);
      const maxSalinity = Math.max(...salinities);
      const trend = latest.salinity - history[0].salinity; // Simple start-to-end trend
      
      // 2. Generate Insights based on Logic
      const insights: string[] = [];
      let summary = "Water conditions are stable.";

      // Salinity Analysis
      if (latest.salinity < 0.5) {
        insights.push("Salinity is extremely low (Pure Freshwater). Ideal for sensitive freshwater species.");
      } else if (latest.salinity >= 0.5 && latest.salinity <= 5) {
        insights.push("Salinity is within standard Freshwater range. Optimal for Tilapia and Hito.");
      } else if (latest.salinity > 5) {
        insights.push(`Salinity is elevated (${latest.salinity} ppt). Brackish conditions detected.`);
        summary = "Elevated salinity levels detected.";
      }

      // Trend Analysis
      if (Math.abs(trend) < 0.5) {
        insights.push("Conditions are stable with minimal fluctuation over 24h.");
      } else if (trend > 0) {
        insights.push(`Salinity is rising (+${trend.toFixed(1)} ppt). Monitoring recommended.`);
        summary = "Rising salinity trend detected.";
      } else {
        insights.push(`Salinity is dropping (${trend.toFixed(1)} ppt). Influx of freshwater likely.`);
      }

      // Anomaly Check
      if (latest.salinity > avgSalinity * 1.5) {
        insights.push("Sudden spike detected in recent readings.");
        summary = "Warning: Salinity spike detected.";
      }

      // Temperature Check context
      if (latest.temperature > 32) {
         insights.push(`Water temperature is high (${latest.temperature}°C). Risk of oxygen depletion.`);
      } else if (latest.temperature < 20) {
         insights.push(`Water temperature is low (${latest.temperature}°C). Feeding activity may decrease.`);
      } else {
         insights.push(`Temperature (${latest.temperature}°C) is optimal for biological activity.`);
      }

      resolve({
        summary,
        insights
      });
    }, DELAY_MS);
  });
};