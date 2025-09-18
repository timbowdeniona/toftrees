# Task: Add Video Component to Home Page

**Task ID:** 004
**Description:** Add a video component to the home page to display a video of the church.
**Dependencies:** None
**Status:** To Do

---

## Plan

### 1. Update Sanity Schema

*   **Description:** Add a `churchVideo` field of type `file` to the `siteSettings` schema. This will allow uploading a video file in the Sanity studio.
*   **Status:** To Do
*   **File to Modify:** `studio/schemaTypes/siteSettings.ts`

### 2. Update Home Page Component

*   **Description:**
    1.  Update the `Settings` interface in `web/app/home-page.tsx` to include the new `churchVideo` field.
    2.  Create a `VideoSection` component that takes the `churchVideo` data as a prop.
    3.  The `VideoSection` will render an HTML5 `<video>` player.
    4.  Add the new `VideoSection` to the main `HomePage` component, likely below the `HeroSection`.
*   **Status:** To Do
*   **File to Modify:** `web/app/home-page.tsx`

### 3. Update Sanity Client for Video URLs

*   **Description:** The current `urlFor` is for images. Video assets need a different way to get the URL. A helper function will be needed in `web/sanity/client.ts` to get the URL for a file asset from Sanity.
*   **Status:** To Do
*   **File to Modify:** `web/sanity/client.ts`

### 4. Update Page Query

*   **Description:** The query that fetches the `siteSettings` for the home page needs to be updated to include the new `churchVideo` field. This is likely in `web/app/page.tsx` where the data is fetched.
*   **Status:** To Do
*   **File to Modify:** `web/app/page.tsx`
