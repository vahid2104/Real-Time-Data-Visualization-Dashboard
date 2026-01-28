import { createContext, useContext, useMemo, useState } from "react";
import { clearAuth, getUser, saveAuth } from "../utils/authStorage";

type User = { id: string; name: string; email: string };

type AuthState = {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getUser());

  const value = useMemo<AuthState>(
    () => ({
      user,
      login: (token, u) => {
        saveAuth(token, u);
        setUser(u);
      },
      logout: () => {
        clearAuth();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
