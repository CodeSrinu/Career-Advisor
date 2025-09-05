APP IDEA:
---------------
We’re building Career-Advisor —a language-smart, zero-cost LMS that lives entirely in-app (no PDFs, no downloads) and turns any learner into a job-ready pro. 
After a quick login, the user picks their state and preferred language mix (90 % English + 20 % native), then answers five psychology questions to validate their chosen goal.
If the goal already exists, the app maps it to domains and sub-roles, showing real job videos, salary bands, and 3-5-year career paths.
If the goal is missing, a 10-question persona quiz instantly surfaces matching domains and sub-roles, each with Telugu-subtitled videos and market insights.
Once the sub-role is locked, a 15-question skill test + open story + optional resume pins the exact starting difficulty, then injects a prerequisite micro-course (in-app page + short video) only if needed.
From there, six gamified levels unfold inside the app: micro-lessons, AI-generated videos, auto-graded quizzes, and hands-on tasks, all ending with a live GitHub portfolio and an auto-generated resume.
Finally, the platform scrapes real internships from LinkedIn, Internshala, and AngelList, filters out fee-based scams, and serves only free or stipend-bearing opportunities, ensuring every user graduates with a job-ready skill set and a real offer.
---------------
I need a Next.js 14 starter that:
Google OAuth only (no email/password).
After login, ask for native language (dropdown: Telugu, Hindi, Tamil, Marathi).
Radio button “Goal already set?”
If Yes, input box for goal text (English + native mix).
Use Tailwind CSS for clean, responsive UI (no PDFs).
All pages in-app, zero PDF.
Deploy-ready with Vercel.
Generate:
app/api/auth/[...nextauth]/route.ts
app/page.tsx (login form + language + goal)
app/layout.tsx
tailwind.config.js
.env.local template
Color palette: slate-100 bg, blue-600 buttons, green-600 continue.
Responsive: mobile-first flex layout.
No database, only localStorage for now.

#Our design ideas,
{
     Part 1: The Core Design Principles (The "Why")
We didn't just build pages; we built a system around these four foundational principles.

1. The Guided Path: Eliminate All Guesswork
The single biggest enemy for a new learner is decision paralysis ("What should I do next?"). Our entire platform is designed to answer that question for them, always.

Principle: A learner should never have to think about their next step. The path is linear and pre-defined.

How it's Implemented in the UI:

Linear Progression: Modules and lessons are locked until the previous one is completed. This creates a focused, one-track journey.

The "Proceed to Next" Button: This is the most important button. It's always present, guiding the user forward.

Dashboard Focus: The main dashboard prominently features a "Continue Learning" or "Complete Assignment" card, making the next action obvious.

Sidebar Navigation: The left sidebar shows the entire journey, but only the current section is active and highlighted, acting as a "you are here" map.

2. Motivation Through Momentum
Learning to code is a marathon. We built systems to create small, consistent wins that build momentum and keep the user engaged over the long term.

Principle: Show the user their progress in tangible, rewarding ways to create a positive feedback loop.

How it's Implemented in the UI:

Gamification Widgets: The Leaderboard, Consistency Score, and Daily Streak are always visible on the dashboard. They aren't just features; they are core motivators.

Visual Progress: Checkmarks (✓) next to completed lessons, progress bars for modules, and a calendar view of their learning days provide constant visual reinforcement of their effort.

Immediate Feedback: Quizzes and coding challenges are auto-graded instantly. Seeing a green "Passed" or "+10 points" is a micro-reward that fuels the next session.

3. Frictionless Practice
The moment a user has to leave the platform to set up a code editor is the moment you risk losing them. Practice must be instant and integrated.

Principle: The gap between learning a concept and applying it should be zero.

How it's Implemented in the UI:

The In-Browser IDE: Every lesson with code has an embedded "Code Playground" or IDE. The user can read, edit, and run code right next to the explanation without any setup.

Contextual Tasks: Quizzes and practice problems appear directly after a concept is taught, reinforcing it immediately while it's fresh in their mind.

4. Clarity Over Clutter
A learning environment should feel calm, organized, and focused. We were ruthless about removing anything that didn't directly serve the learning process.

Principle: Every element on the screen must have a purpose. If it doesn't, it's noise.

How it's Implemented in the UI:

Generous Whitespace: Prevents the UI from feeling cramped and overwhelming.

Card-Based Layouts: Information is organized into distinct, digestible chunks (cards) for assignments, schedule items, and leaderboard stats.

Limited Color Palette: We use color intentionally and sparingly (more on this below). Most of the UI is built on a neutral gray scale to make the important elements pop.

Part 2: UI Pages & Structural Breakdown (The "How")
The entire platform is built on a few key page templates.

1. Global Structure

Persistent Left Sidebar: This is the user's map. It's always visible and contains links to the main hubs: Home (Dashboard), My Journey, Job Board, etc. This provides a constant sense of orientation.

Top Header: Minimalist. It usually contains a search bar, notifications, and the user's profile menu.

2. The Dashboard Page Template

Purpose: The user's "mission control." Answers "Where am I?" and "What's next?".

Layout: A 3-column responsive grid.

Left Column (Navigation): The persistent sidebar.

Center Column (Main Content): The primary focus area. It contains the "Next Step" call-to-action card and the user's weekly schedule or learning path (like the Skill Tree you want to build).

Right Column (Status & Motivation): The secondary column for the gamification widgets (Leaderboard, Consistency Tracker, etc.).

3. The Lesson Page Template

Purpose: Deep focus on a single piece of content.

Layout: A 2-column layout.

Left Column (Course Index): A collapsible list of all modules and lessons in the current course. It highlights the lesson the user is currently viewing.

Right Column (Content Area): This is the main stage. It contains the video, the text explanation, and the embedded code playground. Below this, a tabbed component neatly organizes "Notes," "Discussions," and "Resources."

Part 3: The Color System (The "Look & Feel")
As requested, here is a professional color system. You can swap the actual hex codes, but the roles of the colors are what's important.

The Logic: Use a neutral foundation for 90% of the UI, and use color as a tool to guide the user's attention.

Primary Color (Action & Focus)

Role: Used for all interactive elements: buttons, links, active states in navigation, and highlights on the current task. It tells the user "You can click this" or "This is what you need to do."

Sample Palette: A strong, accessible Blue or Indigo.

--primary-500: #4f46e5 (Main)

--primary-600: #4338ca (Hover)

--primary-100: #e0e7ff (Light Backgrounds)

Secondary/Accent Color (Success)

Role: Used exclusively for positive reinforcement: completed checkmarks, "Passed" badges, correct answers, and celebration messages. This color should always mean "Success."

Sample Palette: A vibrant, clear Green.

--secondary-500: #10b981 (Main)

--secondary-100: #d1fae5 (Light Backgrounds)

Neutrals (The Foundation)

Role: This is the backbone of your UI. A full spectrum of grays creates structure and hierarchy without adding visual noise.

Sample Palette:
This palette is designed to be calm, focused, and sophisticated. The dark teal is professional yet unique, creating a less corporate and more mindful learning environment.

Primary / Action Color

Role: The core interactive color.

Color: Deep Teal

Hex: #0D9488

Secondary / Success Color

Role: Marking progress and completion.

Color: Emerald Green

Hex: #10B981

Accent / Gamification Color

Role: Drawing attention to streaks and motivational stats.

Color: Soft Coral

Hex: #F97316

Neutrals

Darkest Text: #172554 (blue-950)

Body Text: #334155 (slate-700)

Subtle Text / Borders: #94A3B8 (slate-400)

Card Background: #FFFFFF (white)

Page Background: #F1F5F9 (slate-100)

By combining these principles, page structures, and the intentional color system, you will build a platform that not only looks professional but is fundamentally designed to help your users succeed.
} 


# newchanges
The New Plan: AI-Powered Persona & Career Matching
1. The Simplification:

Remove: We will delete the static /personas and /domains collections from Firestore.

Replace: We will replace the old rule-based recommendationEngine code with a new, simpler function whose only job is to call the AI API with the prompt below.

2. The New Engine:
The following "Master Prompt" will be sent to the Gemini (or OpenAI) API. This single prompt contains all the logic required to generate a unique persona and recommend specific, relevant career paths for every user.

# AI Prompt:
**ROLE:**
You are an expert career counselor and occupational psychologist. Your specialty is guiding young Indian students (ages 18-24) from diverse backgrounds toward fulfilling and future-proof careers. You have a deep understanding of the current Indian job market, including tech, creative, government, and skilled-trade roles. You are empathetic and excel at finding the hidden signals in a person's life story.

---

**CONTEXT:**
A student has answered a 10-question psychology quiz to discover their intrinsic motivations. Analyze their complete set of answers below to understand their core personality, values, and working style.

**User's Quiz Answers:**
1.  **Childhood Interest:** "[Insert User's Answer to Question 1]"
2.  **Favorite Toy/Game:** "[Insert User's Answer to Question 2]"
3.  **Childhood Aspiration:** "[Insert User's Answer to Question 3]"
4.  **Spending Preference:** "[Insert User's Answer to Question 4]"
5.  **Inspirational Statement:** "[Insert User's Answer to Question 5]"
6.  **Ideal Daily Vibe:** "[Insert User's Answer to Question 6]"
7.  **Non-Negotiables:** "[Insert User's Answer to Question 7]"
8.  **Public Speaking Rating (1-5):** "[Insert User's Answer to Question 8]"
9.  **Secret Choice:** "[Insert User's Answer to Question 9]"
10. **Goal Ownership Rating (1-5):** "[Insert User's Answer to Question 10]"

---

**TASK:**
Based on your expert analysis of the user's answers, perform the following two tasks:

**Part 1: Generate a Dynamic Career Persona**
Synthesize the user's answers into a single, insightful, and encouraging career persona. This persona should feel unique and personal to the user.
-   **Persona Name:** Create a descriptive and evocative name. Examples of the *style* I'm looking for include: "The Hands-On Community Builder," "The Analytical Storyteller," "The Pragmatic Organizer."
-   **Persona Summary:** Write a 2-3 sentence summary explaining the user's core drivers, what motivates them, and the kind of environment where they would thrive.

**Part 2: Recommend 5 Specific Job Roles**
Based on the unique persona you just generated, recommend the top 5 most suitable and specific job roles for this user in the current Indian market.
-   **Be Specific:** Do not recommend broad domains. Recommend concrete job titles like "AI Developer," "VLSI Engineer," "UI/UX Designer," "Digital Marketing Manager," or "IAS Officer."
-   **Provide a "Why":** For each recommended role, provide a concise, one-sentence reason that directly connects the job to the user's persona and their quiz answers.

---

**OUTPUT FORMAT:**
Your final output MUST be a single, clean, valid JSON object. Do not include any text or explanations outside of the JSON structure.

{
  "personaName": "...",
  "personaSummary": "...",
  "recommendedRoles": [
    {
      "role": "...",
      "reason": "..."
    },
    {
      "role": "...",
      "reason": "..."
    },
    {
      "role": "...",
      "reason": "..."
    },
    {
      "role": "...",
      "reason": "..."
    },
    {
      "role": "...",
      "reason": "..."
    }
  ]
}