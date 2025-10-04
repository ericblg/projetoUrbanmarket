new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,

  // pagination bullets 
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // BreakPoint Responsivo 
  breakpoints: {
    0: {
        slidesPerView: 1
    },
    768: {
        slidesPerView: 3
    },
    1024: {
        slidesPerView: 3    
    }
  }
});