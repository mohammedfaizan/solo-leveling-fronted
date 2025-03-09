import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function QuestHeatmap() {
  const savedQuests = JSON.parse(localStorage.getItem("quests")) || [];

  if (savedQuests.length === 0) {
    return <div className="text-white">No quests available.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {savedQuests.map((quest) => {
        const values = Object.entries(quest.completedDays).map(
          ([date, count]) => ({ date, count })
        );

        return (
          <div key={quest.id} className="mb-6 w-full">
            <h2 className="text-white text-lg text-center mb-2">
              {quest.name}
            </h2>
            <div className="overflow-x-auto flex justify-center w-full">
              <CalendarHeatmap
                startDate={new Date().toISOString().split("T")[0]}
                endDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                    .toISOString()
                    .split("T")[0]
                }
                values={values}
                classForValue={(value) =>
                  value ? "color-filled" : "color-empty"
                }
              />
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
            fill: black;
          }
          .react-calendar-heatmap .color-filled {
            fill: #00AAFF;
          }
        `}
      </style>
    </div>
  );
}
