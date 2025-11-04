# Implementation Plan: View Grave on Map

**Branch**: `003-view-grave-on-map` | **Date**: 2025-11-04 | **Spec**: [link](./spec.md)
**Input**: Feature specification from `/specs/003-view-grave-on-map/spec.md`

## Summary

This feature adds a "View on Map" button to the grave details page. When clicked, it navigates to the map page and highlights the corresponding grave's hotspot by changing its color and displaying a tooltip.

## Technical Context

**Language/Version**: TypeScript
**Primary Dependencies**: Next.js, React, Chakra UI
**Storage**: Sanity
**Testing**: Jest
**Target Platform**: Web
**Project Type**: Web application
**Performance Goals**: Map page should load and highlight the grave within 2 seconds.
**Constraints**: N/A
**Scale/Scope**: N/A

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No constitution defined.

## Project Structure

### Documentation (this feature)

```text
specs/003-view-grave-on-map/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
web/
├── app/
│   ├── graves/
│   │   └── [id]/
│   │       └── grave-details-page.tsx
│   └── map/
│       └── map-page.tsx
```

**Structure Decision**: The project structure is already established. The changes will be applied to the existing files.

## Complexity Tracking

No violations.