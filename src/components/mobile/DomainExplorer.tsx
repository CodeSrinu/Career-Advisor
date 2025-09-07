// src/components/mobile/DomainExplorer.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SubRole {
  id: string;
  domainId: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  videoUrl?: string;
  dailyLife?: string[];
  salaryBands?: {
    entry: { min: number; max: number; currency: string; period: string };
    mid: { min: number; max: number; currency: string; period: string };
    senior: { min: number; max: number; currency: string; period: string };
  };
  careerTrajectory?: {
    year1: string;
    year2: string;
    year3: string;
    year5: string;
  };
}

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subRoles: SubRole[];
}

interface DomainExplorerProps {
  onSelectDomain: (domainId: string) => void;
  onSelectSubRole: (domainId: string, subRoleId: string) => void;
  onBack: () => void;
}

export default function DomainExplorer({ onSelectDomain, onBack }: DomainExplorerProps) {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);

  // Sample domain data
  const sampleDomains: Domain[] = [
    {
      id: "digital-core-tech",
      name: "Digital & Core Tech",
      description: "Software development, infrastructure, and emerging technologies",
      icon: "💻",
      color: "bg-blue-100 text-blue-800",
      subRoles: [
        {
          id: "software-engineer",
          domainId: "digital-core-tech",
          name: "Software Engineer",
          shortDescription: "Designs, develops, and maintains software applications and systems.",
          longDescription: "Software engineers create the programs and applications that run on computers and other devices. They work with programming languages like Python, Java, JavaScript, and C++ to build everything from mobile apps to enterprise systems.",
          videoUrl: "/videos/telugu/software-engineer.mp4",
          dailyLife: [
            "Morning standup meeting with team",
            "Code development and debugging",
            "Code reviews and pair programming",
            "Testing and quality assurance",
            "Documentation and planning"
          ],
          salaryBands: {
            entry: { min: 300000, max: 600000, currency: "₹", period: "year" },
            mid: { min: 800000, max: 1500000, currency: "₹", period: "year" },
            senior: { min: 2000000, max: 4000000, currency: "₹", period: "year" }
          },
          careerTrajectory: {
            year1: "Junior Developer - Learning fundamentals",
            year2: "Software Engineer - Independent contributor",
            year3: "Senior Engineer - Technical lead",
            year5: "Tech Lead/Architect - System design"
          }
        },
        {
          id: "mobile-game-dev",
          domainId: "digital-core-tech",
          name: "Mobile & Game Developer",
          shortDescription: "Creates applications and games for mobile devices and gaming platforms.",
          longDescription: "Mobile and game developers design and build interactive experiences for smartphones, tablets, and gaming consoles. They work with specialized frameworks and engines to create engaging user experiences.",
          videoUrl: "/videos/telugu/mobile-game-dev.mp4"
        }
      ]
    },
    {
      id: "data-ai-research",
      name: "Data, AI & Research",
      description: "Data science, machine learning, and scientific research",
      icon: "📊",
      color: "bg-purple-100 text-purple-800",
      subRoles: [
        {
          id: "data-scientist",
          domainId: "data-ai-research",
          name: "Data Scientist",
          shortDescription: "Analyzes complex data to derive insights and build predictive models.",
          longDescription: "Data scientists extract meaningful insights from complex datasets using statistical methods, machine learning algorithms, and data visualization techniques.",
          videoUrl: "/videos/telugu/data-scientist.mp4"
        }
      ]
    },
    {
      id: "healthcare-life-sciences",
      name: "Healthcare & Life Sciences",
      description: "Medical care, research, and health technology",
      icon: "🏥",
      color: "bg-red-100 text-red-800",
      subRoles: [
        {
          id: "clinical-doctor",
          domainId: "healthcare-life-sciences",
          name: "Clinical Doctor",
          shortDescription: "Diagnoses and treats patients in clinical settings.",
          longDescription: "Clinical doctors provide direct patient care, diagnose medical conditions, and develop treatment plans.",
          videoUrl: "/videos/telugu/clinical-doctor.mp4"
        }
      ]
    },
    {
      id: "education-academia",
      name: "Education & Academia",
      description: "Teaching, research, and educational technology",
      icon: "📚",
      color: "bg-green-100 text-green-800",
      subRoles: [
        {
          id: "school-teacher",
          domainId: "education-academia",
          name: "School Teacher",
          shortDescription: "Educates students and shapes young minds in primary and secondary schools.",
          longDescription: "School teachers create lesson plans, deliver instruction, and assess student progress in various subjects.",
          videoUrl: "/videos/telugu/school-teacher.mp4"
        }
      ]
    },
    {
      id: "business-management",
      name: "Business, Management & Support",
      description: "Strategy, operations, and business support functions",
      icon: "💼",
      color: "bg-yellow-100 text-yellow-800",
      subRoles: [
        {
          id: "business-analyst",
          domainId: "business-management",
          name: "Business Analyst",
          shortDescription: "Drives organizational efficiency through data-driven insights.",
          longDescription: "Business analysts identify business needs and determine solutions to problems within an organization.",
          videoUrl: "/videos/telugu/business-analyst.mp4"
        }
      ]
    },
    {
      id: "creative-media",
      name: "Creative, Media & Performing Arts",
      description: "Artistic expression, media production, and performance",
      icon: "🎨",
      color: "bg-pink-100 text-pink-800",
      subRoles: [
        {
          id: "graphic-designer",
          domainId: "creative-media",
          name: "Graphic Designer",
          shortDescription: "Creates visual content for digital and print media.",
          longDescription: "Graphic designers create visual concepts that communicate ideas and captivate audiences.",
          videoUrl: "/videos/telugu/graphic-designer.mp4"
        }
      ]
    },
    {
      id: "skilled-trades",
      name: "Skilled Trades, Services & Physical",
      description: "Hands-on professions that keep society functioning",
      icon: "🔧",
      color: "bg-teal-100 text-teal-800",
      subRoles: [
        {
          id: "electrician",
          domainId: "skilled-trades",
          name: "Electrician",
          shortDescription: "Installs, maintains, and repairs electrical systems.",
          longDescription: "Electricians work with electrical systems in homes, businesses, and factories.",
          videoUrl: "/videos/telugu/electrician.mp4"
        }
      ]
    },
    {
      id: "entrepreneurship",
      name: "Entrepreneurship & Self-Employment",
      description: "Creating and running your own business ventures",
      icon: "🚀",
      color: "bg-orange-100 text-orange-800",
      subRoles: [
        {
          id: "tech-founder",
          domainId: "entrepreneurship",
          name: "Tech Startup Founder",
          shortDescription: "Launches innovative technology companies solving market problems.",
          longDescription: "Tech founders identify market opportunities and build scalable technology solutions.",
          videoUrl: "/videos/telugu/tech-founder.mp4"
        }
      ]
    }
  ];

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, we'll use the sample data
    setDomains(sampleDomains);
  }, []);

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomain(domainId);
    onSelectDomain(domainId);
  };

  // Get domain icon component
  const getDomainIcon = (icon: string, color: string) => {
    // Map emoji icons to SVG equivalents
    switch(icon) {
      case "💻":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "📊":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "🏥":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "📚":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "💼":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "🎨":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      case "🔧":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "🚀":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="flex items-center p-4">
          <button 
            className="flex size-10 shrink-0 items-center justify-center text-slate-600"
            onClick={onBack}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-slate-800">Explore Careers</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Domain List - Horizontal cards with reduced height */}
        <div className="space-y-3">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className={`rounded-xl p-4 border-2 transition-all cursor-pointer flex items-center ${selectedDomain === domain.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}
              onClick={() => handleSelectDomain(domain.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mr-4 ${domain.color}`}>
                {getDomainIcon(domain.icon, domain.color)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm">{domain.name}</h3>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Selected Domain Details */}
        {selectedDomain && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {domains.find(d => d.id === selectedDomain)?.name} Careers
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {domains.find(d => d.id === selectedDomain)?.description}
            </p>
            
            {/* Sub-roles */}
            <div className="space-y-3">
              {domains.find(d => d.id === selectedDomain)?.subRoles.map((subRole) => (
                <div 
                  key={subRole.id}
                  className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => onSelectSubRole(selectedDomain, subRole.id)}
                >
                  <h4 className="font-semibold text-gray-800 text-sm">{subRole.name}</h4>
                  <p className="text-gray-600 text-xs mt-1">{subRole.shortDescription}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => {
                  // In a real implementation, you would navigate to the sub-role explorer
                  alert(`In a full implementation, you would proceed to explore sub-roles in ${domains.find(d => d.id === selectedDomain)?.name}`);
                }}
              >
                Explore Careers
              </button>
              <button
                className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all"
                onClick={() => setSelectedDomain(null)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}