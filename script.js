const keys = document.querySelectorAll('.key');
const scoreEl = document.getElementById('score');
const playBtn = document.getElementById('playSeq');

const notes = [
  { note: 'sa', label: 'SA' },
  { note: 're', label: 'RE' },
  { note: 'ga', label: 'GA' },
  { note: 'ma', label: 'MA' },
  { note: 'pa', label: 'PA' },
  { note: 'dha', label: 'DHA' },
  { note: 'ni', label: 'NI' },
  { note: 'sa_high', label: "SA'" }
];

function play(note) {
  const audio = document.getElementById(note);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function animateKey(el) {
  anime({
    targets: el,
    scale: [1, 1.15, 1],
    backgroundColor: ['#fff', '#ffeb3b', '#fff'],
    duration: 400,
    easing: 'easeOutQuad'
  });

  // Note trail
  const noteTrail = document.createElement('div');
  noteTrail.className = 'note-trail';
  noteTrail.innerText = el.innerText;
  document.body.appendChild(noteTrail);

  const rect = el.getBoundingClientRect();
  noteTrail.style.left = `${rect.left + rect.width / 2}px`;
  noteTrail.style.top = `${rect.top}px`;

  anime({
    targets: noteTrail,
    translateY: -150,
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeOutCubic',
    complete: () => noteTrail.remove()
  });
}

function highlightScore(index) {
  scoreEl.innerHTML = notes.map((n, i) =>
    i === index
      ? `<span style="color:#00ffcc;font-weight:bold">${n.label}</span>`
      : n.label
  ).join(' ');
}

// Click on key
keys.forEach(key => {
  key.addEventListener('click', () => {
    const note = key.dataset.note;
    play(note);
    animateKey(key);
  });
});

// Keyboard input
const keyMap = {
  A: 'sa',
  S: 're',
  D: 'ga',
  F: 'ma',
  G: 'pa',
  H: 'dha',
  J: 'ni',
  K: 'sa_high'
};

document.addEventListener('keydown', (e) => {
  const note = keyMap[e.key.toUpperCase()];
  if (note) {
    const keyEl = document.querySelector(`.key[data-note="${note}"]`);
    play(note);
    animateKey(keyEl);
  }
});

// Auto Play Button
playBtn.addEventListener('click', () => {
  notes.forEach((noteObj, i) => {
    setTimeout(() => {
      const keyEl = document.querySelector(`.key[data-note="${noteObj.note}"]`);
      play(noteObj.note);
      animateKey(keyEl);
      highlightScore(i);
    }, i * 700);
  });
});
