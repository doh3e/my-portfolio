import { setupSectionHandlers } from "./sectionHandler.js";
import { setupModalHandlers } from "./modalHandler.js";
import { setupProjectCarousel } from "./projectHandler.js";
import { animateSkillProgress } from "./skillProgress.js";

document.addEventListener('DOMContentLoaded', function () {

  setupSectionHandlers();
  setupModalHandlers();
  setupProjectCarousel();
  animateSkillProgress();

  // 🖱️ 마우스 커서 효과
  const mouseCursor = document.querySelector('.mouse-cursor');
  if (mouseCursor) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        mouseCursor.style.left = `${e.clientX - 22}px`;
        mouseCursor.style.top = `${e.clientY - 22}px`;
      });
    });
  }

});
