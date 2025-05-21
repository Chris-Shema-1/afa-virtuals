// asset/js/portfolio.js
// Portfolio page specific JS (placeholder for future interactivity)

document.addEventListener('DOMContentLoaded', function() {
  // Animate tool-items on scroll (reveal effect)
  function revealToolsOnScroll() {
    document.querySelectorAll('.tool-item').forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        item.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealToolsOnScroll);
  revealToolsOnScroll();

  // Optional: Add bounce animation on hover
  document.querySelectorAll('.tool-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      item.classList.add('bounce');
    });
    item.addEventListener('mouseleave', function() {
      item.classList.remove('bounce');
    });
  });
});
