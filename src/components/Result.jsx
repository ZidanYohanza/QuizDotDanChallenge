import React, { useEffect } from 'react';

const Result = ({ score, totalQuestions, answeredQuestions }) => {
  useEffect(() => {
    localStorage.removeItem('quizState');
  }, []);

  const isGoodScore = score >= 8;
  const resultMessage = isGoodScore
    ? 'Selamat! Hasil kamu sangat bagus!'
    : 'Coba lagi! Kamu pasti bisa lebih baik!';

  const gifUrl = isGoodScore
    ? 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif'  // happy gif
    : 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif'; // sad gif

  return (
    <div className="bg-[url('/public/vbg.jpg')] bg-cover min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Quiz Selesai</h2>
        <p className="text-2xl mb-4">{resultMessage}</p>
        <img src={gifUrl} alt="Result gif" className="h-60 mb-4 mx-auto rounded-md" />
        <div className="text-xl mb-4">
          <p>Jumlah benar: {score}</p>
          <p>Jumlah salah: {totalQuestions - score}</p>
          <p>Jumlah jawab: {answeredQuestions}</p>
        </div>
        <button
          className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition duration-200"
          onClick={() => window.location.reload()}
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
};

export default Result;
