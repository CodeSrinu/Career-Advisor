// src/app/domain-explorer/page.tsx
'use client';

import DomainExplorer from '@/components/DomainExplorer';
import Link from 'next/link';

export default function DomainExplorerPage() {
  return (
    <div className="font-sans min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Career Domains</h1>
          <p className="text-gray-600">Discover different career fields that might interest you</p>
        </div>
        
        <DomainExplorer />
      </div>
    </div>
  );
}