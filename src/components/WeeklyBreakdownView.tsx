import React from "react";
import { idbService } from "../services/IDBService";
import { categoryService, Category } from "../services/CategoryService";
import { formatCentsAsDollars } from "../utils/currency";
import { Transaction } from "../services/IDBService";

interface WeeklyBreakdownViewProps {
	startDate: Date;
	endDate: Date;
}

const WeeklyBreakdownView: React.FC<WeeklyBreakdownViewProps> = ({
	startDate,
	endDate,
}) => {
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const [categories] = React.useState<Category[]>(
		categoryService.getCategories()
	);
	const [weekStart, weekEnd] = React.useMemo(() => {
		return [startDate, endDate];
	}, [startDate, endDate]);

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
			<div className="category-breakdown">
				<h3>By Category</h3>
				{transactions
					.reduce((acc, t) => {
						const existing = acc.find((c) => c.categoryId === t.categoryId);
						if (existing) {
							existing.amount += t.amount;
						} else {
							acc.push({ categoryId: t.categoryId, amount: t.amount });
						}
						return acc;
					}, [] as { categoryId: number; amount: number }[])
					.map((category) => (
						<div key={category.categoryId} className="category-row">
							<span
								style={{
									color: categories.find((c) => c.id === category.categoryId)
										?.color,
								}}
							>
								{categories.find((c) => c.id === category.categoryId)?.name ||
									`Category ${category.categoryId}`}
							</span>
							<span>{formatCentsAsDollars(category.amount)}</span>
							<span>{Math.round((category.amount / total) * 100)}%</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default WeeklyBreakdownView;
