import React, { useEffect, useState } from 'react';

const Question = ({ question, onAnswer }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const shuffledAnswers = [...question.incorrect_answers, question.correct_answer];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
  }, [question]);

  const handleAnswer = (answer) => {
    onAnswer(answer === question.correct_answer);
  };

  return (
    <div>
      <h2 className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="flex flex-col space-y-2">
        {answers.map((answer) => (
          <button 
            key={answer} 
            onClick={() => handleAnswer(answer)} 
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-800 transition duration-200" 
            dangerouslySetInnerHTML={{ __html: answer }} 
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
