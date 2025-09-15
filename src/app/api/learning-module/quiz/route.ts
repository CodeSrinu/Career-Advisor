// src/app/api/learning-module/quiz/route.ts
import { NextResponse } from 'next/server';

interface QuizRequest {
  quizId: string;
  moduleId: string;
  moduleName: string;
  userId: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizContent {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  duration?: string;
  moduleId: string;
  moduleName: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: QuizRequest = await request.json();
    
    // Validate input
    if (!body.quizId || !body.moduleId || !body.moduleName) {
      return NextResponse.json(
        { error: 'Missing required fields: quizId, moduleId, moduleName' },
        { status: 400 }
      );
    }

    console.log("Quiz API called with:", { quizId: body.quizId, moduleId: body.moduleId, moduleName: body.moduleName });
    
    // In a real implementation, this would fetch from a database
    // For now, we'll return mock data
    const mockQuiz: QuizContent = {
      id: body.quizId,
      title: 'Semantic HTML Quiz',
      description: 'Test your knowledge of semantic HTML elements',
      moduleId: body.moduleId,
      moduleName: body.moduleName,
      duration: '10 minutes',
      questions: [
        {
          id: 'q1',
          question: 'Which semantic HTML element should be used for the main content of a document?',
          options: ['<div>', '<main>', '<section>', '<article>'],
          correctAnswer: '<main>',
          explanation: 'The <main> element represents the primary content of the document. There should only be one <main> element per page.'
        },
        {
          id: 'q2',
          question: 'What is the purpose of the <nav> element?',
          options: [
            'To display images',
            'To contain navigation links',
            'To show advertisements',
            'To format text'
          ],
          correctAnswer: 'To contain navigation links',
          explanation: 'The <nav> element is specifically designed to contain navigation links, making the site structure clearer for both users and assistive technologies.'
        },
        {
          id: 'q3',
          question: 'Which element represents a self-contained composition that could be distributed independently?',
          options: ['<section>', '<div>', '<article>', '<aside>'],
          correctAnswer: '<article>',
          explanation: 'The <article> element represents a self-contained composition that could theoretically be distributed independently, such as a news article or blog post.'
        },
        {
          id: 'q4',
          question: 'What is a key benefit of using semantic HTML?',
          options: [
            'Smaller file sizes',
            'Better search engine optimization',
            'Faster loading times',
            'More colorful backgrounds'
          ],
          correctAnswer: 'Better search engine optimization',
          explanation: 'Semantic HTML improves SEO because search engines can better understand the structure and content of your page, leading to better rankings.'
        }
      ]
    };
    
    return NextResponse.json(mockQuiz);
    
  } catch (error: any) {
    console.error("=== ERROR IN QUIZ API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    return NextResponse.json(
      { error: 'Failed to load quiz content' },
      { status: 500 }
    );
  }
}