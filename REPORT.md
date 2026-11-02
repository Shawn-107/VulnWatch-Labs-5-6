# Lab Exercises 5 & 6 — Domain-Based React Application
**Project:** VulnWatch — Software Vulnerability Intelligence Workspace  
**Domain:** Cybersecurity  
**Frontend:** React 18, JSX, Vite, CSS  
**Storage:** Local Storage (default); JSON Server with REST operations (optional)

## Objective
Convert the pre-existing VulnWatch HTML/CSS/JavaScript concept from Labs 2–4 into a modular React application using JSX, reusable functional components, React hooks, events and forms. Extend the software-watchlist module to deliver persistent Create, Read, Update and Delete (CRUD) operations.

## Development and architecture
The application has nine primary UI components: Header, Hero, SummaryMetrics, Watchlist, SoftwareForm, SignalFeed, LocalRadar, PriorityLab and Icon. `App.jsx` maintains application records, persistence status and notifications using `useState`; `useMemo` computes summary metrics; `useCallback` and `useEffect` manage loading and side effects. A storage adapter in `src/lib/storage.js` switches between browser Local Storage and JSON Server REST methods. Pure reusable functions in `src/lib/records.js` provide validation, record filtering, signal matching and a teaching risk-score calculation. CSS media queries maintain a responsive interface.

## Features demonstrated
**Lab 5 — React foundations:** Functional JSX components; `useState`; events for search, buttons and sliders; multiple controlled form inputs; radio-button priority selection; category, environment and storage dropdowns; checkbox monitoring status; reusable components; responsive CSS.

**Lab 6 — Persistent CRUD:** Create a record from the form; read and dynamically render the watchlist; update records through an editor; delete through an explicit confirmation step. Record names, vendor, version, environment, priority and optional owner/notes are stored. Search/filter is supported as a bonus. Browser data survives reloads. Optional JSON Server reads/writes `db.json` using GET, POST, PATCH and DELETE.

## Tests and results
Fifteen Node tests passed, covering required-field and duplicate validation, search and filtering, monitoring summary, alert matching, priority-score boundaries, browser persistence, create/read/update/delete behavior, restoring samples, invalid stored-data rejection, REST adapter method routing, connection failure handling and real HTTP CRUD against a temporary test service. JSX syntax was parsed across all React source files with zero syntax errors; CSS parsing succeeded. **Limitation:** A full Vite production build and browser rendering test could not be executed inside the authoring environment because npm package download was unavailable. Run `npm install && npm run build` on a machine with internet access to verify the production build.

## Result and limitations
VulnWatch now has a functional component-based React source implementation with persistent CRUD, data validation, filter/search interactions and educational cybersecurity modules. The earlier HTML referenced live threat endpoints without providing the server implementation; this submission intentionally labels its example alerts as learning scenarios and does not falsely claim real CVE, IP reputation or live threat data. This is a laboratory prototype, not a production scanner or authenticated enterprise service.

## Conclusion
The exercise demonstrates a practical progression from a static and imperative JavaScript site to an organized, reusable React interface with persistent records and REST-oriented data operations. A future version could integrate verified security feeds, vendor/version matching, authentication and a secured backend.
