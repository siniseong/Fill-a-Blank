'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './game.css';
import proverbsData from './proverbs.json'; 

export default function Game() {
  const [userAnswer, setUserAnswer] = useState('');
  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [isCorrect, setIsCorrect] = useState(false); 
  const [session, setSession] = useState(null); 
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false); 

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      if (subscription?.subscription) {
        subscription.subscription.unsubscribe();
      } else if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session) {
      setIsLoginPopupVisible(true); 
      return;
    }

    const currentProverb = proverbsData[currentProverbIndex]; 
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
    setCurrentProverbIndex((prevIndex) => (prevIndex + 1) % proverbsData.length); 
  };

  const closePopup = () => {
    setIsPopupVisible(false); 
  };

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false); 
  };

  return (
    <div className="game-container">
      <h1 className="title">속담 빈칸 맞추기 게임</h1>
      <p className="proverb">{proverbsData[currentProverbIndex].proverb}</p>
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
                <p>축하합니다. 다음 문제로 넘어가도 되겠는걸요?</p>
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
                  <button onClick={handleNext} className="close-button">
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
      {isLoginPopupVisible && ( 
        <div className="popup-overlay">
          <div className="popup-content">
            <p className="popup-title">로그인하세요!</p>
            <p>문제를 풀기 위해서는 로그인이 필요합니다.</p>
            <div className="popup-buttons">
              <button onClick={closeLoginPopup} className="check-button">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={handleNext} className="next-button">
        다음 문제
      </button>
    </div>
  );
}