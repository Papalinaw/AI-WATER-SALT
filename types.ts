export interface SensorDataPoint {
  time: string;
  salinity: number; // ppt
  temperature: number; // celsius
}

export interface FishCompatibilityResult {
  species: string;
  suitable: boolean;
  idealSalinity: string;
  idealTemp: string;
  message: string;
  status: 'safe' | 'warning' | 'danger';
}

export interface AiAnalysisResult {
  insights: string[];
  summary: string;
}
