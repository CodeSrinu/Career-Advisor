// src/app/api/learning-module/lecture/route.ts
import { NextResponse } from 'next/server';

interface LectureRequest {
  lectureId: string;
  moduleId: string;
  moduleName: string;
  userId: string;
}

interface LectureContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  transcript: string;
  cheatSheet: string;
  duration?: string;
  moduleId: string;
  moduleName: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: LectureRequest = await request.json();
    
    // Validate input
    if (!body.lectureId || !body.moduleId || !body.moduleName) {
      return NextResponse.json(
        { error: 'Missing required fields: lectureId, moduleId, moduleName' },
        { status: 400 }
      );
    }

    console.log("Lecture API called with:", { lectureId: body.lectureId, moduleId: body.moduleId, moduleName: body.moduleName });
    
    // In a real implementation, this would fetch from a database
    // For now, we'll return mock data
    const mockLecture: LectureContent = {
      id: body.lectureId,
      title: 'Semantic HTML Elements',
      description: 'Learn the fundamentals of semantic HTML for better accessibility and SEO',
      videoUrl: 'https://www.youtube.com/embed/O_9u1P5Yj4Q',
      transcript: `Semantic HTML elements are those that clearly describe their meaning in a human- and machine-readable way. They make web pages more accessible, SEO-friendly, and easier to maintain.
          
Key Structural Elements:
• <header>: Represents introductory content for a section or the entire page.
• <nav>: Contains navigation links.
• <main>: Specifies the main, dominant content of the document.
• <article>: Represents a self-contained composition (e.g., blog post, news article).
• <section>: A thematic grouping of content.
• <aside>: Content that is tangentially related to the content around it (e.g., a sidebar).
• <footer>: Represents a footer for a section or the entire page.

Example Usage:
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>
      <h1>Article Title</h1>
      <p>Article content...</p>
    </article>
  </main>
  <footer>...</footer>
</body>`,
      cheatSheet: `## Semantic HTML Elements - Cheat Sheet

### What are Semantic Elements?
Semantic HTML elements clearly describe their meaning to both browsers and developers.

### Benefits:
• Improved Accessibility: Screen readers can better interpret content
• Better SEO: Search engines understand the page structure
• Easier Maintenance: Code is more readable and organized

### Essential Semantic Elements:

#### Document Structure
<header> - Introductory content
<nav> - Navigation links
<main> - Primary content (only one per page)
<article> - Self-contained content
<section> - Thematic grouping
<aside> - Related but separate content
<footer> - Footer information

#### Content Sectioning
<h1>-<h6> - Headings (proper hierarchy important)
<figure> - Self-contained content like images
<figcaption> - Caption for figure element

#### Text Content
<p> - Paragraph
<blockquote> - Quotation
<pre> - Preformatted text
<code> - Inline code snippet

### Best Practices:
1. Always use proper heading hierarchy
2. Don't use divs when semantic elements are available
3. Use landmark elements for accessibility
4. Validate your HTML markup

### Common Mistakes to Avoid:
❌ Using <div> for everything
❌ Skipping heading levels (e.g., h1 to h3)
❌ Misusing <section> instead of <div>
❌ Ignoring accessibility attributes`,
      duration: '15 minutes',
      moduleId: body.moduleId,
      moduleName: body.moduleName
    };
    
    return NextResponse.json(mockLecture);
    
  } catch (error: any) {
    console.error("=== ERROR IN LECTURE API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    return NextResponse.json(
      { error: 'Failed to load lecture content' },
      { status: 500 }
    );
  }
}