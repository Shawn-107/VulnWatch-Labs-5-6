import { priorities } from '../data/seed.js';

export function normalizeName(value = '') {
  return String(value).trim().replace(/\s+/g, ' ');
}
export function validateAsset(asset, existing = []) {
  const errors = {};
  if (!normalizeName(asset.name)) errors.name = 'Software name is required.';
  else if (normalizeName(asset.name).length > 65) errors.name = 'Use 65 characters or fewer.';
  if (!normalizeName(asset.vendor)) errors.vendor = 'Vendor or maintainer is required.';
  if (!normalizeName(asset.version)) errors.version = 'A version is required.';
  if (!priorities.includes(asset.priority)) errors.priority = 'Choose a monitoring priority.';
  if (String(asset.notes || '').length > 500) errors.notes = 'Use 500 characters or fewer.';
  const duplicate = existing.some(item => item.id !== asset.id &&
    normalizeName(item.name).toLowerCase() === normalizeName(asset.name).toLowerCase() &&
    normalizeName(item.version).toLowerCase() === normalizeName(asset.version).toLowerCase() &&
    item.environment === asset.environment);
  if (duplicate) errors.name = 'This software/version/environment is already in your watchlist.';
  return errors;
}
export const priorityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };
export function filterAssets(assets, query = '', priority = 'All', environment = 'All') {
  const search = normalizeName(query).toLowerCase();
  return assets.filter(a => (priority === 'All' || a.priority === priority) &&
    (environment === 'All' || a.environment === environment) &&
    (!search || [a.name, a.vendor, a.version, a.owner, a.category, a.environment].some(v => String(v || '').toLowerCase().includes(search))))
    .sort((a, b) => (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0) || a.name.localeCompare(b.name));
}
export function assetSummary(assets) {
  const monitored = assets.filter(a => a.monitored);
  return {
    total: assets.length,
    monitored: monitored.length,
    critical: monitored.filter(a => a.priority === 'Critical').length,
    production: assets.filter(a => a.environment === 'Production').length,
    coverage: assets.length ? Math.round(monitored.length / assets.length * 100) : 0
  };
}
export function calculatePriority(severity, exploitation, exposure) {
  const score = Math.round((Number(severity) * 0.45 + Number(exploitation) * 0.35 + Number(exposure) * 0.2) * 10) / 10;
  return { score, label: score >= 8 ? 'Critical attention' : score >= 6 ? 'High attention' : score >= 4 ? 'Elevated review' : 'Routine review' };
}
export function matchedSignal(signal, assets) {
  return assets.some(a => a.monitored && normalizeName(a.name).toLowerCase() === signal.product.toLowerCase());
}
