// src/lib/data.ts
// Utility functions for data handling

export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subRoles: SubRole[];
}

export interface SubRole {
  id: string;
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

// Sample data - in a real implementation, this would come from an API
export const domains: Domain[] = [
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
    icon: "",
    color: "bg-[#E8F8EA] text-[#333333]",
    subRoles: [
      {
        id: "data-scientist",
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
    icon: "",
    color: "bg-[#E8F8EA] text-[#333333]",
    subRoles: [
      {
        id: "clinical-doctor",
        name: "Clinical Doctor",
        shortDescription: "Diagnoses and treats patients in clinical settings.",
        longDescription: "Clinical doctors provide direct patient care, diagnose medical conditions, and develop treatment plans.",
        videoUrl: "/videos/telugu/clinical-doctor.mp4"
      }
    ]
  }
];

// Function to get all domains
export async function getDomains(): Promise<Domain[]> {
  // In a real implementation, this would fetch from an API
  // For now, we'll return the sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(domains);
    }, 500); // Simulate network delay
  });
}

// Function to get a specific domain by ID
export async function getDomainById(id: string): Promise<Domain | null> {
  // In a real implementation, this would fetch from an API
  // For now, we'll return the sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      const domain = domains.find(d => d.id === id) || null;
      resolve(domain);
    }, 300); // Simulate network delay
  });
}

// Function to get sub-roles for a domain
export async function getSubRolesByDomainId(domainId: string): Promise<SubRole[]> {
  // In a real implementation, this would fetch from an API
  // For now, we'll return the sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      const domain = domains.find(d => d.id === domainId);
      resolve(domain ? domain.subRoles : []);
    }, 300); // Simulate network delay
  });
}

// Function to get a specific sub-role
export async function getSubRoleById(domainId: string, subRoleId: string): Promise<SubRole | null> {
  // In a real implementation, this would fetch from an API
  // For now, we'll return the sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      const domain = domains.find(d => d.id === domainId);
      if (!domain) {
        resolve(null);
        return;
      }
      const subRole = domain.subRoles.find(sr => sr.id === subRoleId) || null;
      resolve(subRole);
    }, 300); // Simulate network delay
  });
}