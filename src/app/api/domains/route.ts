// src/app/api/domains/route.ts
import { NextResponse } from 'next/server';

// Sample domain data
const domains = [
  {
    id: "digital-core-tech",
    name: "Digital & Core Tech",
    description: "Software development, infrastructure, and emerging technologies",
    icon: "",
    color: "bg-[#E8F8EA] text-[#333333]",
    subRoles: [
      {
        id: "software-engineer",
        name: "Software Engineer",
        shortDescription: "Designs, develops, and maintains software applications and systems."
      },
      {
        id: "mobile-game-dev",
        name: "Mobile & Game Developer",
        shortDescription: "Creates applications and games for mobile devices and gaming platforms."
      }
    ]
  },
  {
    id: "data-ai-research",
    name: "Data, AI & Research",
    description: "Data science, machine learning, and scientific research",
    icon: "",
    color: "bg-[#E8F8EA] text-[#333333]",
    subRoles: [
      {
        id: "data-scientist",
        name: "Data Scientist",
        shortDescription: "Analyzes complex data to derive insights and build predictive models."
      }
    ]
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domainId = searchParams.get('id');

  if (domainId) {
    const domain = domains.find(d => d.id === domainId);
    if (domain) {
      return NextResponse.json(domain);
    }
    return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
  }

  return NextResponse.json(domains);
}