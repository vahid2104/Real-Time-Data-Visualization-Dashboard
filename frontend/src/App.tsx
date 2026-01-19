import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { AlertsScreen } from './components/screens/AlertsScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderScreen = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'alerts':
        return <AlertsScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 p-8">
          {renderScreen()}
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}