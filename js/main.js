const swiper = new Swiper('.swiper-outer', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 4,
    spaceBetween: 80,
});

const modal = document.querySelector('[data-modal="myModal"]');
const btns = document.querySelectorAll(".feed-item");
const closeBtn = document.querySelector(".close");

closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

const swipersInner = [];
const innerSwipers = document.querySelectorAll('.swiper-inner');

innerSwipers.forEach((inner) => {
    const innerSwiper = new Swiper(inner, {
        pagination: {
            el: inner.querySelector('.swiper-pagination'),
            clickable: true,
        },
        on: {
            autoplayTimeLeft(swiper, time, progress) {
                const activeBullet = inner.querySelector('.swiper-pagination-bullet-active');
                if (activeBullet) {
                    activeBullet.style.setProperty("--progress", 1 - progress);
                }
            },
            slideChange() {
                const activeIndex = this.activeIndex;
                const swiperModal = document.querySelector('.swiper-modal').swiper;
                if (activeIndex == 0) swiperModal.slideNext();
            },
        },
    });
    swipersInner.push(innerSwiper);
});

const swiper2 = new Swiper(".swiper-modal", {
    slidesPerView: "auto",
    spaceBetween: 100,
    centeredSlides: true,
    allowTouchMove: true,
    slideToClickedSlide: true,
    thumbs: {
        swiper: swiper,
    },
    on: {
        slideChange() {
            swipersInner.forEach((innerSwiper) => {
                innerSwiper.autoplay?.stop();
            });
            const activeSlide = this.slides[this.activeIndex];
            const activeInnerSwiperElement = activeSlide?.querySelector('.swiper-inner');
            if (activeInnerSwiperElement) {
                const activeSwiper = activeInnerSwiperElement.swiper;
                activeSwiper?.autoplay?.start();
            }
        },
    },
});

btns.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display = "block";
        const activeSlide = document?.querySelectorAll('.modal .swiper-slide-modal')[index];
        const activeInnerSwiperElement = activeSlide?.querySelector('.swiper-inner');
        if (activeInnerSwiperElement) {
            const activeSwiper = activeInnerSwiperElement.swiper;
            activeSwiper?.autoplay?.start();
        }
    });
});

const progressCircle = document.querySelector(".autoplay-progress svg");
