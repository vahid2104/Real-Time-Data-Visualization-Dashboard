// Chart configuration and theming

export const chartColors = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
};

export const chartTheme = {
  grid: {
    stroke: '#E5E7EB',
    strokeDasharray: '3 3',
  },
  axis: {
    stroke: '#6B7280',
    fontSize: 12,
  },
  tooltip: {
    backgroundColor: '#1F2937',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
  },
};

export const animationConfig = {
  duration: 300,
  easing: 'ease-in-out',
};

export const updateIntervals = {
  lineChart: 2000, // 2 seconds
  barChart: 3000, // 3 seconds
  kpiCards: 2000, // 2 seconds
};
