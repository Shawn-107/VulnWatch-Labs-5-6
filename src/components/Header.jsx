import React, { useState } from 'react';
import Icon from './Icon.jsx';
const links = [['#home','Overview'], ['#watchlist','Watchlist'], ['#signals','Signals'], ['#radar','Local radar'], ['#priority','Priority lab']];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <nav className="nav-shell" aria-label="Main navigation">
      <a className="brand" href="#home" onClick={() => setOpen(false)}><span className="brand-symbol"><span/></span><span>VulnWatch<small>INTELLIGENCE WORKSPACE</small></span></a>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <div className="nav-right"><span className="online-indicator"/><span className="online-text">LAB ENVIRONMENT</span><a className="nav-cta" href="#watchlist">Open workspace <Icon name="arrow" size={14}/></a></div>
      <button className="mobile-menu icon-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'x' : 'menu'} /></button>
    </nav>
  </header>;
}
