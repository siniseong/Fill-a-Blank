'use client';

import Header from './components/header/page'; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> 
      <div className="flex items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold">Hello World</h1> 
      </div>
    </div>
  );
}