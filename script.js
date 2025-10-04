// SWIPER CARROSSEL CENTRALIZADO
new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true, // Centraliza o slide ativo
  slidesPerView: 'auto', // Ajusta automaticamente

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
        slidesPerView: 1,
        centeredSlides: true
    },
    768: {
        slidesPerView: 2,
        centeredSlides: false
    },
    1024: {
        slidesPerView: 3,
        centeredSlides: false
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

// Abrir popup de login
abrirLogin.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "block";
  loginPopup.style.display = "block";
  loginForm.style.display = "block";
  cadastroForm.style.display = "none";
});

// Fechar popup
fecharPopup.addEventListener("click", fecharTudo);
overlay.addEventListener("click", fecharTudo);

function fecharTudo() {
  overlay.style.display = "none";
  loginPopup.style.display = "none";
}

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    fecharTudo();
  }
});

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

// Prevenir comportamento padrão nos links do formulário
document.querySelectorAll('.formBox a').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});