import { seedAssets } from '../data/seed.js';
export const STORAGE_KEY = 'vulnwatch_lab56_assets_v1';
const SERVER = 'http://localhost:3001/assets';
const clone = value => JSON.parse(JSON.stringify(value));
const uid = () => (globalThis.crypto?.randomUUID?.() || `asset-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

export function createLocalAdapter(storage) {
  if (!storage) throw new Error('Local Storage is unavailable in this browser.');
  const read = () => {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) { storage.setItem(STORAGE_KEY, JSON.stringify(seedAssets)); return clone(seedAssets); }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Saved watchlist has an invalid format.');
    return parsed;
  };
  const write = list => { storage.setItem(STORAGE_KEY, JSON.stringify(list)); return clone(list); };
  return {
    async list() { return clone(read()); },
    async create(asset) { const value = { ...asset, id: uid(), createdAt: new Date().toISOString() }; write([...read(), value]); return clone(value); },
    async update(id, asset) { const data = read(); const index = data.findIndex(a => String(a.id) === String(id)); if (index === -1) throw new Error('This record no longer exists.'); data[index] = { ...data[index], ...asset, id: data[index].id }; write(data); return clone(data[index]); },
    async remove(id) { const data = read(); if (!data.some(a => String(a.id) === String(id))) throw new Error('This record no longer exists.'); write(data.filter(a => String(a.id) !== String(id))); },
    async reset() { write(seedAssets); return clone(seedAssets); }
  };
}
export function createServerAdapter(fetchFn = globalThis.fetch) {
  const request = async (url, options) => {
    let response;
    try { response = await fetchFn(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } }); }
    catch { throw new Error('JSON Server is unreachable. Run npm run server in another terminal.'); }
    if (!response.ok) throw new Error(`Database request failed (${response.status}).`);
    return response.status === 204 ? null : response.json();
  };
  return {
    async list() { return request(SERVER); },
    async create(asset) { return request(SERVER, { method: 'POST', body: JSON.stringify({ ...asset, id: uid(), createdAt: new Date().toISOString() }) }); },
    async update(id, asset) { return request(`${SERVER}/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(asset) }); },
    async remove(id) { return request(`${SERVER}/${encodeURIComponent(id)}`, { method: 'DELETE' }); }
  };
}
