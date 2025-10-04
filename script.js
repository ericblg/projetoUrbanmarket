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

/* LOGIN */

const abrirLogin = document.getElementById("abrirLogin");
const fecharPopup = document.getElementById("fecharPopup");
const overlay = document.getElementById("overlay");
const loginPopup = document.getElementById("loginPopup");

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const mostrarCadastro = document.getElementById("mostrarCadastro");
const mostrarLogin = document.getElementById("mostrarLogin");

abrirLogin.addEventListener("click", (e) => {
  e.preventDefault(); // impede redirecionamento
  overlay.style.display = "block";
  loginPopup.style.display = "block";
  loginForm.style.display = "block";
  cadastroForm.style.display = "none";
});

fecharPopup.addEventListener("click", fecharTudo);
overlay.addEventListener("click", fecharTudo);

function fecharTudo() {
  overlay.style.display = "none";
  loginPopup.style.display = "none";
}

// Alternar Login <-> Cadastro
mostrarCadastro.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  cadastroForm.style.display = "block";
});

mostrarLogin.addEventListener("click", (e) => {
  e.preventDefault();
  cadastroForm.style.display = "none";
  loginForm.style.display = "block";
});
