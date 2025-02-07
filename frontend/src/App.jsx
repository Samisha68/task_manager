import React from 'react';
import { TaskManager } from '../components/TaskManager';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#30475e] flex justify-center items-center py-8">
      <div className="w-full max-w-5xl p-6 bg-[#1f2630] rounded-3xl shadow-2xl transition-all hover:shadow-3xl">
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
