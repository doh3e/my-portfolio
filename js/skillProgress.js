export function animateSkillProgress() {
  const skillItems = document.querySelectorAll('.skill-item');

  function animateProgress() {
    skillItems.forEach(item => {
      const progressFill = item.querySelector('.progress-fill');
      const level = item.getAttribute('data-level');

      if (!progressFill || !level) return;

      const rect = item.getBoundingClientRect();

      // 화면에 요소가 80% 이상 나타나면 실행
      if (rect.top < window.innerHeight * 1 && !progressFill.classList.contains("animated")) {
        setTimeout(() => {
          progressFill.style.width = `${level}%`;
          progressFill.classList.add("animated");
        }, 500);
      }
    });
  }


  window.addEventListener('load', animateProgress);
  window.addEventListener('scroll', animateProgress, { passive: true });
}
