import LaravelSlide from "@/components/backend/laravel-slide";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Laravel Deep Dive | Backend Masterclass",
  description:
    "Master Laravel from setup to production. Routing, controllers, Blade, Eloquent ORM, Sanctum auth, and deployment.",
};

export default function LaravelLessonPage() {
  return (
    <main className="min-h-screen bg-[#07090f] overflow-hidden">
      <nav className="p-4 pointer-events-none ">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          <Link
            href="/courses/backend"
            className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg"
          >
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-4 h-4 text-rose-400" />
            </div>
            <span className="text-sm font-medium tracking-wide">Roadmap</span>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm shadow-sm">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              Laravel Deep Dive
            </span>
          </div>
        </div>
      </nav>

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-white/20 font-black uppercase tracking-widest italic animate-pulse">
          Booting Laravel...
        </div>
      }>
        <LaravelSlide />
      </Suspense>
    </main>
  );
}
