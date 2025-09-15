// src/app/api/learning-module/cheat-sheet/route.ts
import { NextResponse } from 'next/server';

interface CheatSheetRequest {
  cheatSheetId: string;
  moduleId: string;
  moduleName: string;
  userId: string;
}

interface CheatSheetContent {
  id: string;
  title: string;
  content: string;
  duration?: string;
  moduleId: string;
  moduleName: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: CheatSheetRequest = await request.json();
    
    // Validate input
    if (!body.cheatSheetId || !body.moduleId || !body.moduleName) {
      return NextResponse.json(
        { error: 'Missing required fields: cheatSheetId, moduleId, moduleName' },
        { status: 400 }
      );
    }

    console.log("Cheat Sheet API called with:", { cheatSheetId: body.cheatSheetId, moduleId: body.moduleId, moduleName: body.moduleName });
    
    // In a real implementation, this would fetch from a database
    // For now, we'll return mock data
    const mockCheatSheet: CheatSheetContent = {
      id: body.cheatSheetId,
      title: 'Semantic HTML Elements - Cheat Sheet',
      content: `## Semantic HTML Elements - Cheat Sheet

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
❌ Ignoring accessibility attributes

### Pro Tips from Industry Experts:
• Use <main> for your primary content and only once per page
• <article> is for standalone content that could be republished elsewhere
• <section> groups related content with a heading
• <aside> is perfect for sidebars, pull quotes, or related links
• Always validate your HTML with W3C Markup Validator`,
      duration: '10 minutes',
      moduleId: body.moduleId,
      moduleName: body.moduleName
    };
    
    return NextResponse.json(mockCheatSheet);
    
  } catch (error: any) {
    console.error("=== ERROR IN CHEAT SHEET API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    return NextResponse.json(
      { error: 'Failed to load cheat sheet content' },
      { status: 500 }
    );
  }
}