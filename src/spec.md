# Specification

## Summary
**Goal:** Make the GreenX title/wordmark readable everywhere, and add agri-tech banners plus role-specific logos across role interfaces using static frontend assets.

**Planned changes:**
- Adjust the GreenX text wordmark styling so “GreenX” is fully visible and readable in all current placements (Login header, authenticated TopBar, AdminLayout sidebar header) in both light and dark mode while keeping it as text with a distinct “X” style.
- Add a reusable agri-tech hero/banner illustration component and render it near the top (under the TopBar) on the Land Owner, Field Manager, Worker, and Expert main interface pages, ensuring responsive behavior and no layout breakage.
- Add role-specific logo assets and display the correct logo for Land Owner, Worker, and Expert in a consistent, visible location (e.g., TopBar next to the GreenX wordmark) without changing existing user info display or logout behavior.
- Add newly generated images under `frontend/public/assets/generated` and reference them directly via `/assets/generated/...` paths in the UI.

**User-visible outcome:** The GreenX title is clearly readable across the app in light/dark mode, each role dashboard shows an agri-tech banner, and Land Owner/Worker/Expert views show their corresponding role logo.
