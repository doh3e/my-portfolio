document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
  let currentSectionIndex = 0;

  // 초기 설정: 메인 섹션을 활성화
  document.getElementById('mains').classList.add('active-section');

  navLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // 현재 활성화된 섹션 숨기기
        sections[currentSectionIndex].classList.remove('active-section');

        // 타겟 섹션 활성화
        targetSection.classList.add('active-section');

        // 현재 섹션 인덱스 업데이트
        currentSectionIndex = Array.from(sections).indexOf(targetSection);
      }
    });
  });

  // 스크롤 및 방향키 이벤트 처리
  const handleSectionChange = (direction) => {
    sections[currentSectionIndex].classList.remove('active-section');

    if (direction === 'next') {
      currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    } else if (direction === 'prev') {
      currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
    }

    sections[currentSectionIndex].classList.add('active-section');
  };

  window.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {
      handleSectionChange('next');
    } else if (e.deltaY < 0) {
      handleSectionChange('prev');
    }
  });

  window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleSectionChange('next');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handleSectionChange('prev');
    }
  });
});

// 마우스 이펙트
document.addEventListener('DOMContentLoaded', function() {
  const mouseCursor = document.querySelector('.mouse-cursor');
  const skyImage = document.getElementById('sky-img');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // mouse-cursor를 마우스 위치에 따라 이동
    mouseCursor.style.left = `${mouseX - 50}px`;
    mouseCursor.style.top = `${mouseY - 50}px`;
  });
});


// 티켓 움직임
document.querySelector('.ticket-cont').addEventListener('mousemove', function(e) {
    const ticketCont = this;
    const ticket = document.querySelector('.ticket');
    const seals = document.querySelector('.seals');
  
    // 마우스의 위치를 계산
    const rect = ticketCont.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // 카드의 중심에서의 상대적 위치를 계산
    const centerX = ticketCont.offsetWidth / 2;
    const centerY = ticketCont.offsetHeight / 2;
  
    const rotateX = (centerY - y) / centerY * 15; // X축 회전
    const rotateY = (x - centerX) / centerX * 15; // Y축 회전
  
    // 티켓과 씰을 3D 공간에서 함께 회전
    const transformValue = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    ticket.style.transform = transformValue;
    seals.style.transform = `${transformValue} translateY(-125%)`;
  
    // 빛 반사 효과 조정
    const brightness = 1.05 + Math.abs(rotateX / 30); // 기울기에 따른 밝기 조정 (기본값 1.05에서 시작)
    const contrast = 1.05 + Math.abs(rotateY / 30); // 기울기에 따른 대비 조정 (기본값 1.05에서 시작)
    seals.style.filter = `brightness(${brightness}) contrast(${contrast})`;
  });
  
  document.querySelector('.ticket-cont').addEventListener('mouseleave', function() {
    const ticket = document.querySelector('.ticket');
    const seals = document.querySelector('.seals');
  
    // 마우스가 떠나면 원래 상태로 돌아가기
    ticket.style.transform = 'rotateX(0) rotateY(0)';
    seals.style.transform = 'rotateX(0) rotateY(0) translateY(-125%)';
    seals.style.filter = 'brightness(1.05) contrast(1.05)';
  });
  