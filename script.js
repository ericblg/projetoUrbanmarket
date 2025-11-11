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
const loginContentBox = document.querySelector("#loginPopup .loginContent");

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const mostrarCadastro = document.getElementById("mostrarCadastro");
const mostrarLogin = document.getElementById("mostrarLogin");

function mostrarFormulario(tipo = "login") {
  if (!loginForm || !cadastroForm) return;
  const isCadastro = tipo === "cadastro";
  loginForm.hidden = isCadastro;
  cadastroForm.hidden = !isCadastro;
  if (loginContentBox) {
    loginContentBox.classList.toggle("mostrando-cadastro", isCadastro);
  }
}

// Abrir popup de login
abrirLogin.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "block";
  loginPopup.style.display = "block";
  mostrarFormulario("login");
});

// Fechar popup
fecharPopup.addEventListener("click", fecharTudo);
overlay.addEventListener("click", fecharTudo);

function fecharTudo() {
  overlay.style.display = "none";
  loginPopup.style.display = "none";
  mostrarFormulario("login");
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
  mostrarFormulario("cadastro");
});

mostrarLogin.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarFormulario("login");
});

// Prevenir comportamento padrão nos links do formulário
document.querySelectorAll('.formBox a').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});

/* Cadastro + ViaCEP */
const cepInput = document.getElementById("cadastroCep");
const buscarCepBtn = document.getElementById("buscarCep");
const cepFeedback = document.getElementById("cepFeedback");
const camposViaCep = {
  logradouro: document.getElementById("cadastroLogradouro"),
  bairro: document.getElementById("cadastroBairro"),
  cidade: document.getElementById("cadastroCidade"),
  estado: document.getElementById("cadastroEstado")
};
let ultimoCepConsultado = "";
let cepLookupTimeout;
let cepConsultaSequencial = 0;

const formatarCep = (valor) => {
  const limp = (valor || "").replace(/\D/g, "").slice(0, 8);
  if (limp.length <= 5) return limp;
  return `${limp.slice(0, 5)}-${limp.slice(5)}`;
};

const atualizarCepFeedback = (mensagem = "", tipo = "") => {
  if (!cepFeedback) return;
  cepFeedback.textContent = mensagem;
  cepFeedback.classList.remove("error", "success");
  if (tipo) {
    cepFeedback.classList.add(tipo);
  }
};

const preencherCamposViaCep = (dados) => {
  if (!dados) return;
  if (camposViaCep.logradouro) camposViaCep.logradouro.value = dados.logradouro || "";
  if (camposViaCep.bairro) camposViaCep.bairro.value = dados.bairro || "";
  if (camposViaCep.cidade) camposViaCep.cidade.value = dados.localidade || "";
  if (camposViaCep.estado) camposViaCep.estado.value = (dados.uf || "").toUpperCase();
};

const limparCamposViaCep = () => {
  Object.values(camposViaCep).forEach((campo) => {
    if (campo) campo.value = "";
  });
};

const consultarCep = async (valor) => {
  if (!cepInput) return;
  const somenteNumeros = (valor || "").replace(/\D/g, "").slice(0, 8);
  if (!somenteNumeros) {
    atualizarCepFeedback("");
    limparCamposViaCep();
    ultimoCepConsultado = "";
    return;
  }
  if (somenteNumeros.length !== 8) {
    atualizarCepFeedback("Informe um CEP válido com 8 dígitos.", "error");
    return;
  }
  if (somenteNumeros === ultimoCepConsultado) {
    return;
  }

  const sequenciaAtual = ++cepConsultaSequencial;
  atualizarCepFeedback("Buscando informações do CEP...", "");

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${somenteNumeros}/json/`);
    if (!resposta.ok) {
      throw new Error("Erro ao consultar CEP");
    }
    const dados = await resposta.json();
    if (sequenciaAtual !== cepConsultaSequencial) return;

    if (dados.erro) {
      ultimoCepConsultado = "";
      atualizarCepFeedback("CEP não encontrado. Verifique os números digitados.", "error");
      return;
    }

    ultimoCepConsultado = somenteNumeros;
    preencherCamposViaCep(dados);
    atualizarCepFeedback("Endereço preenchido automaticamente pelo ViaCEP.", "success");
  } catch (error) {
    ultimoCepConsultado = "";
    atualizarCepFeedback("Não foi possível buscar o CEP agora. Tente novamente.", "error");
    console.error(error);
  }
};

if (cepInput) {
  cepInput.addEventListener("input", (event) => {
    event.target.value = formatarCep(event.target.value);
    const apenasNumeros = event.target.value.replace(/\D/g, "");
    if (apenasNumeros.length < 8) {
      ultimoCepConsultado = "";
      atualizarCepFeedback("");
    }
    clearTimeout(cepLookupTimeout);
    if (apenasNumeros.length === 8) {
      cepLookupTimeout = setTimeout(() => consultarCep(event.target.value), 350);
    }
  });

  cepInput.addEventListener("blur", () => consultarCep(cepInput.value));
}

if (buscarCepBtn) {
  buscarCepBtn.addEventListener("click", (event) => {
    event.preventDefault();
    consultarCep(cepInput ? cepInput.value : "");
  });
}

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




