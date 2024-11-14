import { useState, useEffect } from 'react';

interface Answer {
  option: string;
  text: string;
  isCorrect: boolean;
}

interface DataItem {
  question: string;
  image: string;
  isCorrect: boolean;
  answers: Answer[];
}

export const usePaginatedData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data.json');  // Fetch from public folder
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // console.log(result, "Loaded Data");

        // Ensure that the result is the correct format and has data
        if (result.questions && result.questions.length > 0) {
          setTotalQuestions(result.questions.length);
          setData(result.questions);  // Set the questions array from JSON
        } else {
          console.error("No questions found in data.");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  const loadMore = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex + 1 < data.length ? prevIndex + 1 : 0 // Loop to first question when end is reached
    );
  };

  const currentQuestion = data[currentQuestionIndex];
  // console.log("Current Question:", currentQuestion);


  return { data, isLoading, loadMore, currentQuestion,totalQuestions, currentQuestionIndex};
};
