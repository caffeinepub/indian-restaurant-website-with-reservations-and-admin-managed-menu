# Specification

## Summary
**Goal:** Build a responsive multi-page Indian restaurant website with a backend-driven menu, online reservations, and an Internet Identity–protected admin area for managing menu content, using a warm modern visual theme.

**Planned changes:**
- Create pages and routing with responsive navigation: Home, Menu, About Us, Gallery, Online Reservation, Contact (plus a clearly labeled Admin route/entry point).
- Apply a cohesive, modern warm/neutral theme (not blue/purple-dominant) with consistent header/footer, typography, spacing, and accessible contrast.
- Implement Home sections: hero, special dishes (≥3), customer reviews (≥3 with rating display), opening hours, and a location summary.
- Implement Menu page that fetches categories/items from the backend and displays grouped categories with name/description/price and veg/non-veg indicator.
- Implement About Us page with meaningful English content (2–3 paragraphs) and a highlighted block (e.g., story/promise).
- Implement Gallery page with a responsive grid (≥8 images) and click-to-view larger preview (modal/lightbox).
- Implement Online Reservation form (name, phone, date, time, guests, notes optional) with client validation and backend persistence plus success/error states.
- Implement Contact page showing phone **8742895627** and address **"-15, Rani bazar Jaipur"**, plus opening hours and a text-based location block.
- Backend (single Motoko actor): stable storage models and methods for menu categories/items and reservations; public query for menu and update for creating reservations.
- Admin UI + backend methods: Internet Identity sign-in, restrict menu modifications to authorized admin principals; allow add/edit/delete items and manage categories (including optional image reference).
- Seed initial content so first load is populated: ≥12 menu items across categories, ≥3 special dishes, and ≥3 reviews.
- Add generated static images under `frontend/public/assets/generated` and use them for the logo, home hero, and gallery.

**User-visible outcome:** Visitors can browse a complete Indian restaurant website, view a backend-powered menu, browse a gallery with image previews, submit reservations, and see contact details; an authenticated admin can sign in with Internet Identity to manage menu categories and items.
