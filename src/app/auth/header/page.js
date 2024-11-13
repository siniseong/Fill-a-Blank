'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './signin.css';

export default function Header() {
  const [session, setSession] = useState(null);

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

  const handleKakaoSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) {
      console.error('Kakao Sign In Error:', error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">로고</h1>
        {session ? (
          <button 
            onClick={handleLogout} 
            className="small-button" 
          >
            로그아웃
          </button>
        ) : (
          <button 
            onClick={handleKakaoSignIn} 
            className="small-button" 
          >
            로그인
          </button>
        )}
      </header>
    </div>
  );
}