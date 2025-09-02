# Domain and Sub-Role Data Structure

## Overview
This document defines the data structure for domains and sub-roles in the Career Advisor platform, including all the information needed for the deep-dive pages.

## Domain Structure

### Domain Object
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "icon": "string", // Icon identifier
  "color": "string", // Primary color for UI
  "subRoles": ["subRoleId1", "subRoleId2", ...],
  "overview": {
    "marketSize": "string",
    "growthRate": "string",
    "jobSatisfaction": "string"
  }
}
```

## Sub-Role Structure

### Sub-Role Object
```json
{
  "id": "string",
  "domainId": "string",
  "name": "string",
  "shortDescription": "string",
  "longDescription": "string",
  "videoUrl": "string",
  "dailyLife": {
    "typicalDay": ["string"],
    "workEnvironment": "string",
    "hours": "string",
    "stressLevel": "string"
  },
  "salaryBands": {
    "entry": {
      "min": "number",
      "max": "number",
      "currency": "₹",
      "period": "month"
    },
    "mid": {
      "min": "number",
      "max": "number",
      "currency": "₹",
      "period": "month"
    },
    "senior": {
      "min": "number",
      "max": "number",
      "currency": "₹",
      "period": "month"
    }
  },
  "careerTrajectory": {
    "year1": "string",
    "year2": "string",
    "year3": "string",
    "year5": "string"
  },
  "transformationPaths": [
    {
      "from": "string",
      "to": "string",
      "timeframe": "string",
      "requirements": ["string"]
    }
  ],
  "potential": "string",
  "skills": {
    "technical": ["string"],
    "soft": ["string"],
    "certifications": ["string"]
  },
  "education": {
    "minimum": "string",
    "preferred": "string",
    "alternativePaths": ["string"]
  },
  "jobMarket": {
    "demand": "string",
    "competition": "string",
    "geographicHotspots": ["string"]
  }
}
```

## Complete Domain Data

### A. Digital & Core Tech

#### Domain
```json
{
  "id": "digital-core-tech",
  "name": "Digital & Core Tech",
  "description": "The foundation of the digital world, encompassing software development, infrastructure, and emerging technologies.",
  "icon": "code",
  "color": "#2563eb",
  "subRoles": [
    "software-engineer",
    "mobile-game-dev",
    "devops-sre",
    "cyber-security",
    "network-architect",
    "tech-sales-support",
    "gig-remote-dev",
    "govt-it"
  ],
  "overview": {
    "marketSize": "₹2.5 trillion by 2025",
    "growthRate": "15% annually",
    "jobSatisfaction": "4.2/5"
  }
}
```

#### Sub-Roles

1. **Software Engineer (Front/Back/Full-Stack)**
```json
{
  "id": "software-engineer",
  "domainId": "digital-core-tech",
  "name": "Software Engineer",
  "shortDescription": "Designs, develops, and maintains software applications and systems.",
  "longDescription": "Software engineers create the programs and applications that run on computers and other devices. They work with programming languages like Python, Java, JavaScript, and C++ to build everything from mobile apps to enterprise systems.",
  "videoUrl": "/videos/telugu/software-engineer.mp4",
  "dailyLife": {
    "typicalDay": [
      "Morning standup meeting with team",
      "Code development and debugging",
      "Code reviews and pair programming",
      "Testing and quality assurance",
      "Documentation and planning"
    ],
    "workEnvironment": "Office or remote, collaborative teams",
    "hours": "9-6, flexible",
    "stressLevel": "Moderate"
  },
  "salaryBands": {
    "entry": {
      "min": 300000,
      "max": 600000,
      "currency": "₹",
      "period": "year"
    },
    "mid": {
      "min": 800000,
      "max": 1500000,
      "currency": "₹",
      "period": "year"
    },
    "senior": {
      "min": 2000000,
      "max": 4000000,
      "currency": "₹",
      "period": "year"
    }
  },
  "careerTrajectory": {
    "year1": "Junior Developer - Learning fundamentals",
    "year2": "Software Engineer - Independent contributor",
    "year3": "Senior Engineer - Technical lead",
    "year5": "Tech Lead/Architect - System design"
  },
  "transformationPaths": [
    {
      "from": "BCA/MCA Graduate",
      "to": "Software Engineer",
      "timeframe": "6-12 months",
      "requirements": ["Programming basics", "Data structures", "Projects"]
    },
    {
      "from": "Career Switcher",
      "to": "Software Engineer",
      "timeframe": "12-18 months",
      "requirements": ["Bootcamp completion", "Portfolio projects", "Internship"]
    }
  ],
  "potential": "High growth field with opportunities in every industry. Remote work possibilities and strong earning potential.",
  "skills": {
    "technical": [
      "Programming languages (Python, Java, JavaScript)",
      "Database management",
      "Version control (Git)",
      "Testing and debugging",
      "API development"
    ],
    "soft": [
      "Problem-solving",
      "Communication",
      "Teamwork",
      "Adaptability",
      "Attention to detail"
    ],
    "certifications": [
      "AWS Certified Developer",
      "Google Professional Cloud Developer",
      "Microsoft Azure Developer"
    ]
  },
  "education": {
    "minimum": "Bachelor's degree in Computer Science or related field",
    "preferred": "Master's degree in Computer Science or Engineering",
    "alternativePaths": [
      "Coding bootcamp + portfolio",
      "Self-taught + open-source contributions",
      "Vocational training + certifications"
    ]
  },
  "jobMarket": {
    "demand": "Very high",
    "competition": "Moderate",
    "geographicHotspots": ["Bangalore", "Hyderabad", "Pune", "Chennai", "Delhi"]
  }
}
```

2. **Mobile & Game Developer**
```json
{
  "id": "mobile-game-dev",
  "domainId": "digital-core-tech",
  "name": "Mobile & Game Developer",
  "shortDescription": "Creates applications and games for mobile devices and gaming platforms.",
  "longDescription": "Mobile and game developers design and build interactive experiences for smartphones, tablets, and gaming consoles. They work with specialized frameworks and engines to create engaging user experiences.",
  "videoUrl": "/videos/telugu/mobile-game-dev.mp4",
  "dailyLife": {
    "typicalDay": [
      "Design gameplay mechanics",
      "Code game features and mechanics",
      "Test and debug applications",
      "Optimize performance for devices",
      "Collaborate with artists and designers"
    ],
    "workEnvironment": "Studio environment, creative teams",
    "hours": "9-6, crunch periods",
    "stressLevel": "High during launches"
  },
  "salaryBands": {
    "entry": {
      "min": 250000,
      "max": 500000,
      "currency": "₹",
      "period": "year"
    },
    "mid": {
      "min": 700000,
      "max": 1200000,
      "currency": "₹",
      "period": "year"
    },
    "senior": {
      "min": 1500000,
      "max": 3000000,
      "currency": "₹",
      "period": "year"
    }
  },
  "careerTrajectory": {
    "year1": "Junior Developer - Learning platforms",
    "year2": "Developer - Building features",
    "year3": "Senior Developer - Leading projects",
    "year5": "Lead Developer/Technical Director"
  },
  "transformationPaths": [
    {
      "from": "Software Engineer",
      "to": "Game Developer",
      "timeframe": "6-12 months",
      "requirements": ["Game engine skills", "Mathematics", "Portfolio"]
    },
    {
      "from": "Graphic Designer",
      "to": "Game Developer",
      "timeframe": "12-18 months",
      "requirements": ["Programming skills", "Game design", "Projects"]
    }
  ],
  "potential": "Creative field with opportunities in entertainment, education, and enterprise applications.",
  "skills": {
    "technical": [
      "Game engines (Unity, Unreal)",
      "Mobile development (iOS/Android)",
      "3D mathematics and physics",
      "Performance optimization",
      "Cross-platform development"
    ],
    "soft": [
      "Creativity",
      "Attention to detail",
      "Collaboration",
      "Time management",
      "User empathy"
    ],
    "certifications": [
      "Unity Certified Developer",
      "Unreal Engine Certification",
      "Mobile Development Certifications"
    ]
  },
  "education": {
    "minimum": "Bachelor's degree in Computer Science, Game Design, or related",
    "preferred": "Specialized game development programs",
    "alternativePaths": [
      "Online courses + game jams",
      "Self-taught + portfolio",
      "Bootcamp + projects"
    ]
  },
  "jobMarket": {
    "demand": "High",
    "competition": "High",
    "geographicHotspots": ["Bangalore", "Mumbai", "Hyderabad", "Pune"]
  }
}
```

### B. Data, AI & Research

#### Domain
```json
{
  "id": "data-ai-research",
  "name": "Data, AI & Research",
  "description": "The science of extracting insights from data and creating intelligent systems.",
  "icon": "data",
  "color": "#7c3aed",
  "subRoles": [
    "data-scientist",
    "ai-ethicist",
    "ar-vr-developer",
    "research-scientist",
    "govt-data-officer"
  ],
  "overview": {
    "marketSize": "₹1.2 trillion by 2025",
    "growthRate": "20% annually",
    "jobSatisfaction": "4.5/5"
  }
}
```

### C. Healthcare & Life Sciences

#### Domain
```json
{
  "id": "healthcare-life-sciences",
  "name": "Healthcare & Life Sciences",
  "description": "Professionals dedicated to improving human health through medical care and scientific research.",
  "icon": "health",
  "color": "#dc2626",
  "subRoles": [
    "clinical-doctor",
    "allied-health",
    "tech-medicine",
    "govt-health"
  ],
  "overview": {
    "marketSize": "₹3.5 trillion by 2025",
    "growthRate": "12% annually",
    "jobSatisfaction": "4.0/5"
  }
}
```

### D. Education & Academia

#### Domain
```json
{
  "id": "education-academia",
  "name": "Education & Academia",
  "description": "The field of teaching, research, and educational technology.",
  "icon": "education",
  "color": "#059669",
  "subRoles": [
    "school-teacher",
    "higher-ed",
    "ed-tech",
    "govt-education"
  ],
  "overview": {
    "marketSize": "₹800 billion by 2025",
    "growthRate": "8% annually",
    "jobSatisfaction": "3.8/5"
  }
}
```

### E. Business, Management & Support

#### Domain
```json
{
  "id": "business-management",
  "name": "Business, Management & Support",
  "description": "The backbone of organizations, encompassing strategy, operations, and support functions.",
  "icon": "business",
  "color": "#d97706",
  "subRoles": [
    "business-analyst",
    "sales-marketing",
    "hr-people",
    "finance",
    "legal",
    "govt-business"
  ],
  "overview": {
    "marketSize": "₹5 trillion by 2025",
    "growthRate": "10% annually",
    "jobSatisfaction": "3.7/5"
  }
}
```

### F. Creative, Media & Performing Arts

#### Domain
```json
{
  "id": "creative-media",
  "name": "Creative, Media & Performing Arts",
  "description": "The world of artistic expression, media production, and performance.",
  "icon": "creative",
  "color": "#c026d3",
  "subRoles": [
    "visual-design",
    "performance",
    "media",
    "fine-arts",
    "govt-creative"
  ],
  "overview": {
    "marketSize": "₹1.8 trillion by 2025",
    "growthRate": "15% annually",
    "jobSatisfaction": "4.1/5"
  }
}
```

### G. Skilled Trades, Services & Physical

#### Domain
```json
{
  "id": "skilled-trades",
  "name": "Skilled Trades, Services & Physical",
  "description": "Essential hands-on professions that keep society functioning.",
  "icon": "tools",
  "color": "#0d9488",
  "subRoles": [
    "trades",
    "logistics",
    "hospitality",
    "sports",
    "construction",
    "gig-services",
    "govt-physical"
  ],
  "overview": {
    "marketSize": "₹4.2 trillion by 2025",
    "growthRate": "9% annually",
    "jobSatisfaction": "3.6/5"
  }
}
```

### H. Entrepreneurship & Self-Employment

#### Domain
```json
{
  "id": "entrepreneurship",
  "name": "Entrepreneurship & Self-Employment",
  "description": "Creating and running your own business ventures.",
  "icon": "startup",
  "color": "#9d1717",
  "subRoles": [
    "tech-founder",
    "non-tech-founder",
    "franchise-owner",
    "freelancer"
  ],
  "overview": {
    "marketSize": "Not applicable (varies by venture)",
    "growthRate": "Highly variable",
    "jobSatisfaction": "4.3/5 (self-reported)"
  }
}
```

## Implementation Notes

### Data Storage
- Store as JSON files in `/data/domains/` directory
- Each domain has its own file: `digital-core-tech.json`, `data-ai-research.json`, etc.
- Sub-roles can be in the same file or separate files depending on complexity

### Loading Strategy
- Load domain data on-demand when user selects a domain
- Cache frequently accessed data in localStorage
- Implement lazy loading for large media assets

### Internationalization
- Store separate versions for each language
- Use language prefix in file names: `digital-core-tech_te.json`
- Maintain consistent structure across languages

### Updates and Maintenance
- Version control all data files
- Implement data validation scripts
- Create update pipeline for new information
- Regular review and verification process