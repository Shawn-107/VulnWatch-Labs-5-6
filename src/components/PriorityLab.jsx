import React, { useState } from 'react';
import { calculatePriority } from '../lib/records.js';
import Icon from './Icon.jsx';
const sliderRows = [
  { key: 'severity', name: 'Base severity', explanation: 'How serious is the underlying issue?' },
  { key: 'exploitation', name: 'Exploit evidence', explanation: 'How strong are signs of exploitation?' },
  { key: 'exposure', name: 'Stack exposure', explanation: 'How exposed is the affected asset?' }
];
export default function PriorityLab() {
  const [values, setValues] = useState({ severity: 8, exploitation: 9, exposure: 7 });
  const result = calculatePriority(values.severity, values.exploitation, values.exposure);
  return <section id="priority" className="section priority-section"><div className="container priority-layout"><div className="priority-copy"><div className="kicker mono">05 / INTERACTIVE PRIORITY LAB</div><h2>Context changes<br/><span>the outcome.</span></h2><p>Explore how severity, exploitation evidence, and exposure combine into a simple weighted priority model. Adjust the sliders to see how the recommendation changes.</p><div className="formula-note"><Icon name="info" size={17}/><span>Illustrative calculation only. Not a CVSS score or real-world threat forecast.</span></div></div>
    <div className="priority-widget"><div className="priority-widget-heading"><span className="mono">SAMPLE PRIORITY MODEL</span><span className="live-chip"><i/> INTERACTIVE</span></div><div className="priority-score-row"><div><div className="score-large mono">{result.score.toFixed(1)}<span> / 10</span></div><div className="score-label">{result.label}</div></div><div className="score-meter"><svg viewBox="0 0 120 120" width="126" height="126" aria-hidden="true"><circle cx="60" cy="60" r="49" stroke="#DCE3ED" strokeWidth="8" fill="none"/><circle cx="60" cy="60" r="49" stroke="#274DC4" strokeWidth="8" fill="none" strokeDasharray={`${result.score / 10 * 307.9} 307.9`} strokeLinecap="round" transform="rotate(-90 60 60)"/><path d="M60 46v16m0 11h.01" stroke="#274DC4" strokeWidth="4" strokeLinecap="round"/></svg></div></div>
    <div className="slider-stack">{sliderRows.map(item => <div className="slider-item" key={item.key}><div className="slider-title"><label htmlFor={`${item.key}-range`}>{item.name}</label><strong className="mono">{values[item.key].toFixed(1)}</strong></div><p>{item.explanation}</p><input id={`${item.key}-range`} type="range" min="0" max="10" step="1" value={values[item.key]} onChange={e => setValues(prev => ({ ...prev, [item.key]: Number(e.target.value) }))} style={{ '--fill': `${values[item.key] * 10}%` }}/></div>)}</div>
    <div className="priority-bottom"><span><Icon name="sliders" size={16}/> WEIGHTED: 45% + 35% + 20%</span><button onClick={() => setValues({severity: 8, exploitation: 9, exposure: 7})}>Reset model <Icon name="refresh" size={13}/></button></div></div>
  </div></section>;
}
