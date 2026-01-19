import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  label?: string;
}

export function ConnectionStatus({ isConnected, label = 'Live' }: ConnectionStatusProps) {
  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs">
        <WifiOff className="w-3 h-3" />
        <span>Disconnected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span>{label}</span>
    </div>
  );
}
