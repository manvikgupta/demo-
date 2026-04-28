"use client";

import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import CollegeCard from '../../components/CollegeCard';
import { Search, Filter } from 'lucide-react';

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/colleges', {
          params: { search: debouncedSearch, location, limit: 12 }
        });
        setColleges(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, [debouncedSearch, location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Explore Colleges</h1>
          <p className="text-slate-500">Find and compare the best engineering colleges in India.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none"
            >
              <option value="">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="bg-slate-200 h-96 rounded-2xl"></div>
          ))}
        </div>
      ) : colleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
          {colleges.map((c: any) => (
            <CollegeCard key={c.id} college={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-slate-500">No colleges found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
