import React, { useEffect, useState } from 'react';
import { categories, environments, priorities } from '../data/seed.js';
import { validateAsset } from '../lib/records.js';
import Icon from './Icon.jsx';
const empty = { name: '', vendor: '', version: '', category: 'Framework', environment: 'Production', priority: 'Medium', owner: '', notes: '', monitored: true };
export default function SoftwareForm({ selected, records, saving, onSave, onCancel }) {
  const [form, setForm] = useState(selected || empty);
  const [errors, setErrors] = useState({});
  useEffect(() => { setForm(selected ? { ...selected } : { ...empty }); setErrors({}); }, [selected]);
  const change = event => { const { name, type, checked, value } = event.target; setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); setErrors(prev => ({ ...prev, [name]: undefined })); };
  async function submit(event) {
    event.preventDefault();
    const nextErrors = validateAsset(form, records);
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    const success = await onSave(form);
    if (success && !selected) { setForm({ ...empty }); setErrors({}); }
  }
  return <form className="asset-form" onSubmit={submit} noValidate aria-label={selected ? 'Edit software form' : 'Add software form'}>
    <div className="form-heading"><div><span className="eyebrow small"><span className="eyebrow-line"/>{selected ? 'EDIT RECORD' : 'CREATE RECORD'}</span><h3>{selected ? 'Update software.' : 'Add to your stack.'}</h3></div><span className="form-icon"><Icon name={selected ? 'edit' : 'plus'} size={19}/></span></div>
    <p className="form-intro">{selected ? 'Edit the selected asset. Changes are saved to your active data source.' : 'Register a technology you rely on and assign its monitoring context.'}</p>
    <div className="form-grid">
      <label className="field field-full"><span>Software name <b>*</b></span><input data-testid="name-input" name="name" placeholder="e.g. Kubernetes" value={form.name} onChange={change} aria-invalid={!!errors.name} maxLength={65}/>{errors.name && <small className="field-error" role="alert">{errors.name}</small>}</label>
      <label className="field field-full"><span>Vendor / maintainer <b>*</b></span><input name="vendor" placeholder="e.g. CNCF" value={form.vendor} onChange={change} aria-invalid={!!errors.vendor}/>{errors.vendor && <small className="field-error" role="alert">{errors.vendor}</small>}</label>
      <label className="field"><span>Version <b>*</b></span><input name="version" placeholder="e.g. 1.31.0" value={form.version} onChange={change} aria-invalid={!!errors.version}/>{errors.version && <small className="field-error" role="alert">{errors.version}</small>}</label>
      <label className="field"><span>Category</span><select name="category" value={form.category} onChange={change}>{categories.map(v => <option key={v} value={v}>{v}</option>)}</select></label>
      <label className="field"><span>Environment</span><select name="environment" value={form.environment} onChange={change}>{environments.map(v => <option key={v} value={v}>{v}</option>)}</select></label>
      <label className="field"><span>Responsible team</span><input name="owner" placeholder="e.g. Platform" value={form.owner} onChange={change}/></label>
    </div>
    <fieldset className="priority-field"><legend>Monitoring priority <b>*</b></legend><div className="radio-options">{priorities.map(value => <label key={value} className={`radio-pill ${form.priority === value ? 'checked' : ''}`}><input type="radio" name="priority" value={value} checked={form.priority === value} onChange={change}/><span className={`radio-dot ${value.toLowerCase()}`}/>{value}</label>)}</div></fieldset>
    <label className="field field-notes"><span>Operational notes <em>Optional</em></span><textarea name="notes" placeholder="Context, ownership or recommended action…" value={form.notes} onChange={change} rows={3} maxLength={500}/>{errors.notes && <small className="field-error">{errors.notes}</small>}</label>
    <label className="monitor-check"><input type="checkbox" name="monitored" checked={form.monitored} onChange={change}/><span className="checkbox-square"><Icon name="check" size={12}/></span><span><strong>Active monitoring</strong><small>Include this asset in matching signals</small></span></label>
    <div className="form-actions"><button data-testid="save-button" type="submit" disabled={saving} className="button button-primary grow">{saving ? 'Saving…' : selected ? 'Save changes' : 'Add software'}<Icon name={selected ? 'check' : 'arrow'} size={17}/></button>{selected && <button type="button" className="button button-ghost compact" onClick={onCancel}>Cancel</button>}</div>
    <p className="form-footnote"><Icon name="lock" size={13}/> {`Records persist in your selected storage mode.`}</p>
  </form>;
}
