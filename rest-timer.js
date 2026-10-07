(function (global) {
  'use strict';
  const states = new Map();
  const views = new Map();
  let activeKey = null;
  let interval = null;
  let audioContext = null;
  let noticeState = null;
  let bannerView = null;

  function duration(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? Math.max(1, Math.round(n)) : fallback;
  }
  function format(seconds) {
    return Math.floor(seconds / 60).toString().padStart(2, '0') + ':' +
      (seconds % 60).toString().padStart(2, '0');
  }
  function unlockSound() {
    try {
      const Audio = global.AudioContext || global.webkitAudioContext;
      if (!Audio) return;
      if (!audioContext) audioContext = new Audio();
      if (audioContext.state === 'suspended') audioContext.resume().catch(function () {});
    } catch (_) { /* Sound is optional. */ }
  }
  function beep() {
    try {
      if (!audioContext || audioContext.state !== 'running') return;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.frequency.value = 660;
      gain.gain.setValueAtTime(0.12, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (_) { /* Text remains the completion signal. */ }
  }
  function stopInterval() {
    if (interval !== null) global.clearInterval(interval);
    interval = null;
  }
  function finish(state) {
    state.remaining = 0;
    state.deadline = null;
    state.status = 'finished';
    noticeState = state;
    if (activeKey === state.key) activeKey = null;
    stopInterval();
    if (state.sound) beep();
  }
  function updateClock(state) {
    if (state.status !== 'running') return;
    state.remaining = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
    if (!state.remaining) finish(state);
  }
  function paint() {
    views.forEach(function (view, container) {
      if (!container.isConnected) { views.delete(container); return; }
      const state = view.state;
      view.clock.textContent = format(state.remaining);
      view.start.textContent = state.status === 'running' ? 'Pausar' :
        state.status === 'paused' ? 'Retomar' : 'Iniciar';
      const message = state.status === 'finished' ? 'Descanso concluído.' :
        state.status === 'paused' ? 'Descanso pausado.' :
        state.status === 'running' ? 'Descanso em andamento.' : 'Pronto para descansar.';
      if (view.live.textContent !== message) view.live.textContent = message;
      view.sound.checked = state.sound;
      if (view.select) view.select.value = String(state.duration);
    });
    const banner = document.getElementById('active-rest');
    if (banner) {
      if (!bannerView || bannerView.root !== banner) {
        const clock = element('span');
        clock.setAttribute('aria-live', 'off');
        const status = element('span');
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-atomic', 'true');
        banner.setAttribute('aria-live', 'off');
        banner.replaceChildren(clock, status);
        bannerView = { root: banner, clock: clock, status: status };
      }
      const state = activeKey === null ? noticeState : states.get(activeKey);
      banner.hidden = !state;
      bannerView.clock.textContent = state && state.status !== 'finished' ?
        'Descanso · ' + state.name + ' · ' + format(state.remaining) + ' ' : '';
      const message = !state ? '' : state.status === 'finished' ?
        'Descanso concluído: ' + state.name + '.' : state.status === 'paused' ?
        'Descanso pausado: ' + state.name + '.' : 'Descanso em andamento: ' + state.name + '.';
      if (bannerView.status.textContent !== message) bannerView.status.textContent = message;
    }
  }
  function tick() {
    if (activeKey !== null) updateClock(states.get(activeKey));
    paint();
  }
  function pause(state) {
    updateClock(state);
    if (state.status === 'running') {
      state.status = 'paused';
      noticeState = state;
      state.deadline = null;
      activeKey = null;
      stopInterval();
    }
  }
  function start(state) {
    tick();
    if (activeKey !== null && activeKey !== state.key) pause(states.get(activeKey));
    if (!state.remaining) state.remaining = state.duration;
    state.status = 'running';
    noticeState = null;
    state.deadline = Date.now() + state.remaining * 1000;
    activeKey = state.key;
    if (state.sound) unlockSound();
    stopInterval();
    interval = global.setInterval(tick, 250);
    paint();
  }
  function reset(state) {
    if (state.status === 'running') pause(state);
    state.remaining = state.duration;
    state.deadline = null;
    state.status = 'idle';
    if (noticeState === state) noticeState = null;
    paint();
  }
  function adjust(state, amount) {
    updateClock(state);
    state.remaining = Math.max(0, state.remaining + amount);
    if (state.status === 'running') {
      state.deadline = Date.now() + state.remaining * 1000;
      if (!state.remaining) finish(state);
    } else if (state.remaining && state.status === 'finished') {
      state.status = 'paused';
      noticeState = state;
    }
    paint();
  }
  function element(tag, text) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  }
  function mount(container, key, seconds, options) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container || typeof container.replaceChildren !== 'function') {
      throw new TypeError('RestTimer.mount requer um elemento de destino.');
    }
    options = options || {};
    tick();
    let state = states.get(key);
    if (!state) {
      state = { key: key, duration: duration(seconds, 90), remaining: duration(seconds, 90),
        deadline: null, status: 'idle', sound: false, name: options.name || 'Exercício' };
      states.set(key, state);
    }
    if (options.name) state.name = String(options.name);
    const root = element('section');
    root.className = 'rest-timer';
    root.setAttribute('aria-label', 'Descanso de ' + state.name);
    const clock = element('output', format(state.remaining));
    clock.className = 'rest-timer-clock';
    clock.setAttribute('aria-label', 'Tempo restante');
    clock.setAttribute('aria-live', 'off');
    const controls = element('div');
    controls.className = 'rest-timer-controls';
    function button(text, action) {
      const node = element('button', text);
      node.type = 'button';
      node.addEventListener('click', action);
      controls.appendChild(node);
      return node;
    }
    const startButton = button('Iniciar', function () {
      if (state.status === 'running') { pause(state); paint(); } else start(state);
    });
    button('Reiniciar', function () { reset(state); });
    button('−15 s', function () { adjust(state, -15); });
    button('+15 s', function () { adjust(state, 15); });
    root.appendChild(clock);
    let select = null;
    if (Array.isArray(options.durations) && options.durations.length) {
      const label = element('label', 'Duração do descanso ');
      select = element('select');
      const choices = options.durations.map(function (value) {
        return { seconds: duration(typeof value === 'object' ? value.seconds : value, state.duration),
          label: typeof value === 'object' ? value.label : null };
      });
      if (!choices.some(function (value) { return value.seconds === state.duration; })) {
        choices.push({ seconds: state.duration });
      }
      choices.forEach(function (value) {
        const option = element('option', value.label || format(value.seconds));
        option.value = String(value.seconds);
        select.appendChild(option);
      });
      select.value = String(state.duration);
      select.addEventListener('change', function () {
        state.duration = duration(select.value, state.duration);
        reset(state);
      });
      label.appendChild(select);
      root.appendChild(label);
    }
    root.appendChild(controls);
    const soundLabel = element('label');
    const sound = element('input');
    sound.type = 'checkbox';
    sound.checked = state.sound;
    sound.addEventListener('change', function () {
      state.sound = sound.checked;
      if (state.sound) unlockSound();
      paint();
    });
    soundLabel.appendChild(sound);
    soundLabel.appendChild(document.createTextNode(' Som ao terminar'));
    root.appendChild(soundLabel);
    const live = element('p');
    live.className = 'rest-timer-status';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    root.appendChild(live);
    container.replaceChildren(root);
    const view = { state: state, clock: clock, start: startButton, live: live, sound: sound, select: select };
    views.set(container, view);
    paint();
    return { dispose: function () { if (views.get(container) === view) views.delete(container); } };
  }
  function dispose(container) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (container) views.delete(container);
    else views.clear();
  }
  document.addEventListener('visibilitychange', tick);
  global.addEventListener('focus', tick);
  global.RestTimer = { mount: mount, dispose: dispose, tick: tick };
})(window);
