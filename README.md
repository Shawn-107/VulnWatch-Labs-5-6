# VulnWatch — Lab Exercises 5 & 6

**Domain:** Cybersecurity / software vulnerability intelligence  
**Stack:** React 18, JSX, Vite, CSS, browser Local Storage; optional JSON Server REST API.  
**Based on:** the prior VulnWatch HTML/CSS/JavaScript lab (`index(4)(1).html`).

This is a **real React application**, not a single HTML mock-up. Its full CRUD operations work with persistent browser storage by default. Optionally, it uses a JSON Server backend to demonstrate HTTP `GET`, `POST`, `PATCH`, and `DELETE`.

## Run locally

Prerequisites: Node.js 18+ and npm, plus an internet connection for the *first* `npm install`.

```bash
cd VulnWatch-Labs-5-6
npm install
npm run dev
```

Open the URL shown in the terminal (normally **http://localhost:5173**). By default the **Browser / Local Storage** mode is active and six example software records are loaded. You can add, edit, search, filter, and delete immediately without a backend.

### Optional: run with JSON Server (recommended option in the lab PDF)

In a second terminal, from the same project folder:

```bash
npm run server
```

The server exposes `http://localhost:3001/assets`, reading and writing `db.json` (JSON Server 0.17.x). In the site's **STORAGE** dropdown choose **REST / JSON Server**. You now perform database-backed CRUD via HTTP. **Browser and JSON Server modes are separate data stores.** If the server is not running, the app displays a clear error; switch back to Browser mode to continue.

### Run tests and production build

```bash
npm test
npm run build
npm run preview
```

`npm test` uses Node's built-in test runner to check business rules, searching, record validation, Local Storage CRUD, REST method calls, and connection failures. `npm run build` compiles the real JSX production application using Vite.

## Features

| Lab requirement | Where implemented |
|---|---|
| Functional React components, JSX | `src/App.jsx`, `src/components/*.jsx` |
| `useState` hook | `App.jsx`, `SoftwareForm.jsx`, `Watchlist.jsx`, `SignalFeed.jsx`, `LocalRadar.jsx`, `PriorityLab.jsx` |
| Event handling | Search/filter controls, form inputs, table action buttons, sliders, tabs, geolocation button |
| Multiple form fields | Name, vendor, version, category, environment, team, notes |
| Radio buttons | Low / Medium / High / Critical priority |
| Dropdowns | Category, environment, search filters and storage mode |
| Reusable components | Header, Icon, Hero, SummaryMetrics, SoftwareForm, Watchlist, SignalFeed, LocalRadar, PriorityLab |
| CSS styling | `src/styles.css` with mobile breakpoints and reduced-motion support |
| CREATE | Fill in Add to your stack form; select **Add software** |
| READ | Persistent record table with live summary counters |
| UPDATE | Click the pencil icon, change fields, **Save changes** |
| DELETE | Click trash icon, accept confirmation |
| BONUS Search | Type in **Search name, version, team…** |
| Persistence | `src/lib/storage.js` or `db.json` via JSON Server |

### Overview of UI sections

1. **Overview:** VulnWatch shield/orbit hero and dynamic summary metrics.
2. **Watchlist:** Full CRUD, validation, monitored-state checkbox, persistence, search and filter controls.
3. **Signal Explorer:** Educational scenarios matching the user-managed software list.
4. **Local Radar:** Browser Geolocation API with explicit no-verified-feed empty state.
5. **Priority Lab:** Three slider inputs, a transparent weighted-priority calculation, and reset control.

## Data and security boundaries

- Sample records are **example inventory records**, not claims about currently installed or vulnerable versions on any real infrastructure.
- `LAB-ALERT-*` scenarios are **teaching fixtures**, not real CVE identifiers, proof of exploits, or verified threat feeds.
- The previous HTML referenced `/api/global-threats`, `/api/local-threats`, and `/api/reputation`; their backend was not provided. This React lab **does not claim live ThreatFox, CVE, GeoLite2, or IP reputation integrations**.
- Geolocation coordinates are shown only in the current page session. They are not persisted or sent to a backend.
- Local Storage is per browser/device. Do not put secrets, passwords, API tokens, or sensitive production data into the demo.
- JSON Server is a classroom demo API **without authentication**; run it on localhost, never expose it as a production service.
- The software's `priority` is an operator-provided monitoring priority, *not* a real CVSS rating. The Priority Lab uses a transparent teaching formula `0.45×severity + 0.35×exploitation + 0.20×exposure`.

## Project structure

```
VulnWatch-Labs-5-6/
├── index.html                 Vite HTML entry
├── package.json               Dependencies and run commands
├── db.json                    Optional JSON Server database
├── public/favicon.svg         VulnWatch identity
├── src/
│   ├── main.jsx               React root
│   ├── App.jsx                App, storage state, CRUD operations
│   ├── styles.css             Original navy/blue VulnWatch design language
│   ├── components/            Reusable JSX UI components
│   ├── data/seed.js           Example inventory + fictional scenarios
│   └── lib/
│       ├── records.js         Pure validation/filter/priority functions
│       └── storage.js         Persistent browser + REST CRUD adapters
├── tests/                     Node unit/integration-style adapter tests
├── REPORT.pdf                 2-page lab report
├── DEMO_GUIDE.md              5–7-minute demonstration sequence
└── screenshots/               Evidence folder / capture checklist
```

## How to record required screenshots

Use the checklist in `screenshots/SCREENSHOT_GUIDE.md`. Screenshots must come from your own running instance, showing the actual results after each action. For a clean starting point, set **Browser / Local Storage**, choose **Restore sample watchlist**, then follow the five test scenarios in the guide.

## Limitations / future scope

This submission deliberately implements a reliable local/REST watchlist **rather than fabricate live advisories**. Integrating real security feeds would require a server, trusted APIs, source normalization, matching by product/version, and error handling. It is also not a production vulnerability scanner. A later project could use a verified CVE feed or integrate a secured backend and user accounts.
