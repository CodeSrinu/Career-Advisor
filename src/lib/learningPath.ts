// src/lib/learningPath.ts

interface LearningPathStep {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "2 hours", "1 week"
  type: 'video' | 'reading' | 'hands-on' | 'project' | 'assessment';
  resources: string[]; // Links to resources
  prerequisites: string[]; // IDs of steps that must be completed first
  skills: string[]; // Skills that will be developed
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  role: string;
  level: number; // 1-6
  steps: LearningPathStep[];
  estimatedDuration: string; // e.g., "4 weeks"
  prerequisites: string[]; // Any prerequisite courses or knowledge
}

// Generate a personalized learning path based on skill assessment
export async function generateLearningPath(
  roleId: string,
  roleName: string,
  skillLevel: number,
  gaps: string[]
): Promise<LearningPath> {
  try {
    // In a real implementation, this would call an AI API to generate a personalized learning path
    // For now, we'll create sample learning paths based on the role and skill level
    
    const learningPaths: Record<string, Record<number, LearningPath>> = {
      'software-engineer': {
        1: {
          id: 'lp-se-1',
          name: 'Front-End Development Fundamentals',
          description: 'Master the basics of HTML, CSS, and JavaScript to build interactive web pages',
          role: 'Software Engineer',
          level: 1,
          estimatedDuration: '2 weeks',
          prerequisites: [],
          steps: [
            {
              id: 'step-1',
              title: 'HTML Basics',
              description: 'Learn the structure and semantics of HTML markup',
              duration: '3 hours',
              type: 'video',
              resources: ['/videos/html-basics.mp4', '/docs/html-cheatsheet.pdf'],
              prerequisites: [],
              skills: ['HTML structure', 'Semantic elements', 'Forms']
            },
            {
              id: 'step-2',
              title: 'CSS Fundamentals',
              description: 'Style your web pages with CSS',
              duration: '4 hours',
              type: 'hands-on',
              resources: ['/exercises/css-exercises.zip'],
              prerequisites: ['step-1'],
              skills: ['Selectors', 'Box model', 'Flexbox']
            },
            {
              id: 'step-3',
              title: 'JavaScript Introduction',
              description: 'Add interactivity to your web pages',
              duration: '5 hours',
              type: 'video',
              resources: ['/videos/js-intro.mp4'],
              prerequisites: ['step-2'],
              skills: ['Variables', 'Functions', 'DOM manipulation']
            },
            {
              id: 'step-4',
              title: 'Build Your First Web Page',
              description: 'Create a complete web page using HTML, CSS, and JavaScript',
              duration: '6 hours',
              type: 'project',
              resources: ['/templates/first-project-template.zip'],
              prerequisites: ['step-3'],
              skills: ['Integration', 'Problem-solving', 'Debugging']
            }
          ]
        },
        2: {
          id: 'lp-se-2',
          name: 'Front-End Development Intermediate',
          description: 'Build responsive, interactive web applications with modern frameworks',
          role: 'Software Engineer',
          level: 2,
          estimatedDuration: '3 weeks',
          prerequisites: ['lp-se-1'],
          steps: [
            {
              id: 'step-1',
              title: 'Responsive Design',
              description: 'Create layouts that work on all devices',
              duration: '4 hours',
              type: 'hands-on',
              resources: ['/exercises/responsive-design.zip'],
              prerequisites: [],
              skills: ['Media queries', 'Grid', 'Mobile-first design']
            },
            {
              id: 'step-2',
              title: 'JavaScript ES6+',
              description: 'Modern JavaScript features and best practices',
              duration: '5 hours',
              type: 'video',
              resources: ['/videos/js-es6.mp4'],
              prerequisites: [],
              skills: ['Arrow functions', 'Destructuring', 'Modules']
            },
            {
              id: 'step-3',
              title: 'Introduction to React',
              description: 'Build component-based user interfaces',
              duration: '6 hours',
              type: 'video',
              resources: ['/videos/react-intro.mp4'],
              prerequisites: ['step-2'],
              skills: ['Components', 'Props', 'State']
            },
            {
              id: 'step-4',
              title: 'React Project',
              description: 'Build a complete React application',
              duration: '8 hours',
              type: 'project',
              resources: ['/templates/react-project-template.zip'],
              prerequisites: ['step-3'],
              skills: ['Component architecture', 'State management', 'Routing']
            }
          ]
        }
      },
      'data-scientist': {
        1: {
          id: 'lp-ds-1',
          name: 'Data Science Fundamentals',
          description: 'Introduction to data analysis with Python',
          role: 'Data Scientist',
          level: 1,
          estimatedDuration: '2 weeks',
          prerequisites: [],
          steps: [
            {
              id: 'step-1',
              title: 'Python for Data Science',
              description: 'Learn Python basics for data manipulation',
              duration: '4 hours',
              type: 'video',
              resources: ['/videos/python-ds.mp4'],
              prerequisites: [],
              skills: ['Variables', 'Data types', 'Loops', 'Functions']
            },
            {
              id: 'step-2',
              title: 'Introduction to Pandas',
              description: 'Data manipulation and analysis with Pandas',
              duration: '5 hours',
              type: 'hands-on',
              resources: ['/exercises/pandas-exercises.zip'],
              prerequisites: ['step-1'],
              skills: ['DataFrames', 'Data cleaning', 'Grouping']
            },
            {
              id: 'step-3',
              title: 'Data Visualization with Matplotlib',
              description: 'Create charts and graphs to visualize data',
              duration: '4 hours',
              type: 'hands-on',
              resources: ['/exercises/matplotlib-exercises.zip'],
              prerequisites: ['step-2'],
              skills: ['Charts', 'Graphs', 'Data storytelling']
            },
            {
              id: 'step-4',
              title: 'First Data Analysis Project',
              description: 'Analyze a real dataset and present findings',
              duration: '6 hours',
              type: 'project',
              resources: ['/datasets/sample-dataset.csv'],
              prerequisites: ['step-3'],
              skills: ['Data analysis', 'Insight extraction', 'Reporting']
            }
          ]
        }
      },
      'default': {
        1: {
          id: 'lp-default-1',
          name: 'Career Fundamentals',
          description: 'Build essential skills for your chosen career path',
          role: 'General',
          level: 1,
          estimatedDuration: '1 week',
          prerequisites: [],
          steps: [
            {
              id: 'step-1',
              title: 'Industry Overview',
              description: 'Understand the landscape of your chosen field',
              duration: '2 hours',
              type: 'reading',
              resources: ['/docs/industry-overview.pdf'],
              prerequisites: [],
              skills: ['Industry knowledge', 'Trends awareness']
            },
            {
              id: 'step-2',
              title: 'Essential Tools',
              description: 'Learn the fundamental tools used in your field',
              duration: '3 hours',
              type: 'video',
              resources: ['/videos/essential-tools.mp4'],
              prerequisites: ['step-1'],
              skills: ['Tool proficiency', 'Workflow understanding']
            },
            {
              id: 'step-3',
              title: 'Basic Project',
              description: 'Apply your knowledge in a simple project',
              duration: '4 hours',
              type: 'project',
              resources: ['/templates/basic-project-template.zip'],
              prerequisites: ['step-2'],
              skills: ['Application', 'Problem-solving']
            }
          ]
        }
      }
    };

    // Select the appropriate learning path based on role and level
    let selectedPath: LearningPath | undefined;
    if (learningPaths[roleId] && learningPaths[roleId][skillLevel]) {
      selectedPath = learningPaths[roleId][skillLevel];
    } else if (learningPaths[domainId] && learningPaths[domainId][skillLevel]) {
      selectedPath = learningPaths[domainId][skillLevel];
    } else {
      // Fallback to default learning path
      selectedPath = learningPaths['default'][1];
    }

    // If no path found, create a basic one
    if (!selectedPath) {
      selectedPath = {
        id: `lp-${roleId || domainId}-${skillLevel}`,
        name: `${roleName || 'Your Role'} Learning Path`,
        description: `Personalized learning path for ${roleName || 'your role'}`,
        role: roleName || 'General',
        level: skillLevel,
        estimatedDuration: '2 weeks',
        prerequisites: [],
        steps: [
          {
            id: 'step-1',
            title: 'Getting Started',
            description: 'Begin your journey in this field',
            duration: '2 hours',
            type: 'reading',
            resources: [],
            prerequisites: [],
            skills: ['Foundational knowledge']
          }
        ]
      };
    }

    return selectedPath;
  } catch (error) {
    console.error('Error generating learning path:', error);
    // Return a fallback learning path
    return {
      id: 'lp-fallback',
      name: 'Foundational Skills',
      description: 'Build essential skills for your career journey',
      role: 'General',
      level: 1,
      estimatedDuration: '1 week',
      prerequisites: [],
      steps: [
        {
          id: 'step-1',
          title: 'Career Exploration',
          description: 'Learn about your chosen field',
          duration: '2 hours',
          type: 'reading',
          resources: [],
          prerequisites: [],
          skills: ['Industry knowledge']
        },
        {
          id: 'step-2',
          title: 'Skill Assessment',
          description: 'Identify your strengths and areas for growth',
          duration: '1 hour',
          type: 'assessment',
          resources: [],
          prerequisites: ['step-1'],
          skills: ['Self-awareness', 'Goal setting']
        }
      ]
    };
  }
}

// Get next steps in the learning path
export function getNextSteps(learningPath: LearningPath, completedSteps: string[]): LearningPathStep[] {
  return learningPath.steps.filter(step => {
    // Check if all prerequisites are completed
    return step.prerequisites.every(prereq => completedSteps.includes(prereq)) &&
           // And the step itself is not completed
           !completedSteps.includes(step.id);
  });
}

// Get progress percentage
export function getProgress(learningPath: LearningPath, completedSteps: string[]): number {
  const totalSteps = learningPath.steps.length;
  const completed = completedSteps.filter(stepId => 
    learningPath.steps.some(step => step.id === stepId)
  ).length;
  
  return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
}