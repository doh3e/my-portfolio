document.addEventListener('DOMContentLoaded', function () {

  // 모바일 햄버거
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.mobile-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('hidden');
    });
  }

  // 스크롤 반응
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
  let currentSectionIndex = 0;

  // 초기 설정: 첫 번째 섹션 활성화
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

  // 🎯 프로젝트 슬라이드 데이터 배열
  const projects = [
    { title: "DOCSHUND", desc: "국내 개발자를 위한 IT 공식문서 번역 및 포럼 제공 웹사이트" },
    { title: "cineMATE", desc: "Open API 기반 다양한 로직의 영화 추천 웹사이트" },
    { title: "piccup", desc: "취업준비생을 위한 이력서 및 자소서 관리 사이트" },
    { title: "바라는 바다!", desc: "날씨 API와 바다성향 테스트 기반 해수욕장 추천, 유저 리뷰 웹사이트" },
    { title: "SSAFLIX", desc: "좋아하는 영화를 아카이빙한 개인 웹" }
  ];

  // 🎯 프로젝트 섹션 슬라이드 기능
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll("#carousel > div");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const projectTitle = document.getElementById("project-title");
  const projectDesc = document.getElementById("project-desc");

  let slideIndex = 0;
  const totalSlides = slides.length;

  const updateCarousel = () => {
    if (carousel) {
      const slideWidth = slides[0].offsetWidth; // 각 슬라이드의 실제 너비
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      projectTitle.textContent = projects[slideIndex].title;
      projectDesc.textContent = projects[slideIndex].desc;
    }
  };

  const nextSlide = () => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateCarousel();
  };

  const prevSlide = () => {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  window.addEventListener("resize", updateCarousel); // 화면 크기 변경 시 위치 재조정
  updateCarousel();

  // 🎯 섹션 전환 (휠 스크롤 가능)
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
    const isProjectsSection = sections[currentSectionIndex].id === "projects";

    if (isProjectsSection) {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    } else {
      if (e.key === 'ArrowDown') handleSectionChange('next');
      else if (e.key === 'ArrowUp') handleSectionChange('prev');
    }
  });

  // 🎯 마우스 이펙트 (mouse-cursor가 null인지 체크)
  const mouseCursor = document.querySelector('.mouse-cursor');
  if (mouseCursor) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        mouseCursor.style.left = `${e.clientX - 22}px`;
        mouseCursor.style.top = `${e.clientY - 22}px`;
      });
    });
  }

  // 🎯 티켓 애니메이션 기능
  const ticketContainer = document.querySelector('.ticket-cont');
  if (ticketContainer) {
    ticketContainer.addEventListener('mousemove', function (e) {
      const ticket = document.querySelector('.ticket');
      const seals = document.querySelector('.seals');

      if (!ticket || !seals) return;

      const rect = ticketContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = ticketContainer.offsetWidth / 2;
      const centerY = ticketContainer.offsetHeight / 2;

      const rotateX = (centerY - y) / centerY * 15;
      const rotateY = (x - centerX) / centerX * 15;

      const transformValue = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      ticket.style.transform = transformValue;
      seals.style.transform = `${transformValue} translateY(-125%)`;

      const brightness = 1.05 + Math.abs(rotateX / 30);
      const contrast = 1.05 + Math.abs(rotateY / 30);
      seals.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    });

    ticketContainer.addEventListener('mouseleave', function () {
      const ticket = document.querySelector('.ticket');
      const seals = document.querySelector('.seals');

      if (!ticket || !seals) return;

      ticket.style.transform = 'rotateX(0) rotateY(0)';
      seals.style.transform = 'rotateX(0) rotateY(0) translateY(-125%)';
      seals.style.filter = 'brightness(1.05) contrast(1.05)';
    });
  }
});
