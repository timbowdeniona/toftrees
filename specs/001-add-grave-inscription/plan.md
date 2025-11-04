# Implementation Plan: Add Grave Inscription

**Branch**: `001-add-grave-inscription` | **Date**: 2025-10-03 | **Spec**: `/Users/timbo/Dev/toftrees/specs/001-add-grave-inscription/spec.md`
**Input**: Feature specification from `/specs/001-add-grave-inscription/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
This feature will extend the `grave` model in Sanity to include a rich text field for the inscription. The inscription will then be displayed on the grave details page in a scrollable pane.

## Technical Context
**Language/Version**: TypeScript
**Primary Dependencies**: Next.js, React, Sanity
**Storage**: Sanity
**Testing**: Jest
**Target Platform**: Web
**Project Type**: Web application
**Performance Goals**: Adhere to Core Web Vitals
**Constraints**: None
**Scale/Scope**: This is a small feature affecting one data model and one page.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Data Integrity and Sensitivity**: Does the plan ensure that all data is sourced from the Sanity dataset and handled respectfully? Yes, the inscription data will be stored in Sanity.
- **Simplicity and Maintainability**: Is the proposed solution the simplest possible approach? Is it easy to understand and maintain? Yes, this is a straightforward extension of the existing data model and page.
- **Accessibility First**: Does the plan consider WCAG AA standards in the design and implementation? Yes, the scrollable pane will be implemented with accessibility in mind.
- **Modern & Performant Frontend**: Does the plan utilize modern React practices and prioritize performance? Yes, the implementation will use functional components and hooks.
- **Test-Driven Development**: Does the plan include the creation of tests before writing implementation code? Yes, tests will be created for the updated component.

## Project Structure

### Documentation (this feature)
```
specs/001-add-grave-inscription/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
studio/
└── schemaTypes/
    └── grave.ts

web/
├── app/
│   └── graves/
│       └── [id]/
│           └── grave-details-page.tsx
└── __tests__/
    └── graves/
        └── [id]/
            └── grave-details-page.test.tsx
```

**Structure Decision**: The project is a web application with a frontend in the `web` directory and a backend (Sanity) in the `studio` directory. This feature will involve changes in both directories.

## Phase 0: Outline & Research
No research is needed for this feature.

**Output**: `research.md` created.

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1.  **`data-model.md`**: The `grave` schema in `studio/schemaTypes/grave.ts` will be updated to include an `inscription` field.
2.  **`contracts/`**: No new API contracts are required.
3.  **`quickstart.md`**: A quickstart guide will be created to manually test the feature.

**Output**: `data-model.md`, `quickstart.md` created.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Create a task to update the `grave.ts` schema in Sanity.
- Create a task to update the `grave-details-page.tsx` component to display the inscription.
- Create a task to add a test for the inscription display.

**Ordering Strategy**:
1.  Update Sanity schema.
2.  Write failing test for the component.
3.  Update the component to make the test pass.

**Estimated Output**: 3-4 numbered, ordered tasks in `tasks.md`.

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
|           |            |                                     |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*