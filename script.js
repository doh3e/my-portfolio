document.addEventListener('DOMContentLoaded', function () {

  const content = document.getElementById("content");
  const mobileWarning = document.getElementById("mobile-warning");

  function checkMobile() {
    return window.innerWidth <= 768;
  }

  let isMobile = checkMobile();
  let eventsRegistered = false;

  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSectionIndex = 0;
  let isScrolling = false; // 🚀 휠 이벤트 중복 방지

  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-img");
  const closeModal = document.getElementById("close-modal");

  function closingModal() {
    modal.style.display = "none";
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const projects = [
    { title: "DOCSHUND", desc: "국내 개발자를 위한 IT 공식문서 번역 및 포럼 제공 사이트", link: "https://github.com/harimau97/docshund", image: "docshund_desc.jpg" },
    { title: "cineMATE", desc: "영화 Open API 기반의 당신을 위한 맞춤 영화 추천 사이트", link: "https://github.com/doh3e/cineMATE", image: "cinemate_desc.jpg" },
    { title: "piccup", desc: "취업준비생을 위한 이력서 및 자소서 관리 사이트", link: "https://github.com/doh3e/piccup", image: "piccup_desc.jpg" },
    { title: "바라는 바다!", desc: "날씨 API 및 바다성향 테스트 기반 해수욕장 추천 및 유저 리뷰 사이트", link: "https://github.com/doh3e/bada", image: "barabada_desc.jpg" },
    { title: "SSAFLIX", desc: "내가 사랑하는 영화 아카이빙 웹", link: "https://doh3e.github.io/ssaflix-movie/", image: "ssaflix_desc.jpg" }
  ];

  function handleSectionChange(direction) {
    if (isScrolling) return; // 🚀 이미 이동 중이면 실행 안 함
    isScrolling = true;

    sections[currentSectionIndex].classList.remove('active-section');

    if (direction === 'next') {
      currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    } else if (direction === 'prev') {
      currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
    }

    sections[currentSectionIndex].classList.add('active-section');

    setTimeout(() => { isScrolling = false; }, 700); // 🚀 0.7초 후 다시 이동 가능
  }

  function handleMobileBlock() {
    isMobile = checkMobile();
    if (isMobile) {
      content.style.display = "none";
      mobileWarning.style.display = "flex";
      removeEventListeners();
    } else {
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
    sections[currentSectionIndex].classList.add('active-section');

    // 🟢 Navbar 메뉴 클릭 시 이동
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

    const carousel = document.getElementById("carousel");
    const slides = document.querySelectorAll("#carousel > div");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const projectTitle = document.getElementById("project-title");
    const projectDesc = document.getElementById("project-desc");
    const moveBtn = document.getElementById("move-btn");
    const detailBtn = document.getElementById("pjt-detail-btn");

    let slideIndex = 0;
    const totalSlides = slides.length;

    function updateButtons() {
      projectTitle.textContent = projects[slideIndex].title;
      projectDesc.textContent = projects[slideIndex].desc;
      moveBtn.href = projects[slideIndex].link;
      detailBtn.onclick = () => openProjectImage(projects[slideIndex].image);
    }

    function openProjectImage(image) {
      modalImage.src = `img/${image}`;
      modal.style.display = "flex";
    }

    function updateCarousel() {
      const slideWidth = slides[0].offsetWidth;
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      updateButtons();
    }

    function nextSlide() {
      slideIndex = (slideIndex + 1) % totalSlides;
      updateCarousel();
    }

    function prevSlide() {
      slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    // 📜 휠 이벤트 (중복 실행 방지)
    window.addEventListener("wheel", function (e) {
      if (e.deltaY > 0) handleSectionChange("next");
      else if (e.deltaY < 0) handleSectionChange("prev");
    });

    // ⌨️ 키보드 이벤트
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") handleSectionChange("next");
      else if (e.key === "ArrowUp") handleSectionChange("prev");
      else if (e.key === "ArrowRight" && currentSectionIndex === 3) nextSlide();
      else if (e.key === "ArrowLeft" && currentSectionIndex === 3) prevSlide();
      else if (e.key === "Escape" && currentSectionIndex === 3) closingModal();
    });

    // 📱 터치 이벤트
    let touchStartX = 0, touchEndX = 0;
    let touchStartY = 0, touchEndY = 0;

    document.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const swipeDistanceX = touchEndX - touchStartX;
      const swipeDistanceY = touchEndY - touchStartY;

      if (Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
        if (swipeDistanceY > swipeThreshold) handleSectionChange("prev");
        else if (swipeDistanceY < -swipeThreshold) handleSectionChange("next");
      }
    }

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
  }

  registerEventListeners();
});
