const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCALE = "en-US";

class MoneyService {
	private currency: string;
	private locale: string;

	constructor(
		currency: string = DEFAULT_CURRENCY,
		locale: string = DEFAULT_LOCALE
	) {
		this.currency = currency;
		this.locale = locale;
	}

	format(amount: number): string {
		return new Intl.NumberFormat(this.locale, {
			style: "currency",
			currency: this.currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	}

	parse(formattedValue: string): number {
		const numericValue = formattedValue.replace(/[^0-9.-]+/g, "");
		return parseFloat(numericValue);
	}

	calculateTotal(transactions: { amount: number }[]): number {
		return transactions.reduce((sum, t) => sum + t.amount, 0);
	}

	calculateBalance(income: number, expenses: number): number {
		return income - expenses;
	}

	calculatePercentage(value: number, total: number): number {
		if (total === 0) return 0;
		return (value / total) * 100;
	}

	roundToDecimal(value: number, decimals: number = 2): number {
		const factor = Math.pow(10, decimals);
		return Math.round(value * factor) / factor;
	}
}

export const moneyService = new MoneyService();
