import { useState, useCallback } from 'react';

export interface DashboardState {
  isLoading: boolean;
  isRefreshing: boolean;
  selectedTimeRange: '1h' | '24h' | '7d' | '30d';
  autoRefresh: boolean;
  refreshInterval: number;
}

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    isLoading: true,
    isRefreshing: false,
    selectedTimeRange: '24h',
    autoRefresh: true,
    refreshInterval: 5000,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setRefreshing = useCallback((refreshing: boolean) => {
    setState(prev => ({ ...prev, isRefreshing: refreshing }));
  }, []);

  const setTimeRange = useCallback((range: DashboardState['selectedTimeRange']) => {
    setState(prev => ({ ...prev, selectedTimeRange: range }));
  }, []);

  const toggleAutoRefresh = useCallback(() => {
    setState(prev => ({ ...prev, autoRefresh: !prev.autoRefresh }));
  }, []);

  const setRefreshInterval = useCallback((interval: number) => {
    setState(prev => ({ ...prev, refreshInterval: interval }));
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, [setRefreshing]);

  return {
    state,
    setLoading,
    setRefreshing,
    setTimeRange,
    toggleAutoRefresh,
    setRefreshInterval,
    refresh,
  };
}
