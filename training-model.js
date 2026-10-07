(function(root){
  'use strict';
  const TOTAL=30;
  function session(index){
    if(!Number.isInteger(index)||index<0||index>=TOTAL)throw new RangeError('Sessão inválida');
    return {index,week:Math.floor(index/5)+1,day:index%5,workout:index%4};
  }
  function previous(index){return index>=4?index-4:null;}
  function normalize(raw,workout){
    const result={ex:{}};
    for(const ex of workout.ex){
      const old=raw&&raw.ex&&raw.ex[ex.id];
      const sides=ex.unilateral?['left','right']:['both'];
      const item={note:typeof old?.note==='string'?old.note:'',sides:{}};
      for(const side of sides){
        item.sides[side]=Array.from({length:ex.s},(_,i)=>{
          const set=old?.sides?.[side]?.[i];
          const validWeight=Number.isFinite(set?.w)&&set.w>=0;
          const validReps=Number.isInteger(set?.r)&&set.r>=1;
          return {w:validWeight?set.w:'',r:validReps?set.r:'',done:set?.done===true&&validWeight&&validReps};
        });
      }
      result.ex[ex.id]=item;
    }
    return result;
  }
  function progress(data,workout){
    let done=0,total=0;
    for(const ex of workout.ex){for(let i=0;i<ex.s;i++){
      total++;const sides=ex.unilateral?['left','right']:['both'];
      if(sides.every(side=>data.ex[ex.id].sides[side][i].done))done++;
    }}
    return {done,total,pct:Math.round(done/total*100)};
  }
  function ready(item,ex){return Object.values(item.sides).every(sets=>sets.length===ex.s&&sets.every(s=>s.done&&s.r>=ex.max&&Number.isFinite(s.w)));}
  const api={TOTAL,session,previous,normalize,progress,ready};
  root.TrainingModel=api;
  if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
