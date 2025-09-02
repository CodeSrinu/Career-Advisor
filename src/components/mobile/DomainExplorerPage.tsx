// src/components/mobile/DomainExplorerPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SubRole {
  id: string;
  domainId: string;
  name: string;
  shortDescription: string;
}

interface Domain {
  id: string;
  name: string;
  description: string;
  color: string;
  subRoles: SubRole[];
}

interface DomainExplorerPageProps {
  domainId: string;
  onBack: () => void;
  onSelectSubRole: (subRoleId: string) => void;
}

export default function DomainExplorerPage({ domainId, onBack, onSelectSubRole }: DomainExplorerPageProps) {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real implementation, this would fetch from an API or import from data files
  useEffect(() => {
    const loadDomainData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, you would fetch the domain data based on domainId
        // For now, we'll use sample data
        const sampleDomains: Record<string, Domain> = {
          'digital-core-tech': {
            id: 'digital-core-tech',
            name: 'Digital & Core Tech',
            description: 'The foundation of the digital world, encompassing software development, infrastructure, and emerging technologies.',
            color: '#2563eb',
            subRoles: [
              {
                id: 'software-engineer',
                domainId: 'digital-core-tech',
                name: 'Software Engineer',
                shortDescription: 'Designs, develops, and maintains software applications and systems.'
              },
              {
                id: 'mobile-game-dev',
                domainId: 'digital-core-tech',
                name: 'Mobile & Game Developer',
                shortDescription: 'Creates applications and games for mobile devices and gaming platforms.'
              },
              {
                id: 'devops-sre',
                domainId: 'digital-core-tech',
                name: 'DevOps / SRE / Cloud Architect',
                shortDescription: 'Ensures seamless software deployment and system reliability at scale.'
              },
              {
                id: 'cyber-security',
                domainId: 'digital-core-tech',
                name: 'Cyber-Security Specialist',
                shortDescription: 'Protects digital assets and defends against cyber threats.'
              },
              {
                id: 'network-architect',
                domainId: 'digital-core-tech',
                name: 'Network Architect / Engineer',
                shortDescription: 'Designs and maintains computer networks for optimal performance.'
              },
              {
                id: 'tech-sales-support',
                domainId: 'digital-core-tech',
                name: 'Tech Sales Engineer / Support',
                shortDescription: 'Bridges technical expertise with customer needs in sales and support.'
              },
              {
                id: 'gig-remote-dev',
                domainId: 'digital-core-tech',
                name: 'Freelance / Gig Developer',
                shortDescription: 'Works independently on diverse projects with flexible arrangements.'
              },
              {
                id: 'govt-it',
                domainId: 'digital-core-tech',
                name: 'Government IT Roles',
                shortDescription: 'Supports public sector digital transformation and e-governance initiatives.'
              }
            ]
          },
          'data-ai-research': {
            id: 'data-ai-research',
            name: 'Data, AI & Research',
            description: 'The science of extracting insights from data and creating intelligent systems.',
            color: '#7c3aed',
            subRoles: [
              {
                id: 'data-scientist',
                domainId: 'data-ai-research',
                name: 'Data Scientist',
                shortDescription: 'Analyzes complex data to derive insights and build predictive models.'
              },
              {
                id: 'ai-ethicist',
                domainId: 'data-ai-research',
                name: 'AI Ethicist / Prompt Engineer',
                shortDescription: 'Ensures responsible AI development and optimizes AI interactions.'
              },
              {
                id: 'ar-vr-developer',
                domainId: 'data-ai-research',
                name: 'AR/VR Developer',
                shortDescription: 'Creates immersive experiences through augmented and virtual reality.'
              },
              {
                id: 'research-scientist',
                domainId: 'data-ai-research',
                name: 'Research Scientist',
                shortDescription: 'Advances knowledge through scientific inquiry and experimentation.'
              },
              {
                id: 'govt-data-officer',
                domainId: 'data-ai-research',
                name: 'Government Data Officer',
                shortDescription: 'Manages public sector data initiatives and policy implementation.'
              }
            ]
          },
          'healthcare-life-sciences': {
            id: 'healthcare-life-sciences',
            name: 'Healthcare & Life Sciences',
            description: 'Professionals dedicated to improving human health through medical care and scientific research.',
            color: '#dc2626',
            subRoles: [
              {
                id: 'clinical-doctor',
                domainId: 'healthcare-life-sciences',
                name: 'Clinical Doctor',
                shortDescription: 'Diagnoses and treats patients in clinical settings.'
              },
              {
                id: 'allied-health',
                domainId: 'healthcare-life-sciences',
                name: 'Allied Health Professional',
                shortDescription: 'Supports healthcare delivery through specialized technical services.'
              },
              {
                id: 'tech-medicine',
                domainId: 'healthcare-life-sciences',
                name: 'Tech-Medicine Specialist',
                shortDescription: 'Bridges healthcare expertise with technology innovation.'
              },
              {
                id: 'govt-health',
                domainId: 'healthcare-life-sciences',
                name: 'Government Health Roles',
                shortDescription: 'Serves communities through public health initiatives and services.'
              }
            ]
          },
          'education-academia': {
            id: 'education-academia',
            name: 'Education & Academia',
            description: 'The field of teaching, research, and educational technology.',
            color: '#059669',
            subRoles: [
              {
                id: 'school-teacher',
                domainId: 'education-academia',
                name: 'School Teacher',
                shortDescription: 'Educates students and shapes young minds in primary and secondary schools.'
              },
              {
                id: 'higher-ed',
                domainId: 'education-academia',
                name: 'Higher Education Professional',
                shortDescription: 'Teaches and conducts research at colleges and universities.'
              },
              {
                id: 'ed-tech',
                domainId: 'education-academia',
                name: 'Ed-Tech Specialist',
                shortDescription: 'Develops and implements technology solutions for education.'
              },
              {
                id: 'govt-education',
                domainId: 'education-academia',
                name: 'Government Education Roles',
                shortDescription: 'Supports public education systems and policy implementation.'
              }
            ]
          },
          'business-management': {
            id: 'business-management',
            name: 'Business, Management & Support',
            description: 'The backbone of organizations, encompassing strategy, operations, and support functions.',
            color: '#d97706',
            subRoles: [
              {
                id: 'business-analyst',
                domainId: 'business-management',
                name: 'Business Analyst',
                shortDescription: 'Drives organizational efficiency through data-driven insights.'
              },
              {
                id: 'sales-marketing',
                domainId: 'business-management',
                name: 'Sales & Marketing Professional',
                shortDescription: 'Generates revenue and builds brand awareness through strategic initiatives.'
              },
              {
                id: 'hr-people',
                domainId: 'business-management',
                name: 'HR / People Specialist',
                shortDescription: 'Manages talent acquisition, development, and organizational culture.'
              },
              {
                id: 'finance',
                domainId: 'business-management',
                name: 'Finance Professional',
                shortDescription: 'Manages financial resources and drives fiscal strategy for organizations.'
              },
              {
                id: 'legal',
                domainId: 'business-management',
                name: 'Legal Professional',
                shortDescription: 'Provides counsel and ensures compliance with laws and regulations.'
              },
              {
                id: 'govt-business',
                domainId: 'business-management',
                name: 'Government Business Roles',
                shortDescription: 'Supports public sector operations and policy implementation.'
              }
            ]
          },
          'creative-media': {
            id: 'creative-media',
            name: 'Creative, Media & Performing Arts',
            description: 'The world of artistic expression, media production, and performance.',
            color: '#c026d3',
            subRoles: [
              {
                id: 'visual-design',
                domainId: 'creative-media',
                name: 'Visual Designer',
                shortDescription: 'Creates compelling visual content for digital and print media.'
              },
              {
                id: 'performance',
                domainId: 'creative-media',
                name: 'Performing Artist',
                shortDescription: 'Entertains and inspires audiences through live performances.'
              },
              {
                id: 'media',
                domainId: 'creative-media',
                name: 'Media Professional',
                shortDescription: 'Creates and distributes content across traditional and digital platforms.'
              },
              {
                id: 'fine-arts',
                domainId: 'creative-media',
                name: 'Fine Artist',
                shortDescription: 'Creates original artwork for galleries, exhibitions, and collections.'
              },
              {
                id: 'govt-creative',
                domainId: 'creative-media',
                name: 'Government Creative Roles',
                shortDescription: 'Promotes cultural heritage and public arts initiatives.'
              }
            ]
          },
          'skilled-trades': {
            id: 'skilled-trades',
            name: 'Skilled Trades, Services & Physical',
            description: 'Essential hands-on professions that keep society functioning.',
            color: '#0d9488',
            subRoles: [
              {
                id: 'trades',
                domainId: 'skilled-trades',
                name: 'Skilled Tradesperson',
                shortDescription: 'Applies specialized technical skills to construction and maintenance work.'
              },
              {
                id: 'logistics',
                domainId: 'skilled-trades',
                name: 'Logistics & Supply Chain',
                shortDescription: 'Manages the efficient movement of goods and materials.'
              },
              {
                id: 'hospitality',
                domainId: 'skilled-trades',
                name: 'Hospitality Professional',
                shortDescription: 'Provides exceptional service in food, beverage, and accommodation.'
              },
              {
                id: 'sports',
                domainId: 'skilled-trades',
                name: 'Sports Professional',
                shortDescription: 'Coaches, trains, and promotes physical fitness and athletic excellence.'
              },
              {
                id: 'construction',
                domainId: 'skilled-trades',
                name: 'Construction Professional',
                shortDescription: 'Builds and maintains infrastructure that shapes our communities.'
              },
              {
                id: 'gig-services',
                domainId: 'skilled-trades',
                name: 'Gig Economy Worker',
                shortDescription: 'Provides flexible services through digital platforms and direct contracts.'
              },
              {
                id: 'govt-physical',
                domainId: 'skilled-trades',
                name: 'Government Physical Roles',
                shortDescription: 'Serves the public through essential infrastructure and emergency services.'
              }
            ]
          },
          'entrepreneurship': {
            id: 'entrepreneurship',
            name: 'Entrepreneurship & Self-Employment',
            description: 'Creating and running your own business ventures.',
            color: '#9d1717',
            subRoles: [
              {
                id: 'tech-founder',
                domainId: 'entrepreneurship',
                name: 'Tech Startup Founder',
                shortDescription: 'Launches innovative technology companies solving market problems.'
              },
              {
                id: 'non-tech-founder',
                domainId: 'entrepreneurship',
                name: 'Non-Tech Entrepreneur',
                shortDescription: 'Creates businesses in traditional sectors like retail, food, and services.'
              },
              {
                id: 'franchise-owner',
                domainId: 'entrepreneurship',
                name: 'Franchise Owner',
                shortDescription: 'Operates established business models with proven systems and support.'
              },
              {
                id: 'freelancer',
                domainId: 'entrepreneurship',
                name: 'Freelancer / Consultant',
                shortDescription: 'Provides specialized services to clients on a project basis.'
              }
            ]
          }
        };

        const domainData = sampleDomains[domainId] || sampleDomains['digital-core-tech'];
        setDomain(domainData);
      } catch (error) {
        console.error('Error loading domain data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDomainData();
  }, [domainId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center px-4 py-4">
            <button 
              className="mr-4 rounded-full p-2 hover:bg-gray-100"
              onClick={onBack}
            >
              <svg className="text-gray-700" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <div className="flex-1 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-10"></div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Domain Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the domain you're looking for.</p>
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4">
          <button 
            className="mr-4 rounded-full p-2 hover:bg-gray-100"
            onClick={onBack}
          >
            <svg className="text-gray-700" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <h1 className="flex-1 truncate text-center text-lg font-bold text-gray-700">
            {domain.name}
          </h1>
          <div className="w-10"></div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <p className="mb-6 text-center text-gray-500">
            Select a role to learn more about it.
          </p>
          
          <div className="space-y-3">
            {domain.subRoles.map((subRole) => (
              <div 
                key={subRole.id}
                className="block rounded-xl bg-green-50 p-4 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                onClick={() => onSelectSubRole(subRole.id)}
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-700">{subRole.name}</h3>
                    <p className="text-sm text-gray-500">{subRole.shortDescription}</p>
                  </div>
                  <svg className="text-green-500" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}