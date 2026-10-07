// Ficha fornecida pelo usuário. Descansos em segundos; séries unilaterais por lado.
// Links diretos de bibliotecas demonstrativas, verificados em 06/10/2026.
window.WORKOUTS = [
  {
    id: 'a', label: 'A', name: 'Lower A', groups: 'Quadríceps · Panturrilhas · Abs',
    ex: [
      {id:'a-agachamento',n:'Agachamento livre com barra',s:4,min:6,max:8,rest:[180,180],unilateral:false,note:'',videos:[{label:'Agachamento com barra · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/squat.html'}]},
      {id:'a-leg-press',n:'Leg press 45°',s:4,min:10,max:12,rest:[120,120],unilateral:false,note:'',videos:[{label:'Leg press 45° · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/45-degree-leg-press.html'}]},
      {id:'a-bulgaro',n:'Búlgaro com halteres',s:4,min:8,max:10,rest:[90,90],unilateral:true,note:'8–10 repetições por perna.',videos:[{label:'Búlgaro com halteres · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/one-leg-dumbbell-squat-aka-bulgarian-squat.html'}]},
      {id:'a-extensora',n:'Cadeira extensora',s:4,min:12,max:15,rest:[60,90],unilateral:false,note:'Última série com drop-set.',videos:[{label:'Extensora · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/leg-extension.html'}]},
      {id:'a-panturrilha',n:'Panturrilha no leg press ou em pé',s:5,min:12,max:15,rest:[60,60],unilateral:false,note:'Pausa de 2 segundos no alongamento. Escolha uma das alternativas.',videos:[{label:'Panturrilha no leg press · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/45-degress-calf-press.html'},{label:'Panturrilha em pé · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/standing-machine-calf-raise'}]},
      {id:'a-elevacao-pernas',n:'Elevação de pernas na barra fixa',s:4,min:12,max:15,rest:[60,60],unilateral:false,note:'',videos:[{label:'Elevação de pernas suspensa · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/hanging-leg-raise.html'}]}
    ]
  },
  {
    id: 'b', label: 'B', name: 'Upper A · Push', groups: 'Peito · Ombro · Tríceps',
    ex: [
      {id:'b-supino-reto',n:'Supino reto com halteres',s:4,min:6,max:8,rest:[180,180],unilateral:false,note:'',videos:[{label:'Supino reto com halteres · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/dumbbell-bench-press.html'}]},
      {id:'b-supino-inclinado',n:'Supino inclinado unilateral com halter (30°)',s:4,min:8,max:10,rest:[90,90],unilateral:true,note:'Banco a 30°. 8–10 repetições por lado. O vídeo demonstra a execução unilateral; mantenha o ângulo da ficha.',videos:[{label:'Supino inclinado unilateral · NASM',url:'https://www.youtube.com/watch?v=iJ-GwVeUuCg',embed:'https://www.youtube-nocookie.com/embed/iJ-GwVeUuCg'}]},
      {id:'b-crossover',n:'Crossover na polia',s:4,min:10,max:12,rest:[60,90],unilateral:false,note:'',videos:[{label:'Crossover · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/cable-crossovers.html'}]},
      {id:'b-desenvolvimento',n:'Desenvolvimento militar com halteres sentado',s:4,min:8,max:10,rest:[120,120],unilateral:false,note:'',videos:[{label:'Desenvolvimento sentado com halteres · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/seated-dumbbell-press.html'}]},
      {id:'b-elevacao-lateral',n:'Elevação lateral na polia',s:4,min:12,max:15,rest:[60,60],unilateral:false,note:'',videos:[{label:'Elevação lateral na polia · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html'}]},
      {id:'b-triceps-testa',n:'Tríceps testa',s:4,min:10,max:12,rest:[60,60],unilateral:false,note:'',videos:[{label:'Tríceps testa com barra · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/lying-tricep-extension.html'}]},
      {id:'b-triceps-corda',n:'Tríceps corda',s:3,min:12,max:15,rest:[60,60],unilateral:false,note:'Última série com rest-pause.',videos:[{label:'Tríceps corda · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/rope-tricep-extension.html'}]}
    ]
  },
  {
    id: 'c', label: 'C', name: 'Lower B', groups: 'Posterior · Glúteos · Panturrilhas',
    ex: [
      {id:'c-stiff-rdl',n:'Stiff / RDL',s:4,min:6,max:8,rest:[120,180],unilateral:false,note:'A demonstração apresenta a variação RDL.',videos:[{label:'RDL com barra · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/romanian-deadlift'}]},
      {id:'c-hip-thrust',n:'Hip thrust com barra',s:4,min:8,max:10,rest:[120,120],unilateral:false,note:'',videos:[{label:'Hip thrust com barra · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/barbell-hip-thrust'}]},
      {id:'c-flexora',n:'Cadeira flexora',s:4,min:10,max:12,rest:[90,90],unilateral:false,note:'Última série com rest-pause.',videos:[{label:'Cadeira flexora · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/seated-leg-curl'}]},
      {id:'c-panturrilha',n:'Panturrilha sentado',s:5,min:15,max:20,rest:[60,60],unilateral:false,note:'',videos:[{label:'Panturrilha sentado · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/seated-calf-raise.html'}]},
      {id:'c-crunch',n:'Crunch na polia com carga',s:4,min:12,max:15,rest:[60,60],unilateral:false,note:'',videos:[{label:'Crunch na polia · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/cable-crunch.html'}]}
    ]
  },
  {
    id: 'd', label: 'D', name: 'Upper B · Pull', groups: 'Costas · Posterior de ombro · Braços',
    ex: [
      {id:'d-barra-fixa',n:'Barra fixa',s:4,min:6,max:8,rest:[120,120],unilateral:false,note:'A demonstração apresenta a variação com pegada pronada aberta.',videos:[{label:'Barra fixa · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/wide-grip-pull-up.html'}]},
      {id:'d-remada-curvada',n:'Remada curvada com barra pronada',s:4,min:8,max:10,rest:[120,120],unilateral:false,note:'Pegada pronada.',videos:[{label:'Remada curvada com barra · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/bent-over-barbell-row.html'}]},
      {id:'d-puxada',n:'Puxada alta unilateral ou pegada neutra',s:4,min:8,max:10,rest:[90,90],unilateral:true,note:'8–10 repetições por lado na opção unilateral. A alternativa com pegada neutra é bilateral.',videos:[{label:'Puxada unilateral · Catalyst Athletics',url:'https://www.catalystathletics.com/exercise/895/Single-Arm-Pulldown/'},{label:'Puxada com pegada neutra · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/close-grip-pull-down.html'}]},
      {id:'d-serrote',n:'Serrote com halter',s:3,min:10,max:12,rest:[90,90],unilateral:true,note:'10–12 repetições por lado.',videos:[{label:'Serrote com halter · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/one-arm-dumbbell-row.html'}]},
      {id:'d-crucifixo-invertido',n:'Crucifixo invertido na polia ou com halteres',s:4,min:12,max:15,rest:[60,60],unilateral:false,note:'Escolha uma das alternativas.',videos:[{label:'Crucifixo invertido na polia · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/standing-cable-flys.html'},{label:'Crucifixo invertido com halteres · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/bent-over-dumbbell-reverse-fly.html'}]},
      {id:'d-scott',n:'Rosca Scott unilateral com halter',s:4,min:10,max:12,rest:[60,60],unilateral:true,note:'10–12 repetições por lado.',videos:[{label:'Scott unilateral com halter · Catalyst Athletics',url:'https://www.youtube.com/watch?v=2o7eZf_aF3A',embed:'https://www.youtube-nocookie.com/embed/2o7eZf_aF3A'},{label:'Scott unilateral · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/one-arm-preacher-curl.html'}]},
      {id:'d-concentrada',n:'Rosca concentrada',s:3,min:10,max:12,rest:[60,60],unilateral:true,note:'10–12 repetições por lado.',videos:[{label:'Rosca concentrada · Muscle & Strength',url:'https://www.muscleandstrength.com/exercises/concentration-cur.html'}]}
    ]
  }
];

// IDs extraídos dos players publicados nas bibliotecas de exercícios.
// As páginas externas permanecem disponíveis como alternativa ao player.
(() => {
  const players = {
    'squat.html': 'R2dMsNhN3DE',
    '45-degree-leg-press.html': 'sEM_zo9w2ss',
    'leg-extension.html': '0fl1RRgJ83I',
    '45-degress-calf-press.html': 'RcKQbiL-ZOc',
    'standing-machine-calf-raise': 'RBslMmWqzzE',
    'dumbbell-bench-press.html': 'dGqI0Z5ul4k',
    'cable-crossovers.html': 'DumkKcC_nHI',
    'seated-dumbbell-press.html': 'FRxZ6wr5bpA',
    'one-arm-cable-lateral-raise.html': 'Fv-eAW1uKDI',
    'rope-tricep-extension.html': 'LzwgB15UdO8',
    'romanian-deadlift': '-m45n1_x32E',
    'barbell-hip-thrust': 'lAnqN0J_p5A',
    'seated-leg-curl': '3BWiLFc8Dbg',
    'seated-calf-raise.html': 'Yh5TXz99xwY',
    'wide-grip-pull-up.html': '5oxviYmdHCY',
    'bent-over-barbell-row.html': 'paCfxhgW6bI',
    'close-grip-pull-down.html': 'uAyrz5GTEHg',
    'one-arm-dumbbell-row.html': 'YZgVEy6cmaY',
    'standing-cable-flys.html': 'XG78cUVtKYY',
    'bent-over-dumbbell-reverse-fly.html': 'Fgz_FdzDukE',
    'concentration-cur.html': 'LHDwya1KY8M'
  };
  window.WORKOUTS.forEach(workout => workout.ex.forEach(exercise => {
    exercise.videos.forEach(video => {
      const slug = new URL(video.url).pathname.split('/').filter(Boolean).pop();
      if (players[slug]) video.embed = `https://www.youtube-nocookie.com/embed/${players[slug]}`;
      if (video.url.includes('/exercise/895/Single-Arm-Pulldown/')) {
        video.embed = 'https://www.youtube-nocookie.com/embed/c45EAfSrvFo';
      }
    });
  }));

  // Fontes alternativas verificadas quando o player da página original não era acessível.
  const alternatives = {
    'a-bulgaro': {label:'Búlgaro com halteres · NASM',url:'https://www.youtube.com/watch?v=hbw7hdyOpq0',embed:'https://www.youtube-nocookie.com/embed/hbw7hdyOpq0'},
    'a-elevacao-pernas': {label:'Elevação de pernas suspensa · Catalyst Athletics',url:'https://www.catalystathletics.com/exercise/45/Hanging-Leg-Raise/',embed:'https://www.youtube-nocookie.com/embed/PjlPiVTtWA4'},
    'b-triceps-testa': {label:'Tríceps testa com barra · Fitness Volt',url:'https://www.youtube.com/watch?v=L3i8EZ7gQb0',embed:'https://www.youtube-nocookie.com/embed/L3i8EZ7gQb0'},
    'c-crunch': {label:'Crunch na polia · Bodybuilding.com',url:'https://www.youtube.com/watch?v=3qjoXDTuyOE',embed:'https://www.youtube-nocookie.com/embed/3qjoXDTuyOE'}
  };
  window.WORKOUTS.forEach(workout => workout.ex.forEach(exercise => {
    if (alternatives[exercise.id]) exercise.videos.unshift(alternatives[exercise.id]);
  }));
})();
