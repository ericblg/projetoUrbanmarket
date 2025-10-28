// SWIPER CARROSSEL CENTRALIZADO
new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true, // Centraliza o slide ativo
  slidesPerView: 'auto', // Ajusta automaticamente

  // Paginação (bolinhas)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Setas de navegação
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

/* TEMA / MODO ESCURO */
(function () {
  const btn = document.getElementById('toggleTheme');
  const storageKey = 'um-theme';

  // Aplicar tema salvo
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark') {
      document.body.classList.add('dark');
    }
  } catch (e) {
    // Ignorar erros de armazenamento
  }

  if (btn) {
    btn.addEventListener('click', function () {
      document.body.classList.toggle('dark');
      try {
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
      } catch (e) { }
      // Opcional: atualizar ícone/texto
      if (document.body.classList.contains('dark')) {
        btn.textContent = '☀️';
        btn.setAttribute('aria-label', 'Modo claro');
      } else {
        btn.textContent = '🌙';
        btn.setAttribute('aria-label', 'Modo escuro');
      }
    });

    // Definir ícone/texto inicial
    if (document.body.classList.contains('dark')) {
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', 'Modo claro');
    } else {
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Modo escuro');
    }
  }
  // Sombra do cabeçalho ao rolar
  function updateScrolled() {
    document.body.classList.toggle('scrolled', window.scrollY > 4);
  }
  window.addEventListener('scroll', updateScrolled, { passive: true });
  updateScrolled();
})();



// Mostrar popup de cupom ao entrar no site
window.addEventListener("load", () => {
  const cupomOverlay = document.getElementById("cupomOverlay");
  const cupomPopup = document.getElementById("cupomPopup");
  const fecharCupom = document.getElementById("fecharCupom");
  const usarCupom = document.getElementById("usarCupom");

  // Exibir popup
  cupomOverlay.style.display = "block";
  cupomPopup.style.display = "block";

  // Fechar popup
  fecharCupom.addEventListener("click", () => {
    cupomOverlay.style.display = "none";
    cupomPopup.style.display = "none";
  });
  cupomOverlay.addEventListener("click", () => {
    cupomOverlay.style.display = "none";
    cupomPopup.style.display = "none";
  });

  // Redirecionar para página de promoção
  usarCupom.addEventListener("click", () => {
    window.location.href = "login.html";
    // ou por exemplo: "carrinho.html?cupom=DESCONTO10"
  });
});




