# Technical Context: Weekly Budget Tracker

## Core Services

For detailed service layer implementation, see [PROJECT_SPEC.md](./../PROJECT_SPEC.md).

1. **IDBService**:

   - Handles all IndexedDB operations
   - Provides CRUD methods for transactions
   - Manages database versioning

2. **CategoryService**:

   - Manages budget categories
   - Handles category CRUD operations
   - Provides category statistics

3. **MoneyService**:
   - Handles currency formatting
   - Provides math operations for monetary values
   - Manages exchange rates (future)

## Utility Modules

1. **currency.ts**:

   - Formatting functions
   - Currency conversion helpers
   - Validation utilities

2. **date.ts**:
   - Date formatting
   - Week/month calculations
   - Date range utilities

## Key Dependencies

- React 18+
- TypeScript 5+
- Vite 4+
- date-fns (date utilities)

## Development Guidelines

- **Avoid 3rd party UI libraries** - Prefer native HTML elements and custom CSS
- **Minimal dependencies** - Only add essential libraries after evaluation
- **Lightweight components** - Keep components focused and simple

## Coding Standards

- **Comments are required** in all code documents:
  - File headers with purpose and author
  - Function/method documentation
  - Complex logic explanations
  - TODO/FIXME notes for future work
