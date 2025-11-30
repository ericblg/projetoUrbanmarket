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

  usarCupom.addEventListener("click", () => {
    cupomOverlay.style.display = "none";
    cupomPopup.style.display = "none";
    abrirLogin.click();
  });
});

/* -------------------------- Via Cep Cadastro (JavaScript)-------------------------- */

const cepInput = document.getElementById('cep');

const logradouroInput = document.getElementById('logradouro');

const bairroInput = document.getElementById('bairro');

const cidadeInput = document.getElementById('cidade');



// Função para buscar o CEP

function buscarCEP() {

    // Pega o valor do CEP e remove caracteres não numéricos

    const cep = cepInput.value.replace(/\D/g, '');



    // Se o campo CEP não estiver vazio

    if (cep.length === 8) {

        // Monta a URL da API do ViaCEP

        const url = `https://viacep.com.br/ws/${cep}/json/`;



        // Faz a requisição à API

        fetch(url)

            .then(response => response.json()) // Converte a resposta para JSON

            .then(dados => {

                // Verifica se a resposta não é de erro (erro geralmente tem a chave 'erro' = true)

                if (!dados.erro) {

                    // Preenche os campos do formulário com os dados

                    logradouroInput.value = dados.logradouro || '';

                    bairroInput.value = dados.bairro || '';

                    cidadeInput.value = dados.localidade || '';

                } else {

                    // Trata CEP não encontrado

                    alert("CEP não encontrado.");

                    limparEndereco();

                }

            })

            .catch(error => {

                // Trata erros de conexão ou outros

                console.error('Erro na requisição ao ViaCEP:', error);

                alert("Erro ao buscar CEP. Tente novamente.");

                limparEndereco();

            });

    } else {

        limparEndereco();

    }

}



// Função para limpar os campos de endereço

function limparEndereco() {

    logradouroInput.value = '';

    bairroInput.value = '';

    cidadeInput.value = '';

}



// 2. Adiciona o evento de 'blur' (quando o campo perde o foco) no campo CEP

cepInput.addEventListener('blur', buscarCEP);

/* -------------------------- Via Cep Cadastro (JavaScprit) --------------------------= */




/* ==========================================================
   SLIDER ESTILO FACEBOOK MARKETPLACE
   ========================================================== */

const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");
const btnNext = document.getElementById("nextBtn");
const btnPrev = document.getElementById("prevBtn");

if (mainImage && thumbs.length > 0) {

    let index = 0;

    function updateImage(i) {
        index = i;
        mainImage.src = thumbs[i].src;

        thumbs.forEach(t => t.classList.remove("active"));
        thumbs[i].classList.add("active");
    }

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => updateImage(i));
    });

    btnNext.addEventListener("click", () => {
        index = (index + 1) % thumbs.length;
        updateImage(index);
    });

    btnPrev.addEventListener("click", () => {
        index = (index - 1 + thumbs.length) % thumbs.length;
        updateImage(index);
    });
}
