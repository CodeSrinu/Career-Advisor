ROLE:
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