# Weekly Budget Tracker - Technical Specification

## Data Model

### Categories

```typescript
interface Category {
	id: number; // Incremental ID
	name: string;
	color: string; // Hex format (e.g. '#3b82f6')
}
```

- Stored in localStorage
- Initial default categories will be created if none exist
- Color stored as hex string but typed as React.CSSProperties['color']

### Transactions

```typescript
interface Transaction {
	id?: number;
	amount: number; // Stored as integer cents (e.g. $10.99 = 1099)
	timestamp: Date;
	categoryId: number; // References Category.id
	notes?: string;
}
```

- Stored in IndexedDB
- All amounts handled as cents to avoid floating point errors
- Sorted by timestamp (newest first by default)

## Storage Architecture

### IndexedDB

- Raw API (no Dexie.js)
- Database schema:
  - Transactions table with auto-incrementing IDs
  - Indexes on timestamp and categoryId

### localStorage

- Used only for categories
- Initial default categories:
  1. Food
  2. Housing
  3. Transport
  4. Utilities
  5. Entertainment
  6. Healthcare
  7. Savings
  8. Other

## Service Layer

### Core Services

1. `IDBService.ts` - Handles all IndexedDB operations
2. `CategoryService.ts` - Manages category CRUD in localStorage
3. `MoneyService.ts` - Handles currency formatting/parsing

### Utilities

1. `currency.ts` - Converts between cents/dollars
2. `date.ts` - Date formatting helpers
3. `idGenerator.ts` - Simple incremental ID generator

## UI Architecture

### Component Structure

- Small, single-responsibility components
- Container components handle business logic
- Presentational components are pure

### Key Components

1. `CategoryManager` - Add/remove categories
2. `TransactionForm` - Amount, date, category select, notes
3. `TransactionList` - Displays transactions with sorting
4. `PeriodSummary` - Shows sum for selected period

## Important Considerations

- All monetary calculations use integer cents
- Input validation enforces 2 decimal places
- Category colors use hex format for consistency
- No external dependencies for IndexedDB operations
- Modular design for easy maintenance
