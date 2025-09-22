// src/app/sub-role-deep-dive/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SubRoleDeepDivePage from '@/components/mobile/SubRoleDeepDivePage';
import SuspenseWrapper from '@/components/SuspenseWrapper';

export default function SubRoleDeepDivePageRoute() {
  return (
    <SuspenseWrapper>
      <SubRoleDeepDivePageRouteContent />
    </SuspenseWrapper>
  );
}

function SubRoleDeepDivePageRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subRoleId = searchParams?.get('subRoleId') || '';
  const domainId = searchParams?.get('domainId') || '';

  const handleBack = () => {
    router.back();
  };

  const handleStartLearning = () => {
    // Navigate to the skill assessment page
    router.push(`/skill-assessment?roleId=${subRoleId}&domainId=${domainId}`);
  };

  if (!subRoleId || !domainId) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Request</h1>
          <p className="text-gray-600 mb-6">Missing required parameters for role details.</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => router.push('/domain-explorer')}
          >
            Back to Domain Explorer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SubRoleDeepDivePage
        subRoleId={subRoleId}
        domainId={domainId}
        onBack={handleBack}
        onStartLearning={handleStartLearning}
      />
    </div>
  );
}