# VulnWatch — Suggested 5–7 Minute Lab Demonstration

**00:00–00:45 | Problem and original domain**  
Show the VulnWatch hero. Explain that Labs 2–4 were HTML/CSS/JavaScript, and Labs 5–6 turn the same cybersecurity concept into a React component-based application with persistent CRUD.

**00:45–01:35 | React structure**  
Open `src/App.jsx`, `SoftwareForm.jsx`, and `Watchlist.jsx`. Explain JSX, components, props, `useState`, `useEffect`, and dynamic summary totals. Point out the CSS theme and responsiveness.

**01:35–02:35 | CREATE and READ**  
At the Watchlist, create an asset: Name `Kubernetes`, Vendor `CNCF`, Version `1.31.0`, Category `Infrastructure`, Environment `Production`, Priority `High`, Team `Platform`, Active monitoring checked. Save and show that the new record appears and totals increase.

**02:35–03:30 | UPDATE and DELETE**  
Edit Kubernetes, change Priority to Critical and Version to `1.31.1`, save. Show updated record, then delete it using the trash action and confirmation dialog. Show reduced record count.

**03:30–04:15 | Dynamic search and filtering**  
Search for `postgres`, filter by Critical and Production. Point out `filterAssets` and component rerendering without reloading the page.

**04:15–05:00 | Persistence and storage**  
Reload in browser mode and show the saved watchlist is unchanged. Optionally run `npm run server`, change storage mode to `REST / JSON Server`, and show `db.json` plus the HTTP methods in `src/lib/storage.js`.

**05:00–05:50 | Additional interactive modules**  
Explore sample signal relevance, expand a signal, adjust the Priority Lab sliders, and explain that scenarios are not live vulnerabilities. Optionally request browser geolocation. Do not claim real threat data is available without a backend.

**05:50–06:30 | Summary and future work**  
Highlight form validation, accessibility labels, browser/mobile responsiveness, tests, and possibilities for future verified vulnerability feed integration.

## Short viva Q&A

**Why React?** Components, props, hooks and declarative rerendering improve code organization and reuse compared to direct DOM manipulation.  
**What does useState do?** Tracks application and form state; updates trigger rerendering.  
**How does CRUD map to HTTP?** GET = Read, POST = Create, PATCH = Update, DELETE = Delete (with JSON Server mode).  
**How is data persistent?** Local Storage retains serialized data across reloads; JSON Server persists to `db.json`.  
**Why use keys in lists?** Stable identifiers help React reconcile changed list entries.  
**How do controlled forms work?** Form inputs reflect React state and use `onChange` handlers to update it.  
**What does the search feature do?** Filters records by name, vendor, version, owner and category, combining the chosen priority and environment filters.  
**Is this a live vulnerability feed?** No; the cybersecurity alert examples are clearly labeled educational fixtures because the prior backend was not supplied.  
**How do you prevent accidental delete?** A confirmation dialog appears before calling the storage adapter's delete action.
