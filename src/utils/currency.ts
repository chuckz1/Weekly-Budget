import { moneyService } from "../services/MoneyService";

export function centsToDollars(cents: number): number {
	return cents / 100;
}

export function dollarsToCents(dollars: number): number {
	return Math.round(dollars * 100);
}

export function formatCentsAsDollars(cents: number): string {
	return moneyService.format(centsToDollars(cents));
}

export function parseDollarsToCents(formatted: string): number {
	return dollarsToCents(moneyService.parse(formatted));
}
