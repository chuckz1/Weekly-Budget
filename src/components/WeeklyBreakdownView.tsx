import React from "react";
import { idbService } from "../services/IDBService";
import { formatCentsAsDollars } from "../utils/currency";
import { getWeekStart, getWeekEnd } from "../utils/date";
import { Transaction } from "../services/IDBService";

const WeeklyBreakdownView: React.FC = () => {
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const [weekStart, weekEnd] = React.useMemo(() => {
		const now = new Date();
		return [getWeekStart(now), getWeekEnd(now)];
	}, []);

	React.useEffect(() => {
		const loadData = async () => {
			const data = await idbService.getTransactionsByDateRange(
				weekStart,
				weekEnd
			);
			setTransactions(data);
		};
		loadData();
	}, [weekStart, weekEnd]);

	const total = transactions.reduce((sum, t) => sum + t.amount, 0);

	return (
		<div className="weekly-breakdown">
			<h2>Weekly Breakdown</h2>
			<p>
				{weekStart.toDateString()} - {weekEnd.toDateString()}
			</p>
			<div className="total">
				<span>Total:</span>
				<span>{formatCentsAsDollars(total)}</span>
			</div>
			{/* TODO: Add category breakdown visualization */}
		</div>
	);
};

export default WeeklyBreakdownView;
