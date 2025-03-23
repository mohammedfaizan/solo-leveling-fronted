import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import fetchQuestAPI from "./api/fetchQuests";
import updateQuestAPI from "./api/updateQuest";

export default function QuestHeatmap({ refresh }) {
  const [savedQuests, setSavedQuests] = useState([]);

  useEffect(() => {
    fetchQuestAPI(handleResponse, handleError);
  }, [refresh]);

  useEffect(() => {
    console.log("Updated Quests:", savedQuests);
  }, [savedQuests]);

  function handleResponse(responseData) {
    setSavedQuests([...responseData.quests]);
    console.log("handled successfully");
    console.log("saved Quests", responseData.quests);
  }

  function handleError(errorMessage) {
    alert(errorMessage);
    console.log(errorMessage);
  }

  const handleComplete = (quest) => {
    const today = new Date().toLocaleDateString("en-CA");

    // Optimistically update UI before API call
    setSavedQuests((prevQuests) =>
      prevQuests.map((q) =>
        q._id === quest._id
          ? { ...q, completedDays: { ...q.completedDays, [today]: 1 } }
          : q
      )
    );

    const updatedQuest = {
      name: quest.name,
      completedDays: { ...quest.completedDays, [today]: 1 },
    };

    updateQuestAPI(
      updatedQuest,
      quest._id,
      (responseData) => {
        console.log("Update successful:", responseData);
        setTimeout(() => fetchQuestAPI(handleResponse, handleError), 500);
      },
      (errorMessage) => {
        console.error("Update failed:", errorMessage);
      }
    );
  };

  if (savedQuests.length === 0) {
    return <div className="text-white">No quests available.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {savedQuests.map((quest) => {
        const startDate = new Date(quest.createdAt);
        startDate.setHours(0, 0, 0, 0); // Reset to midnight local time
        const formattedStartDate = startDate.toISOString().split("T")[0]; // Now it correctly reflects local time
        const endDate = new Date();
        endDate.setFullYear(new Date().getFullYear() + 1);
        const formattedEndDate = endDate.toISOString().split("T")[0];
        const values = Object.entries(quest.completedDays || {}).map(
          ([date, count]) => ({ date, count })
        );

        return (
          <div key={quest.createdAt} className="mb-12 w-full">
            <h2 className="text-white text-lg text-center mb-2">
              {quest.name}
            </h2>
            <div className="overflow-x-auto flex justify-center w-full">
              <CalendarHeatmap
                startDate={formattedStartDate}
                endDate={formattedEndDate}
                // Up to today
                values={values}
                classForValue={(value) =>
                  value?.count ? "color-filled" : "color-empty"
                }
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => handleComplete(quest)}
                className="mt-4 w-half bg-blue-700 p-3 text-white shadow-[0_0_10px_rgba(0,122,255,0.6)] transition-all hover:shadow-[0_0_20px_rgba(0,122,255,1)]"
              >
                Mark Today as Completed ✅
              </button>
            </div>
          </div>
        );
      })}

      <style>
        {`
          .react-calendar-heatmap {
            transform-origin: center;
          }
          .react-calendar-heatmap .color-empty {
            fill: #001f3f;
          }
          .react-calendar-heatmap .color-filled {
            fill: #00AAFF;
          }
        `}
      </style>
    </div>
  );
}
