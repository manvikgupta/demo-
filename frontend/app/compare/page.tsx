"use client";

import { useContext } from 'react';
import { AppContext } from '../../components/Providers';
import Link from 'next/link';

export default function ComparePage() {
  const { compareColleges } = useContext(AppContext);

  if (compareColleges.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Not enough colleges to compare</h2>
        <p className="text-slate-500 mb-8">Please select at least 2 colleges from the listing page.</p>
        <Link href="/colleges" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">Go back to Colleges</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10 text-center">Compare Colleges</h1>
      
      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-6 border-b border-r bg-slate-50 w-1/4">
                <span className="text-lg font-bold text-slate-700">Features</span>
              </th>
              {compareColleges.map((c: any) => (
                <th key={c.id} className="p-6 border-b border-slate-200 text-center align-top w-1/4">
                  <img src={c.image_url} alt={c.name} className="w-full h-32 object-cover rounded-xl mb-4 shadow-sm" />
                  <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                </th>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => (
                <th key={`empty-${i}`} className="p-6 border-b border-slate-200 bg-slate-50"></th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6 border-b border-r bg-slate-50 font-medium text-slate-700">Location</td>
              {compareColleges.map((c: any) => (
                <td key={c.id} className="p-6 border-b text-center text-slate-600 font-medium">{c.location}, {c.state}</td>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => <td key={`emp1-${i}`} className="p-6 border-b bg-slate-50"></td>)}
            </tr>
            <tr>
              <td className="p-6 border-b border-r bg-slate-50 font-medium text-slate-700">Annual Fees</td>
              {compareColleges.map((c: any) => (
                <td key={c.id} className="p-6 border-b text-center font-bold text-slate-800">₹{c.fees.toLocaleString()}</td>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => <td key={`emp2-${i}`} className="p-6 border-b bg-slate-50"></td>)}
            </tr>
            <tr>
              <td className="p-6 border-b border-r bg-slate-50 font-medium text-slate-700">Placement %</td>
              {compareColleges.map((c: any) => (
                <td key={c.id} className="p-6 border-b text-center font-bold text-green-600">{c.placement_percent}%</td>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => <td key={`emp3-${i}`} className="p-6 border-b bg-slate-50"></td>)}
            </tr>
            <tr>
              <td className="p-6 border-b border-r bg-slate-50 font-medium text-slate-700">Rating</td>
              {compareColleges.map((c: any) => (
                <td key={c.id} className="p-6 border-b text-center font-bold text-yellow-600">★ {c.rating}/5.0</td>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => <td key={`emp4-${i}`} className="p-6 border-b bg-slate-50"></td>)}
            </tr>
            <tr>
              <td className="p-6 border-b border-r bg-slate-50 font-medium text-slate-700">Established</td>
              {compareColleges.map((c: any) => (
                <td key={c.id} className="p-6 border-b text-center text-slate-600">{c.established_year}</td>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => <td key={`emp5-${i}`} className="p-6 border-b bg-slate-50"></td>)}
            </tr>
            <tr>
              <td className="p-6 border-r bg-slate-50"></td>
              {compareColleges.map((c: any) => (
                <td key={c.id} className="p-6 text-center">
                  <Link href={`/colleges/${c.id}`} className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-800 transition">View Details</Link>
                </td>
              ))}
              {Array(3 - compareColleges.length).fill(0).map((_, i) => <td key={`emp6-${i}`} className="p-6 bg-slate-50"></td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
