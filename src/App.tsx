import React, { useState, useEffect } from 'react';
import questions from './questions';
import { calculateScore, calculateAverage } from './utils';

import "./styles.css"
const App: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array.from({ length: Object.keys(questions).length }, () => ''));
  const [score, setScore] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [allAnswers, setAllAnswers] = useState<string[][]>([]);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('allAnswers') || '[]');
    setAllAnswers(storedAnswers);
  }, []);

  useEffect(() => {
    localStorage.setItem('allAnswers', JSON.stringify(allAnswers));
  }, [allAnswers]);

  useEffect(() => {
    const newScore = calculateScore(answers);
    setScore(newScore);
  }, [answers]);

  useEffect(() => {
    const allScores = allAnswers.map(ans => calculateScore(ans));
    const newAvgScore = calculateAverage(allScores);
    setAverageScore(newAvgScore);
  }, [allAnswers]);

  const handleAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (score !== null) {
      const newAllAnswers = [...allAnswers, answers];
      setAllAnswers(newAllAnswers);
      setAnswers(Array.from({ length: Object.keys(questions).length }, () => ''));
    }
  };

  return (
    <div className="container">
      <h1 className="header">TODO</h1>
      <div className="score">
        <h2>Score: {score !== null ? `${score.toFixed()}` : 'N/A'}</h2>
        <h2>Average Score: {averageScore !== null ? `${averageScore.toFixed()}` : 'N/A'}</h2>
      </div>
      <div className="questions">
        {Object.entries(questions).map(([index, question]) => (
          <div key={index} className="question-container">
            <h2 className="question">{question}</h2>
            <div className="buttons">
              <button onClick={() => handleAnswer(parseInt(index), 'Yes')} className="yes-button">Yes</button>
              <button onClick={() => handleAnswer(parseInt(index), 'No')} className="no-button">No</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleNextQuestion} className="next-button">Next</button>
      
    </div>
  );
};

export default App;
