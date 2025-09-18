# Task: Retrofit Unit Tests

**Task ID:** 001
**Description:** Add unit tests to the Next.js application using Jest and React Testing Library.
**Dependencies:** None
**Status:** To Do

---

## Plan

### 1. Setup Testing Environment

*   **Description:** Install and configure Jest, React Testing Library, and necessary dependencies.
*   **Status:** To Do
*   **Commands:**
    ```bash
    npm install --prefix web -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest
    ```
*   **File Creation:**
    *   Create `web/jest.config.mjs`
    *   Create `web/jest.setup.js`

### 2. Add Test Script to `package.json`

*   **Description:** Add a `test` script to `web/package.json` to run the tests.
*   **Status:** To Do
*   **File Creation:**
    *   Modify `web/package.json`

### 3. Write Component Tests

*   **Description:** Create test files for each component and write the appropriate unit tests to ensure they render correctly and that their functionality works as expected.
*   **Status:** To Do
*   **Test Files to Create:**
    *   `web/components/layout/__tests__/footer.test.tsx`
    *   `web/components/layout/__tests__/header.test.tsx`
    *   `web/components/layout/__tests__/logo.test.tsx`
    *   `web/components/layout/__tests__/marketing-layout.test.tsx`
    *   `web/components/layout/__tests__/navigation.test.tsx`
    *   `web/components/nav-link/__tests__/nav-link.test.tsx`

### 4. Write Page-Level Component Tests

*   **Description:** Create test files for each page-level client component and write the appropriate unit tests. These tests will likely require mocking data to simulate props and API responses.
*   **Status:** To Do
*   **Test Files to Create:**
    *   `web/app/__tests__/home-page.test.tsx`
    *   `web/app/graves/__tests__/graves-page.test.tsx`
    *   `web/app/graves/[id]/__tests__/grave-details-page.test.tsx`
    *   `web/app/map/__tests__/grave-selection-modal.test.tsx`
    *   `web/app/map/__tests__/map-page.test.tsx`

### 5. Write Utility/Client Tests

*   **Description:** Create test files for client-side utility functions and write the appropriate unit tests.
*   **Status:** To Do
*   **Test Files to Create:**
    *   `web/sanity/__tests__/client.test.ts`

### 6. Run Tests and Refine

*   **Description:** Run the test suite and fix any failing tests. Repeat until all tests pass.
*   **Status:** To Do
*   **Commands:**
    ```bash
    npm run test --prefix web
    ```
