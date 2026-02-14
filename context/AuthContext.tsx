import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define User Tiers
export type UserTier = 'free' | 'student' | 'mentee' | 'master';

interface User {
  username: string;
  tier: UserTier;
}

interface AuthContextType {
  user: User | null;
  currentView: 'landing' | 'login' | 'portal';
  login: (username: string, password: string) => boolean;
  logout: () => void;
  showLogin: () => void;
  showLanding: () => void;
  getTierLevel: (tier: UserTier) => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credential Mapping
const CREDENTIALS: Record<string, { pass: string, tier: UserTier }> = {
  'usertestfree': { pass: '1234', tier: 'free' },
  'userteststudent': { pass: '1234', tier: 'student' },
  'usertestmentee': { pass: '1234', tier: 'mentee' },
  'usertestmaster': { pass: '1234', tier: 'master' },
};

// Hierarchy Level for comparison
const TIER_LEVELS: Record<UserTier, number> = {
  'free': 0,
  'student': 1,
  'mentee': 2,
  'master': 3,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'portal'>('landing');

  const login = (username: string, pass: string): boolean => {
    const normalizedUser = username.toLowerCase().trim();
    const creds = CREDENTIALS[normalizedUser];

    if (creds && creds.pass === pass) {
      setUser({ username: normalizedUser, tier: creds.tier });
      setCurrentView('portal');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const showLogin = () => setCurrentView('login');
  const showLanding = () => setCurrentView('landing');

  const getTierLevel = (tier: UserTier) => TIER_LEVELS[tier];

  return (
    <AuthContext.Provider value={{ user, currentView, login, logout, showLogin, showLanding, getTierLevel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};