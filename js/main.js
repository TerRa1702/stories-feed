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
