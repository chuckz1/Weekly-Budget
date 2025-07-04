import React, { useState } from "react";
import WeeklyBreakdownView from "./WeeklyBreakdownView";
import MonthlyBreakdownView from "./MonthlyBreakdownView";
import {
	getWeekStart,
	getWeekEnd,
	getMonthStart,
	getMonthEnd,
} from "../utils/date";

const BreakdownContainer: React.FC = () => {
	const [activeView, setActiveView] = useState<"weekly" | "monthly">("weekly");
	const [currentDate, setCurrentDate] = useState(new Date());

	const handleViewChange = (view: "weekly" | "monthly") => {
		setActiveView(view);
	};

	const handleDateChange = (direction: "prev" | "next") => {
		const newDate = new Date(currentDate);
		if (activeView === "weekly") {
			direction === "prev"
				? newDate.setDate(newDate.getDate() - 7)
				: newDate.setDate(newDate.getDate() + 7);
		} else {
			direction === "prev"
				? newDate.setMonth(newDate.getMonth() - 1)
				: newDate.setMonth(newDate.getMonth() + 1);
		}
		setCurrentDate(newDate);
	};

	return (
		<div className="breakdown-container">
			<div className="view-controls">
				<button
					onClick={() => handleViewChange("weekly")}
					className={activeView === "weekly" ? "active" : ""}
				>
					Weekly
				</button>
				<button
					onClick={() => handleViewChange("monthly")}
					className={activeView === "monthly" ? "active" : ""}
				>
					Monthly
				</button>
			</div>

			<div className="date-navigation">
				<button onClick={() => handleDateChange("prev")}>{"< Previous"}</button>
				<span>
					{activeView === "weekly"
						? `${getWeekStart(currentDate).toDateString()} - ${getWeekEnd(
								currentDate
						  ).toDateString()}`
						: `${getMonthStart(currentDate).toLocaleDateString("default", {
								month: "long",
								year: "numeric",
						  })}`}
				</span>
				<button onClick={() => handleDateChange("next")}>{"Next >"}</button>
			</div>

			{activeView === "weekly" ? (
				<WeeklyBreakdownView
					key={currentDate.toString()}
					startDate={getWeekStart(currentDate)}
					endDate={getWeekEnd(currentDate)}
				/>
			) : (
				<MonthlyBreakdownView
					key={currentDate.toString()}
					startDate={getMonthStart(currentDate)}
					endDate={getMonthEnd(currentDate)}
				/>
			)}
		</div>
	);
};

export default BreakdownContainer;
