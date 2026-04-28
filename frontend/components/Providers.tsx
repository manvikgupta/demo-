"use client";

import React, { createContext, useState, useEffect } from 'react';
import { api, setAuthToken } from '../lib/api';

export const AppContext = createContext<any>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [compareColleges, setCompareColleges] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // Ideally fetch user profile here
      setUser({ token });
    }
  }, []);

  const toggleCompare = (college: any) => {
    setCompareColleges(prev => {
      if (prev.find(c => c.id === college.id)) {
        return prev.filter(c => c.id !== college.id);
      }
      if (prev.length >= 5) {
        alert("You can only compare up to 5 colleges at a time.");
        return prev;
      }
      return [...prev, college];
    });
  };

  return (
    <AppContext.Provider value={{ user, setUser, compareColleges, toggleCompare }}>
      {children}
    </AppContext.Provider>
  );
};
