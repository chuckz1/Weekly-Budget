import React from "react";
import "./App.css";
import WeeklyBreakdownView from "./components/WeeklyBreakdownView";
import MonthlyBreakdownView from "./components/MonthlyBreakdownView";

function App() {
	return (
		<div className="app">
			<h1>Weekly Budget</h1>
			<div className="breakdown-container">
				<WeeklyBreakdownView />
				<MonthlyBreakdownView />
			</div>
		</div>
	);
}

export default App;
