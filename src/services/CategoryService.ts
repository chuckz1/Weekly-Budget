export interface Category {
	id: number;
	name: string;
	color: string;
}

const STORAGE_KEY = "budgetCategories";
const DEFAULT_CATEGORIES: Category[] = [
	{ id: 1, name: "Food", color: "#3b82f6" },
	{ id: 2, name: "Housing", color: "#ef4444" },
	{ id: 3, name: "Transport", color: "#10b981" },
	{ id: 4, name: "Utilities", color: "#f59e0b" },
	{ id: 5, name: "Entertainment", color: "#8b5cf6" },
	{ id: 6, name: "Healthcare", color: "#ec4899" },
	{ id: 7, name: "Savings", color: "#14b8a6" },
	{ id: 8, name: "Other", color: "#64748b" },
];

class CategoryService {
	private categories: Category[] = [];

	constructor() {
		this.loadCategories();
	}

	private loadCategories(): void {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			this.categories = JSON.parse(stored);
		} else {
			this.categories = [...DEFAULT_CATEGORIES];
			this.saveCategories();
		}
	}

	private saveCategories(): void {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories));
	}

	getCategories(): Category[] {
		return [...this.categories];
	}

	addCategory(name: string, color: string): Category {
		const newId = Math.max(0, ...this.categories.map((c) => c.id)) + 1;
		const newCategory = { id: newId, name, color };
		this.categories.push(newCategory);
		this.saveCategories();
		return newCategory;
	}

	updateCategory(
		id: number,
		updates: Partial<Omit<Category, "id">>
	): Category | null {
		const index = this.categories.findIndex((c) => c.id === id);
		if (index === -1) return null;

		const updated = { ...this.categories[index], ...updates };
		this.categories[index] = updated;
		this.saveCategories();
		return updated;
	}

	deleteCategory(id: number): boolean {
		const initialLength = this.categories.length;
		this.categories = this.categories.filter((c) => c.id !== id);
		if (this.categories.length !== initialLength) {
			this.saveCategories();
			return true;
		}
		return false;
	}
}

export const categoryService = new CategoryService();
