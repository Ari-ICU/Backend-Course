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
