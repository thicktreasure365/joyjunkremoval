window.addEventListener('load', function() { if (!window.location.hash) window.scrollTo(0, 0); });

(function() {
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-mobile-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
    }
  });
})();

// Mobile "Service Areas" sub-menu toggle
(function() {
  const subToggle = document.getElementById('nav-mobile-sub-toggle');
  const subMenu = document.getElementById('nav-mobile-sub-menu');
  if (!subToggle || !subMenu) return;
  subToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    subToggle.classList.toggle('open');
    subMenu.classList.toggle('open');
  });
})();

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = '✅ Request Sent! We\'ll be in touch soon.';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  btn.disabled = true;
}
