# Tasks: Add Grave Inscription

**Input**: Design documents from `/specs/001-add-grave-inscription/`
**Prerequisites**: plan.md, data-model.md, quickstart.md

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **studio**: `studio/` at repository root
- **web**: `web/` at repository root

## Phase 3.1: Core Implementation
- [x] T001 Update the `grave.ts` schema in `studio/schemaTypes/grave.ts` to add the `inscription` field as defined in `data-model.md`.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T002 [P] Create a new test file `web/app/graves/[id]/__tests__/grave-details-page.test.tsx`. Write two tests:
    1.  Render the `GraveDetailsPage` component with mock data that includes an inscription and assert that the inscription text is present. This test should fail initially.
    2.  Render the `GraveDetailsPage` component with mock data that does *not* include an inscription and assert that the inscription section is not rendered. This test should pass initially.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T003 Update the `GraveDetailsPage` component in `web/app/graves/[id]/grave-details-page.tsx` to fetch the `inscription` field from Sanity and display it. The inscription should be rendered within a scrollable pane as per the specification. The test from T002 should now pass.

## Dependencies
- T001 should be completed before T003.
- T002 must be completed and failing before T003 is started.

## Notes
- Verify tests fail before implementing.
- Commit after each task.
