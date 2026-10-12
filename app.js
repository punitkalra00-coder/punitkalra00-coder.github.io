(() => {
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.getElementById('yr').textContent = new Date().getFullYear();

  // Filters
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('#grid .card');
  const empty = document.getElementById('empty');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.toggle('is-active', c === chip));
    const f = chip.dataset.filter;
    let shown = 0;
    cards.forEach(card => {
      const match = f === 'all' || card.dataset.type === f;
      card.hidden = !match;
      if (match) shown++;
    });
    const feature = document.querySelector('.card--feature');
    feature.style.gridColumn = f === 'all' ? '' : 'auto';
    feature.style.flexDirection = f === 'all' ? '' : 'column';
    empty.hidden = shown > 0;
  }));

  // Video player
  const dlg = document.getElementById('player');
  const frame = document.getElementById('playerFrame');
  const open = id => {
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="Property walkthrough" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    if (dlg.showModal) dlg.showModal(); else window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  };
  const close = () => { dlg.close(); };
  dlg.addEventListener('close', () => { frame.innerHTML = ''; });
  dlg.addEventListener('click', e => { if (e.target === dlg) close(); });
  document.getElementById('playerClose').addEventListener('click', close);
  document.querySelectorAll('[data-video]').forEach(b => b.addEventListener('click', () => open(b.dataset.video)));

  // Reveal on scroll
  const els = document.querySelectorAll('.section__head, .card, .reel, .steps li, .contact > *');
  if ('IntersectionObserver' in window) {
    els.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }
})();
