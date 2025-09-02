'use client';

import { useState } from 'react';

interface PsychologyQuestion {
  id: number;
  text: string;
  options: string[];
  type?: 'multi-select' | 'text' | 'single-select' | 'rating';
  maxSelections?: number;
  ratingLabels?: [string, string];
}

interface PsychologyQuizProps {
  onComplete: (answers: Record<number, string | string[]>) => void;
  onBack: () => void;
}

const PsychologyQuiz: React.FC<PsychologyQuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [textInput, setTextInput] = useState('');

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
        "Other (write 3 words)"
      ],
      type: 'single-select'
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
        "Other (write 3 words)"
      ],
      type: 'single-select'
    },
    {
      id: 3,
      text: "As a kid you proudly said, \"Pedda ayyaka nenu ______ avuthaa/ni.\" (When I grow up, I will become a ______.)",
      options: [],
      type: 'text'
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
        "Other (write 3 words)"
      ],
      type: 'single-select'
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
        "Other (write 3 words)"
      ],
      type: 'single-select'
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
        "Other (write 3 words)"
      ],
      type: 'single-select'
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
        "Other (write 3 words)"
      ],
      type: 'multi-select',
      maxSelections: 3
    },
    {
      id: 8,
      text: "Rate 1-5: \"I feel alive when everyone is listening to me on stage.\"",
      options: ["1", "2", "3", "4", "5"],
      type: 'rating',
      ratingLabels: ["Strongly Disagree", "Strongly Agree"]
    },
    {
      id: 9,
      text: "If parents/relatives vanished for a year, the career you'd secretly pick is ______.",
      options: [],
      type: 'text'
    },
    {
      id: 10,
      text: "Rate 1-5: \"Na present goal 100% naa ishtam, family pressure ledu.\" (My current goal is 100% my own choice with zero family pressure.)",
      options: ["1", "2", "3", "4", "5"],
      type: 'rating',
      ratingLabels: ["No Pressure", "Full Pressure"]
    }
  ];

  const currentQ = questions[currentQuestion];
  const isMultiSelectQuestion = currentQ.type === 'multi-select';
  const isTextInputQuestion = currentQ.type === 'text';
  const isRatingQuestion = currentQ.type === 'rating';

  const multiSelectAnswers = (answers[currentQuestion] as string[] | undefined) || [];

  const handleAnswerSelect = (option: string) => {
    if (isMultiSelectQuestion) {
      const currentAnswers = multiSelectAnswers;
      const maxSelections = currentQ.maxSelections || 3;
      let newAnswers: string[];

      if (currentAnswers.some(ans => ans.startsWith(option))) {
        // Remove the option
        newAnswers = currentAnswers.filter(ans => !ans.startsWith(option));
      } else {
        // Add the option
        if (currentAnswers.length < maxSelections) {
          newAnswers = [...currentAnswers, option];
        } else {
          newAnswers = [...currentAnswers.slice(1), option];
        }
      }
      
      // If we're dealing with the "Other" option, handle text input appropriately
      if (option === "Other (write 3 words)") {
        if (currentAnswers.includes("Other (write 3 words)")) {
          // Removing "Other" option, clear text input if it's empty or only contains the "Other:" prefix
          const otherAnswers = currentAnswers.filter(ans => ans.startsWith("Other: "));
          if (otherAnswers.length === 0 || (otherAnswers.length === 1 && otherAnswers[0] === "Other: ")) {
            setTextInput('');
          }
        } else {
          // Adding "Other" option, preserve existing text input
          const otherAnswers = currentAnswers.filter(ans => ans.startsWith("Other: "));
          if (otherAnswers.length > 0) {
            // Extract text from existing "Other" answer
            const existingText = otherAnswers[0].replace("Other: ", "");
            setTextInput(existingText);
          }
        }
      }
      
      setAnswers(prev => ({ ...prev, [currentQuestion]: newAnswers }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
      // Only clear text input if we're switching away from "Other" option
      if (option !== "Other (write 3 words)" && answers[currentQuestion] === "Other (write 3 words)") {
        setTextInput('');
      }
      // If we're selecting "Other" option, preserve any existing text input
      if (option === "Other (write 3 words)" && textInput.trim() !== '') {
        const answerValue = `Other: ${textInput}`;
        setAnswers(prev => ({ ...prev, [currentQuestion]: answerValue }));
      }
    }
  };

  const handleTextInputChange = (value: string) => {
    setTextInput(value);
    const answerValue = `Other: ${value}`;

    setAnswers(prev => {
        const newAnswers = {...prev};
        if (isMultiSelectQuestion) {
            const otherOption = "Other (write 3 words)";
            const currentAnswers = (newAnswers[currentQuestion] as string[] | undefined) || [];
            
            // Check if "Other (write 3 words)" is selected
            const otherIndex = currentAnswers.indexOf(otherOption);
            
            if (otherIndex !== -1) {
                // "Other (write 3 words)" is selected, so we need to manage the actual "Other: ..." answers
                const updatedAnswers = [...currentAnswers];
                
                // Remove any existing "Other: ..." answers
                const filteredAnswers = updatedAnswers.filter(ans => !ans.startsWith("Other: "));
                
                // Add the new "Other: ..." answer if there's text
                if (value.trim() !== '') {
                    filteredAnswers.push(answerValue);
                }
                
                newAnswers[currentQuestion] = filteredAnswers;
            }
        } else {
            // For single select, if "Other" option is selected, update the answer
            if (newAnswers[currentQuestion] === "Other (write 3 words)") {
                newAnswers[currentQuestion] = answerValue;
            }
        }
        return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTextInput('');
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevAnswer = answers[currentQuestion - 1];
      if (typeof prevAnswer === 'string' && prevAnswer.startsWith('Other: ')) {
        setTextInput(prevAnswer.replace('Other: ', ''));
      } else {
        setTextInput('');
      }
    } else {
      onBack();
    }
  };

  const isQuestionAnswered = () => {
    const answer = answers[currentQuestion];
    if (isMultiSelectQuestion) {
        const otherOption = "Other (write 3 words)";
        // Check if "Other" option is selected but text input is empty
        if (multiSelectAnswers.includes(otherOption) && textInput.trim() === '') {
            // Check if there's already a filled "Other" answer
            const otherAnswers = multiSelectAnswers.filter(ans => ans.startsWith("Other: ") && ans.length > 7);
            if (otherAnswers.length === 0) {
                return false;
            }
        }
        return multiSelectAnswers.length > 0;
    }
    if (isTextInputQuestion) {
      return typeof answer === 'string' && answer.trim() !== '';
    }
    // For "Other" option, check if it has been properly filled
    if (answer === "Other (write 3 words)") {
      return textInput.trim() !== '';
    }
    // For filled "Other" answers (starting with "Other: ")
    if (typeof answer === 'string' && answer.startsWith('Other: ')) {
      return answer.length > 7; // Longer than "Other: "
    }
    return answer !== undefined && answer !== '';
  };

  const showOtherInput = (isMultiSelectQuestion && multiSelectAnswers.includes("Other (write 3 words)")) || 
                         (!isMultiSelectQuestion && (answers[currentQuestion] === "Other (write 3 words)" || 
                         (typeof answers[currentQuestion] === 'string' && answers[currentQuestion].startsWith('Other: '))));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={handleBack} className="text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex-1 text-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-500 w-12 text-right">{currentQuestion + 1}/{questions.length}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{currentQ.text}</h2>

        <div className="space-y-4">
          {isTextInputQuestion ? (
            <textarea
              value={answers[currentQuestion] as string || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion]: e.target.value }))}
              placeholder="Your answer here..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-sm text-black"
              rows={4}
            />
          ) : isMultiSelectQuestion ? (
            <>
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${ 
                    multiSelectAnswers.some(ans => ans.startsWith(option))
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-3 ${ 
                      multiSelectAnswers.some(ans => ans.startsWith(option))
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {multiSelectAnswers.some(ans => ans.startsWith(option)) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-500 text-center mt-2">
                Select up to {currentQ.maxSelections} options ({multiSelectAnswers.length}/{currentQ.maxSelections} selected)
              </p>
            </>
          ) : isRatingQuestion ? (
            <div>
                <div className="flex justify-between">
                    {currentQ.options.map((option, index) => (
                        <button
                        key={index}
                        className={`flex-1 py-3 px-2 rounded-lg mx-1 transition-all duration-200 ${ 
                            answers[currentQuestion] === option
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => handleAnswerSelect(option)}
                        >
                        <span className="text-sm font-medium">{index + 1}</span>
                        </button>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2 px-2">
                    <span>{currentQ.ratingLabels?.[0]}</span>
                    <span>{currentQ.ratingLabels?.[1]}</span>
                </div>
            </div>
          ) : (
            currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${ 
                  answers[currentQuestion] === option
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${ 
                    answers[currentQuestion] === option
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}> {answers[currentQuestion] === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </div>
            ))
          )}

          {showOtherInput && (
            <input
              type="text"
              value={textInput}
              onChange={(e) => handleTextInputChange(e.target.value)}
              placeholder="Write 3 words..."
              className="w-full mt-3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-sm text-black"
            />
          )}
        </div>
      </main>

      {/* Navigation buttons */}
      <footer className="p-4 border-t border-gray-200 bg-white">
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all duration-300"
            onClick={handleBack}
            disabled={currentQuestion === 0 && onBack === undefined}
          >
            Back
          </button>
          <button
            className={`flex-1 py-3 px-4 font-semibold rounded-xl transition-all duration-300 ${ 
              isQuestionAnswered()
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleNext}
            disabled={!isQuestionAnswered()}
          >
            {currentQuestion === questions.length - 1 ? 'Finish & See Results' : 'Next'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PsychologyQuiz;
