document.addEventListener('DOMContentLoaded', () => {
  // ScrollSpy do Bootstrap
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  }

  // Fecha o menu no mobile após clicar
  const navbarToggler = document.querySelector('.navbar-toggler');
  const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');
  responsiveNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // Botão "Voltar ao topo"
  const btnTopo = document.getElementById('btnTopo');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      btnTopo.style.display = 'block';
    } else {
      btnTopo.style.display = 'none';
    }
  });

  btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botão "Quero aparecer"
  const botaoComecar = document.getElementById('btnComecar');
  botaoComecar.addEventListener('click', () => {
    document.querySelector('#planos').scrollIntoView({ behavior: 'smooth' });
  });

  // Contador de cliques
  let contador = 0;
  botaoComecar.addEventListener('click', () => {
    contador++;
    console.log(`Botão clicado ${contador}x`);
  });

  // Animação dos cards
  const cards = document.querySelectorAll('.plano-card');
  cards.forEach((card) => {
    card.addEventListener('mouseover', () => {
      card.style.borderColor = 'red';
    });
    card.addEventListener('mouseout', () => {
      card.style.borderColor = 'transparent';
    });
  });
  
});

// FAQ Script
 function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const isActive = element.classList.contains('active');
            
            // Fecha todas as outras perguntas
            document.querySelectorAll('.faq-question.active').forEach(item => {
                if (item !== element) {
                    item.classList.remove('active');
                    item.nextElementSibling.classList.remove('show');
                }
            });
            
            // Toggle na pergunta atual
            if (isActive) {
                element.classList.remove('active');
                answer.classList.remove('show');
            } else {
                element.classList.add('active');
                answer.classList.add('show');
            }
        }
        
        // Animação suave no scroll
        document.querySelectorAll('.faq-question').forEach(item => {
            item.addEventListener('click', function() {
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            });
        });


 // Objeto para armazenar as seleções
        let planosData = {
            visibilidade: {
                selecionado: false,
                periodo: 'trimestral',
                valor: 400,
                valorTotal: 1200
            },
            impulso: {
                selecionado: false,
                periodo: 'trimestral',
                valor: 700,
                valorTotal: 2100
            }
        };

        // Função para inicializar os eventos
        document.addEventListener('DOMContentLoaded', function() {
            initializePricingOptions();
        });

        function initializePricingOptions() {
            // Adicionar eventos para todas as opções de preço
            document.querySelectorAll('.opcao-preco').forEach(opcao => {
                opcao.addEventListener('click', function() {
                    const radio = this.querySelector('input[type="radio"]');
                    radio.checked = true;
                    
                    // Remover seleção visual de outras opções do mesmo grupo
                    const groupName = radio.name;
                    document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                        r.closest('.opcao-preco').classList.remove('selecionada');
                    });
                    
                    // Adicionar seleção visual na opção atual
                    this.classList.add('selecionada');
                    
                    // Atualizar dados do plano
                    const plano = this.dataset.plano;
                    const periodo = this.dataset.periodo;
                    const valor = parseInt(this.dataset.valor);
                    
                    planosData[plano].periodo = periodo;
                    planosData[plano].valor = valor;
                    planosData[plano].valorTotal = periodo === 'trimestral' ? valor * 3 : valor;
                    
                    console.log('Plano atualizado:', planosData[plano]);
                });
            });

            // Marcar opções padrão como selecionadas visualmente
            document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
                radio.closest('.opcao-preco').classList.add('selecionada');
            });
        }

        function processarPagamento(plano) {
            // Pegar a opção selecionada
            const radioSelecionado = document.querySelector(`input[name="preco-${plano}"]:checked`);
            
            if (!radioSelecionado) {
                alert('Por favor, selecione uma opção de pagamento.');
                return;
            }

            const opcaoSelecionada = radioSelecionado.closest('.opcao-preco');
            const dadosPlano = {
                nome: plano,
                periodo: opcaoSelecionada.dataset.periodo,
                valorMensal: parseInt(opcaoSelecionada.dataset.valor),
                valorTotal: opcaoSelecionada.dataset.periodo === 'trimestral' ? 
                    parseInt(opcaoSelecionada.dataset.valor) * 3 : 
                    parseInt(opcaoSelecionada.dataset.valor)
            };

            // Aqui você pode integrar com sua API de pagamento
            console.log('Processando pagamento:', dadosPlano);
            
            // Exemplo de integração (substitua pela sua lógica)
            processarPagamentoAPI(dadosPlano);
        }

        function processarPagamentoAPI(dadosPlano) {
            // Simular processamento
             
                    let urlPagamento;

                    if (dadosPlano.nome === 'visibilidade') {
                        urlPagamento = dadosPlano.periodo === 'mensal' 
                            ? "https://pagamento.infinitepay.io/link-vis-mensal"
                            : "https://pagamento.infinitepay.io/link-vis-tri";
                    } else if (dadosPlano.nome === 'impulso') {
                        urlPagamento = dadosPlano.periodo === 'mensal' 
                            ? "https://pagamento.infinitepay.io/link-impulso-mensal"
                            : "https://pagamento.infinitepay.io/link-impulso-tri";
                    }

                        // Redirecionar o cliente
                        window.location.href = urlPagamento;
}


        function solicitarConsultoria() {
            // Lógica para solicitar consultoria do plano personalizado
            console.log('Solicitando consultoria...');
            alert('Em breve entraremos em contato para uma consultoria personalizada!');
            
            // Aqui você pode integrar com um formulário ou CRM
            /*
            fetch('/api/solicitar-consultoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plano: 'personalizado',
                    timestamp: new Date().toISOString()
                })
            });
            */
        }

        // Função para obter dados atuais dos planos (útil para debugging)
        function obterDadosPlanos() {
            return planosData;
        }