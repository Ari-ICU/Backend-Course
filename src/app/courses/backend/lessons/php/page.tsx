import PHPLaravelLesson from "@/components/backend/php-slides";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "PHP & Laravel Masterclass | 1h/Day · Mon-Fri",
  description:
    "The complete backend journey. Master PHP fundamentals, Laravel framework, database architecture, and production deployment.",
};

export default function BackendLessonPage() {
  return (
    <main className="min-h-screen bg-[#080c14] overflow-hidden">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white/20 font-black uppercase tracking-widest italic animate-pulse">Initializing Engineering Environment...</div>}>
        <PHPLaravelLesson />
      </Suspense>
    </main>
  );
}
