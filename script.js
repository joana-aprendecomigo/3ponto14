// ── Custom cursor ──────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && window.matchMedia('(hover: hover)').matches) {
  let cx = 0, cy = 0, dx = 0, dy = 0;

  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY;
    cursorDot.style.left = dx + 'px';
    cursorDot.style.top  = dy + 'px';
  });

  function animateCursor() {
    cx += (dx - cx) * 0.12;
    cy += (dy - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .metodo-card, .testo-card, .servico-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
}

// ── Navbar scroll ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const [a, b, c] = hamburger.querySelectorAll('span');
  a.style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  b.style.opacity   = open ? '0' : '';
  c.style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
}));

// ── Reveal on scroll ───────────────────────────
const reveals = document.querySelectorAll('.reveal, .metodo-card, .testo-card, .servico-item, .sobre-grid > *, .contacto-grid > *');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0)';
      }, +delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
  revealObs.observe(el);
});

// ── Contact form ───────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<span>A enviar…</span>';
    btn.disabled = true;
    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align:center;padding:40px 0">
          <div style="font-size:3rem;margin-bottom:16px">✓</div>
          <strong style="display:block;font-size:1.1rem;color:var(--green);margin-bottom:8px">Mensagem enviada!</strong>
          <span style="color:var(--gray);font-size:0.9rem">Entraremos em contacto brevemente.</span>
        </div>`;
    }, 1200);
  });
}

// ── Stagger metodo cards ───────────────────────
document.querySelectorAll('.metodo-card').forEach((card, i) => {
  card.dataset.delay = i * 100;
});
