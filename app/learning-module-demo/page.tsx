// src/app/learning-module-demo/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LearningModuleDemoPage() {
  const router = useRouter();

  const navigateToVideoLecture = () => {
    router.push('/learning-module/video-lecture?lectureId=lec1&moduleId=mod1&moduleName=HTML%20Fundamentals');
  };

  const navigateToCheatSheet = () => {
    router.push('/learning-module/cheat-sheet?cheatSheetId=cs1&moduleId=mod1&moduleName=HTML%20Fundamentals');
  };

  const navigateToQuiz = () => {
    router.push('/learning-module/quiz?quizId=qz1&moduleId=mod1&moduleName=HTML%20Fundamentals');
  };

  const navigateToTasksProjects = () => {
    router.push('/learning-module/tasks-projects?taskId=tk1&moduleId=mod1&moduleName=HTML%20Fundamentals');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Learning Module Demo</h1>
        <p className="text-gray-600 text-center mb-8">Select a learning module to preview</p>
        
        <div className="space-y-4">
          <button
            onClick={navigateToVideoLecture}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined text-green-500 mr-3">play_circle</span>
              <div>
                <h2 className="font-semibold text-gray-800">Video Lecture</h2>
                <p className="text-sm text-gray-600">Watch educational content</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">arrow_forward_ios</span>
          </button>
          
          <button
            onClick={navigateToCheatSheet}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined text-blue-500 mr-3">description</span>
              <div>
                <h2 className="font-semibold text-gray-800">Cheat Sheet</h2>
                <p className="text-sm text-gray-600">Quick reference guide</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">arrow_forward_ios</span>
          </button>
          
          <button
            onClick={navigateToQuiz}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined text-purple-500 mr-3">help</span>
              <div>
                <h2 className="font-semibold text-gray-800">Quiz</h2>
                <p className="text-sm text-gray-600">Test your knowledge</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">arrow_forward_ios</span>
          </button>
          
          <button
            onClick={navigateToTasksProjects}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <span className="material-symbols-outlined text-orange-500 mr-3">engineering</span>
              <div>
                <h2 className="font-semibold text-gray-800">Task/Project</h2>
                <p className="text-sm text-gray-600">Hands-on practice</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">arrow_forward_ios</span>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-green-500 hover:text-green-600 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}