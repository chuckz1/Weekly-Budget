import React from "react";
import { idbService } from "../services/IDBService";
import { categoryService, Category } from "../services/CategoryService";
import { formatCentsAsDollars } from "../utils/currency";
import { Transaction } from "../services/IDBService";

interface MonthlyBreakdownViewProps {
	startDate: Date;
	endDate: Date;
}

const MonthlyBreakdownView: React.FC<MonthlyBreakdownViewProps> = ({
	startDate,
	endDate,
}) => {
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const [categories] = React.useState<Category[]>(
		categoryService.getCategories()
	);
	const [monthStart, monthEnd] = React.useMemo(() => {
		return [startDate, endDate];
	}, [startDate, endDate]);

	React.useEffect(() => {
		const loadData = async () => {
			const data = await idbService.getTransactionsByDateRange(
				monthStart,
				monthEnd
			);
			setTransactions(data);
		};
		loadData();
	}, [monthStart, monthEnd]);

	const total = transactions.reduce((sum, t) => sum + t.amount, 0);

	return (
		<div className="monthly-breakdown">
			<h2>Monthly Breakdown</h2>
			<p>
				{monthStart.toDateString()} - {monthEnd.toDateString()}
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

export default MonthlyBreakdownView;
