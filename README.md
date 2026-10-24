# Cheap Eats Boston

A one-page guide to affordable Boston restaurants for students, built with
hand-written HTML, CSS, and JavaScript. Filter the list by budget and dietary
need, and switch between a light and dark theme.

No dependencies, no CDN, no build step, no tracking.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content and structure. Works without JavaScript for reading. |
| `style.css` | Warm editorial theme, responsive layout, light/dark color tokens. |
| `script.js` | Budget/dietary filtering and the theme toggle. |
| `AGENTS.md` | Project constraints for future contributors and agents. |
| `.gitignore` | Local secrets, dependencies, and macOS noise. |

## Run it locally

Requires Python 3 (already on macOS). There is nothing to install and no build
step.

```sh
cd /Users/devinlu/projects/opencode-website
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open:

<http://127.0.0.1:8000/>

Stop the server with `Ctrl+C`.

Notes:

- `--bind 127.0.0.1` keeps the server on localhost only. Do not use `0.0.0.0`.
- If port 8000 is busy, change it in both places, e.g. `python3 -m http.server 8001 --bind 127.0.0.1`
  and open <http://127.0.0.1:8001/>.
- Opening `index.html` directly as a file also works in most browsers, but the
  saved theme may be unavailable and some browsers restrict `localStorage` on
  `file://`. Prefer the localhost command above.
- Only run one server at a time; a second one on the same port will fail.

## Using the page

- **Theme:** the button in the header switches light/dark and remembers your
  choice in `localStorage` under `boston-eats-theme`. With no saved choice, the
  page follows your OS setting.
- **Filters:** choose a budget, a dietary need, or both. Results narrow
  immediately and the count updates. Click an active filter again to clear just
  that one, or use **Clear filters** to reset both.
- **Keyboard:** Tab reaches every control; Enter or Space activates a button.
  The filter count is announced via a live region.

## Content caveat

Restaurant names, prices, and dietary details are **sample content for a
learning project** and have not been verified. Check current menus and hours
before relying on them. Dietary tags mean options are usually available; they
are not a guarantee of an allergen-free kitchen.

## Browser support

Current versions of Chrome, Safari, Firefox, and Edge. The layout uses CSS Grid
with `auto-fit`/`minmax` and CSS custom properties; no polyfills are included.
