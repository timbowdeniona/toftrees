# AI Task Planning Template – Toftrees Churchyard Project

> **About This Template:** This structure is tailored to your project setup with a Next.js frontend, Sanity backend, and Chakra UI for components. Use this to break down features and fixes into well-scoped tasks for Gemini CLI.

---

## 1. Task Overview

### Task Title
**Title:** Update Grave Details Page: Reposition and Resize Headstone Image

### Goal Statement
**Goal:** To improve the layout of the grave details page by moving the headstone image below the 'Persons Buried' section and constraining its height for better visual flow.

---

## 2. Project Analysis & Current State

### Technology & Architecture
- **Frameworks & Versions:** Next.js, React
- **Language:** TypeScript
- **Backend:** Sanity (Headless CMS)
- **UI & Styling:** Chakra UI
- **Deployment:** Netlify

### Current State
The headstone image is currently displayed at the top of the page, above the 'Persons Buried' section, with a large default size.

---

## 3. Context & Problem Definition

### Problem Statement
The current placement and size of the headstone image disrupts the logical flow of information on the page. It should be placed after the details of the people buried, and its size should be constrained to be less dominant.

### Success Criteria
- [ ] The `headstoneImage` is rendered *after* the "Persons Buried" section.
- [ ] The `headstoneImage` is rendered only if it exists on the `grave` object.
- [ ] The `Box` containing the image has a `maxH="48"` and the image is displayed correctly within this constraint.

---

## 4. Development Mode Context

- **🚨 Project Stage:** Active development, pre-production
- **Breaking Changes:** Avoid breaking existing functionality; internal refactors are acceptable.
- **Data Handling:** No changes to data handling are expected.
- **User Base:** Public visitors to the website.
- **Priority:** Stability > speed.

---

## 5. Technical Requirements

### Functional Requirements
- Modify the JSX in `web/app/graves/[id]/grave-details-page.tsx`.
- Move the `headstoneImage` rendering logic to appear after the `persons` section.
- Apply Chakra UI props (`maxH="48"`) to the container `Box` and adjust the `next/image` props to ensure the image displays correctly within the new size constraints.

### Non-Functional Requirements
- **Performance:** Page load should remain fast.
- **Responsive Design:** The image should resize appropriately on different screen sizes.

### Technical Constraints
- Must use the existing Next.js, Sanity, and Chakra UI setup.

---

## 6. Data & Database Changes

- **Sanity Schema Changes:** None.
- **Data Model Updates:** None.
- **Data Migration Plan:** None.

---

## 7. API & Backend Changes

### Sanity GROQ Queries
- No changes to existing queries are required.

---

## 8. Frontend Changes

### Page Updates
- Modify the layout and styling of `web/app/graves/[id]/grave-details-page.tsx`.

---

## 9. Implementation Plan
1.  In `web/app/graves/[id]/grave-details-page.tsx`, locate the JSX block that renders the `headstoneImage`.
2.  Cut this block of code.
3.  Find the closing tag of the "Persons Buried" section (`</Box>`).
4.  Paste the image rendering block immediately after the "Persons Buried" section.
5.  Update the `Box` containing the `Image` to include the `maxH="48"` prop.
6.  Adjust the `width` and `height` props on the `Image` component to better suit the new maximum height (e.g., width={400} height={300}) to maintain a reasonable aspect ratio.
7.  Verify the image displays correctly and respects the new constraints.

---

## 10. Task Completion Tracking
- AI agent updates this task markdown file under `ai_docs/tasks/`.

---

## 11. File Structure & Organization
- `ai_docs/tasks/` → generated tasks
- `web/app/graves/[id]/grave-details-page.tsx` → file to be modified

---

## 12. AI Agent Instructions

### Implementation Workflow
🎯 **MANDATORY PROCESS:**
- Follow the implementation plan precisely.
- Modify only the specified file.
- Ensure the final output is clean and well-formatted.

### Code Quality Standards
- Follow existing code style and conventions.

---

## 13. Second-Order Impact Analysis
- None expected.

---
