import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAsset, filterAssets, assetSummary, calculatePriority, matchedSignal } from '../src/lib/records.js';
import { seedAssets, sampleSignals } from '../src/data/seed.js';

test('record validation accepts a complete form', () => {
  const data = { name: 'Kubernetes', vendor: 'CNCF', version: '1.30.0', category: 'Infrastructure', environment: 'Production', priority: 'High' };
  assert.deepEqual(validateAsset(data, seedAssets), {});
});
test('record validation catches required fields and duplicate software/version/environment', () => {
  const empty = validateAsset({name:'',vendor:'',version:'',priority:'Other', environment:'Production'});
  assert.ok(empty.name && empty.vendor && empty.version && empty.priority);
  const duplicate = validateAsset({ ...seedAssets[0], id: 'new-id' }, seedAssets);
  assert.match(duplicate.name, /already/);
});
test('search is case-insensitive across name/vendor/version/team', () => {
  assert.equal(filterAssets(seedAssets, 'node').length, 1);
  assert.equal(filterAssets(seedAssets, 'platform team').length, 2);
  assert.equal(filterAssets(seedAssets, 'vErSiOn-that-is-missing').length, 0);
});
test('priority/environment filters combine and order by priority', () => {
  const filtered = filterAssets(seedAssets, '', 'Critical', 'Production');
  assert.deepEqual(filtered.map(x => x.name), ['Node.js','PostgreSQL']);
});
test('summary counts active monitoring, production and critical priorities', () => {
  assert.deepEqual(assetSummary(seedAssets), {total:6, monitored:5, critical:2, production:3, coverage:83});
});
test('sample signals only match actively monitored assets', () => {
  assert.ok(matchedSignal(sampleSignals[0], seedAssets));
  assert.ok(!matchedSignal(sampleSignals[4], seedAssets));
  assert.ok(!matchedSignal({product:'Redis'}, seedAssets));
});
test('priority lab formula remains within 0–10', () => {
  assert.equal(calculatePriority(8,9,7).score,8.2);
  assert.equal(calculatePriority(0,0,0).score,0);
  assert.equal(calculatePriority(10,10,10).score,10);
  assert.equal(calculatePriority(10,10,10).label,'Critical attention');
});
