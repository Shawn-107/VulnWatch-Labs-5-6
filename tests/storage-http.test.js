import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createServerAdapter } from '../src/lib/storage.js';

test('server CRUD performs real network HTTP requests against an in-process demo REST service', async () => {
  const assets=[];const methods=[];
  const server=http.createServer(async(req,res)=>{
    methods.push(req.method); const url=new URL(req.url,'http://localhost');
    res.setHeader('Content-Type','application/json');
    if(req.method==='GET'){res.end(JSON.stringify(assets));return;}
    let body='';for await(const chunk of req)body+=chunk;
    const id=decodeURIComponent(url.pathname.split('/').at(-1));
    if(req.method==='POST'){const record=JSON.parse(body);assets.push(record);res.statusCode=201;res.end(JSON.stringify(record));return;}
    if(req.method==='PATCH'){const record=assets.find(a=>a.id===id);if(!record){res.statusCode=404;res.end('{}');return;}Object.assign(record,JSON.parse(body));res.end(JSON.stringify(record));return;}
    if(req.method==='DELETE'){const index=assets.findIndex(a=>a.id===id);if(index===-1){res.statusCode=404;res.end('{}');return;}assets.splice(index,1);res.end('{}');return;}
    res.statusCode=405;res.end('{}');
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const {port}=server.address();
  const routedFetch=(url, options)=>fetch(url.replace('http://localhost:3001',`http://127.0.0.1:${port}`),options);
  try{
    const adapter=createServerAdapter(routedFetch);
    assert.deepEqual(await adapter.list(),[]);
    const created=await adapter.create({name:'Kubernetes',version:'1.31.0',environment:'Production',priority:'High'});
    assert.ok(created.id);
    assert.equal((await adapter.list())[0].name,'Kubernetes');
    assert.equal((await adapter.update(created.id,{priority:'Critical'})).priority,'Critical');
    await adapter.remove(created.id);
    assert.equal((await adapter.list()).length,0);
    assert.deepEqual(methods,['GET','POST','GET','PATCH','DELETE','GET']);
  }finally{await new Promise((resolve,reject)=>server.close(err=>err?reject(err):resolve()));}
});
