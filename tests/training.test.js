const test=require('node:test');
const assert=require('node:assert/strict');
global.window={};require('../workout-data.js');const workouts=window.WORKOUTS;
const M=require('../training-model.js');
test('24 registros em seis semanas, quatro treinos por semana',()=>{
  const sessions=Array.from({length:24},(_,i)=>M.session(i));
  assert.equal(sessions[4].workout,0);assert.equal(sessions[5].workout,1);
  assert.equal(sessions[23].week,6);assert.equal(sessions[23].workout,3);
  assert.equal(new Set(sessions.map(x=>x.index)).size,24);
  assert.equal(M.previous(4),0);assert.equal(M.previous(3),null);
  assert.throws(()=>M.session(24));assert.throws(()=>M.session(-1));
});
test('ficha completa, séries e descansos prescritos, vídeo em todos os exercícios',()=>{
  assert.deepEqual(workouts.map(w=>w.ex.length),[6,7,5,7]);
  assert.deepEqual(workouts.map(w=>w.ex.reduce((n,e)=>n+e.s,0)),[25,27,21,26]);
  const expected=[
    [[4,6,8,180,180],[4,10,12,120,120],[4,8,10,90,90],[4,12,15,60,90],[5,12,15,60,60],[4,12,15,60,60]],
    [[4,6,8,180,180],[4,8,10,90,90],[4,10,12,60,90],[4,8,10,120,120],[4,12,15,60,60],[4,10,12,60,60],[3,12,15,60,60]],
    [[4,6,8,120,180],[4,8,10,120,120],[4,10,12,90,90],[5,15,20,60,60],[4,12,15,60,60]],
    [[4,6,8,120,120],[4,8,10,120,120],[4,8,10,90,90],[3,10,12,90,90],[4,12,15,60,60],[4,10,12,60,60],[3,10,12,60,60]]
  ];
  assert.deepEqual(workouts.map(w=>w.ex.map(e=>[e.s,e.min,e.max,...e.rest])),expected);
  const ids=[];
  for(const ex of workouts.flatMap(w=>w.ex)){
    ids.push(ex.id);assert.ok(ex.videos.some(v=>v.embed));
    for(const video of ex.videos){assert.equal(new URL(video.url).protocol,'https:');if(video.embed)assert.match(video.embed,/^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]{11}$/);}
  }
  assert.equal(new Set(ids).size,25);
});
test('dados corrompidos não completam séries; notas são tratadas como texto',()=>{
  const w=workouts[0],ex=w.ex[0];
  const d=M.normalize({ex:{[ex.id]:{note:'</textarea><script>bad</script>',sides:{both:[{w:-5,r:'invalid',done:true}]}}}},w);
  assert.equal(d.ex[ex.id].sides.both[0].done,false);assert.equal(M.progress(d,w).done,0);
  assert.equal(M.normalize([],w).ex[ex.id].sides.both.length,4);
});
test('unilateral conta uma série só após ambos lados; progressão exige todas séries',()=>{
  const w=workouts[1],ex=w.ex[1],d=M.normalize(null,w),item=d.ex[ex.id];
  item.sides.left[0]={w:12,r:10,done:true};assert.equal(M.progress(d,w).done,0);
  item.sides.right[0]={w:12,r:10,done:true};assert.equal(M.progress(d,w).done,1);
  assert.equal(M.ready(item,ex),false);
  for(const side of ['left','right'])item.sides[side]=Array.from({length:4},()=>({w:12,r:10,done:true}));
  assert.equal(M.ready(item,ex),true);item.sides.right[3].r=9;assert.equal(M.ready(item,ex),false);
});
