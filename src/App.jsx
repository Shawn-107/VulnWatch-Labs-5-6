import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Icon from './components/Icon.jsx';
import SummaryMetrics from './components/SummaryMetrics.jsx';
import Watchlist from './components/Watchlist.jsx';
import SignalFeed from './components/SignalFeed.jsx';
import LocalRadar from './components/LocalRadar.jsx';
import PriorityLab from './components/PriorityLab.jsx';
import { assetSummary, normalizeName } from './lib/records.js';
import { createLocalAdapter, createServerAdapter } from './lib/storage.js';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [dataMode, setDataMode] = useState('local');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const adapter = useMemo(() => dataMode === 'server' ? createServerAdapter() : createLocalAdapter(window.localStorage), [dataMode]);
  const notify = useCallback((message, type = 'success') => setNotification({ message, type }), []);
  useEffect(() => { if (!notification) return; const timeout = setTimeout(() => setNotification(null), 4500); return () => clearTimeout(timeout); }, [notification]);
  const refresh = useCallback(async () => { setLoading(true); setError(''); try { setAssets(await adapter.list()); } catch (err) { setAssets([]); setError(err.message || 'Could not load records.'); } finally { setLoading(false); } }, [adapter]);
  useEffect(() => { refresh(); }, [refresh]);
  const save = async (id, form) => {
    setSaving(true);setError('');
    const value = { ...form, name: normalizeName(form.name), vendor: normalizeName(form.vendor), version: normalizeName(form.version), owner: normalizeName(form.owner), notes: String(form.notes || '').trim() };
    try { if (id) await adapter.update(id, value); else await adapter.create(value); setAssets(await adapter.list()); notify(id ? `${value.name} updated successfully.` : `${value.name} added to the watchlist.`); return true; }
    catch (err) { setError(err.message || 'Unable to save the record.'); notify('Save failed. Check the storage connection.', 'error'); return false; }
    finally { setSaving(false); }
  };
  const remove = async id => {
    setSaving(true);setError('');
    try { await adapter.remove(id); setAssets(await adapter.list());notify('Software record deleted.');return true; }
    catch (err) { setError(err.message || 'Unable to delete the record.');return false; }
    finally { setSaving(false); }
  };
  const reset = async () => {
    setSaving(true);
    try { const list = await adapter.reset();setAssets(list);setError('');notify('Sample watchlist restored.'); }
    catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };
  const stats = useMemo(() => assetSummary(assets), [assets]);
  return <>
    <Header/>
    <main><Hero stats={stats}/><div className="metrics-wrap"><SummaryMetrics stats={stats}/></div>
      <Watchlist assets={assets} loading={loading} saving={saving} dataMode={dataMode} setDataMode={setDataMode} error={error} onSave={save} onDelete={remove} onReset={reset} refresh={refresh}/>
      <SignalFeed assets={assets}/><LocalRadar/><PriorityLab/>
      <section className="closing-section"><div className="container closing-inner"><div className="brand closing-brand"><span className="brand-symbol"><span/></span>VulnWatch</div><h2>Watch the stack.<br/><em>Not the noise.</em></h2><a className="button button-primary" href="#watchlist">Back to the workspace <Icon name="arrow" size={18}/></a><p>Built as a React CRUD lab. Sample threat scenarios are illustrative, not verified feeds.</p></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><span className="mono">VULNWATCH / LAB EXERCISES 05 & 06</span><span>React · Hooks · CRUD · Persistent Storage</span><a href="#home">Back to top ↑</a></div></footer>
    {notification && <div className={`toast ${notification.type}`} role="status"><Icon name={notification.type === 'error' ? 'alert' : 'check'} size={18}/>{notification.message}<button aria-label="Dismiss notification" onClick={() => setNotification(null)}><Icon name="x" size={15}/></button></div>}
  </>;
}
