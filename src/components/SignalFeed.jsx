import React, { useMemo, useState } from 'react';
import { sampleSignals } from '../data/seed.js';
import { matchedSignal } from '../lib/records.js';
import Icon from './Icon.jsx';
const options = ['All scenarios','Your stack','Critical','High'];
export default function SignalFeed({ assets }) {
  const [filter, setFilter] = useState('All scenarios'); const [expanded, setExpanded] = useState(null);
  const signals = useMemo(() => sampleSignals.filter(signal => filter === 'All scenarios' || (filter === 'Your stack' && matchedSignal(signal, assets)) || signal.severity === filter), [filter, assets]);
  const matchingCount = sampleSignals.filter(s => matchedSignal(s, assets)).length;
  return <section id="signals" className="section signals-section"><div className="container">
    <div className="section-head signal-section-head"><div><div className="kicker mono">03 / SIGNAL EXPLORER</div><h2>Less noise.<br/><span>More signal.</span></h2></div><div className="section-side"><p>See how a curated signal feed responds to your monitored assets. Expand each scenario to inspect context and possible action.</p><span className="teaching-note"><Icon name="info" size={14}/> EDUCATIONAL FIXTURES · NOT LIVE CVES</span></div></div>
    <div className="signals-panel"><div className="signals-toolbar"><div className="signals-panel-title"><Icon name="radar" size={17}/><strong>Signal intelligence</strong><span className="signal-counter mono">{matchingCount} MATCHES IN YOUR STACK</span></div><div className="signal-tabs" role="group" aria-label="Filter signals">{options.map(v => <button key={v} className={filter === v ? 'selected' : ''} onClick={() => setFilter(v)}>{v}</button>)}</div></div>
    <div className="signal-list">{signals.map(signal => { const match = matchedSignal(signal,assets); const open = expanded === signal.id; return <article className={`signal-record ${open ? 'expanded' : ''}`} key={signal.id}>
      <button className="signal-row" onClick={() => setExpanded(open ? null : signal.id)} aria-expanded={open} aria-controls={`signal-details-${signal.id}`}>
        <span className={`signal-rail ${signal.severity.toLowerCase()}`}/>
        <span className="signal-id mono">{signal.id}<small>{signal.product}</small></span>
        <span className="signal-details-main"><strong>{signal.title}</strong><small>{signal.vector} <span className="dot-sep">·</span> Training scenario</small></span>
        <span className={`match-pill ${match ? 'match' : ''}`}>{match ? 'STACK MATCH' : 'OUTSIDE STACK'}</span>
        <span className={`score-circle ${signal.severity.toLowerCase()}`}>{signal.score.toFixed(1)}</span>
        <span className={`signal-expand ${open ? 'rotated' : ''}`}><Icon name="chevron" size={16}/></span>
      </button>
      {open && <div className="signal-expanded" id={`signal-details-${signal.id}`}><div><span className="expanded-label">WHAT THIS MEANS</span><p>{signal.description}</p></div><div><span className="expanded-label">SUGGESTED NEXT STEP</span><p>{signal.action}</p></div><div><span className="expanded-label">RELEVANCE</span><p>{match ? 'Product name matches a monitored software asset.' : 'No matching, actively monitored software was found.'}</p></div></div>}
      </article>})}</div>
    {!signals.length && <div className="empty-state"><Icon name="search"/><strong>No matching scenarios</strong><p>Change the filter to show other teaching examples.</p></div>}
    <div className="signals-bottom"><span><span className="tiny-square"/> RELEVANCE BASED ON PRODUCT-NAME MATCHING</span><span>NOT A LIVE VULNERABILITY FEED</span></div></div>
  </div></section>;
}
