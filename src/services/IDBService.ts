export interface Transaction {
	id?: number;
	amount: number;
	timestamp: Date;
	categoryId: number;
	notes?: string;
}

class IDBService {
	private dbName = "BudgetTrackerDB";
	private dbVersion = 1;
	private storeName = "transactions";
	private db: IDBDatabase | null = null;

	async initialize(): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, this.dbVersion);

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					const store = db.createObjectStore(this.storeName, {
						keyPath: "id",
						autoIncrement: true,
					});
					store.createIndex("timestamp", "timestamp", { unique: false });
					store.createIndex("categoryId", "categoryId", { unique: false });
				}
			};

			request.onsuccess = (event) => {
				this.db = (event.target as IDBOpenDBRequest).result;
				resolve();
			};

			request.onerror = (event) => {
				reject((event.target as IDBOpenDBRequest).error);
			};
		});
	}

	async addTransaction(transaction: Omit<Transaction, "id">): Promise<number> {
		if (!this.db) await this.initialize();
		return new Promise((resolve, reject) => {
			const tx = this.db!.transaction(this.storeName, "readwrite");
			const store = tx.objectStore(this.storeName);
			const request = store.add(transaction);

			request.onsuccess = () => resolve(request.result as number);
			request.onerror = () => reject(request.error);
		});
	}

	async getTransactions(): Promise<Transaction[]> {
		if (!this.db) await this.initialize();
		return new Promise((resolve, reject) => {
			const tx = this.db!.transaction(this.storeName, "readonly");
			const store = tx.objectStore(this.storeName);
			const request = store.getAll();

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getTransactionsByDateRange(
		start: Date,
		end: Date
	): Promise<Transaction[]> {
		if (!this.db) await this.initialize();
		return new Promise((resolve, reject) => {
			const tx = this.db!.transaction(this.storeName, "readonly");
			const store = tx.objectStore(this.storeName);
			const index = store.index("timestamp");
			const range = IDBKeyRange.bound(start, end);
			const request = index.getAll(range);

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async deleteTransaction(id: number): Promise<void> {
		if (!this.db) await this.initialize();
		return new Promise((resolve, reject) => {
			const tx = this.db!.transaction(this.storeName, "readwrite");
			const store = tx.objectStore(this.storeName);
			const request = store.delete(id);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}
}

export const idbService = new IDBService();
