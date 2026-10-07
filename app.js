(function(){
  'use strict';
  const M=TrainingModel, PREFIX='hg6_abcd_v2_', OLD_PREFIX='hg6_v1_';
  const $=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function readRaw(prefix,key){try{return JSON.parse(localStorage.getItem(prefix+key));}catch{return null;}}
  function read(key){return readRaw(PREFIX,key);}
  function readOld(key){return readRaw(OLD_PREFIX,key);}
  let data, timerToast;
  function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(timerToast);timerToast=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
  function store(key,value){try{localStorage.setItem(PREFIX+key,JSON.stringify(value));return true;}catch{toast('Não foi possível salvar. O armazenamento do navegador está indisponível.');return false;}}
  let index=read('state');
  if(!Number.isInteger(index)||index<0||index>=M.TOTAL){
    const old=readOld('state');
    if(Number.isInteger(old)&&old>=0&&old<30){index=Math.floor(old/5)*4+(old%4);store('state',index);}
    else index=0;
  }
  function current(){return WORKOUTS[M.session(index).workout];}
  function legacySession(target){
    const week=Math.floor(target/4)+1, workout=target%4, base=(week-1)*5;
    for(let d=0;d<5;d++){const n=base+d;if(n%4===workout){const old=readOld('session_'+n);if(old)return old;}}
    return null;
  }
  function loadSession(target){const fresh=read('session_'+target);return fresh!==null?fresh:legacySession(target);}
  function save(){return store('session_'+index,data);}
  function progress(){const p=M.progress(data,current());$('progress-fill').style.width=p.pct+'%';$('progress-label').textContent=p.done+'/'+p.total+' séries concluídas · '+p.pct+'%';}
  function renderNav(){
    const s=M.session(index);
    $('weeks').innerHTML=Array.from({length:6},(_,i)=>`<button data-week="${i}" class="${i+1===s.week?'active':''}" aria-pressed="${i+1===s.week}">Semana ${i+1}</button>`).join('');
    $('sessions').innerHTML=WORKOUTS.map((w,i)=>`<button data-workout="${i}" class="${i===s.workout?'active':''}" aria-pressed="${i===s.workout}">Treino ${esc(w.label)}<small>${esc(w.name)}</small></button>`).join('');
    $('previous').disabled=index===0;$('next').disabled=index===M.TOTAL-1;
  }
  function videoHtml(ex){
    return `<div class="video-box"><h4>Vídeo demonstrativo</h4>${ex.videos.map(v=>`<a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">▶ ${esc(v.label)}</a>${v.embed?`<button class="watch-video" data-src="${esc(v.embed)}" data-title="${esc(v.label)}">Assistir aqui</button>`:''}`).join('')}</div>`;
  }
  function rows(ex,side,label){
    return `${label?`<p class="side-title">${label}</p>`:''}<div class="set-labels"><span>#</span><span>Carga (kg)</span><span>Reps · ${ex.min}–${ex.max}</span><span>Feita</span></div>${data.ex[ex.id].sides[side].map((set,i)=>`<div class="set-row"><span>${i+1}</span><input aria-label="${esc(ex.n)} ${label||''} série ${i+1} carga em kg" type="number" min="0" step="0.5" inputmode="decimal" data-ex="${ex.id}" data-side="${side}" data-set="${i}" data-field="w" value="${set.w}"><input aria-label="${esc(ex.n)} ${label||''} série ${i+1} repetições" type="number" min="0" step="1" inputmode="numeric" data-ex="${ex.id}" data-side="${side}" data-set="${i}" data-field="r" value="${set.r}"><button class="complete ${set.done?'done':''}" aria-label="${set.done?'Desmarcar':'Concluir'} ${esc(ex.n)} ${label||''} série ${i+1}" aria-pressed="${set.done}" data-ex="${ex.id}" data-side="${side}" data-set="${i}">${set.done?'✓':'○'}</button></div>`).join('')}`;
  }
  function history(ex){
    const prev=M.previous(index);if(prev===null)return '<p class="history">Primeira sessão deste treino no ciclo.</p>';
    const saved=loadSession(prev);if(!saved)return '<p class="history">Sessão anterior deste treino ainda sem registro.</p>';
    const item=M.normalize(saved,current()).ex[ex.id];
    const lines=Object.entries(item.sides).map(([side,sets])=>`${side==='left'?'Esquerdo: ':side==='right'?'Direito: ':''}${sets.map(s=>s.w!==''||s.r!==''?`${s.w===''?'—':s.w} kg × ${s.r===''?'—':s.r}${s.done?' ✓':''}`:'—').join(' · ')}`);
    return `<p class="history">Última sessão (semana ${M.session(prev).week}):<br>${lines.map(esc).join('<br>')}${M.ready(item,ex)?'<br>Topo da faixa atingido. Se a técnica e a reserva foram adequadas, aumente a menor carga disponível.':''}</p>`;
  }
  function render(){
    RestTimer.dispose();
    const s=M.session(index),w=current();data=M.normalize(loadSession(index),w);
    renderNav();$('session-kicker').textContent=`SEMANA ${s.week} · TREINO ${w.label}`;
    $('session-title').textContent=`Treino ${w.label} — ${w.name}`;$('session-groups').textContent=w.groups;
    $('effort').textContent=['3 em reserva','2–3 em reserva','2 em reserva','1–2 em reserva','1–2 em reserva','1–2 em reserva'][s.week-1];
    $('exercises').innerHTML=w.ex.map((ex,i)=>`<details class="exercise" ${i===0?'open':''}><summary><div><h3>${esc(ex.n)}</h3><div class="meta">${ex.s} × ${ex.min}–${ex.max}${ex.unilateral?' por lado':''} · descanso ${ex.rest.map(v=>v>=60&&v%60===0?v/60+' min':v+'s').filter((v,i,a)=>i===0||v!==a[0]).join('–')}</div></div></summary><div class="exercise-body">${ex.note?`<p class="instruction">${esc(ex.note)}</p>`:''}<div class="tools">${videoHtml(ex)}<div class="timer-host" id="timer-${ex.id}"></div></div>${history(ex)}${ex.unilateral?rows(ex,'left','Lado esquerdo')+rows(ex,'right','Lado direito'):rows(ex,'both','')}<label class="notes-label">Anotações<textarea data-note="${ex.id}" placeholder="Execução, reserva, drop-set ou rest-pause…">${esc(data.ex[ex.id].note)}</textarea></label></div></details>`).join('');
    w.ex.forEach(ex=>RestTimer.mount($('timer-'+ex.id),index+'/'+ex.id,ex.rest[0],{name:ex.n,durations:[...new Set(ex.rest)]}));
    progress();
  }
  function navigate(next){if(next<0||next>=M.TOTAL)return;if(!save())return;index=next;store('state',index);render();window.scrollTo({top:0,behavior:'smooth'});}
  $('weeks').addEventListener('click',event=>{const b=event.target.closest('[data-week]');if(b)navigate(Number(b.dataset.week)*4+M.session(index).workout);});
  $('sessions').addEventListener('click',event=>{const b=event.target.closest('[data-workout]');if(b)navigate((M.session(index).week-1)*4+Number(b.dataset.workout));});
  $('previous').onclick=()=>navigate(index-1);$('next').onclick=()=>navigate(index+1);$('save').onclick=()=>{if(save())toast('Sessão salva neste navegador.');};
  $('guide-toggle').onclick=()=>{const open=$('guide').hidden;$('guide').hidden=!open;$('guide-toggle').setAttribute('aria-expanded',String(open));};
  $('exercises').addEventListener('input',event=>{
    const el=event.target;if(el.dataset.note){data.ex[el.dataset.note].note=el.value;save();return;}
    if(!el.dataset.field)return;
    const n=Number(el.value),valid=el.value!==''&&Number.isFinite(n)&&n>=0&&(el.dataset.field!=='r'||Number.isInteger(n));
    const set=data.ex[el.dataset.ex].sides[el.dataset.side][Number(el.dataset.set)];set[el.dataset.field]=valid?n:'';
    set.done=false;const row=el.closest('.set-row'),btn=row.querySelector('.complete');btn.classList.remove('done');btn.textContent='○';btn.setAttribute('aria-pressed','false');btn.setAttribute('aria-label',btn.getAttribute('aria-label').replace(/^Desmarcar/,'Concluir'));save();progress();
  });
  $('exercises').addEventListener('click',event=>{
    const video=event.target.closest('.watch-video');if(video){let frame=video.parentElement.querySelector('iframe');if(!frame){frame=document.createElement('iframe');frame.allow='fullscreen; picture-in-picture';frame.allowFullscreen=true;video.parentElement.append(frame);}frame.src=video.dataset.src;frame.title=video.dataset.title;return;}
    const btn=event.target.closest('.complete');if(!btn)return;
    const set=data.ex[btn.dataset.ex].sides[btn.dataset.side][Number(btn.dataset.set)];
    if(!set.done&&(set.w===''||set.r===''||set.r<1)){toast('Preencha carga e repetições antes de concluir. Use 0 kg para peso corporal.');return;}
    const before=set.done;set.done=!before;if(!save()){set.done=before;return;}
    btn.classList.toggle('done',set.done);btn.textContent=set.done?'✓':'○';btn.setAttribute('aria-pressed',String(set.done));btn.setAttribute('aria-label',btn.getAttribute('aria-label').replace(/^(Concluir|Desmarcar)/,set.done?'Desmarcar':'Concluir'));progress();
  });
  render();
})();
