# Tasks: View Grave on Map

**Input**: Design documents from `/specs/003-view-grave-on-map/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

No setup tasks required for this feature.

---

## Phase 2: Foundational (Blocking Prerequisites)

No foundational tasks required for this feature.

---

## Phase 3: User Story 1 - View Grave Location on Map (Priority: P1) 🎯 MVP

**Goal**: As a user viewing a grave's details, I want to see its location on the churchyard map, so that I can understand its position relative to other graves.

**Independent Test**: A user can click a "View on Map" button on the grave details page and be taken to the map page with the corresponding grave highlighted.

### Implementation for User Story 1

- [x] T001 [US1] Add a "View on Map" button to `web/app/graves/[id]/grave-details-page.tsx`.
- [x] T002 [US1] Implement navigation to `/map?grave=<grave_id>` when the button is clicked in `web/app/graves/[id]/grave-details-page.tsx`.
- [x] T003 [US1] Read the `grave` ID from the query parameter in `web/app/map/map-page.tsx`.
- [x] T004 [US1] Highlight the corresponding hotspot on the map by changing its color and displaying a tooltip or popover with the grave information in `web/app/map/map-page.tsx`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Story 1 (Phase 3)**: Can start immediately.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories.

### Within Each User Story

- T002 depends on T001.
- T004 depends on T003.

### Parallel Opportunities

- T001 and T003 can be worked on in parallel.
- T002 depends on T001.
- T004 depends on T003.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1
2. **STOP and VALIDATE**: Test User Story 1 independently
3. Deploy/demo if ready
