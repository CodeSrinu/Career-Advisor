// src/components/mobile/SkillAssessmentNew.tsx
'use client';

import { useState, useEffect } from 'react';

interface SkillQuestion {
  id: number;
  text: string;
}

interface SkillAssessmentNewProps {
  roleId: string;
  roleName: string;
  domainId: string;
  onBack: () => void;
  onSubmit: (answers: boolean[], openResponse: string) => void;
}

export default function SkillAssessmentNew({ 
  roleId, 
  roleName, 
  domainId, 
  onBack, 
  onSubmit 
}: SkillAssessmentNewProps) {
  const [answers, setAnswers] = useState<boolean[]>(Array(15).fill(false));
  const [openResponse, setOpenResponse] = useState('');
  const [questions, setQuestions] = useState<SkillQuestion[]>([]);

  // Load questions based on domain/role
  useEffect(() => {
    // Sample questions based on the domain/role
    const sampleQuestions: Record<string, SkillQuestion[]> = {
      'ai-developer': [
        { id: 1, text: "Python Programming" },
        { id: 2, text: "Machine Learning Concepts" },
        { id: 3, text: "Data Structures and Algorithms" },
        { id: 4, text: "Deep Learning Frameworks (e.g., TensorFlow, PyTorch)" },
        { id: 5, text: "Natural Language Processing (NLP)" },
        { id: 6, text: "Computer Vision" },
        { id: 7, text: "Git and Version Control" },
        { id: 8, text: "REST API Development" },
        { id: 9, text: "Database Design and Querying" },
        { id: 10, text: "Cloud Platforms (AWS, GCP, Azure)" },
        { id: 11, text: "Statistical Analysis and Mathematics" },
        { id: 12, text: "Model Deployment and Monitoring" },
        { id: 13, text: "Data Visualization" },
        { id: 14, text: "Agile Development Practices" },
        { id: 15, text: "Technical Documentation" }
      ],
      'software-engineer': [
        { id: 1, text: "HTML/CSS Fundamentals" },
        { id: 2, text: "JavaScript Programming" },
        { id: 3, text: "Frontend Frameworks (React, Vue, Angular)" },
        { id: 4, text: "Backend Development (Node.js, Python, Java)" },
        { id: 5, text: "Database Management (SQL, NoSQL)" },
        { id: 6, text: "Version Control with Git" },
        { id: 7, text: "RESTful API Design" },
        { id: 8, text: "Testing Frameworks (Jest, Mocha, etc.)" },
        { id: 9, text: "Containerization (Docker)" },
        { id: 10, text: "Cloud Deployment (AWS, GCP, Azure)" },
        { id: 11, text: "Responsive Web Design" },
        { id: 12, text: "Performance Optimization" },
        { id: 13, text: "Security Best Practices" },
        { id: 14, text: "Agile/Scrum Methodologies" },
        { id: 15, text: "Debugging and Troubleshooting" }
      ],
      'data-scientist': [
        { id: 1, text: "Python for Data Analysis" },
        { id: 2, text: "Statistical Analysis and Inference" },
        { id: 3, text: "Machine Learning Algorithms" },
        { id: 4, text: "Data Visualization (Tableau, PowerBI)" },
        { id: 5, text: "SQL and Database Querying" },
        { id: 6, text: "Big Data Tools (Spark, Hadoop)" },
        { id: 7, text: "R Programming" },
        { id: 8, text: "Data Wrangling and Cleaning" },
        { id: 9, text: "Experimental Design" },
        { id: 10, text: "A/B Testing" },
        { id: 11, text: "Deep Learning Frameworks" },
        { id: 12, text: "Cloud Platforms for Data Science" },
        { id: 13, text: "Data Storytelling" },
        { id: 14, text: "Feature Engineering" },
        { id: 15, text: "Model Evaluation and Validation" }
      ],
      'default': [
        { id: 1, text: "Fundamental Concepts in Field" },
        { id: 2, text: "Problem-Solving Skills" },
        { id: 3, text: "Communication and Collaboration" },
        { id: 4, text: "Project Management Basics" },
        { id: 5, text: "Industry Tools and Software" },
        { id: 6, text: "Data Analysis and Interpretation" },
        { id: 7, text: "Critical Thinking" },
        { id: 8, text: "Adaptability and Learning" },
        { id: 9, text: "Technical Documentation" },
        { id: 10, text: "Quality Assurance Principles" },
        { id: 11, text: "Customer/User Focus" },
        { id: 12, text: "Process Improvement" },
        { id: 13, text: "Risk Assessment" },
        { id: 14, text: "Ethical Practices" },
        { id: 15, text: "Continuous Learning Mindset" }
      ]
    };

    // Select questions based on role or domain
    let selectedQuestions: SkillQuestion[] = [];
    if (sampleQuestions[roleId]) {
      selectedQuestions = sampleQuestions[roleId];
    } else if (sampleQuestions[domainId]) {
      selectedQuestions = sampleQuestions[domainId];
    } else {
      selectedQuestions = sampleQuestions['default'];
    }

    setQuestions(selectedQuestions);
    setAnswers(Array(selectedQuestions.length).fill(false));
  }, [roleId, domainId]);

  const handleAnswer = (index: number, checked: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = checked;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers, openResponse);
  };

  const checkedCount = answers.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <button 
            onClick={onBack}
            className="text-gray-800 flex size-10 shrink-0 items-center justify-center rounded-full"
            aria-label="Back"
          >
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Skill Assessment
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-8 flex-grow">
        <div className="pt-4 pb-6">
          <h2 className="text-gray-800 tracking-tight text-2xl font-bold leading-tight pb-2">
            Let's check your current skills for {roleName}
          </h2>
          <p className="text-gray-600 text-base font-normal leading-normal">
            This will help us tailor your learning path.
          </p>
        </div>

        <div className="border-t border-gray-200">
          {questions.map((question, index) => (
            <div key={question.id} className="flex items-center gap-4 py-4 border-b border-gray-200">
              <input
                id={`skill${question.id}`}
                type="checkbox"
                checked={answers[index] || false}
                onChange={(e) => handleAnswer(index, e.target.checked)}
                className="size-6 shrink-0 appearance-none rounded-md border border-gray-300 bg-white checked:border-[#3fe44a] checked:bg-[#3fe44a] focus:outline-none focus:ring-2 focus:ring-[#3fe44a]/50 focus:ring-offset-2 focus:ring-offset-white"
                style={{ 
                  backgroundImage: answers[index] ? "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')" : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              />
              <label 
                htmlFor={`skill${question.id}`} 
                className="text-gray-800 text-base font-medium leading-normal flex-1"
              >
                {question.text}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em]">
            Describe Your Experience
          </h3>
          <p className="text-gray-600 text-base font-normal leading-normal mt-1 mb-4">
            Briefly describe any projects or courses you've completed.
          </p>
          <textarea
            value={openResponse}
            onChange={(e) => setOpenResponse(e.target.value)}
            placeholder="e.g., 'I completed an online course on Deep Learning and built a cat vs. dog image classifier.'"
            className="w-full h-40 resize-none rounded-lg border border-gray-200 bg-gray-100 p-4 text-base text-gray-800 placeholder:text-gray-500 focus:border-[#3fe44a] focus:ring-2 focus:ring-[#3fe44a]/50"
          />
        </div>
      </main>

      {/* Footer with Submit Button */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm">
        <div className="px-4 py-3">
          <button
            onClick={handleSubmit}
            disabled={checkedCount === 0 && openResponse.trim().length === 0}
            className={`flex w-full min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 text-lg font-bold leading-normal tracking-[0.015em] transition-colors ${
              checkedCount === 0 && openResponse.trim().length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#3fe44a] text-white shadow-md shadow-green-200/50 hover:bg-green-500'
            }`}
          >
            <span className="truncate">Calculate My Starting Level</span>
          </button>
        </div>
      </footer>
    </div>
  );
}