import React, { useMemo, useState } from 'react';
import { environments, priorities } from '../data/seed.js';
import { filterAssets } from '../lib/records.js';
import Icon from './Icon.jsx';
import SoftwareForm from './SoftwareForm.jsx';

function AssetRow({ asset, onEdit, onDelete }) {
  return <tr data-testid={`asset-${asset.id}`}>
    <td><div className="asset-identity"><span className="asset-letter">{asset.name.substring(0, 2).toUpperCase()}</span><div><strong>{asset.name}</strong><span>{asset.vendor}</span></div></div></td>
    <td><span className="version mono">v{asset.version}</span><span className="asset-category">{asset.category}</span></td>
    <td><span className="environment-label">{asset.environment}</span></td>
    <td><span className={`priority-badge ${asset.priority.toLowerCase()}`}><i/>{asset.priority}</span></td>
    <td><span className={`monitor-state ${asset.monitored ? 'on' : ''}`}><i/>{asset.monitored ? 'Active' : 'Paused'}</span></td>
    <td><div className="row-actions"><button className="icon-button" aria-label={`Edit ${asset.name}`} title={`Edit ${asset.name}`} onClick={() => onEdit(asset)}><Icon name="edit" size={16}/></button><button className="icon-button danger-icon" aria-label={`Delete ${asset.name}`} title={`Delete ${asset.name}`} onClick={() => onDelete(asset)}><Icon name="trash" size={16}/></button></div></td>
  </tr>;
}
export default function Watchlist({ assets, loading, saving, dataMode, setDataMode, error, onSave, onDelete, onReset, refresh }) {
  const [query, setQuery] = useState(''); const [priority, setPriority] = useState('All'); const [environment, setEnvironment] = useState('All');
  const [selected, setSelected] = useState(null); const [pendingDelete, setPendingDelete] = useState(null);
  const filtered = useMemo(() => filterAssets(assets, query, priority, environment), [assets, query, priority, environment]);
  async function save(form) { const success = await onSave(selected?.id || null, form); if (success) setSelected(null); return success; }
  const deleteRecord = async () => { if (!pendingDelete) return; const success = await onDelete(pendingDelete.id); if (success) { if (selected?.id === pendingDelete.id) setSelected(null); setPendingDelete(null); } };
  function edit(asset) { setSelected(asset); document.getElementById('software-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  return <section id="watchlist" className="section watchlist-section"><div className="container">
    <div className="section-head stack-head"><div><div className="kicker mono">02 / SOFTWARE INTELLIGENCE</div><h2>Your stack.<br/><span>Under control.</span></h2></div><div className="section-side"><p>Define what deserves attention. Add technologies, adjust priority, and keep an actionable record of your environment.</p><div className="section-micro"><span className="tiny-square"/> FULL CREATE / READ / UPDATE / DELETE</div></div></div>
    <div className="workspace-layout">
      <div className="workspace-list"><div className="workspace-topbar"><div className="workspace-title"><Icon name="layers" size={18}/><strong>Monitored software</strong><span className="record-count mono">{assets.length} RECORDS</span></div><div className="source-controls"><label htmlFor="data-source">STORAGE</label><select id="data-source" aria-label="Storage mode" value={dataMode} onChange={e => { setDataMode(e.target.value); setSelected(null); }}><option value="local">Browser / Local Storage</option><option value="server">REST / JSON Server</option></select></div></div>
        <div className="search-toolbar"><label className="search-input"><Icon name="search" size={17}/><input data-testid="search-input" type="search" placeholder="Search name, version, team…" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search software"/></label><label className="filter-select"><Icon name="filter" size={14}/><select value={priority} onChange={e => setPriority(e.target.value)} aria-label="Filter by priority"><option>All</option>{priorities.map(v => <option key={v}>{v}</option>)}</select></label><label className="filter-select env-filter"><select value={environment} onChange={e => setEnvironment(e.target.value)} aria-label="Filter by environment"><option>All</option>{environments.map(v => <option key={v}>{v}</option>)}</select></label></div>
        {error && <div className="error-banner" role="alert"><Icon name="alert" size={17}/><span>{error}</span><button type="button" onClick={refresh} aria-label="Retry loading"><Icon name="refresh" size={17}/></button></div>}
        <div className="data-table-scroll"><table className="data-table"><thead><tr><th>Software</th><th>Version / Type</th><th>Environment</th><th>Priority</th><th>Monitor</th><th><span className="visually-hidden">Actions</span></th></tr></thead><tbody>{filtered.map(asset => <AssetRow key={asset.id} asset={asset} onEdit={edit} onDelete={setPendingDelete}/>)}</tbody></table></div>
        {!loading && !filtered.length && <div className="empty-state"><Icon name="search" size={25}/><strong>No matching software</strong><p>{assets.length ? 'Adjust the search or filters to find your record.' : 'Your watchlist is empty. Add a software record to begin.'}</p><button className="text-link" onClick={() => { setQuery('');setPriority('All');setEnvironment('All'); }}>Clear filters</button></div>}
        {loading && <div className="empty-state"><span className="loading-ring"/><strong>Loading records…</strong></div>}
        <div className="table-footer"><span>SHOWING <strong>{filtered.length}</strong> OF <strong>{assets.length}</strong> ASSETS</span><div><span className={`data-dot ${error ? 'error' : ''}`}/>{dataMode === 'local' ? 'PERSISTED LOCALLY' : error ? 'SERVER UNAVAILABLE' : 'JSON SERVER MODE'}</div></div>
        <div className="workspace-note"><Icon name="info" size={17}/><p><strong>Context before volume.</strong> Monitoring priorities are user-assigned; they are not verified CVE severity ratings. The sample signals below are teaching scenarios.</p></div>
        {dataMode === 'local' && <button className="reset-link" type="button" onClick={() => { if (window.confirm('Replace your browser watchlist with the original six sample records? This cannot be undone.')) { onReset(); setSelected(null); } }}><Icon name="refresh" size={14}/> Restore sample watchlist</button>}
      </div>
      <aside id="software-editor" className="form-column"><SoftwareForm selected={selected} records={assets} saving={saving || loading || !!error} onSave={save} onCancel={() => setSelected(null)}/></aside>
    </div>
  </div>
  {pendingDelete && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setPendingDelete(null); }}><div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="dialog-icon"><Icon name="trash" size={22}/></div><h3 id="delete-title">Remove {pendingDelete.name}?</h3><p>This will permanently delete <strong>{pendingDelete.name} v{pendingDelete.version}</strong> from the active watchlist storage. This action cannot be undone.</p><div className="dialog-actions"><button className="button button-ghost" onClick={() => setPendingDelete(null)} disabled={saving}>Keep record</button><button data-testid="confirm-delete" className="button button-danger" disabled={saving} onClick={deleteRecord}>{saving ? 'Deleting…' : 'Delete record'}</button></div></div></div>}
  </section>;
}
