# Feature Specification: Extend Graves Schema

**Feature Branch**: `002-extend-graves-schema`  
**Created**: 2025-11-04  
**Status**: Draft  
**Input**: User description: "Extend Graves Schema. I want to add the following fields to the @studio/schemaTypes/graves.ts headstoneCondition of type text, footstone boolean, footstoneInscription text, additionalInformation text, scenicGraveImage image, graveImages array of images. Update the @web/app/graves/[id]/grave-details-page.tsx to show the new fields in a style fitting the current style. The new fields should be at the bottom of the page."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add More Grave Details (Priority: P1)

As a site administrator, I want to add more details to each grave record, so that I can provide a more comprehensive history.

**Why this priority**: This is the core of the feature request and provides the most value to the user.

**Independent Test**: A user can add data to the new fields in the Sanity Studio and see them displayed on the website.

**Acceptance Scenarios**:

1. **Given** I am logged into the Sanity Studio, **When** I edit a grave, **Then** I should see the new fields: `headstoneCondition`, `footstone`, `footstoneInscription`, `additionalInformation`, `scenicGraveImage`, and `graveImages`.
2. **Given** I have added data to the new fields for a grave, **When** I view the grave's detail page on the website, **Then** I should see the new information displayed.

---

### Edge Cases

- What happens when a grave record is missing some or all of the new fields? The page should handle this gracefully and not display empty sections.
- How does the system handle large images for `scenicGraveImage` and `graveImages`? The page should load efficiently without significant performance degradation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `grave` schema in Sanity MUST be extended to include a `headstoneCondition` field of type `text`.
- **FR-002**: The `grave` schema in Sanity MUST be extended to include a `footstone` field of type `boolean`.
- **FR-003**: The `grave` schema in Sanity MUST be extended to include a `footstoneInscription` field of type `text`.
- **FR-004**: The `grave` schema in Sanity MUST be extended to include an `additionalInformation` field of type `text`.
- **FR-005**: The `grave` schema in Sanity MUST be extended to include a `scenicGraveImage` field of type `image`.
- **FR-006**: The `grave` schema in Sanity MUST be extended to include a `graveImages` field of type `array` of `images`.
- **FR-007**: The grave details page (`@web/app/graves/[id]/grave-details-page.tsx`) MUST be updated to display the `headstoneCondition`, `footstone`, `footstoneInscription`, `additionalInformation`, `scenicGraveImage`, and `graveImages` fields.

### Key Entities *(include if feature involves data)*

- **Grave**: Represents a single grave in the churchyard. It contains information about the people buried there, the location, and details about the headstone and footstone.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A site administrator can successfully add and save data to the new fields in the Sanity Studio for 100% of attempts.
- **SC-002**: The new fields are displayed on the grave details page for visitors to see, with a 99% uptime.
- **SC-003**: The grave details page with the new image fields (`scenicGraveImage`, `graveImages`) should load within 3 seconds on a standard internet connection.