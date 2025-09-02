// src/components/mobile/SubRoleDeepDivePage.tsx
'use client';

import { useState, useEffect } from 'react';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subRoles: SubRole[];
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
  skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
  education: {
    minimum: string;
    preferred: string;
    alternativePaths: string[];
  };
  jobMarket: {
    demand: string;
    competition: string;
    geographicHotspots: string[];
  };
}

interface Persona {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ResultsPageProps {
  answers: Record<number, string | string[]>;
  onBack: () => void;
  onSelectDomain: (domainId: string) => void;
}

export default function ResultsPage({ answers, onBack, onSelectDomain }: ResultsPageProps) {
  const [subRole, setSubRole] = useState<SubRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample data - in a real implementation, this would come from an API
  const sampleSubRoles: Record<string, SubRole> = {
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
      potential: 'High growth field with opportunities in every industry. Remote work possibilities and strong earning potential.',
      skills: {
        technical: [
          'Programming languages (Python, Java, JavaScript)',
          'Database management',
          'Version control (Git)',
          'Testing and debugging',
          'API development'
        ],
        soft: [
          'Problem-solving',
          'Communication',
          'Teamwork',
          'Adaptability',
          'Attention to detail'
        ],
        certifications: [
          'AWS Certified Developer',
          'Google Professional Cloud Developer',
          'Microsoft Azure Developer'
        ],
        education: {
          minimum: 'Bachelor\'s degree in Computer Science or related field',
          preferred: 'Master\'s degree in Computer Science or Engineering',
          alternativePaths: [
            'Coding bootcamp + portfolio',
            'Self-taught + open-source contributions',
            'Vocational training + certifications'
          ]
        },
        jobMarket: {
          demand: 'Very high',
          competition: 'Moderate',
          geographicHotspots: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Delhi']
        }
      }
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
      potential: 'Creative field with opportunities in entertainment, education, and enterprise applications.',
      skills: {
        technical: [
          'Game engines (Unity, Unreal)',
          'Mobile development (iOS/Android)',
          '3D mathematics and physics',
          'Performance optimization',
          'Cross-platform development'
        ],
        soft: [
          'Creativity',
          'Attention to detail',
          'Collaboration',
          'Time management',
          'User empathy'
        ],
        certifications: [
          'Unity Certified Developer',
          'Unreal Engine Certification',
          'Mobile Development Certifications'
        ],
        education: {
          minimum: 'Bachelor\'s degree in Computer Science, Game Design, or related',
          preferred: 'Specialized game development programs',
          alternativePaths: [
            'Online courses + game jams',
            'Self-taught + portfolio',
            'Bootcamp + projects'
          ]
        },
        jobMarket: {
          demand: 'High',
          competition: 'High',
          geographicHotspots: ['Bangalore', 'Mumbai', 'Hyderabad', 'Pune']
        }
      }
    }
  };

  // Sample personas
  const personas: Persona[] = [
    {
      id: 'visionary',
      name: 'The Visionary',
      description: 'You\'re a natural leader with a knack for seeing the big picture. Your innovative thinking and drive inspire others to achieve great things.',
      icon: 'groups'
    },
    {
      id: 'creator',
      name: 'The Creator',
      description: 'You thrive on bringing ideas to life through artistic expression and innovation. Your unique perspective transforms ordinary concepts into extraordinary experiences.',
      icon: 'draw'
    },
    {
      id: 'analyst',
      name: 'The Analyst',
      description: 'You excel at dissecting complex problems and finding logical solutions. Your methodical approach and attention to detail make you invaluable in any analytical field.',
      icon: 'search'
    }
  ];

  // Sample domains
  const domains: Domain[] = [
    {
      id: 'digital-core-tech',
      name: 'Digital & Core Tech',
      description: 'Software development, infrastructure, and emerging technologies',
      icon: 'code',
      color: 'bg-blue-100 text-blue-800',
      subRoles: [
        sampleSubRoles['software-engineer'],
        sampleSubRoles['mobile-game-dev']
      ]
    },
    {
      id: 'data-ai-research',
      name: 'Data, AI & Research',
      description: 'Data science, machine learning, and scientific research',
      icon: 'bar_chart',
      color: 'bg-purple-100 text-purple-800',
      subRoles: []
    },
    {
      id: 'healthcare-life-sciences',
      name: 'Healthcare & Life Sciences',
      description: 'Medical care, research, and health technology',
      icon: 'local_hospital',
      color: 'bg-red-100 text-red-800',
      subRoles: []
    }
  ];

  // In a real implementation, this would fetch from an API
  useEffect(() => {
    const loadSubRoleData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, you would calculate the persona and domains based on answers
        // For now, we'll use sample data
        const subRoleData = sampleSubRoles['software-engineer'];
        setSubRole(subRoleData);
      } catch (error) {
        console.error('Error loading sub-role data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubRoleData();
  }, [answers]);

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
      return 'groups';
    } else if (activity.includes('code') || activity.includes('development') || activity.includes('debugging')) {
      return 'code';
    } else if (activity.includes('review') || activity.includes('pair')) {
      return 'rate_review';
    } else if (activity.includes('test') || activity.includes('quality')) {
      return 'verified';
    } else if (activity.includes('document') || activity.includes('planning')) {
      return 'description';
    } else {
      return 'work';
    }
  };

  // Get domain icon
  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'bar_chart':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'local_hospital':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Get persona icon
  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'groups':
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'draw':
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="flex items-center p-4">
          <button className="flex size-10 shrink-0 items-center justify-center text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-slate-800 pr-10">Results</h1>
        </header>
        <main className="flex-1 p-4">
          <div className="space-y-6">
            {/* Persona Card Skeleton */}
            <div className="rounded-2xl bg-[#F0FDF4] p-6 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-white">
                  <div className="bg-gray-200 rounded-full w-8 h-8 animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Domains Section Skeleton */}
            <div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100">
                      <div className="bg-gray-200 rounded-full w-6 h-6 animate-pulse"></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="bg-gray-200 rounded-full w-5 h-5 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!subRole) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Results Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't calculate your results.</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
            onClick={onBack}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Select a random persona for demo purposes
  const userPersona = personas[Math.floor(Math.random() * personas.length)];

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
          <h1 className="flex-1 text-center text-lg font-bold text-slate-800 pr-10">Results</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Persona Card */}
          <div className="rounded-2xl bg-[#F0FDF4] p-5 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-white">
                {getPersonaIcon(userPersona.icon)}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-slate-900">{userPersona.name}</h2>
                <p className="text-sm text-slate-600">{userPersona.description}</p>
              </div>
            </div>
          </div>

          {/* Recommended Domains */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Your Recommended Career Domains</h3>
            <div className="space-y-3">
              {domains.slice(0, 3).map((domain) => (
                <div 
                  key={domain.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
                  onClick={() => onSelectDomain(domain.id)}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
                    {getDomainIcon(domain.icon)}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-semibold text-slate-800 text-sm">{domain.name}</h4>
                    <p className="text-xs text-slate-500">{domain.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-blue-700">
                These recommendations are based on your psychology quiz answers. Tap on any domain to explore career paths in detail.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}