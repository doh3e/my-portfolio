export function setupProjectCarousel() {
    const projects = [
      { title: "DOCSHUND", desc: "국내 개발자를 위한 IT 공식문서 번역 및 포럼 제공 사이트", link: "https://github.com/harimau97/docshund", image: "./img/docshund_desc.jpg" },
      { title: "cineMATE", desc: "영화 Open API 기반의 당신을 위한 맞춤 영화 추천 사이트", link: "https://github.com/doh3e/cineMATE", image: "./img/cinemate_desc.jpg" },
      { title: "piccup", desc: "취업준비생을 위한 이력서 및 자소서 관리 사이트", link: "https://github.com/doh3e/piccup", image: "./img/piccup_desc.jpg" },
      { title: "바라는 바다!", desc: "날씨 API 및 바다성향 테스트 기반 해수욕장 추천 및 유저 리뷰 사이트", link: "https://github.com/doh3e/bada", image: "./img/barabada_desc.jpg" },
      { title: "SSAFLIX", desc: "내가 사랑하는 영화 아카이빙 웹", link: "https://doh3e.github.io/ssaflix-movie/", image: "./img/ssaflix_desc.jpg" }
    ];
  
    const carousel = document.getElementById("carousel");
    const slides = document.querySelectorAll("#carousel .project-thumbnail");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const projectTitle = document.getElementById("project-title");
    const projectDesc = document.getElementById("project-desc");
    const moveBtn = document.getElementById("move-btn");
    const detailBtn = document.getElementById("pjt-detail-btn");
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-img");
    const closeModal = document.getElementById("close-modal");
  
    let slideIndex = 0;
    let isModalOpen = false;
  
    function updateProjectInfo() {
      projectTitle.textContent = projects[slideIndex].title;
      projectDesc.textContent = projects[slideIndex].desc;
      moveBtn.href = projects[slideIndex].link;
      detailBtn.onclick = () => openProjectImage(projects[slideIndex].image);

      if (isModalOpen) {
        modalImage.src = projects[slideIndex].image;
      }

    }
  
    function openProjectImage(imageSrc) {
      modal.style.display = "flex";
      modalImage.src = imageSrc;
      isModalOpen = true;
    }
  
    function updateCarousel() {
      const slideWidth = slides[0].offsetWidth;
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      updateProjectInfo();
    }
  
    function nextSlide() {
      slideIndex = (slideIndex + 1) % projects.length;
      updateCarousel();
    }
  
    function prevSlide() {
      slideIndex = (slideIndex - 1 + projects.length) % projects.length;
      updateCarousel();
    }
  
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prevSlide();
        else if (e.key === "ArrowRight") nextSlide(); 
    });
  
    let touchStartX = 0, touchEndX = 0;
  
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });
  
    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;
  
      if (swipeDistance > 50) prevSlide();
      else if (swipeDistance < -50) nextSlide();
    });
  
    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        openProjectImage(projects[index].image);
      });
    });
  
    if (closeModal) closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    updateCarousel();
  }
  