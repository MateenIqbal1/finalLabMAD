import React, { createContext, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';

// Create Context
const QuizContext = createContext();

// Custom hook to use context
export const useQuiz = () => useContext(QuizContext);

// Context Provider Component
export const QuizProvider = ({ children }) => {
  const [attemptCount, setAttemptCount] = useState(0);

  // Load attempt count from AsyncStorage when the app loads
  React.useEffect(() => {
    const loadAttemptCount = async () => {
      const storedAttemptCount = await AsyncStorage.getItem('quizAttemptCount');
      if (storedAttemptCount) {
        setAttemptCount(Number(storedAttemptCount));
      }
    };

    loadAttemptCount();
  }, []);

  // Function to increase attempt count
  const incrementAttemptCount = async () => {
    const newCount = attemptCount + 1;
    await AsyncStorage.setItem('quizAttemptCount', newCount.toString());
    setAttemptCount(newCount);
  };

  return (
    <QuizContext.Provider value={{ attemptCount, incrementAttemptCount }}>
      {children}
    </QuizContext.Provider>
  );
};
