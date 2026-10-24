# AGENTS.md

Project constraints for anyone (human or agent) editing this site.

## What this project is

A one-page, static guide to affordable Boston restaurants for students. It is a
learning project, not a live directory. Content is illustrative and has not been
verified against real menus, prices, or hours.

## Stack rules

- Only `index.html`, `style.css`, and `script.js` ship to the browser. Templates
  and docs (`README.md`, `AGENTS.md`, `.gitignore`) are fine.
- No dependencies, package managers, frameworks, build steps, or bundlers.
- No CDNs, web fonts, icon packs, analytics, trackers, or external network
  requests of any kind. System font stacks only.
- Plain, readable JavaScript (no modules, no transpiling, no minification).
- Keep the HTML content complete in `index.html`; JavaScript may enhance it but
  must not be required to read the page.

## Accessibility rules

- Semantic landmarks (`header`, `main`, `section`, `footer`) and a logical
  heading order.
- Everything works with a keyboard, including Tab order, Enter/Space activation,
  and a visible focus ring.
- Interactive targets are at least 44×44 CSS pixels.
- Filter state is exposed with `aria-pressed`; result counts use `role="status"`.
- Color contrast must pass WCAG AA in both light and dark themes.
- Respect `prefers-reduced-motion`; no motion is required to understand content.

## Responsive rules

- Mobile-first CSS; the page must work from 320px to at least 1440px.
- No horizontal scrolling at any width. Use fluid grids (`auto-fit`/`minmax`),
  not fixed pixel layouts.
- Long strings wrap rather than overflow.

## Theme rules

- Themes are driven by `data-theme="light|dark"` on `<html>`.
- `localStorage` key: `boston-eats-theme`. Storage access must be wrapped in
  `try/catch`; a blocked store must not break the page.
- Default to the OS `prefers-color-scheme` when the user has no saved choice.
- The inline head script exists only to prevent a flash of the wrong theme.

## Local running and hosting

- Localhost only. Use `python3 -m http.server 8000 --bind 127.0.0.1`.
- Never bind to `0.0.0.0`, expose a tunnel, or deploy to any host.
- Do not start a server on the user's behalf unless they explicitly ask.
- The site must keep working when opened through a localhost server; `file://`
  support is nice-to-have but not a requirement.

## Git and secrets

- Never commit, push, tag, or open pull requests unless explicitly asked.
- Never install packages, create accounts, or add CI/automation.
- Ignored paths: `.env`, `node_modules/`, `.DS_Store`. Do not add credentials or
  personal data to tracked files.

## Content rules

- Do not invent prices, hours, or "verified" claims presented as fact. Sample
  data must be labelled as sample data.
- Dietary labels mean "options are usually available", never "allergen-free".
- Keep copy short, specific, and useful to a student on a budget.

## Definition of done

- [ ] All asset paths resolve and JavaScript parses.
- [ ] Filters work by mouse and keyboard, and the count updates.
- [ ] Theme toggle works, persists, and survives a blocked localStorage.
- [ ] Layout holds at 320px and 1440px with no horizontal scroll.
- [ ] Both themes pass contrast checks; focus is always visible.
- [ ] Readme run instructions still match reality.
