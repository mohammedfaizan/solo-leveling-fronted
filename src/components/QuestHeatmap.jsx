import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import fetchQuestAPI from "./api/fetchQuests";

export default function QuestHeatmap() {
  const [savedQuests, setSavedQuests] = useState(
    JSON.parse(localStorage.getItem("quests")) || []
  );

  function handleResponse(responseData) {
    console.log(responseData);
    console.log("response");
  }

  function handleError(errorMessage) {
    alert(errorMessage);
    console.log(errorMessage);
  }

  const fetchAllQuests = function () {
    fetchQuestAPI(handleResponse, handleError);
  };
  useEffect(() => {
    localStorage.setItem("quests", JSON.stringify(savedQuests));
    fetchAllQuests();
  }, [savedQuests]);

  if (savedQuests.length === 0) {
    return <div className="text-white">No quests available.</div>;
  }

  const handleComplete = (questId) => {
    const today = new Date().toLocaleDateString("en-CA");

    setSavedQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              completedDays: { ...(quest.completedDays || {}), [today]: 1 },
            }
          : quest
      )
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {savedQuests.map((quest) => {
        const startDate = new Date(Number(quest.id))
          .toISOString()
          .split("T")[0];
        const endDate = new Date();
        endDate.setFullYear(new Date().getFullYear() + 1);
        const formattedEndDate = endDate.toISOString().split("T")[0];
        const values = Object.entries(quest.completedDays || {}).map(
          ([date, count]) => ({ date, count })
        );
        console.log(values);

        return (
          <div key={quest.id} className="mb-12 w-full">
            <h2 className="text-white text-lg text-center mb-2">
              {quest.name}
            </h2>
            <div className="overflow-x-auto flex justify-center w-full">
              <CalendarHeatmap
                startDate={startDate}
                endDate={formattedEndDate}
                // Up to today
                values={values}
                classForValue={(value) =>
                  value ? "color-filled" : "color-empty"
                }
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => handleComplete(quest.id)}
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
