# 005: Generate Sitemap

## Objective

Create a sitemap for the website to improve SEO and search engine discoverability.

## Tasks

1.  **Create `sitemap.ts` file:**
    *   Create a new file `sitemap.ts` in the `web/app` directory.

2.  **Implement `sitemap.ts`:**
    *   Import the `MetadataRoute` type from `next`.
    *   Import the Sanity client from `sanity/client`.
    *   Create a `sitemap` function that returns an array of sitemap entries.
    *   Add static routes: `/`, `/graves`, `/history`, `/map`.
    *   Fetch all graves from Sanity.
    *   For each grave, create a dynamic URL in the format `/graves/{grave._id}`.
    *   Combine the static and dynamic routes and return them.

3.  **Verify sitemap generation:**
    *   Run the development server.
    *   Navigate to `/sitemap.xml` in the browser.
    *   Verify that the sitemap is generated correctly and includes all static and dynamic routes.
