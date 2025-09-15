// src/app/api/learning-module/project/route.ts
import { NextResponse } from 'next/server';

interface ProjectRequest {
  projectId: string;
  moduleId: string;
  moduleName: string;
  userId: string;
}

interface ProjectContent {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  requirements: string[];
  instructions: string[];
  resources: { title: string; url: string }[];
  moduleId: string;
  moduleName: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: ProjectRequest = await request.json();
    
    // Validate input
    if (!body.projectId || !body.moduleId || !body.moduleName) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, moduleId, moduleName' },
        { status: 400 }
      );
    }

    console.log("Project API called with:", { projectId: body.projectId, moduleId: body.moduleId, moduleName: body.moduleName });
    
    // In a real implementation, this would fetch from a database
    // For now, we'll return mock data
    const mockProject: ProjectContent = {
      id: body.projectId,
      title: body.projectId.includes('tk') ? 'Build a Personal Portfolio Website' : 'Create a Responsive Landing Page',
      description: body.projectId.includes('tk') 
        ? 'Create a responsive personal portfolio website showcasing your skills and projects' 
        : 'Design and build a responsive landing page for a fictional product or service',
      type: body.projectId.includes('tk') ? 'task' : 'project',
      difficulty: 'beginner',
      estimatedTime: '2 hours',
      moduleId: body.moduleId,
      moduleName: body.moduleName,
      requirements: body.projectId.includes('tk') 
        ? [
            'Use semantic HTML elements',
            'Implement responsive design with CSS media queries',
            'Include a navigation menu',
            'Add a hero section with call-to-action',
            'Create an about section',
            'Showcase at least 3 projects or skills',
            'Include a contact form',
            'Make it mobile-friendly'
          ]
        : [
            'Use modern CSS (Flexbox/Grid)',
            'Implement a cohesive color scheme',
            'Add interactive elements with JavaScript',
            'Ensure cross-browser compatibility',
            'Optimize for performance',
            'Include accessibility features'
          ],
      instructions: body.projectId.includes('tk') 
        ? [
            'Plan your portfolio structure and content',
            'Set up the basic HTML structure with semantic elements',
            'Style your portfolio with CSS, focusing on responsiveness',
            'Add interactive elements with JavaScript if desired',
            'Test your portfolio on different devices and browsers',
            'Deploy your portfolio to a hosting service'
          ]
        : [
            'Research similar landing pages for inspiration',
            'Create wireframes and design mockups',
            'Set up the HTML structure with semantic elements',
            'Implement the design with modern CSS techniques',
            'Add interactivity with JavaScript',
            'Test across different devices and browsers',
            'Optimize for performance and accessibility'
          ],
      resources: [
        { title: 'HTML5 Semantic Elements Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element' },
        { title: 'CSS Flexbox Tutorial', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
        { title: 'Responsive Design Best Practices', url: 'https://developers.google.com/web/fundamentals/design-and-ux/responsive/' },
        { title: 'Web Accessibility Guidelines', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' }
      ]
    };
    
    return NextResponse.json(mockProject);
    
  } catch (error: any) {
    console.error("=== ERROR IN PROJECT API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    return NextResponse.json(
      { error: 'Failed to load project content' },
      { status: 500 }
    );
  }
}