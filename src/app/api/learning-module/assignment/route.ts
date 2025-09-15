// src/app/api/learning-module/assignment/route.ts
import { NextResponse } from 'next/server';

interface AssignmentRequest {
  assignmentId: string;
  moduleId: string;
  moduleName: string;
  userId: string;
}

interface AssignmentContent {
  id: string;
  title: string;
  description: string;
  type: 'assignment' | 'homework';
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
    const body: AssignmentRequest = await request.json();
    
    // Validate input
    if (!body.assignmentId || !body.moduleId || !body.moduleName) {
      return NextResponse.json(
        { error: 'Missing required fields: assignmentId, moduleId, moduleName' },
        { status: 400 }
      );
    }

    console.log("Assignment API called with:", { assignmentId: body.assignmentId, moduleId: body.moduleId, moduleName: body.moduleName });
    
    // In a real implementation, this would fetch from a database
    // For now, we'll return mock data
    const mockAssignment: AssignmentContent = {
      id: body.assignmentId,
      title: 'Create a Semantic HTML Portfolio',
      description: 'Build a portfolio website using semantic HTML elements to demonstrate your understanding of proper document structure',
      type: 'assignment',
      difficulty: 'beginner',
      estimatedTime: '1 hour',
      moduleId: body.moduleId,
      moduleName: body.moduleName,
      requirements: [
        'Use semantic HTML5 elements (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>)',
        'Implement a responsive design with CSS',
        'Include at least 3 sections (About, Projects, Contact)',
        'Use proper heading hierarchy (h1, h2, h3, etc.)',
        'Validate your HTML markup'
      ],
      instructions: [
        'Create a new HTML file with proper DOCTYPE declaration',
        'Set up the basic structure with semantic elements',
        'Add content for each section of your portfolio',
        'Style your portfolio with CSS, focusing on responsiveness',
        'Test your portfolio on different devices and browsers',
        'Validate your HTML with W3C Markup Validator'
      ],
      resources: [
        { title: 'MDN HTML Element Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element' },
        { title: 'W3C Markup Validator', url: 'https://validator.w3.org/' },
        { title: 'Responsive Design Principles', url: 'https://developers.google.com/web/fundamentals/design-and-ux/responsive/' }
      ]
    };
    
    return NextResponse.json(mockAssignment);
    
  } catch (error: any) {
    console.error("=== ERROR IN ASSIGNMENT API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    return NextResponse.json(
      { error: 'Failed to load assignment content' },
      { status: 500 }
    );
  }
}