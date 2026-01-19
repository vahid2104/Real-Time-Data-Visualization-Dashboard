import { useState, useEffect, useCallback } from 'react';
import { DataPoint } from '../data/mockData';

// Mock WebSocket implementation for real-time data simulation
export const useRealtimeLineData = (initialData: DataPoint[]) => {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection
    setIsConnected(true);
    
    const interval = setInterval(() => {
      const now = new Date();
      const newPoint: DataPoint = {
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        value: 65 + Math.random() * 15,
      };

      setData(prevData => {
        const newData = [...prevData.slice(1), newPoint];
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, []);

  return { data, isConnected };
};

export const useRealtimeBarData = (initialData: DataPoint[]) => {
  const [data, setData] = useState<DataPoint[]>(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData =>
        prevData.map(item => ({
          ...item,
          value: Math.max(20, Math.min(90, item.value + (Math.random() - 0.5) * 10)),
        }))
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return { data };
};

export const useRealtimeKPI = () => {
  const [currentValue, setCurrentValue] = useState(7234.56);
  const [change24h, setChange24h] = useState(2.45);
  const [maxValue, setMaxValue] = useState(7890.12);
  const [minValue, setMinValue] = useState(6543.21);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(prev => {
        const newValue = prev + (Math.random() - 0.5) * 50;
        
        // Update max and min
        setMaxValue(max => Math.max(max, newValue));
        setMinValue(min => Math.min(min, newValue));
        
        return newValue;
      });
      
      setChange24h(prev => prev + (Math.random() - 0.5) * 0.5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    currentValue,
    change24h,
    maxValue,
    minValue,
  };
};
