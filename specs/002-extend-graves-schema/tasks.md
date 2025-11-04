# Tasks: Extend Graves Schema

**Input**: Design documents from `/specs/002-extend-graves-schema/`
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

## Phase 3: User Story 1 - Add More Grave Details (Priority: P1) 🎯 MVP

**Goal**: As a site administrator, I want to add more details to each grave record, so that I can provide a more comprehensive history.

**Independent Test**: A user can add data to the new fields in the Sanity Studio and see them displayed on the website.

### Implementation for User Story 1

- [x] T001 [US1] Update the `grave` schema in `studio/schemaTypes/grave.ts` to include the new fields: `headstoneCondition`, `footstone`, `footstoneInscription`, `additionalInformation`, `scenicGraveImage`, and `graveImages`.
- [x] T002 [US1] Update the grave details page in `web/app/graves/[id]/grave-details-page.tsx` to display the new fields.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Story 1 (Phase 3)**: Can start immediately.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories.

### Within Each User Story

- T002 depends on T001.

### Parallel Opportunities

- No parallel opportunities identified for this feature.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1
2. **STOP and VALIDATE**: Test User Story 1 independently
3. Deploy/demo if ready
