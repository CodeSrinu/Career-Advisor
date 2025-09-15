// src/app/learning-module/video-lecture/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface VideoLecture {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration?: string;
  moduleId: string;
  moduleName: string;
}

export default function VideoLecturePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lectureId = searchParams.get('lectureId') || '';
  const moduleId = searchParams.get('moduleId') || '';
  const moduleName = searchParams.get('moduleName') || '';
  
  const [lecture, setLecture] = useState<VideoLecture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLecture = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Loading video lecture:", { lectureId, moduleId, moduleName });
        
        // In a real implementation, this would call an API to get the lecture content
        // For now, we'll use mock data
        const mockLecture: VideoLecture = {
          id: lectureId,
          title: 'Video Lecture',
          description: 'Learn the fundamentals of your chosen topic',
          videoUrl: 'https://www.youtube.com/embed/1_lAbJ622-E',
          duration: '15 minutes',
          moduleId,
          moduleName
        };
        
        setLecture(mockLecture);
      } catch (err: any) {
        console.error('Error loading lecture:', err);
        setError('Failed to load the video lecture. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (lectureId) {
      loadLecture();
    } else {
      setError('No lecture specified');
    }
  }, [lectureId, moduleId, moduleName]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    // Navigate to the next learning activity
    // In a real implementation, this would depend on the course structure
    alert('Navigate to next activity - Cheat Sheet');
  };

  const handleWriteNote = () => {
    alert('Write a note feature would open here');
  };

  const handlePostDoubt = () => {
    alert('Post a doubt feature would open here');
  };

  const handleViewTranscription = () => {
    alert('View transcription feature would open here');
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col bg-white">
        <header className="p-4 flex-shrink-0">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="text-gray-800"
            >
              <span className="material-symbols-outlined text-3xl">arrow_back</span>
            </button>
            <h1 className="text-xl font-bold text-center flex-grow -ml-8">Loading Video...</h1>
          </div>
        </header>
        <main className="flex-grow flex flex-col px-4 space-y-4">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 rounded-lg text-gray-400 text-base font-semibold animate-pulse">
              <span className="material-symbols-outlined">edit</span>
              <span>Write a Note</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 rounded-lg text-gray-400 text-base font-semibold animate-pulse">
              <span className="material-symbols-outlined">help_outline</span>
              <span>Post a Doubt</span>
            </div>
          </div>
          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-2 rounded-full py-2 px-6 bg-gray-100 text-gray-400 text-base font-semibold animate-pulse">
              <span className="material-symbols-outlined">description</span>
              <span>View Transcription</span>
            </div>
          </div>
        </main>
        <footer className="p-4 sticky bottom-0 bg-white">
          <div className="w-full rounded-full py-4 px-6 bg-gray-200 text-black text-lg font-bold animate-pulse">
            Loading...
          </div>
        </footer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Lecture</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={handleBack}
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Lecture Not Found</h1>
          <p className="text-gray-600 mb-6">The requested video lecture could not be found.</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={handleBack}
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white" style={{ fontFamily: "'Space Grotesk', 'Noto Sans', sans-serif" }}>
      <header className="p-4 flex-shrink-0">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="text-gray-800"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold text-center flex-grow -ml-8">{lecture.title}</h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col px-4 space-y-4">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <iframe 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            className="absolute inset-0 w-full h-full" 
            frameBorder="0" 
            src={lecture.videoUrl} 
            title="YouTube video player"
          ></iframe>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={handleWriteNote}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-50 rounded-lg text-gray-800 text-base font-semibold"
          >
            <span className="material-symbols-outlined">edit</span>
            <span>Write a Note</span>
          </button>
          <button 
            onClick={handlePostDoubt}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-50 rounded-lg text-gray-800 text-base font-semibold"
          >
            <span className="material-symbols-outlined">help_outline</span>
            <span>Post a Doubt</span>
          </button>
        </div>
        <div className="flex justify-center pt-2">
          <button 
            onClick={handleViewTranscription}
            className="flex items-center gap-2 rounded-full py-2 px-6 bg-green-50 text-gray-800 text-base font-semibold"
          >
            <span className="material-symbols-outlined">description</span>
            <span>View Transcription</span>
          </button>
        </div>
      </main>
      <footer className="p-4 sticky bottom-0 bg-white">
        <button 
          onClick={handleNext}
          className="w-full rounded-full py-4 px-6 bg-green-500 text-black text-lg font-bold hover:bg-green-600 transition-colors"
        >
          Next: View Cheat Sheet →
        </button>
      </footer>
    </div>
  );
}