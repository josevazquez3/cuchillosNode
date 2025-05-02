import React, { createContext, useState, useEffect } from 'react';

// Asegúrate de tener este archivo creado
import api from '../services/api.ts';

// Actualizada la interfaz User para incluir email
interface User {
  id: number;
  username: string;
  email: string; // Añadida la propiedad email
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Comprobar si el usuario ya está logueado
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.role === 'admin');
      
      // Establecer token para llamadas API
      if (api.defaults.headers) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      
      // Establecer token para llamadas API
      if (api.defaults.headers) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await api.post('/api/register', { username, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      
      // Establecer token para llamadas API
      if (api.defaults.headers) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    
    // Eliminar token de las llamadas API
    if (api.defaults.headers) {
      delete api.defaults.headers.common['Authorization'];
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;