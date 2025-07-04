# System Patterns: Weekly Budget Tracker

## Architecture Overview

- **Frontend**: React with TypeScript (Vite)
- **State Management**: React Context + Custom Hooks
- **Data Layer**: IndexedDB wrapper service
- **UI Components**: Functional components with composition

## Key Patterns

1. **Data Storage**:

   - IndexedDB for persistent storage
   - Service layer abstraction (IDBService)
   - Transaction-based operations

2. **State Management**:

   - Context API for global state
   - Custom hooks for business logic
   - Optimistic UI updates

3. **Component Structure**:
   - Container components for data handling
   - Presentational components for UI
   - Compound components for complex UIs
   - Native HTML elements preferred over UI libraries
   - Custom CSS for styling

## Data Flow

1. User interaction triggers action
2. Service layer updates IndexedDB
3. State updates through context
4. UI re-renders with new data

## Code Documentation

- **Commenting Patterns**:
  - File headers with module purpose
  - JSDoc for all public functions
  - Inline comments for complex logic
  - Consistent TODO/FIXME notation
  - Explanation of non-obvious decisions

## Date Handling

- Week starts on Sunday and ends on Saturday
- All date calculations should follow this convention
