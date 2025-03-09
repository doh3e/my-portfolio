document.addEventListener('DOMContentLoaded', function () {

  const content = document.getElementById("content");
  const mobileWarning = document.getElementById("mobile-warning");

  function checkMobile() {
    return window.innerWidth <= 768;
  }

  let isMobile = checkMobile();
  let eventsRegistered = false;

  // 모바일 차단 (768 미만)
  function handleMobileBlock() {
    isMobile = checkMobile();
    if (isMobile) {
      console.log("📱 모바일 환경 - 기능 차단");
      content.style.display = "none";
      mobileWarning.style.display = "flex";
      removeEventListeners();
    } else {
      console.log("🖥️ PC 환경 - 정상 동작");
      content.style.display = "block";
      mobileWarning.style.display = "none";

      if (!eventsRegistered) {
        registerEventListeners();
        eventsRegistered = true;
      }
    }
  }

  handleMobileBlock();
  window.addEventListener("resize", handleMobileBlock);

  if (isMobile) return;

  function registerEventListeners() {

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    let currentSectionIndex = 0;

    sections[currentSectionIndex].classList.add('active-section');

    navLinks.forEach((link) => {
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

    const projects = [
      { title: "DOCSHUND", desc: "국내 개발자를 위한 IT 공식문서 번역 및 포럼 제공 사이트", link: "https://i12a703.p.ssafy.io/" },
      { title: "cineMATE", desc: "영화 Open API 기반의 당신을 위한 맞춤 영화 추천 사이트", link: "https://github.com/doh3e/cineMATE" },
      { title: "piccup", desc: "취업준비생을 위한 이력서 및 자소서 관리 사이트", link: "https://github.com/doh3e/piccup" },
      { title: "바라는 바다!", desc: "날씨 API 및 바다성향 테스트 기반 해수욕장 추천 및 유저 리뷰 사이트", link: "https://github.com/doh3e/bada" },
      { title: "SSAFLIX", desc: "내가 사랑하는 영화 아카이빙 웹", link: "https://doh3e.github.io/ssaflix-movie/" }
    ];

    // 🎯 프로젝트 슬라이드 기능
    const carousel = document.getElementById("carousel");
    const slides = document.querySelectorAll("#carousel > div");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const projectTitle = document.getElementById("project-title");
    const projectDesc = document.getElementById("project-desc");
    const moveBtn = document.getElementById("move-btn");

    let slideIndex = 0;
    const totalSlides = slides.length;

    const updateMoveBtn = () => {
      if (moveBtn) moveBtn.href = projects[slideIndex].link;
    };

    const updateCarousel = () => {
      if (carousel) {
        const slideWidth = slides[0].offsetWidth;
        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        projectTitle.textContent = projects[slideIndex].title;
        projectDesc.textContent = projects[slideIndex].desc;
      }
    };

    const nextSlide = () => {
      slideIndex = (slideIndex + 1) % totalSlides;
      updateCarousel();
      updateMoveBtn();
    };

    const prevSlide = () => {
      slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
      updateMoveBtn();
    };

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
    updateMoveBtn();

    // 섹션 전환
    const handleSectionChange = (direction) => {
      sections[currentSectionIndex].classList.remove('active-section');

      if (direction === 'next') {
        currentSectionIndex = (currentSectionIndex + 1) % sections.length;
      } else if (direction === 'prev') {
        currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
      }

      sections[currentSectionIndex].classList.add('active-section');
    };

    window.addEventListener('wheel', function (e) {
      if (e.deltaY > 0) handleSectionChange('next');
      else if (e.deltaY < 0) handleSectionChange('prev');
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') handleSectionChange('next');
      else if (e.key === 'ArrowUp') handleSectionChange('prev');
    });

    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function (e) {
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const swipeDistance = touchEndY - touchStartY;

      if (swipeDistance > swipeThreshold) {
        handleSectionChange('prev');
      } else if (swipeDistance < -swipeThreshold) {
        handleSectionChange('next');
      }
    }   

    const mouseCursor = document.querySelector('.mouse-cursor');
    if (mouseCursor) {
      document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
          mouseCursor.style.left = `${e.clientX - 22}px`;
          mouseCursor.style.top = `${e.clientY - 22}px`;
        });
      });
    }
  }

  function removeEventListeners() {
    window.removeEventListener('wheel', handleSectionChange);
    window.removeEventListener('keydown', handleSectionChange);
    document.removeEventListener('touchstart', handleSwipe);
    document.removeEventListener('touchend', handleSwipe);
  }

  registerEventListeners();

});
