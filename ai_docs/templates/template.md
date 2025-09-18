# AI Task Planning Template – Toftrees Churchyard Project

> **About This Template:** This structure is tailored to your project setup with a Next.js frontend, Sanity backend, and Chakra UI for components. Use this to break down features and fixes into well-scoped tasks for Gemini CLI.

---

## 1. Task Overview

### Task Title
**Title:** [Descriptive name – e.g., "Create a new page for project history" or "Fix hotspot persistence issue"]

### Goal Statement
**Goal:** [Clear statement of the end result and its value – e.g., “To display the history of the project to users of the site.”]

---

## 2. Project Analysis & Current State

### Technology & Architecture
- **Frameworks & Versions:** Next.js, React
- **Language:** TypeScript
- **Backend:** Sanity (Headless CMS)
- **UI & Styling:** Chakra UI
- **Deployment:** Netlify

### Current State
[Describe current functionality – e.g., “The site has a map page with hotspots, but the project history page is not yet implemented.”]

---

## 3. Context & Problem Definition

### Problem Statement
[Explain the feature gap or bug – e.g., “The project history page is currently a placeholder and needs to be built out to display content from Sanity.”]

### Success Criteria
- [ ] A new page is created at `/history`.
- [ ] The page fetches and displays content from the `siteSettings` document in Sanity.
- [ ] The page is styled using Chakra UI components and matches the site's design.

---

## 4. Development Mode Context

- **🚨 Project Stage:** Active development, pre-production
- **Breaking Changes:** Avoid breaking existing functionality; internal refactors are acceptable.
- **Data Handling:** Changes to the Sanity schema should be carefully considered and documented.
- **User Base:** Public visitors to the website.
- **Priority:** Stability > speed.

---

## 5. Technical Requirements

### Functional Requirements
- A new page should be accessible at the `/history` route.
- The page should fetch the `historicalProjectSummary` field from the `siteSettings` document in Sanity.
- The fetched content should be rendered on the page.

### Non-Functional Requirements
- **Performance:** Page load should be fast.
- **Security:** Sanity API tokens should be handled securely.
- **Usability:** The page should be easy to read and navigate.
- **Responsive Design:** Support mobile, tablet, and desktop.

### Technical Constraints
- Must use the existing Next.js and Sanity setup.
- Must use Chakra UI for components.
- Must not break the Netlify build/deploy workflow.

---

## 6. Data & Database Changes

- **Sanity Schema Changes:** [Specify any changes to the schemas in `studio/schemaTypes/`]
- **Data Model Updates:** Update TypeScript types in `web/types.ts` if needed.
- **Data Migration Plan:** [Specify if any data migration is needed, e.g., using `sanity dataset import`]

---

## 7. API & Backend Changes

### Data Access Pattern Rules
- Data is fetched from Sanity using GROQ queries via the `next-sanity` client in `web/sanity/client.ts`.
- Fetching logic should be located in the page component or a dedicated data-fetching function.

### Sanity GROQ Queries
- [Define any new or modified GROQ queries here]

---

## 8. Frontend Changes

### New Components
- [List any new React components to be created, e.g., a component to render the project history]

### Page Updates
- Create a new page at `web/app/history/page.tsx`.

### State Management
- React hooks with local state or Context API for client-side state.

---

## 9. Implementation Plan
1.  Create the new page file `web/app/history/page.tsx`.
2.  Add a `getData` function to fetch the `historicalProjectSummary` from Sanity.
3.  Create a React component to render the fetched data using Chakra UI components.
4.  Add the new page to the main navigation if required.
5.  Deploy and validate.

---

## 10. Task Completion Tracking
- AI agent updates this task markdown file under `ai_docs/tasks/`.

---

## 11. File Structure & Organization
- `ai_docs/templates/` → task templates
- `ai_docs/tasks/` → generated tasks
- `studio/` → Sanity backend and schema
- `web/app/` → Next.js pages/routes
- `web/components/` → UI components
- `web/sanity/` → Sanity client configuration

---

## 12. AI Agent Instructions

### Implementation Workflow
🎯 **MANDATORY PROCESS:**
- Always use this template (`template.md`).
- Generate tasks in `ai_docs/tasks/`.
- Write TypeScript for the Next.js frontend.
- Use Chakra UI for all UI components.
- Use the `next-sanity` client for all data fetching from Sanity.

### Communication Preferences
- Output logs as markdown checklists.
- Report blockers explicitly.

### Code Quality Standards
- TypeScript strict mode.
- ESLint + Prettier (project defaults).
- Follow existing code style and conventions.

---

## 13. Second-Order Impact Analysis
- [Consider any potential side effects, e.g., impact on build times, Sanity API quota usage, etc.]

---
