import { Settings, Moon, Sun, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';

export function QuickSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4">
              <h4 className="text-gray-900 mb-4">Quick Settings</h4>
              
              <div className="space-y-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <span className="text-sm text-gray-700">Dark Mode</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${isDarkMode ? 'ml-5' : 'ml-1'}`}></div>
                  </div>
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="text-sm text-gray-700">Fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
