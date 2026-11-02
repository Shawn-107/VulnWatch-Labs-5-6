import React from 'react';
const paths = {
  plus: <path d="M12 5v14M5 12h14"/>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
  edit: <><path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m16 4 4 4-9 9-4 1 1-4 8-10Z"/></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  x: <path d="M6 6 18 18M18 6 6 18"/>,
  layers: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 9v11"/></>,
  radar: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="M12 12 18 6"/></>,
  shield: <><path d="M12 2 20 5v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
  alert: <><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5M12 18v.01"/></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 2 18 2 18 0V5M3 12c0 4 18 4 18 0"/></>,
  chevron: <path d="m6 9 6 6 6-6"/>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5 9a8 8 0 0 1 14-2l1 5M4 12l1 5a8 8 0 0 0 14-2"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  crosshair: <><circle cx="12" cy="12" r="8"/><path d="M12 1v6M12 17v6M1 12h6M17 12h6"/></>,
  info: <><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7v.01"/></>,
  external: <><path d="M13 4h7v7M20 4l-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  bolt: <path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z"/>,
  lock: <><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  sliders: <><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></>
};
export default function Icon({ name, size = 18, className = '', ...props }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name] || paths.info}</svg>;
}
