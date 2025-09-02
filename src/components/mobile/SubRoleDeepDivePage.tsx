// src/components/mobile/SubRoleDeepDivePage.tsx
'use client';

import { useState, useEffect } from 'react';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface SubRole {
  id: string;
  domainId: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  videoUrl: string;
  dailyLife: string[];
  salaryBands: {
    entry: { min: number; max: number; currency: string; period: string };
    mid: { min: number; max: number; currency: string; period: string };
    senior: { min: number; max: number; currency: string; period: string };
  };
  careerTrajectory: {
    year1: string;
    year2: string;
    year3: string;
    year5: string;
  };
  transformationPaths: Array<{
    from: string;
    to: string;
    timeframe: string;
    requirements: string[];
  }>;
  potential: string;
}

interface SubRoleDeepDivePageProps {
  subRoleId: string;
  domainId: string;
  onBack: () => void;
  onStartLearning: () => void;
}

export default function SubRoleDeepDivePage({ subRoleId, domainId, onBack, onStartLearning }: SubRoleDeepDivePageProps) {
  const [subRole, setSubRole] = useState<SubRole | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real implementation, this would fetch from an API or import from data files
  useEffect(() => {
    const loadSubRoleData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample data - in a real implementation, this would come from an API
        const sampleData: Record<string, SubRole> = {
          'software-engineer': {
            id: 'software-engineer',
            domainId: 'digital-core-tech',
            name: 'Software Engineer',
            shortDescription: 'Designs, develops, and maintains software applications and systems.',
            longDescription: 'Software engineers create the programs and applications that run on computers and other devices. They work with programming languages like Python, Java, JavaScript, and C++ to build everything from mobile apps to enterprise systems.',
            videoUrl: '/videos/telugu/software-engineer.mp4',
            dailyLife: [
              'Morning standup meeting with team',
              'Code development and debugging',
              'Code reviews and pair programming',
              'Testing and quality assurance',
              'Documentation and planning'
            ],
            salaryBands: {
              entry: { min: 300000, max: 600000, currency: '₹', period: 'year' },
              mid: { min: 800000, max: 1500000, currency: '₹', period: 'year' },
              senior: { min: 2000000, max: 4000000, currency: '₹', period: 'year' }
            },
            careerTrajectory: {
              year1: 'Junior Developer - Learning fundamentals',
              year2: 'Software Engineer - Independent contributor',
              year3: 'Senior Engineer - Technical lead',
              year5: 'Tech Lead/Architect - System design'
            },
            transformationPaths: [
              {
                from: 'BCA/MCA Graduate',
                to: 'Software Engineer',
                timeframe: '6-12 months',
                requirements: ['Programming basics', 'Data structures', 'Projects']
              },
              {
                from: 'Career Switcher',
                to: 'Software Engineer',
                timeframe: '12-18 months',
                requirements: ['Bootcamp completion', 'Portfolio projects', 'Internship']
              }
            ],
            potential: 'High growth field with opportunities in every industry. Remote work possibilities and strong earning potential.'
          },
          'mobile-game-dev': {
            id: 'mobile-game-dev',
            domainId: 'digital-core-tech',
            name: 'Mobile & Game Developer',
            shortDescription: 'Creates applications and games for mobile devices and gaming platforms.',
            longDescription: 'Mobile and game developers design and build interactive experiences for smartphones, tablets, and gaming consoles. They work with specialized frameworks and engines to create engaging user experiences.',
            videoUrl: '/videos/telugu/mobile-game-dev.mp4',
            dailyLife: [
              'Design gameplay mechanics',
              'Code game features and mechanics',
              'Test and debug applications',
              'Optimize performance for devices',
              'Collaborate with artists and designers'
            ],
            salaryBands: {
              entry: { min: 250000, max: 500000, currency: '₹', period: 'year' },
              mid: { min: 700000, max: 1200000, currency: '₹', period: 'year' },
              senior: { min: 1500000, max: 3000000, currency: '₹', period: 'year' }
            },
            careerTrajectory: {
              year1: 'Junior Developer - Learning platforms',
              year2: 'Developer - Building features',
              year3: 'Senior Developer - Leading projects',
              year5: 'Lead Developer/Technical Director'
            },
            transformationPaths: [
              {
                from: 'Software Engineer',
                to: 'Game Developer',
                timeframe: '6-12 months',
                requirements: ['Game engine skills', 'Mathematics', 'Portfolio']
              },
              {
                from: 'Graphic Designer',
                to: 'Game Developer',
                timeframe: '12-18 months',
                requirements: ['Programming skills', 'Game design', 'Projects']
              }
            ],
            potential: 'Creative field with opportunities in entertainment, education, and enterprise applications.'
          }
        };

        const subRoleData = sampleData[subRoleId] || sampleData['software-engineer'];
        setSubRole(subRoleData);
      } catch (error) {
        console.error('Error loading sub-role data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubRoleData();
  }, [subRoleId, domainId]);

  // Format salary for display with LPA
  const formatSalaryWithLPA = (min: number, max: number, currency: string) => {
    // Convert to lakhs for easier reading
    const minLakhs = (min / 100000).toFixed(1);
    const maxLakhs = (max / 100000).toFixed(1);
    return `${currency}${minLakhs}L-${currency}${maxLakhs}L`;
  };

  // Get appropriate icon for each activity
  const getActivityIcon = (activity: string) => {
    if (activity.includes('standup') || activity.includes('meeting') || activity.includes('team')) {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    } else if (activity.includes('code') || activity.includes('development') || activity.includes('debugging')) {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    } else if (activity.includes('review') || activity.includes('pair')) {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (activity.includes('test') || activity.includes('quality')) {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    } else if (activity.includes('document') || activity.includes('planning')) {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  // Get domain icon
  const getDomainIcon = (domainId: string) => {
    switch(domainId) {
      case 'digital-core-tech':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'data-ai-research':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'healthcare-life-sciences':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'education-academia':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'business-management':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'creative-media':
        return (
          <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        );
      case 'skilled-trades':
        return (
          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'entrepreneurship':
        return (
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex flex-col bg-white">
        <main className="flex-grow pb-24">
          {/* Hero Image Skeleton */}
          <div className="relative h-48 sm:h-64 bg-gray-200 animate-pulse">
            <div className="absolute top-4 left-4">
              <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="px-4">
            {/* Title Skeleton */}
            <div className="my-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Sections Skeleton */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-6">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-1/2"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex items-start">
                      <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        
        {/* Footer Skeleton */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-transparent">
          <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
        </footer>
      </div>
    );
  }

  if (!subRole) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Role Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the role you're looking for.</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={onBack}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Sample domains that match the persona
  const matchingDomains: Domain[] = [
    {
      id: 'digital-core-tech',
      name: 'Digital & Core Tech',
      description: 'Software development, infrastructure, and emerging technologies',
      icon: 'code',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'data-ai-research',
      name: 'Data, AI & Research',
      description: 'Data science, machine learning, and scientific research',
      icon: 'data',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'business-management',
      name: 'Business, Management & Support',
      description: 'Strategy, operations, and business support functions',
      icon: 'business',
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  const onSelectDomain = (domainId: string) => {
    // In a real implementation, this would navigate to the domain explorer
    console.log(`Selected domain: ${domainId}`);
    // For now, we'll just show an alert
    alert(`In a full implementation, you would be taken to explore careers in this domain.`);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <main className="flex-grow pb-24">
        {/* Hero Image - Reduced height for mobile */}
        <section className="relative h-40 sm:h-52 bg-gradient-to-r from-green-400 to-blue-500">
          {/* Level Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/80 text-gray-800 backdrop-blur-sm">
              Level 1
            </span>
          </div>
          
          {/* Salary Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white">
              {formatSalaryWithLPA(subRole.salaryBands.entry.min, subRole.salaryBands.entry.max, subRole.salaryBands.entry.currency)} LPA
            </span>
          </div>
          
          {/* Centered Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl mb-1">💻</div>
              <h1 className="text-lg font-bold">{subRole.name}</h1>
            </div>
          </div>
        </section>
        
        {/* Content */}
        <div className="px-4">
          {/* Title */}
          <section className="my-4">
            <h1 className="text-xl font-extrabold text-gray-800">{subRole.name}</h1>
          </section>
          
          {/* A Day in the Life - Compact version */}
          <section className="mb-4">
            <h2 className="text-base font-bold text-gray-800 mb-2">A Day in the {subRole.name} Life</h2>
            <div className="relative space-y-2">
              {subRole.dailyLife.slice(0, 3).map((activity, index) => (
                <div key={index} className="timeline-item relative flex items-start">
                  <div className="z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    {getActivityIcon(activity)}
                  </div>
                  <div className="ml-2">
                    <p className="font-medium text-gray-800 text-xs">{activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Salary Bands - More compact */}
          <section className="mb-4">
            <h2 className="text-base font-bold text-gray-800 mb-2">Salary Bands</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-800">Entry</p>
                <p className="text-[10px] text-gray-600">0-2 yrs</p>
                <p className="text-xs font-bold text-green-600 mt-1">
                  {formatSalaryWithLPA(subRole.salaryBands.entry.min, subRole.salaryBands.entry.max, subRole.salaryBands.entry.currency)} LPA
                </p>
              </div>
              <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-800">Mid</p>
                <p className="text-[10px] text-gray-600">2-5 yrs</p>
                <p className="text-xs font-bold text-blue-600 mt-1">
                  {formatSalaryWithLPA(subRole.salaryBands.mid.min, subRole.salaryBands.mid.max, subRole.salaryBands.mid.currency)} LPA
                </p>
              </div>
              <div className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-800">Senior</p>
                <p className="text-[10px] text-gray-600">5+ yrs</p>
                <p className="text-xs font-bold text-purple-600 mt-1">
                  {formatSalaryWithLPA(subRole.salaryBands.senior.min, subRole.salaryBands.senior.max, subRole.salaryBands.senior.currency)}+ LPA
                </p>
              </div>
            </div>
          </section>
          
          {/* Matching Domains - 3 compact cards */}
          <section className="mb-4">
            <h2 className="text-base font-bold text-gray-800 mb-2">Matching Career Domains</h2>
            <div className="grid grid-cols-1 gap-3">
              {matchingDomains.map((domain) => (
                <div 
                  key={domain.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
                  onClick={() => onSelectDomain(domain.id)}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
                    {getDomainIcon(domain.id)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{domain.name}</h3>
                    <p className="text-xs text-gray-500">{domain.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </section>
          
          {/* Career Trajectory - More compact */}
          <section className="mb-4">
            <h2 className="text-base font-bold text-gray-800 mb-2">3-5 Year Career Trajectory</h2>
            <div className="space-y-2">
              {Object.entries(subRole.careerTrajectory).map(([key, value]) => (
                <div key={key} className="flex items-center p-2 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="text-green-600 font-bold text-xs">
                      {key === 'year1' ? '1' : key === 'year2' ? '2' : key === 'year3' ? '3' : '5'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-xs">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Potential - More compact */}
          <section className="mb-4">
            <h2 className="text-base font-bold text-gray-800 mb-2">Potential</h2>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-gray-700 text-xs">{subRole.potential}</p>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer with CTA - Fixed position */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white border-t border-gray-200">
        <button 
          className="w-full rounded-full bg-green-500 py-2.5 text-center text-sm font-bold text-white shadow-lg hover:bg-green-600 transition-colors"
          onClick={onStartLearning}
        >
          Start Level 1 →
        </button>
      </footer>
    </div>
  );
}