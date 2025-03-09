import React, { useState } from "react";
import QuestForm from "./components/QuestForm.jsx";
import QuestHeatmap from "./components/QuestHeatmap.jsx";

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 via-black to-blue-900">
      <h1 className="text-white text-2xl font-bold mb-6">One day at a time</h1>

      <QuestHeatmap />
      <div>
        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-700 p-4 text-lg text-white shadow-[0_0_10px_rgba(0,122,255,0.6)] transition-all hover:shadow-[0_0_20px_rgba(0,122,255,1)]"
          >
            Add a new Quest
          </button>
        )}
        {isFormVisible && <QuestForm onClose={() => setIsFormVisible(false)} />}
      </div>
    </div>
  );
}
