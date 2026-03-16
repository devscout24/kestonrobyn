// for carowsel
const track  = document.getElementById('joinTrack');
const cards  = track.querySelectorAll('.join_card');
const prev   = document.getElementById('joinPrev');
const next   = document.getElementById('joinNext');

let cur = 0;

const visible = () => window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 4;
const cardW   = () => cards[0].offsetWidth + 16; // width + gap

function slideTo(idx) {
  const max = cards.length - visible();
  cur = Math.max(0, Math.min(idx, max));
  track.style.transform = `translateX(-${cur * cardW()}px)`;
}

next.addEventListener('click', () => slideTo(cur + 1));
prev.addEventListener('click', () => slideTo(cur - 1));

// Touch swipe
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend',   e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) slideTo(cur + (diff > 0 ? 1 : -1));
});

window.addEventListener('resize', () => slideTo(0));