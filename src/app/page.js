'use client';

import Header from './components/header/page'; 
import Game from './components/game/page'; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> 
      <Game />
    </div>
  );
}