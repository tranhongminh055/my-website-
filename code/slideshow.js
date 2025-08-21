let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function autoSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length; // Chuyển sang slide tiếp theo
    showSlide(currentSlide);
}

// Tự động chuyển slide sau 5 giây
setInterval(autoSlide, 5000);

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentSlide);