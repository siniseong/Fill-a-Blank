'use client';

import { useState } from 'react';
import './game.css';

const proverbs = [
  {
    proverb: "호랑이 굴에 가야 ____을 한다.",
    answer: "선생님"
  },
  {
    proverb: "가는 말이 고와야 ____이 곱다.",
    answer: "오는 말"
  }
];

export default function Game() {
  const [userAnswer, setUserAnswer] = useState('');
  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [isCorrect, setIsCorrect] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentProverb = proverbs[currentProverbIndex];
    if (userAnswer === currentProverb.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsPopupVisible(true);
  };

  const handleNext = () => {
    setUserAnswer('');
    setIsPopupVisible(false); 
    setCurrentProverbIndex((prevIndex) => (prevIndex + 1) % proverbs.length);
  };

  const closePopup = () => {
    setIsPopupVisible(false); 
  };

  return (
    <div className="game-container">
      <h1 className="title">속담 빈칸 맞추기 게임</h1>
      <p className="proverb">{proverbs[currentProverbIndex].proverb}</p>
      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="answer-input"
          placeholder="답을 입력하세요"
        />
        <button type="submit" className="submit-button">
          제출
        </button>
      </form>
      {isPopupVisible && ( 
        <div className="popup-overlay">
          <div className="popup-content">
            {isCorrect ? (
              <>
                <p className="popup-title">대박! 문제를 맞췄어요.</p> 
                <p>축하합니다🎉 다음 문제로 넘어가도 되겠는걸요?</p>
                <div className="popup-buttons">
                  <button onClick={handleNext} className="pop-next-button">
                    다음
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="popup-title">아쉽게도 문제를 틀렸어요.</p> 
                <p>다시 문제를 풀면 동일한 점수의 포인트를 받을 수 있어요.</p>
                <div className="popup-buttons">
                  <button onClick={closePopup} className="close-button">
                    넘어가기
                  </button>
                  <button onClick={closePopup} className="close-button2">
                    다시풀기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <button onClick={handleNext} className="next-button">
        다음 문제
      </button>
    </div>
  );
}