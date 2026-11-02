export const seedAssets = [
  { id: 'asset-101', name: 'React', vendor: 'Meta / Open Source', version: '18.3.1', category: 'Framework', environment: 'Production', priority: 'High', owner: 'Frontend Team', notes: 'Primary application interface', monitored: true, createdAt: '2026-10-21T10:00:00.000Z' },
  { id: 'asset-102', name: 'Node.js', vendor: 'OpenJS Foundation', version: '22.11.0', category: 'Runtime', environment: 'Production', priority: 'Critical', owner: 'Platform Team', notes: 'API application runtime', monitored: true, createdAt: '2026-10-22T10:00:00.000Z' },
  { id: 'asset-103', name: 'PostgreSQL', vendor: 'PostgreSQL Global Development Group', version: '16.4', category: 'Database', environment: 'Production', priority: 'Critical', owner: 'Database Team', notes: 'Main application datastore', monitored: true, createdAt: '2026-10-23T10:00:00.000Z' },
  { id: 'asset-104', name: 'NGINX', vendor: 'F5 / NGINX', version: '1.26.2', category: 'Infrastructure', environment: 'Staging', priority: 'High', owner: 'Infrastructure', notes: 'Reverse proxy and ingress', monitored: true, createdAt: '2026-10-24T10:00:00.000Z' },
  { id: 'asset-105', name: 'Docker', vendor: 'Docker Inc.', version: '27.3.1', category: 'Tooling', environment: 'Development', priority: 'Medium', owner: 'DevOps', notes: 'Container build and test environment', monitored: true, createdAt: '2026-10-25T10:00:00.000Z' },
  { id: 'asset-106', name: 'Redis', vendor: 'Redis Ltd.', version: '7.4.1', category: 'Database', environment: 'Staging', priority: 'Low', owner: 'Platform Team', notes: 'Non-production cache layer', monitored: false, createdAt: '2026-10-26T10:00:00.000Z' }
];

// Teaching fixtures, not verified CVEs. These IDs must never be presented as live vulnerability identifiers.
export const sampleSignals = [
  { id: 'LAB-ALERT-001', product: 'Node.js', severity: 'Critical', score: 9.4, title: 'Runtime dependency exposure scenario', description: 'Training example: review a hypothetical high-impact dependency issue and assess the affected service.', vector: 'Runtime / dependency', action: 'Audit dependencies and verify fixed versions with the vendor.' },
  { id: 'LAB-ALERT-002', product: 'PostgreSQL', severity: 'High', score: 8.1, title: 'Database privilege review scenario', description: 'Training example: investigate configuration and access-control posture around an application database.', vector: 'Access control', action: 'Review database roles, exposure, and change control.' },
  { id: 'LAB-ALERT-003', product: 'NGINX', severity: 'High', score: 7.6, title: 'Reverse proxy hardening scenario', description: 'Training example: examine an edge service deployment for outdated defaults and unsafe rules.', vector: 'Network / configuration', action: 'Review proxy rules, patch policy, and public exposure.' },
  { id: 'LAB-ALERT-004', product: 'Docker', severity: 'Medium', score: 6.3, title: 'Container isolation review scenario', description: 'Training example: evaluate container privilege boundaries and image hygiene.', vector: 'Container / runtime', action: 'Review runtime permissions and scan images.' },
  { id: 'LAB-ALERT-005', product: 'OpenSSH', severity: 'Critical', score: 9.1, title: 'Remote access audit scenario', description: 'Training example: an unrelated high-severity issue should remain outside your monitored stack.', vector: 'Remote access', action: 'Check applicability before escalating.' }
];
export const categories = ['Framework', 'Runtime', 'Database', 'Infrastructure', 'Tooling', 'Other'];
export const environments = ['Production', 'Staging', 'Development', 'Testing'];
export const priorities = ['Low', 'Medium', 'High', 'Critical'];
