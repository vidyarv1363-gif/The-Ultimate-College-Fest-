const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('open');
}));

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  const category = button.dataset.filter;
  document.querySelectorAll('.event-row').forEach((event) => {
    event.hidden = category !== 'all' && event.dataset.category !== category;
  });
}));

const dayPanel = document.querySelector('#day-panel');
const sampleDayOne = `<p class="schedule-disclaimer">Illustrative timing only. Final schedule and date to be confirmed.</p><div class="time-row"><time>12:00</time><div><b>Doors open</b><span>Find your people · Main lawn</span></div><i>START</i></div><div class="time-row"><time>13:30</time><div><b>Big idea, small table</b><span>Open workshop · Makers' tent</span></div><i>MAKE</i></div><div class="time-row"><time>15:00</time><div><b>Friendly fire</b><span>Team games · Court 02</span></div><i>PLAY</i></div><div class="time-row"><time>17:30</time><div><b>Open-air sessions</b><span>Live music · Main lawn</span></div><i>LIVE</i></div>`;
const sampleDayTwo = `<p class="schedule-disclaimer">No second-day events or hours have been confirmed for this concept preview.</p><div class="time-row"><time>—</time><div><b>More to come</b><span>Program details will appear when confirmed.</span></div><i>TBC</i></div>`;

document.querySelectorAll('.day-tab').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.day-tab').forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  const isDayOne = button.dataset.day === '1';
  dayPanel.innerHTML = isDayOne ? sampleDayOne : sampleDayTwo;
  dayPanel.setAttribute('aria-labelledby', button.id);
}));

const dialog = document.querySelector('#info-dialog');
document.querySelector('#contact-button').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-ok').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
