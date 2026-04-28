"use client";

import { useEffect, useState, use } from 'react';
import { api } from '../../../lib/api';
import { MapPin, Star, IndianRupee, Calendar, BookOpen, Heart } from 'lucide-react';

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await api.get(`/api/colleges/${unwrappedParams.id}`);
        // Parse courses if it's a JSON string (SQLite workaround)
        let data = res.data;
        if (typeof data.courses === 'string') {
          try { data.courses = JSON.parse(data.courses); } catch(e) {}
        }
        setCollege(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [unwrappedParams.id]);

  if (loading) return <div className="p-20 text-center text-xl text-slate-500 animate-pulse">Loading amazing details...</div>;
  if (!college) return <div className="p-20 text-center text-xl text-red-500">College not found.</div>;

  return (
    <div>
      <div className="h-80 w-full relative">
        <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex justify-between items-end">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">University</span>
                <span className="flex items-center text-yellow-400 font-bold"><Star size={16} fill="currentColor" className="mr-1"/> {college.rating}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{college.name}</h1>
              <p className="flex items-center text-slate-300 text-lg"><MapPin size={20} className="mr-2"/> {college.location}, {college.state}</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white px-6 py-3 rounded-full font-bold flex items-center transition">
              <Heart size={20} className="mr-2" /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Overview</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{college.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Top Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(college.courses) ? college.courses.map((course: string, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center">
                  <div className="bg-blue-50 p-3 rounded-lg mr-4 text-blue-600"><BookOpen size={24} /></div>
                  <span className="font-medium text-slate-700">{course}</span>
                </div>
              )) : <span className="text-slate-500">Courses information unavailable</span>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Student Reviews</h2>
            <div className="space-y-4">
              {college.reviews?.map((review: any) => (
                <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-900">{review.author}</h4>
                    <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm font-bold flex items-center">
                      <Star size={14} fill="currentColor" className="mr-1"/> {review.rating}
                    </span>
                  </div>
                  <p className="text-slate-600 italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Quick Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center text-slate-500"><IndianRupee size={20} className="mr-3 text-blue-500"/> Annual Fees</div>
                <div className="font-bold text-slate-900">₹{(college.fees).toLocaleString()}</div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center text-slate-500"><Star size={20} className="mr-3 text-green-500"/> Placement Rate</div>
                <div className="font-bold text-slate-900">{college.placement_percent}%</div>
              </div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center text-slate-500"><Calendar size={20} className="mr-3 text-purple-500"/> Established</div>
                <div className="font-bold text-slate-900">{college.established_year}</div>
              </div>
            </div>
            <button className="w-full mt-8 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
