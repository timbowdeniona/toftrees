# AI Task Planning Template – Toftrees Churchyard Project

> **About This Template:** This structure is tailored to your project setup with a Next.js frontend, Sanity backend, and Chakra UI for components. Use this to break down features and fixes into well-scoped tasks for Gemini CLI.

---

## 1. Task Overview

### Task Title
**Title:** Add Tooltips to Map Hotspots

### Goal Statement
**Goal:** To improve user experience by showing the family surname in a tooltip when a user hovers over a hotspot on the map.

---

## 2. Project Analysis & Current State

### Technology & Architecture
- **Frameworks & Versions:** Next.js, React
- **Language:** TypeScript
- **Backend:** Sanity (Headless CMS)
- **UI & Styling:** Chakra UI
- **Deployment:** Netlify

### Current State
The map page displays hotspots, but there is no information shown on hover. Users must click through to the grave details page to see any information.

---

## 3. Context & Problem Definition

### Problem Statement
Users cannot quickly identify which grave a hotspot represents without clicking on it. This makes finding a specific grave on the map difficult.

### Success Criteria
- [ ] When a user hovers over a hotspot, a tooltip appears.
- [ ] The tooltip displays the `familySurname` of the grave associated with the hotspot.
- [ ] The existing functionality (clicking to navigate, right-click menu) remains unchanged.

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
- Use Chakra UI's `Tooltip` component.
- The `familySurname` needs to be retrieved for each hotspot. The `graves` array is already passed as a prop to the `MapPageClient` component. The correct grave from the array needs to be found using the `hotspot.grave._ref`.

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

- **Sanity Schema Changes:** None
- **Data Model Updates:** None
- **Data Migration Plan:** None

---

## 7. API & Backend Changes

### Data Access Pattern Rules
- Data is fetched from Sanity using GROQ queries via the `next-sanity` client in `web/sanity/client.ts`.
- Fetching logic should be located in the page component or a dedicated data-fetching function.

### Sanity GROQ Queries
- No changes to existing queries are required.

---

## 8. Frontend Changes

### New Components
- No new components need to be created. The existing Chakra UI `Tooltip` component will be used.

### Page Updates
- Modify the rendering of hotspots in `web/app/map/map-page.tsx`.

### State Management
- No changes to state management are required.

---

## 9. Implementation Plan
1.  In `web/app/map/map-page.tsx`, import the `Tooltip` component from `@chakra-ui/react`.
2.  Inside the `map` function that renders the hotspots, find the corresponding grave from the `graves` prop using the `hotspot.grave._ref`.
3.  Wrap the hotspot's `Box` component with the `Tooltip` component.
4.  Set the `label` prop of the `Tooltip` to the `familySurname` of the found grave.
5.  Ensure that the tooltip does not interfere with the existing `onContextMenu` and `Link` functionality.

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
- Minimal performance impact due to a slight increase in DOM elements.

---
