import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { AlertsScreen } from "./components/screens/AlertsScreen";
import { AnalyticsScreen } from "./components/screens/AnalyticsScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { Toaster } from "./components/ui/sonner";
import { useAuth } from "./context/AuthContext";

export default function App() {
  // ✅ ALL hooks at top-level
  const { user, logout } = useAuth();

  const [activeView, setActiveView] = useState("dashboard");
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ conditional return AFTER hooks
  if (!user) {
    return authView === "login" ? (
      <>
        <LoginScreen onGoRegister={() => setAuthView("register")} />
        <Toaster position="top-right" />
      </>
    ) : (
      <>
        <RegisterScreen onGoLogin={() => setAuthView("login")} />
        <Toaster position="top-right" />
      </>
    );
  }

  const renderScreen = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardScreen searchQuery={searchQuery} />;
      case "alerts":
        return <AlertsScreen searchQuery={searchQuery} />;
      case "analytics":
        return <AnalyticsScreen searchQuery={searchQuery} />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <DashboardScreen searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        userName={user.name}
        userRole="Admin"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />

        <main className="flex-1 p-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={logout}
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
            >
              Logout
            </button>
          </div>

          {renderScreen()}
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
