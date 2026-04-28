"use client";

import Link from 'next/link';
import { MapPin, Star, IndianRupee, Heart } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from './Providers';

export default function CollegeCard({ college }: { college: any }) {
  const { compareColleges, toggleCompare } = useContext(AppContext);
  const isCompared = compareColleges.some((c: any) => c.id === college.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img src={college.image_url} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold text-yellow-600 flex items-center gap-1 shadow">
          <Star size={16} fill="currentColor" /> {college.rating}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{college.name}</h3>
        <div className="flex items-center text-slate-500 mb-4 text-sm">
          <MapPin size={16} className="mr-1 text-slate-400" /> {college.location}, {college.state}
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl mb-5 mt-auto">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Annual Fees</p>
            <p className="font-bold text-slate-800 flex items-center"><IndianRupee size={14} className="mr-1" />{(college.fees / 100000).toFixed(1)}L</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Placement</p>
            <p className="font-bold text-green-600">{college.placement_percent}%</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/colleges/${college.id}`} className="flex-grow text-center bg-slate-900 text-white py-2 rounded-xl font-medium hover:bg-slate-800 transition">
            View Details
          </Link>
          <button 
            onClick={() => toggleCompare(college)}
            className={`px-4 py-2 rounded-xl font-medium border transition ${isCompared ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            {isCompared ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}
