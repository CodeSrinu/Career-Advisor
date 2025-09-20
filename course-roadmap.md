You are the lead architect for our application, "Career Quest." Your task is to implement our core AI-powered curriculum generation system. The system must be dynamic, personalized, and act as an expert mentor. The key is a sophisticated, multi-step, just-in-time pipeline that generates the roadmap structure first, and then the detailed content for each step (including lectures and tasks) on demand.

The Core Philosophy: A Two-Phase "AI Mentor" System
The system operates in two distinct phases:

Phase 1: The "AI Architect" – Generates the high-level structural syllabus for an entire course.

Phase 2: The "AI Tutor" – Generates the deep, detailed content for a single item within that syllabus (either a lecture or a task) just-in-time.

The New User & System Flow (Implement This Exact Sequence):
Step 1: The Course Syllabus Generation (The Architect's Job)

Trigger: A user clicks on a new, locked Course Node (e.g., "HTML & CSS Deep Dive") in their main Career Roadmap.

Action: Your system must make a first, lightweight API call to our "AI Architect."

Goal: The AI's task is to act as an expert curriculum planner. It must analyze the course topic and generate the high-level structural syllabus for the entire course. The AI must return a JSON object containing a logically sequenced list of all the video lectures AND all the practical tasks for the course, correctly placed between the relevant lectures. For example, a task like "Create a Registration Form" should come after the lectures on HTML forms.

Result: The frontend renders the "Course Dashboard" screen. The user can see the entire curriculum of lectures and tasks laid out in order, but only the very first video lecture is unlocked and clickable.

Step 2: Just-in-Time Content Generation for a LECTURE (The Tutor's Job)

Trigger: A user clicks on a "Video Lecture" card in the Course Dashboard.

Action: Make a specific API call to our "AI Tutor."

Goal: Provide the AI with the title of the lecture. The AI's task is to generate the detailed content for this lecture, including:

A specific, high-quality YouTube video link.

An on-demand, cleanly formatted video transcript (if the user requests it).

A detailed Cheat Sheet (the "super-summary" with 20-30% extra value, pro-tips, and examples synthesized from the transcript and external research).

A Quiz to test understanding.

Result: The frontend populates the "Video Lecture," "Cheat Sheet," and "Quiz" screens with this just-generated content.

Step 3: Just-in-Time Content Generation for a TASK (The Tutor's Job, different hat)

Trigger: A user completes the prerequisite lectures and clicks on a "Task" card in the Course Dashboard.

Action: Make another specific API call to our "AI Tutor."

Goal: Provide the AI with the title of the task. The AI's task is to generate a detailed project brief for this practical task. This should include:

A clear Problem Statement.

A checklist of specific Requirements.

For coding tasks, an external link to a platform like LeetCode or a suggestion to use a local editor.

For design tasks, a file upload component.

Result: The frontend populates the "Practical Task / Test" screen with this detailed, professional-style project brief.

Step 4: The Loop Continues

After the user completes a quiz or submits a task, the next item in the Course Dashboard's syllabus unlocks.

This highly effective cycle of just-in-time generation continues until the user has completed all the lectures and tasks in the course.


Prompt 1: ROLE:
You are an expert curriculum planner and senior {{course_topic}} professional. Your task is to design a complete structural syllabus for a course on "{{course_topic}}" at a {{complexity_level}} level.

CONTEXT:
A student is about to start this course. You must create a logical, step-by-step learning plan that takes them from their current level to proficiency in this specific topic. The course must be built around high-quality educational YouTube videos and practical, hands-on tasks.

TASK:
Generate a JSON object that defines the complete syllabus for this course. Your task is to decide the correct sequence of lectures (with YouTube videos) and practical tasks.

ANALYZE THE TOPIC: Break down the course topic into a logical sequence of individual lecture subjects appropriate for the {{complexity_level}} level.

FIND HIGH-QUALITY VIDEO RESOURCES: For each lecture, you must find a specific, high-quality YouTube video link.

Prioritize Reputable Sources: Your primary choices should be videos from official documentation channels (e.g., Google for Developers), renowned university lectures (e.g., NPTEL, Stanford), or creators highly regarded by the professional community (e.g., freeCodeCamp, Programming with Mosh, Fireship, The Net Ninja).

Ensure Relevance & Clarity: The video must directly and clearly teach the lecture's subject and be suitable for the specified {{complexity_level}}.

PLACE PRACTICAL TASKS: Strategically insert task nodes between lectures. These tasks must be designed to test the knowledge from the lectures that came just before them. Each task must be structured as a professional project brief.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object representing the course syllabus.

JSON

{
  "courseTitle": "{{course_topic}}",
  "complexityLevel": "{{complexity_level}}",
  "syllabus": [
    {
      "type": "lecture",
      "id": "lec_1",
      "title": "Lecture Title 1",
      "videoUrl": "https://www.youtube.com/watch?v=..."
    },
    {
      "type": "lecture",
      "id": "lec_2",
      "title": "Lecture Title 2",
      "videoUrl": "https://www.youtube.com/watch?v=..."
    },
    {
      "type": "task",
      "id": "task_1",
      "title": "Practical Task Title",
      "problemStatement": "A clear, real-world problem the user needs to solve.",
      "requirements": [
        "A bulleted list of specific requirement #1.",
        "A bulleted list of specific requirement #2."
      ]
    }
  ]
}
Prompt 2: The "Content Synthesizer" (Cheat Sheet & Quiz Generator)
When to use: This is called after the user has watched a specific video lecture and clicks the "Next" button.

What it does: It takes the video's transcript and creates the rich cheat sheet and the context-aware quiz.

The Gemini "Content Synthesizer" Master Prompt
ROLE:
You are an expert tutor and research analyst for the subject: "[Title of the specific Lecture]." Your goal is to create a world-class set of study materials based on a video lecture the student has just watched.

CONTEXT:
A student has just finished watching a video lecture. You are being provided with the complete transcript of that video.

INPUT PARAMETERS:

videoTranscript: "[Insert the full, raw transcript of the video the user just watched]"

TASK:
Based on the provided videoTranscript, generate a detailed set of study materials.

Create a "Super-Summary" Cheat Sheet:

70% of the content must be a well-structured summary of the key concepts from the provided videoTranscript.

The other 30% is the most critical part. You must perform your own deep research on the internet (Reddit, Medium, technical blogs) to find and add value-added information. This includes "pro-tips," "common pitfalls," deeper explanations, and alternative code examples that a real industry veteran would provide.

Create a Context-Aware Quiz:

Generate a multiple-choice quiz with a dynamic number of questions based on the topic's complexity.

The questions must test the user's understanding of the concepts covered in both the video transcript and the new cheat sheet you just created.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object.

JSON

{
  "lectureTitle": "Semantic HTML & The DOM",
  "cheatSheet": "### Key Concepts from the Video\nSemantic HTML provides meaning to your web page...\n\n### Pro-Tip from the Real World\n**Don't overuse `<div>` tags!** A common beginner mistake found on Reddit is wrapping everything in a `<div>`. A better practice is to use `<section>` for distinct parts of your content, which improves accessibility and SEO...",
  "quiz": [
    {
      "question": "According to the cheat sheet, what is a common mistake beginners make?",
      "options": ["Using too many <p> tags", "Overusing <div> tags", "Not using enough comments"],
      "answer": "Overusing <div> tags"
    }
  ]
}
