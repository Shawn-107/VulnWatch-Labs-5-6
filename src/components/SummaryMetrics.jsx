import React from 'react';
import Icon from './Icon.jsx';
export default function SummaryMetrics({ stats }) {
  const values = [
    { label: 'Assets on watchlist', value: stats.total, sub: 'Tracked software records', icon: 'layers', color: 'blue' },
    { label: 'Active monitoring', value: stats.monitored, sub: `${stats.coverage}% of listed assets`, icon: 'radar', color: 'teal' },
    { label: 'Critical priority', value: stats.critical, sub: 'Assigned by your team', icon: 'alert', color: 'red' },
    { label: 'Production assets', value: stats.production, sub: 'Production environment', icon: 'database', color: 'amber' }
  ];
  return <div className="container summary-grid" aria-label="Watchlist summary">
    {values.map((metric,index) => <div key={metric.label} className="summary-card"><div className="summary-top"><span className="mono summary-index">0{index + 1} / METRIC</span><span className={`summary-icon ${metric.color}`}><Icon name={metric.icon} size={18}/></span></div><div className="summary-value mono">{String(metric.value).padStart(2,'0')}</div><div className="summary-title">{metric.label}</div><div className="summary-sub">{metric.sub}</div></div>)}
  </div>;
}
