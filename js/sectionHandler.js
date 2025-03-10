export function setupSectionHandlers() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSectionIndex = 0;
    let isScrolling = false;
  
    function handleSectionChange(direction) {
      if (isScrolling) return;
      isScrolling = true;
  
      sections[currentSectionIndex].classList.remove('active-section');
  
      if (direction === 'next') {
        currentSectionIndex = (currentSectionIndex + 1) % sections.length;
      } else if (direction === 'prev') {
        currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
      }
  
      sections[currentSectionIndex].classList.add('active-section');
  
      setTimeout(() => { isScrolling = false; }, 500);
    }

    // 네비바 클릭시 이동
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
            sections[currentSectionIndex].classList.remove('active-section');
            targetSection.classList.add('active-section');

            currentSectionIndex = Array.from(sections).indexOf(targetSection);
            }
        });
    });
  
    // 마우스 휠 이벤트
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) handleSectionChange("next");
      else if (e.deltaY < 0) handleSectionChange("prev");
    });
  
    // 키보드 방향키 이벤트
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") handleSectionChange("next");
      else if (e.key === "ArrowUp") handleSectionChange("prev"); 
    });
  
    // 터치 스와이프 (상하단 이동)
    let touchStartY = 0, touchEndY = 0;
  
    document.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
    });
  
    document.addEventListener("touchend", (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchEndY - touchStartY;
  
      if (swipeDistance > 50) handleSectionChange("prev");
      else if (swipeDistance < -50) handleSectionChange("next");
    });
  }
  