import React, { useState } from "react";
import createQuestAPI from "./api/CreateQuest";
import fetchQuestAPI from "./api/fetchQuests";

export default function QuestForm({ onClose, triggerRefresh }) {
  const [questName, setQuestName] = useState("");

  const [loading, setLoading] = useState(false);

  const addQuest = (e) => {
    e.preventDefault();

    const newQuest = {
      name: questName,
      completedDays: {},
    };

    createQuestAPI(newQuest, handleResponse, handleError, setLoading);
    fetchQuestAPI(handleResponse, handleError);
    onClose();
  };

  const handleError = function (errorMessage) {
    alert(errorMessage);
    console.log(errorMessage);
  };

  const handleResponse = function (responseData) {
    if (responseData.success) {
      console.log("handled successfully");
      console.log(responseData);
      triggerRefresh();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-blue-500/10 p-6 shadow-lg backdrop-blur-md border border-white/30 scale-95 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl hover:text-red-500 transition-all"
        >
          ✕
        </button>
        <h1 className="mb-4 text-center text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          Add a New Daily Quest!
        </h1>
        <form onSubmit={addQuest} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Quest Name"
            value={questName}
            onChange={(e) => setQuestName(e.target.value)}
            className="w-full border-none bg-blue-700/30 p-3 text-white placeholder-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-700 p-3 text-white shadow-[0_0_10px_rgba(0,122,255,0.6)] transition-all hover:shadow-[0_0_20px_rgba(0,122,255,1)]"
          >
            {loading ? "Adding..." : "Add Quest"}
          </button>
        </form>
      </div>
    </div>
  );
}
