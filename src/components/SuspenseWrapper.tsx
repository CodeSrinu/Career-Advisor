// src/components/SuspenseWrapper.tsx
'use client';

import { Suspense } from 'react';

export default function SuspenseWrapper({ 
  children, 
  fallback = <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div> 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}