// src/app/domain-explorer/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DomainExplorer from '@/components/mobile/DomainExplorer';

export default function DomainExplorerPage() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomain(domainId);
  };

  const handleSelectSubRole = (domainId: string, subRoleId: string) => {
    // Navigate to the sub-role deep-dive page
    router.push(`/sub-role-deep-dive?domainId=${domainId}&subRoleId=${subRoleId}`);
  };

  const handleBack = () => {
    if (selectedDomain) {
      setSelectedDomain(null);
    } else {
      router.back();
    }
  };

  return (
    <div className="font-sans min-h-screen bg-white">
      <DomainExplorer 
        onSelectDomain={handleSelectDomain}
        onSelectSubRole={handleSelectSubRole}
        onBack={handleBack}
      />
    </div>
  );
}