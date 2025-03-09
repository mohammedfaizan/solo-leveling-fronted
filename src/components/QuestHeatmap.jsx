import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";

export default function QuestHeatmap() {
  const savedQuests = JSON.parse(localStorage.getItem("quests")) || {};
  console.log(savedQuests.firstQuestDate);
  return <div>Hello</div>;
}
