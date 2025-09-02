// src/components/PsychologyQuiz.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PsychologyQuestion {
  id: number;
  text: string;
  options: string[];
}

interface DomainMatch {
  domain: string;
  score: number;
}

const PsychologyQuiz = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<DomainMatch[] | null>(null);

  // Psychology questions for users without goals
  const questions: PsychologyQuestion[] = [
    {
      id: 1,
      text: "When you were 8-10, which ONE thing could keep you busy for hours?",
      options: [
        "Making paper boats during monsoon",
        "Arranging cricket cards or tazos",
        "Helping Amma/Appa in the kirana shop",
        "Drawing rangoli or mehendi designs",
        "Disassembling the old radio/TV remote",
        "Building mud houses or gully cricket stumps",
        "Story-telling to younger siblings",
        "Rang-bazi / kite flying",
        "Other"
      ]
    },
    {
      id: 2,
      text: "Your favorite toy/game you replayed the MOST:",
      options: [
        "Gilli-danda / Lagori",
        "Carrom board",
        "Cricket with rubber ball",
        "Kitchen set / Lattu",
        "Hand-made paper planes",
        "Video game in neighbour's house (Mario, Contra)",
        "DIY science kit from local fair",
        "None of these",
        "Other"
      ]
    },
    {
      id: 3,
      text: "As a kid you proudly said, \"Pedda ayyaka nenu ______ avuthaa/ni.\" (When I grow up, I will become a ______.)",
      options: [] // This will be a text input
    },
    {
      id: 4,
      text: "You just won ₹50,000 and must spend it on ONE thing that excites you:",
      options: [
        "A sleeper-train trip to the Himalayas",
        "Latest smartphone + Jio recharge",
        "Helping fund a cousin's school fees",
        "DJ console for a college fest",
        "Stock-market Demat account",
        "Designer cricket bat",
        "Online guitar classes",
        "Other"
      ]
    },
    {
      id: 5,
      text: "Which sentence gives you that \"waah\" feeling?",
      options: [
        "\"I fixed the village water-pump wiring myself.\"",
        "\"I convinced the shopkeeper to give a festival discount.\"",
        "\"I wrote a poem that made my grandma cry.\"",
        "\"My team won the inter-college hackathon.\"",
        "\"I organised the Ganesh Chaturthi event.\"",
        "\"I taught coding to my colony kids.\"",
        "Other"
      ]
    },
    {
      id: 6,
      text: "Ideal daily vibe:",
      options: [
        "Quiet hostel room with headphones",
        "Small chai-break team of 4 friends",
        "Bustling co-working space in Bangalore",
        "Field visits across districts",
        "Work-from-home in pyjamas",
        "Other"
      ]
    },
    {
      id: 7,
      text: "Rank your top 3 non-negotiables:",
      options: [
        "Remote job from hometown",
        "Flexible festival holidays",
        "High starting salary (₹8 LPA+)",
        "Chance to work with big brands (TCS, Flipkart, ISRO)",
        "Creative freedom (design my own tasks)",
        "Visible social impact",
        "Other"
      ]
    },
    {
      id: 8,
      text: "Rate 1-5: \"I feel alive when everyone is listening to me on stage.\"",
      options: ["1 (Strongly Disagree)", "2", "3", "4", "5 (Strongly Agree)"]
    },
    {
      id: 9,
      text: "If parents/relatives vanished for a year, the career you'd secretly pick is ______.",
      options: [] // This will be a text input
    },
    {
      id: 10,
      text: "Rate 1-5: \"Na present goal 100% naa ishtam, family pressure ledu.\" (My current goal is 100% my own choice with zero family pressure.)",
      options: ["1 (Strongly Disagree)", "2", "3", "4", "5 (Strongly Agree)"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // This is a simplified scoring algorithm
      // In a real implementation, this would be more complex
      const domainScores: Record<string, number> = {
        "Digital & Core Tech": 0,
        "Data, AI & Research": 0,
        "Healthcare & Life Sciences": 0,
        "Education & Academia": 0,
        "Business, Management & Support": 0,
        "Creative, Media & Performing Arts": 0,
        "Skilled Trades, Services & Physical": 0,
        "Entrepreneurship & Self-Employment": 0
      };

      // Simple scoring based on answers
      // This is just a placeholder - real implementation would be more sophisticated
      Object.keys(answers).forEach(questionIndex => {
        const answer = answers[parseInt(questionIndex)];
        
        // This is a very simplified mapping
        // Real implementation would have more nuanced logic
        switch(parseInt(questionIndex)) {
          case 0: // Childhood interests
            if (answer.includes("disassembling") || answer.includes("radio")) {
              domainScores["Digital & Core Tech"] += 10;
            } else if (answer.includes("drawing") || answer.includes("rangoli")) {
              domainScores["Creative, Media & Performing Arts"] += 10;
            } else if (answer.includes("helping") || answer.includes("shop")) {
              domainScores["Business, Management & Support"] += 10;
            }
            break;
          case 4: // Inspirational statement
            if (answer.includes("fixed")) {
              domainScores["Skilled Trades, Services & Physical"] += 10;
            } else if (answer.includes("convinced")) {
              domainScores["Business, Management & Support"] += 10;
            } else if (answer.includes("poem")) {
              domainScores["Creative, Media & Performing Arts"] += 10;
            }
            break;
          // Add more sophisticated logic for other questions
        }
      });

      // Convert to array and sort
      const resultsArray = Object.entries(domainScores)
        .map(([domain, score]) => ({ domain, score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setResults(resultsArray);
      setIsCalculating(false);
    }, 1500);
  };

  const handleSelectDomain = (domain: string) => {
    // In a real implementation, you would save the selected domain
    // and navigate to the domain explorer
    console.log("Selected domain:", domain);
    // For now, we'll just redirect to a placeholder
    alert(`In a full implementation, you would be taken to explore careers in ${domain}.`);
  };

  if (results) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Career Matches</h2>
        
        {isCalculating ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Analyzing your responses...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Based on your responses, here are the career domains that match your interests and personality:
            </p>
            
            <div className="space-y-4">
              {results.map((match, index) => (
                <div 
                  key={match.domain}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                  onClick={() => handleSelectDomain(match.domain)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{match.domain}</h3>
                      <p className="text-gray-600">Match Score: {match.score}/100</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleSelectDomain(results[0].domain)}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md hover:shadow-lg"
              >
                Explore {results[0].domain}
              </button>
              
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setResults(null);
                }}
                className="w-full mt-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6 text-gray-800">{currentQ.text}</h2>

      <div className="space-y-3 mb-8">
        {currentQ.options.length > 0 ? (
          currentQ.options.map((option, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${ 
                answers[currentQuestion] === option
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
              onClick={() => handleAnswer(option)}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${ 
                  answers[currentQuestion] === option
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            </div>
          ))
        ) : (
          <textarea
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm"
            rows={3}
          />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`py-2 px-6 rounded-lg font-medium transition-all duration-300 ${ 
            currentQuestion === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || answers[currentQuestion] === ''}
          className={`py-2 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${ 
            !answers[currentQuestion] || answers[currentQuestion] === ''
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default PsychologyQuiz;
