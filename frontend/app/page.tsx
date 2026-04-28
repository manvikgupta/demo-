import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
        Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream College</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mb-10">
        Explore detailed insights, compare placement records, and find the perfect institution for your future.
      </p>
      <Link href="/colleges" className="bg-blue-600 text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition transform duration-300">
        Explore Colleges
      </Link>
    </div>
  );
}
