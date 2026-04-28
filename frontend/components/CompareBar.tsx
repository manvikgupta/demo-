"use client";

import { useContext } from 'react';
import { AppContext } from './Providers';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CompareBar() {
  const { compareColleges, toggleCompare } = useContext(AppContext);

  if (compareColleges.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center z-50">
      <div className="flex gap-4 items-center">
        <span className="font-bold text-gray-700">Compare ({compareColleges.length}/5):</span>
        <div className="flex gap-3">
          {compareColleges.map((c: any) => (
            <div key={c.id} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-sm font-medium text-blue-900 truncate max-w-[120px]">{c.name}</span>
              <button onClick={() => toggleCompare(c)} className="text-blue-500 hover:text-blue-700"><X size={16} /></button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {compareColleges.length > 1 ? (
          <Link href="/compare" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">Compare Now</Link>
        ) : (
          <span className="text-gray-400 text-sm py-2">Select at least 2</span>
        )}
      </div>
    </div>
  );
}
