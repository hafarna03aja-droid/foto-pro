import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('fotoPro_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Simple validation - in production, this would be an API call
    if (!email || !password) {
      throw new Error('Email dan password harus diisi');
    }

    if (password.length < 6) {
      throw new Error('Password minimal 6 karakter');
    }

    const userData = {
      email,
      name: email.split('@')[0],
      loginTime: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem('fotoPro_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fotoPro_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
