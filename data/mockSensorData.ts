import { SensorDataPoint } from '../types';

export const mockSensorHistory: SensorDataPoint[] = [
  { time: '20:00', salinity: 1.2, temperature: 29.0 },
  { time: '22:00', salinity: 1.1, temperature: 28.8 },
  { time: '24:00', salinity: 1.0, temperature: 28.5 },
  { time: '02:00', salinity: 1.3, temperature: 28.2 },
  { time: '04:00', salinity: 1.6, temperature: 28.0 },
  { time: '06:00', salinity: 1.6, temperature: 28.5 },
  { time: '08:00', salinity: 1.7, temperature: 29.1 },
  { time: '10:00', salinity: 1.7, temperature: 29.4 },
  { time: '12:00', salinity: 1.8, temperature: 29.8 },
  { time: '14:00', salinity: 1.7, temperature: 29.2 },
];

export const currentMetrics = {
  salinity: 1.7,
  temperature: 29.2,
};