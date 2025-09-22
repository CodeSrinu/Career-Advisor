// src/app/psychology-quiz/page.tsx
'use client';

import PsychologyQuiz from '@/components/PsychologyQuiz';
import Link from 'next/link';

export default function PsychologyQuizPage() {
  return (
    <div className="font-sans min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Your Career Path</h1>
          <p className="text-gray-600">Answer a few questions to find careers that match your interests</p>
        </div>
        
        <PsychologyQuiz />
      </div>
    </div>
  );
}