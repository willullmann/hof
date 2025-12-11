// script.js

// Importa os dados de data.js (certifique-se de que data.js seja carregado ANTES de script.js no HTML)
// Estas variáveis proceduresData e legalData serão globais ou importadas de data.js
// Se você está usando <script src="data.js"></script> antes de <script src="script.js"></script>,
// elas estarão disponíveis automaticamente. Se você estiver usando módulos JS, precisaria de 'export' e 'import'.

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: false, offset: 50 });

    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const procedureCards = document.querySelectorAll('.procedure-card');
    const detailsSection = document.getElementById('procedure-details');
    const legalSection = document.getElementById('legal-details');
    const proceduresSection = document.getElementById('procedimentos');
    const legalLinks = document.querySelectorAll('[data-legal]');

    // Menu mobile toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Função para renderizar o conteúdo de detalhes (procedimentos ou legal)
    function renderDetailContent(sectionElement, data, type) {
        // Garante que a seção atual esteja visível e a outra oculta
        sectionElement.style.display = 'block';
        if (type === 'procedure') {
            legalSection.style.display = 'none';
        } else {
            detailsSection.style.display = 'none';
        }

        // Cria o container de conteúdo
        sectionElement.innerHTML = `<div class="container"><div class="details-content"></div></div>`;
        const contentContainer = sectionElement.querySelector('.details-content');

        // Renderiza o HTML com base no tipo
        if (type === 'procedure') {
            contentContainer.innerHTML = `
                <div class="close-btn" title="Fechar"><i class="fas fa-times"></i></div>
                <h2>${data.title}</h2>
                <img src="${data.imageIllustration}" alt="Ilustração do procedimento ${data.title}" class="procedure-image">
                <div class="description">${data.description}</div>
                <img src="${data.imageAction}" alt="Dr. Willians realizando o procedimento de ${data.title}" class="procedure-image">
                <div class="close-btn-bottom">Fechar</div>
            `;
        } else if (type === 'legal') {
            contentContainer.innerHTML = `
                <div class="close-btn" title="Fechar"><i class="fas fa-times"></i></div>
                <h2>${data.title}</h2>
                <div class="legal-text">${data.text}</div>
                <div class="close-btn-bottom">Fechar</div>
            `;
        }

        // Rola para a seção de detalhes
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Adiciona listeners para os botões de fechar
        contentContainer.querySelectorAll('.close-btn, .close-btn-bottom').forEach(btn => {
            btn.addEventListener('click', () => {
                sectionElement.style.display = 'none';
                // Ao fechar um procedimento, volta para a seção de procedimentos
                if (type === 'procedure') {
                    proceduresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Se for legal, não rola para lugar específico, apenas esconde.
                // Se você quiser que a seção legal também role para um ponto específico, adicione aqui.
            });
        });
    }

    // Inicializa imagens dos cards de procedimentos
    procedureCards.forEach(card => {
        const procedureId = card.dataset.procedure;
        const imageUrl = proceduresData[procedureId]?.imageIllustration;
        const imageContainer = card.querySelector('.card-image-container');
        if (imageContainer && imageUrl) {
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Ilustração de ${procedureId}">`;
        }

        // Adiciona listener para clique nos cards de procedimento
        card.addEventListener('click', () => {
            const data = proceduresData[procedureId];
            if (data) {
                renderDetailContent(detailsSection, data, 'procedure');
            }
        });
    });

    // Adiciona listener para clique nos links legais
    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const legalId = link.dataset.legal;
            const data = legalData[legalId];
            if (data) {
                renderDetailContent(legalSection, data, 'legal');
            }
        });
    });
});