import React, { useState, useEffect } from "react";
import { idbService } from "../services/IDBService";
import { categoryService, Category } from "../services/CategoryService";

interface TransactionInputProps {
	onTransactionAdded?: () => void;
}

/**
 * TransactionInput component for adding new budget transactions
 *
 * @param {TransactionInputProps} props - Component props
 * @returns JSX.Element
 */
const TransactionInput = ({ onTransactionAdded }: TransactionInputProps) => {
	const [amount, setAmount] = useState("");
	const [notes, setNotes] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [transactionDate, setTransactionDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const validateAmount = (value: string): boolean => {
		const num = parseFloat(value);
		return !isNaN(num) && num > 0;
	};

	useEffect(() => {
		setCategories(categoryService.getCategories());
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			if (!validateAmount(amount)) {
				setError("Please enter a valid positive amount");
				return;
			}

			const transactionData = {
				amount: parseFloat(amount),
				timestamp: new Date(transactionDate),
				categoryId: parseInt(categoryId),
				notes: notes.trim() || undefined,
			};

			await idbService.addTransaction(transactionData);

			// Reset form
			setAmount("");
			setNotes("");
			setCategoryId("");

			// Notify parent if needed
			if (onTransactionAdded) {
				onTransactionAdded();
			}
		} catch (err) {
			setError("Failed to save transaction. Please try again.");
			console.error("Transaction save error:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="transaction-form">
			{error && <div className="error-message">{error}</div>}

			<div className="form-group">
				<label htmlFor="amount">Amount</label>
				<input
					id="amount"
					type="number"
					step="0.01"
					min="0.01"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					disabled={isSubmitting}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="notes">Notes (Optional)</label>
				<input
					id="notes"
					type="text"
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					disabled={isSubmitting}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="date">Date</label>
				<input
					id="date"
					type="date"
					value={transactionDate}
					onChange={(e) => setTransactionDate(e.target.value)}
					required
					disabled={isSubmitting}
					max={new Date().toISOString().split("T")[0]}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="category">Category</label>
				<select
					id="category"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
					required
					disabled={isSubmitting}
				>
					<option value="">Select a category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Saving..." : "Add Transaction"}
			</button>
		</form>
	);
};

export default TransactionInput;
