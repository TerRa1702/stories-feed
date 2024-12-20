const swiper = new Swiper('.swiper-outer', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 4,
    spaceBetween: 80,
});

var modal = document.getElementById("myModal");
var btns = document.getElementsByClassName("feed-item");
var span = document.getElementsByClassName("close")[0];

for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function (event) {
        event.preventDefault();
        modal.style.display = "block";
    }
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var swipersInner = [];

var swiper2 = new Swiper(".swiper-modal", {
    slidesPerView: "auto",
    spaceBetween: 100,
    centeredSlides: true,
    allowTouchMove: true,
    slideToClickedSlide: true,
    thumbs: {
        swiper: swiper,
    },
    on: {
        reachBeginning: function () {
            swipersInner[0].autoplay.start();
        },
        slideChange: function () {
            swipersInner.forEach(function (innerSwiper) {
                innerSwiper.autoplay.stop();
            });

            var activeInnerSwiper = this.slides[this.activeIndex].querySelector('.swiper-inner');
            if (activeInnerSwiper) {
                var activeSwiper = activeInnerSwiper.swiper;
                activeSwiper.autoplay.start();
            }
        },
    },
});

const progressCircle = document.querySelector(".autoplay-progress svg");
var innerSwipers = document.querySelectorAll('.swiper-inner');
innerSwipers.forEach(function (inner) {
    var innerSwiper = new Swiper(inner, {
        pagination: {
            el: inner.querySelector('.swiper-pagination'),
            clickable: true,
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                const activeBullet = inner.querySelector('.swiper-pagination-bullet-active::after');
                const activeBulletElement = inner.querySelector('.swiper-pagination-bullet-active');
                if (activeBulletElement) {
                    activeBulletElement.style.setProperty("--progress", 1 - progress);
                }
            }
        }
    });
    swipersInner.push(innerSwiper);
});