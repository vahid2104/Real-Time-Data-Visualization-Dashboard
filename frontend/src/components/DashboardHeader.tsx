import { Calendar, Download, RefreshCw, Filter, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  onExport?: () => void;
  onTimeRangeChange?: (range: string) => void;
  onFiltersChange?: (filters: string[]) => void;
}

const timeRanges = [
  { label: 'Last hour', value: '1h' },
  { label: 'Last 6 hours', value: '6h' },
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Custom range', value: 'custom' },
];

const filterOptions = [
  { label: 'Critical Alerts', value: 'critical' },
  { label: 'High Performance', value: 'high-performance' },
  { label: 'Low Performance', value: 'low-performance' },
  { label: 'Active Systems', value: 'active' },
  { label: 'Inactive Systems', value: 'inactive' },
  { label: 'Anomalies', value: 'anomalies' },
];

export function DashboardHeader({ 
  title, 
  subtitle, 
  onRefresh,
  onExport,
  onTimeRangeChange,
  onFiltersChange
}: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleTimeRangeSelect = (value: string) => {
    setSelectedTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleFilterToggle = (value: string) => {
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter(f => f !== value)
      : [...activeFilters, value];
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleRemoveFilter = (value: string) => {
    const newFilters = activeFilters.filter(f => f !== value);
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onFiltersChange?.([]);
  };

  const getTimeRangeLabel = () => {
    return timeRanges.find(tr => tr.value === selectedTimeRange)?.label || 'Last 24 hours';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{getTimeRangeLabel()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {timeRanges.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => handleTimeRangeSelect(range.value)}
                  className={selectedTimeRange === range.value ? 'bg-blue-50 text-blue-600' : ''}
                >
                  {range.label}
                  {selectedTimeRange === range.value && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors relative">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
                {activeFilters.length > 0 && (
                  <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Apply Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => handleFilterToggle(filter.value)}
                  className={activeFilters.includes(filter.value) ? 'bg-blue-50 text-blue-600' : ''}
                >
                  <span className="flex-1">{filter.label}</span>
                  {activeFilters.includes(filter.value) && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
              {activeFilters.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearAllFilters}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear all filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh Button */}
          <button 
            onClick={handleRefresh}
            className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Button */}
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {activeFilters.map((filterValue) => {
            const filter = filterOptions.find(f => f.value === filterValue);
            return (
              <Badge
                key={filterValue}
                variant="secondary"
                className="gap-1 pr-1"
              >
                {filter?.label}
                <button
                  onClick={() => handleRemoveFilter(filterValue)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}