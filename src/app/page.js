'use client';

import Header from './components/header/page'; // 헤더 컴포넌트 임포트

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* 헤더를 항상 렌더링 */}
      <div className="flex items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold">Hello World</h1> {/* Hello World 표시 */}
      </div>
    </div>
  );
}