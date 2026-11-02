import test from 'node:test';
import assert from 'node:assert/strict';
import { createLocalAdapter, createServerAdapter, STORAGE_KEY } from '../src/lib/storage.js';

function fakeStorage(){ const db = new Map(); return {getItem:key=>db.has(key)?db.get(key):null,setItem:(key,val)=>db.set(key,val), get raw(){return db;}}; }
test('local storage reads initial seed without overwriting later user changes', async () => {
  const store = fakeStorage(), adapter = createLocalAdapter(store);
  const first = await adapter.list();
  assert.equal(first.length, 6);
  assert.ok(store.getItem(STORAGE_KEY));
  const again = await adapter.list();
  assert.deepEqual(first, again);
});
test('local storage CRUD creates, reads, updates and deletes a persistent record', async () => {
  const store = fakeStorage(), db = createLocalAdapter(store);
  const created = await db.create({name:'Kubernetes',vendor:'CNCF',version:'1.31',environment:'Production',priority:'High',monitored:true});
  assert.ok(created.id && created.createdAt);
  assert.equal((await db.list()).length,7);
  const freshAdapter = createLocalAdapter(store);
  assert.equal((await freshAdapter.list()).find(a=>a.id===created.id).name,'Kubernetes');
  const updated = await freshAdapter.update(created.id, {name:'Kubernetes Enterprise', priority:'Critical'});
  assert.equal(updated.id,created.id);
  assert.equal(updated.priority,'Critical');
  assert.equal((await db.list()).find(a=>a.id===created.id).name,'Kubernetes Enterprise');
  await db.remove(created.id);
  assert.equal((await freshAdapter.list()).length,6);
});
test('deleting a missing record reports failure without altering data', async () => {
  const adapter = createLocalAdapter(fakeStorage());
  await assert.rejects(()=>adapter.remove('missing-id'), /no longer exists/);
  assert.equal((await adapter.list()).length,6);
});
test('reset restores exact seed records', async () => {
  const db = createLocalAdapter(fakeStorage());
  await db.remove('asset-101');
  assert.equal((await db.list()).length,5);
  assert.equal((await db.reset()).length,6);
});
test('malformed stored data triggers a readable error', async () => {
  const store = fakeStorage();store.setItem(STORAGE_KEY, JSON.stringify({bad:true}));
  await assert.rejects(()=>createLocalAdapter(store).list(), /invalid format/);
});
test('JSON Server adapter issues GET POST PATCH DELETE to appropriate endpoints', async () => {
  const calls=[]; const storage=[];
  const fakeFetch = async (url,options={}) => {
    calls.push({url,method:options.method||'GET'});
    let body=null;
    const id=decodeURIComponent(url.split('/').at(-1));
    if(!options.method) body=storage;
    if(options.method==='POST') {body=JSON.parse(options.body);storage.push(body);}
    if(options.method==='PATCH') {const record=storage.find(r=>r.id===id);Object.assign(record,JSON.parse(options.body));body=record;}
    if(options.method==='DELETE') {storage.splice(storage.findIndex(r=>r.id===id),1);body={};}
    return {ok:true,status:200,json:async()=>structuredClone(body)};
  };
  const db=createServerAdapter(fakeFetch);
  assert.deepEqual(await db.list(),[]);
  const asset=await db.create({name:'OpenSSL',version:'3.3.0'});
  assert.ok(asset.id);
  assert.equal((await db.list()).length,1);
  assert.equal((await db.update(asset.id,{priority:'Critical'})).priority,'Critical');
  await db.remove(asset.id);
  assert.equal((await db.list()).length,0);
  assert.deepEqual(calls.map(x=>x.method),['GET','POST','GET','PATCH','DELETE','GET']);
  assert.ok(calls.every(x=>x.url.startsWith('http://localhost:3001/assets')));
});
test('JSON Server adapter provides a useful connection error', async () => {
  const db=createServerAdapter(async()=>{throw Error('connection refused');});
  await assert.rejects(()=>db.list(),/npm run server/);
});
