// Quiz.jsx
import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import { fetchQuestions } from '../api';

const Quiz = ({ onLogout }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const savedState = JSON.parse(localStorage.getItem('quizState'));
        if (savedState && savedState.questions.length > 0) {
          setQuestions(savedState.questions);
          setCurrentQuestionIndex(savedState.currentQuestionIndex);
          setScore(savedState.score);
          setTimeLeft(savedState.timeLeft);
          setIsFinished(savedState.isFinished);
          setAnsweredQuestions(savedState.answeredQuestions || 0);
        } else {
          const data = await fetchQuestions();
          setQuestions(data);
        }
      } catch (error) {
        console.error('Error loading quiz state:', error);
        const data = await fetchQuestions();
        setQuestions(data);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const state = {
        questions,
        currentQuestionIndex,
        score,
        timeLeft,
        isFinished,
        answeredQuestions,
      };
      localStorage.setItem('quizState', JSON.stringify(state));
    }
  }, [questions, currentQuestionIndex, score, timeLeft, isFinished, answeredQuestions]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnsweredQuestions(answeredQuestions + 1);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsFinished(true);
    }
  };

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `Waktu tersisa: ${minutes} menit ${seconds} detik`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isFinished) {
    return <Result score={score} totalQuestions={questions.length} answeredQuestions={answeredQuestions} />;
  }

  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="bg-[url('/public/vbg.jpg')] min-h-screen flex flex-col">
      <header className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-center flex-grow">
            <span>Soal yang sudah dikerjakan: {answeredQuestions} soal</span>
          </div>
          <div className="text-center flex-grow">
            <span>Soal {currentQuestionIndex + 1} dari {questions.length}</span>
          </div>
          <div className="text-center flex-grow">
            <span>{formatTimeLeft(timeLeft)}</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Soal {currentQuestionIndex + 1}</h2>
          </div>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </div>
      </main>
    </div>
  );
};

export default Quiz;
