document.addEventListener('DOMContentLoaded', () => {
  // --- ScrollSpy do Bootstrap ---
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  }

  // --- Menu mobile fecha ao clicar ---
  const navbarToggler = document.querySelector('.navbar-toggler');
  const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');
  responsiveNavItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler)?.display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // --- Botão voltar ao topo ---
  const btnTopo = document.getElementById('btnTopo');
  if (btnTopo) {
    window.addEventListener('scroll', debounce(() => {
      btnTopo.style.display = window.scrollY > 100 ? 'block' : 'none';
    }, 100));

    btnTopo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Botão "Quero aparecer" com contador ---
  const botaoComecar = document.getElementById('btnComecar');
  if (botaoComecar) {
    let contador = 0;
    botaoComecar.addEventListener('click', () => {
      const planosSection = document.querySelector('#planos');
      if (planosSection) planosSection.scrollIntoView({ behavior: 'smooth' });

      contador++;
      console.log(`Botão clicado ${contador}x`);
    });
  }

  // --- Animação nos cards planos ---
  const cards = document.querySelectorAll('.plano-card');
  cards.forEach(card => {
    card.addEventListener('mouseover', () => card.style.borderColor = 'red');
    card.addEventListener('mouseout', () => card.style.borderColor = 'transparent');
  });

  // --- FAQ toggle e scroll suave ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      toggleFaq(this);
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  });

  // --- Inicializar opções de planos ---
  initializePricingOptions();
});

// --- Função debounce simples para scroll ---
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// --- Objeto para armazenar dados dos planos ---
const planosData = {
  visibilidade: { selecionado: false, periodo: 'trimestral', valor: 400, valorTotal: 1200 },
  impulso: { selecionado: false, periodo: 'trimestral', valor: 700, valorTotal: 2100 }
};

// --- Função para alternar FAQ ---
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const isActive = element.classList.contains('active');

  document.querySelectorAll('.faq-question.active').forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
      item.nextElementSibling.classList.remove('show');
    }
  });

  if (isActive) {
    element.classList.remove('active');
    answer.classList.remove('show');
  } else {
    element.classList.add('active');
    answer.classList.add('show');
  }
}

// --- Inicializa seleção e eventos de opções de preço ---
function initializePricingOptions() {
  document.querySelectorAll('.opcao-preco').forEach(opcao => {
    opcao.addEventListener('click', function() {
      const radio = this.querySelector('input[type="radio"]');
      if (!radio) return;

      radio.checked = true;

      const groupName = radio.name;
      document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
        r.closest('.opcao-preco').classList.remove('selecionada');
      });

      this.classList.add('selecionada');

      const plano = this.dataset.plano;
      const periodo = this.dataset.periodo;
      const valor = parseInt(this.dataset.valor, 10);

      planosData[plano].periodo = periodo;
      planosData[plano].valor = valor;
      planosData[plano].valorTotal = calcularTotal(periodo, valor);

      console.log('Plano atualizado:', planosData[plano]);
    });
  });

  // Marcar opções padrão visualmente
  document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
    const opcao = radio.closest('.opcao-preco');
    if (opcao) opcao.classList.add('selecionada');
  });
}

// --- Calcula valor total do plano ---
function calcularTotal(periodo, valor) {
  return periodo === 'trimestral' ? valor * 3 : valor;
}

// --- Processa pagamento baseado na seleção ---
function processarPagamento(plano) {
  const radioSelecionado = document.querySelector(`input[name="preco-${plano}"]:checked`);
  if (!radioSelecionado) {
    alert('Por favor, selecione uma opção de pagamento.');
    return;
  }

  const opcaoSelecionada = radioSelecionado.closest('.opcao-preco');
  if (!opcaoSelecionada) return;

  const periodo = opcaoSelecionada.dataset.periodo;
  const valorMensal = parseInt(opcaoSelecionada.dataset.valor, 10);
  const valorTotal = calcularTotal(periodo, valorMensal);

  const dadosPlano = { nome: plano, periodo, valorMensal, valorTotal };

  console.log('Processando pagamento:', dadosPlano);

  processarPagamentoAPI(dadosPlano);
}

// --- Redireciona para a URL do pagamento correta ---
function processarPagamentoAPI(dadosPlano) {
  let urlPagamento;

  if (dadosPlano.nome === 'visibilidade') {
    urlPagamento = dadosPlano.periodo === 'mensal'
      ? "https://pay.kirvano.com/a7ea45cc-9ff4-4ba9-a44b-ebc5d4317b57"
      : "https://pay.kirvano.com/97ed8fde-d098-4551-ac80-f1a26ef120ad";
  } else if (dadosPlano.nome === 'impulso') {
    urlPagamento = dadosPlano.periodo === 'mensal'
      ? "https://pay.kirvano.com/61c93774-5943-411e-b69d-6aeafe9329e9"
      : "https://pay.kirvano.com/68a77c92-2342-4326-9636-ea1ae42ba727";
  }

  if (urlPagamento) {
    window.location.href = urlPagamento;
  } else {
    alert('Plano ou período inválido!');
  }
}

// --- Solicitar consultoria personalizada ---
function solicitarConsultoria() {
  console.log('Solicitando consultoria...');
  alert('Em breve entraremos em contato para uma consultoria personalizada!');
  // Aqui você pode integrar com um formulário ou CRM
  /*
  fetch('/api/solicitar-consultoria', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plano: 'personalizado', timestamp: new Date().toISOString() })
  });
  */
}

// --- Retorna dados atuais dos planos (debugging) ---
function obterDadosPlanos() {
  return planosData;
}
