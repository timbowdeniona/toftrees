# Feature Specification: View Grave on Map

**Feature Branch**: `003-view-grave-on-map`  
**Created**: 2025-11-04  
**Status**: Draft  
**Input**: User description: "Graves to Map Image: The ImageMap schema @studio/schemaTypes/imageMap.ts starting at line 21 has an array of hotspots that link to graves so when the hotspot is clicked the on the @web/appmap/map-page.tsx the user is taken to the relevant @web/app/graves/[id]/grave-details.tsx page. I want to implement the reverse functionality to add a View On Map button on the grave-details page that takes the user to map-page and highlights the grave on the map."

## Clarifications

### Session 2025-11-04

- Q: How should the grave's hotspot be highlighted on the map? → A: A combination of changing the color of the hotspot and displaying a tooltip or popover with the grave information.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Grave Location on Map (Priority: P1)

As a user viewing a grave's details, I want to see its location on the churchyard map, so that I can understand its position relative to other graves.

**Why this priority**: This feature enhances the user experience by providing a visual context for the grave's location.

**Independent Test**: A user can click a "View on Map" button on the grave details page and be taken to the map page with the corresponding grave highlighted.

**Acceptance Scenarios**:

1. **Given** I am on a grave details page, **When** I click the "View on Map" button, **Then** I am navigated to the map page.
2. **Given** I have been navigated to the map page from a grave details page, **When** the map page loads, **Then** the hotspot for that grave is highlighted.

---

### Edge Cases

- What happens if a grave does not have a corresponding hotspot on the map? The "View on Map" button should be disabled or hidden.
- What happens if the grave ID passed in the query parameter is invalid or does not exist? The map page should handle this gracefully, perhaps by showing a "Grave not found" message.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A "View on Map" button MUST be present on the grave details page.
- **FR-002**: Clicking the "View on Map" button MUST navigate the user to the `/map` page.
- **FR-003**: The grave's ID MUST be passed as a query parameter to the map page (e.g., `/map?grave=<grave_id>`).
- **FR-004**: The map page MUST be able to read the grave ID from the query parameter.
- **FR-005**: The map page MUST highlight the hotspot corresponding to the grave ID from the query parameter by changing its color and displaying a tooltip or popover with the grave information.

### Key Entities *(include if feature involves data)*

- **Grave**: Represents a single grave in the churchyard.
- **ImageMap**: Represents the churchyard map with hotspots.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of clicks on the "View on Map" button navigate the user to the map page.
- **SC-002**: The correct grave location is highlighted on the map with 100% accuracy when navigated from the grave details page.
- **SC-003**: The map page should load and highlight the grave within 2 seconds of navigation.