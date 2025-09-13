# GEMINI.md

## Project Overview

This project is a website that documents the history of graves in the Toftrees churchyard in Norfolk.

The backend is a Sanity dataset, and the frontend is a Next.js application. The data for the website is stored in a `graves.ndjson` file, which is intended to be imported into the Sanity dataset.

The website will feature:
* A front page with an image of the church and a history of the church.
* A "graves" tab that lists all the graves and allows users to click through to a details page for each grave.
* A hotspotted image of the churchyard that allows users to click on a grave and be taken to its corresponding page.

# GEMINI.md

## Design Principles
- **Simplicity First:** Prefer minimalistic, clean solutions over clever complexity.
- **Accessibility:** Follow WCAG AA standards. Use semantic HTML, proper ARIA roles, and ensure contrast ratios.
- **Responsiveness:** Design must look good on mobile, tablet, and desktop.
- **Performance-Oriented:** Optimize for Core Web Vitals, lazy-load assets, reduce bundle size.
- **Consistency:** Use a design system or component library; no ad-hoc styles.
- **General Feel** A dark theme with modern typography

## Enforced Rules
- Check Context7 MCP server for latest documentation on technologies and libraries used
- Use modern CSS (Flexbox, Grid), avoid floats.
- Use TypeScript over JavaScript.
- Use ESLint + Prettier for code style.
- Favor functional components and React hooks (no class components).
- Always include a11y checks before merging.

## Examples
✅ **Good:**
```tsx
<Button variant="primary" aria-label="Submit form">
  Submit
</Button>


## Data and Schema

### Data

The main data for the project is located in `studio/data/graves.ndjson`. This file contains an array of JSON objects, where each object represents a grave.

### Schema

The Sanity schema is defined in the `studio/schemaTypes` directory.

*   **`grave.ts`**: Defines the schema for a single grave. Key fields include:
    *   `graveNo`: The grave number.
    *   `familySurname`: The family surname of the person(s) buried in the grave.
    *   `locationDescription`: A text description of the grave's location.
    *   `persons`: An array of objects, where each object represents a person buried in the grave.
    *   `graveyardLocation`: A geopoint for the grave's location in the graveyard.
    *   `headstoneImage`: An image of the headstone.
    *   `headstoneVideo`: A video of the headstone.

*   **`siteSettings.ts`**: Defines the schema for the site's settings. Key fields include:
    *   `title`: The title of the site.
    *   `shortHistory`: A short history of the church.
    *   `churchImage`: An image of the church.
    *   `churchVideo`: A video of the church.
    *   `historicalProjectSummary`: A summary of the historical project.
    *   `contactDetails`: Contact details for the project.

## Building and Running

**Backend (Sanity)**

To use the Sanity backend, you will need to have a Sanity project set up.

1.  **Install dependencies:**
    ```bash
    npm install --prefix studio
    ```

2.  **Import the data:**
    ```bash
    sanity dataset import studio/data/graves.ndjson production
    ```

3.  **Run the development server:**
    ```bash
    npm run dev --prefix studio
    ```

**Frontend (Next.js)**

The frontend is a Next.js application.

1.  **Install dependencies:**
    ```bash
    npm install --prefix web
    ```

2.  **Run the development server:**
    ```bash
    npm run dev --prefix web
    ```

## Development Conventions

*   The Sanity schema is written in TypeScript.
*   The data is stored in a `.ndjson` file.
