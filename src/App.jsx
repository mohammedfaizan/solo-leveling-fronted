import React, { useState } from "react";
import QuestForm from "./components/QuestForm.jsx";
import QuestHeatmap from "./components/QuestHeatmap.jsx";

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 via-black to-blue-900 p-6">
      <h1 className="text-white text-3xl font-extrabold mb-8 drop-shadow-lg">
        One Day at a Time
      </h1>

      <div className="w-full flex flex-col items-center space-y-6">
        {/* Removed restrictive border & padding */}
        <div className="w-full flex justify-center">
          <QuestHeatmap />
        </div>

        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-700 px-6 py-3 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 
              hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(0,122,255,0.8)]"
          >
            + Add a New Quest
          </button>
        )}

        {isFormVisible && <QuestForm onClose={() => setIsFormVisible(false)} />}
      </div>
    </div>
  );
}
