// src/components/DomainExplorer.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string | JSX.Element;
  color: string;
}

const DomainExplorer = () => {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Sample domain data
  const domains: Domain[] = [
    {
      id: "digital-core-tech",
      name: "Digital & Core Tech",
      description: "Software development, infrastructure, and emerging technologies",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "data-ai-research",
      name: "Data, AI & Research",
      description: "Data science, machine learning, and scientific research",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "healthcare-life-sciences",
      name: "Healthcare & Life Sciences",
      description: "Medical care, research, and health technology",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "education-academia",
      name: "Education & Academia",
      description: "Teaching, research, and educational technology",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "business-management",
      name: "Business, Management & Support",
      description: "Strategy, operations, and business support functions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "creative-media",
      name: "Creative, Media & Performing Arts",
      description: "Artistic expression, media production, and performance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "skilled-trades",
      name: "Skilled Trades, Services & Physical",
      description: "Hands-on professions that keep society functioning",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    },
    {
      id: "entrepreneurship",
      name: "Entrepreneurship & Self-Employment",
      description: "Creating and running your own business ventures",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "bg-[#E8F8EA] text-[#333333]"
    }
  ];

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomain(domainId);
    // In a real implementation, you would navigate to the sub-role explorer
    // For now, we'll just show an alert
    const domainName = domains.find(d => d.id === domainId)?.name;
    alert(`You selected ${domainName}. In a full implementation, you would see detailed career information and sub-roles for this domain. After exploring, you would proceed to a skill assessment to determine your starting level.`);
  };

  return (
    <div className="font-sans min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Career Domains</h1>
          <p className="text-gray-600">Select a domain to discover career paths that match your interests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer border-2 ${
                selectedDomain === domain.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-transparent'
              }`}
              onClick={() => handleSelectDomain(domain.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${domain.color}`}>
                  {domain.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{domain.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{domain.description}</p>
                <div className="mt-auto">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    Explore Careers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedDomain && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {domains.find(d => d.id === selectedDomain)?.name} Careers
            </h2>
            <p className="text-gray-600 mb-4">
              This domain offers diverse career opportunities. In a full implementation, you would see detailed information about specific sub-roles, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Day-to-day responsibilities</li>
              <li>Salary ranges and growth potential</li>
              <li>Required skills and qualifications</li>
              <li>Career trajectory and advancement paths</li>
              <li>Native-language subtitled videos</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  // In a real implementation, navigate to sub-role explorer
                  router.push(`/domains/${selectedDomain}/sub-roles`);
                }}
                className="py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-md hover:shadow-lg"
              >
                Explore Sub-Roles
              </button>
              <button
                onClick={() => setSelectedDomain(null)}
                className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Back to Domains
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainExplorer;