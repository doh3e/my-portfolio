export function setupModalHandlers() {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-img");
    const closeModal = document.getElementById("close-modal");
  
    function closingModal() {
      modal.style.display = "none";
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closingModal();
    });
  
    closeModal.addEventListener("click", closingModal);
  }
  