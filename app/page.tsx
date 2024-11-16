"use client";

import { usePaginatedData } from "@/components/usePaginatedData";
import { useState } from "react";
import Loading from "@/components/loading";
export default function Game() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongtAnswers] = useState(0);
  const [showCorrectObject, setShowCorrectObject] = useState(false);
  const [hideObject, setHideObject] = useState(false);
  const [showWrongObject, setShowWrongObject] = useState(false);
  const { currentQuestion, isLoading, loadMore, totalQuestions, currentQuestionIndex, loadPrevious } = usePaginatedData();

  if (!currentQuestion?.question) return <Loading/>;

  const validateQuestion = (isCorrect: boolean) => {
    setShowCorrectObject(false);
    setShowWrongObject(false);
    setHideObject(false);
    if (isCorrect) {
      
      setCorrectAnswers((prev) => prev + 1);  
      setTimeout(() => { 
        setHideObject(true);
        setShowCorrectObject(true);
      console.log("hide object")
      }, 1000)

      setTimeout(() => { 
        setShowCorrectObject(false);
      }, 2000);
setTimeout(() => {
  setHideObject(false);

  loadMore();

}, 4000);


 
    } else {
      setWrongtAnswers((prev) => prev + 1)
      setShowWrongObject(true) 

      setTimeout(() => {     setShowWrongObject(false) }, 3000)

    }
    console.log(isCorrect ? "Correct!" : "Incorrect!");
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden max-w-96 mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* <h2 className="text-2xl font-bold mb-4">Data List</h2> */}

        {/* Display current question */}
        <div className="mb-4 bg-white rounded relative overflow-hidden pt-6" style={{ maxHeight: '470px' }}>
          <img src={currentQuestion?.image} alt={currentQuestion?.question} />
          <div className="topline absolute left-0 right-0 flex justify-between top-0">
            <p className="text-md mb-4 text-red-100 bg-red-700 px-4 py-2 rounded-lg">F: {wrongAnswers}</p>
            <p className="text-md mb-4 text-red-100 bg-red-700 px-4 py-2 rounded-lg">{currentQuestionIndex}/{totalQuestions}</p>

            <p className="text-md mb-4 text-red-50 bg-emerald-900 px-4 py-2 rounded-lg">T: {correctAnswers}</p>
          </div>

          <div className={`bottompart question-part absolute left-0 right-0 flex flex-col top-28 bg-white bottom-0 p-4 z-10 ${hideObject && 'opacity-0'}`}>
            {/* <h3 className="text-lg font-semibold mb-6">{currentQuestion?.question}</h3> */}
            {/* Display answers */}
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => validateQuestion(answer.isCorrect)}
                className="bg-slate-800 text-red-50 hover:bg-red-800 rounded-lg p-3 mb-2 w-full"
              >
                {answer.option}: {answer.text}
              </button>
            ))}
          </div>

          <div className={`bottompart correct absolute left-0 right-0 top-32 bg-red-50 bottom-0 p-4
${showCorrectObject ? 'opacity-1 z-20' : ('opacity-0 z-0')}`}>
            <img src="./images/correct.gif" />
          </div>
          <div className={`bottompart wrong absolute flex justify-center items-center left-0 right-0 top-32 bg-red-50 bottom-0 p-4
${showWrongObject ? 'opacity-1 z-20' : ('opacity-0 z-0')}`}>
            <img src="./images/wrong.gif" className="object-fill w-fit" />
          </div>
        </div>

        {/* Load More Button */}
        <div className="flex justify-between">
       
              {currentQuestionIndex > 0 ? (<button
          onClick={()=>{loadPrevious()}}
          disabled={isLoading}
          className="mt-4 py-2 px-4 bg-rose-700 text-white rounded hover:bg-rose-900 transition-colors"
        >
          {isLoading ? "Loading..." : "Prev"}
        </button>):(<button        
          disabled={true}
          className="mt-4 py-2 px-4 bg-rose-700 text-white rounded hover:bg-rose-900 transition-colors cursor-no-drop"
        >
          {isLoading ? "Loading..." : "Prev"}
        </button>)}
        

        <button
          onClick={()=>{loadMore()}}
          disabled={isLoading}
          className="mt-4 py-2 px-4 bg-emerald-700 text-white rounded hover:bg-emerald-900 transition-colors"
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
        </div>


      </div>
    </div>
  );
}
