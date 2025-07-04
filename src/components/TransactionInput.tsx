import React, { useState } from "react";

/**
 * TransactionInput component for adding new budget transactions
 *
 * @returns JSX.Element
 */
const TransactionInput = () => {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: Connect to transaction service
		console.log({ amount, description, category });
		setAmount("");
		setDescription("");
		setCategory("");
	};

	return (
		<form onSubmit={handleSubmit} className="transaction-form">
			<div className="form-group">
				<label htmlFor="amount">Amount</label>
				<input
					id="amount"
					type="number"
					value={amount}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setAmount(e.target.value)
					}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="description">Description</label>
				<input
					id="description"
					type="text"
					value={description}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setDescription(e.target.value)
					}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="category">Category</label>
				<input
					id="category"
					type="text"
					value={category}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCategory(e.target.value)
					}
					required
				/>
			</div>
			<button type="submit">Add Transaction</button>
		</form>
	);
};

export default TransactionInput;
