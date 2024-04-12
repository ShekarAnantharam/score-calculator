import React, { useState, useEffect } from 'react';
import questions from './questions';
import { calculateScore, calculateAverage } from './utils';

import './styles.css';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [answers, setAnswers] = useState<string[][]>(Array.from({ length: Object.keys(questions).length }, () => []));

  const [score, setScore] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [allScores, setAllScores] = useState<number[]>([]);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers') || '[]');
    setAnswers(storedAnswers);
  }, []);

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex - 1] = [
      ...updatedAnswers[currentQuestionIndex - 1] || [],
      answer
    ];
    const newScore = calculateScore(updatedAnswers.flat());
    setAnswers(updatedAnswers);
    setScore(newScore);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
  };
  
  

  useEffect(() => {
    const avgScore = calculateAverage(allScores);
    setAverageScore(avgScore);
  }, [allScores]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < Object.keys(questions).length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(1);
      const newAllScores = [...allScores, score || 0];
      setAllScores(newAllScores);
      const newAnswers: string[][] = [...answers, []];
      setAnswers(newAnswers);
      const avgAllScores = calculateAverage(newAllScores);
      setAverageScore(avgAllScores);
      setScore(null);
      localStorage.removeItem('answers');
    }
  };
  
  

  return (
    <div className="container">
    <h1>Question {currentQuestionIndex}</h1>
    <p className="question">{questions[currentQuestionIndex]}</p>
    {score !== null && <p className="score">Your score: {score}%</p>}
    {averageScore !== null && <p className="score">Average score for all runs: {averageScore}%</p>}
    <div className="buttons">
      <button onClick={() => handleAnswer('Yes')}>Yes</button>
      <button onClick={() => handleAnswer('No')}>No</button>
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  </div>
  
  );
};

export default App;
