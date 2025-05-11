// Variáveis de estado do jogo
const gameState = {
    currentPhase: 0,
    totalPhases: 5,
    completed: false,
    currentSlide: 0,
    codes: [
        { code: "AMOR-1", message: "Nosso primeiro encontro... Ainda lembro do seu sorriso tímido." },
        { code: "AMOR-2", message: "O lugar onde assistimos a tantos filmes juntos. Quantas horas de felicidade!" },
        { code: "AMOR-3", message: "Onde compartilhamos nossos primeiros segredos... e nossos primeiros sonhos." },
        { code: "AMOR-4", message: "Naquele banco onde você me contou sobre seus medos e eu segurei sua mão." },
        { code: "AMOR-5", message: "A última pista te leva para onde o sol se põe no nosso prédio. Vá até lá agora." }
    ],
    hints: [
        "Procure onde nos conhecemos pela primeira vez...",
        "Vá para onde gostamos de relaxar nas tardes de domingo...",
        "Procure pelo lugar onde temos nossas melhores conversas...",
        "O jardim guarda segredos dos nossos momentos juntos...",
        "O último tesouro está onde o céu encontra o nosso lar..."
    ],
    quotes: [
        "A cada dia que passa, descubro novos motivos para te amar ainda mais.",
        "Meu coração só tem um endereço, e é ao seu lado que ele quer morar.",
        "Você transforma simples momentos em memórias inesquecíveis.",
        "Com você, aprendi que o amor não se explica, se vive intensamente.",
        "Quando estou contigo, o tempo para e o mundo fica mais bonito."
    ]
};

// Elementos DOM
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-btn');
const startButton = document.getElementById('start-journey');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const manualCodeInput = document.getElementById('manual-code');
const submitCodeButton = document.getElementById('submit-code');
const hintCard = document.querySelector('.hint-card p');
const finalText = document.getElementById('final-text');
const secretText = document.getElementById('secret-text');
const messageLock = document.getElementById('message-lock');
const confettiContainer = document.getElementById('confetti');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
const loveQuote = document.querySelector('.love-quote');
const secretMessageBtn = document.querySelector('.nav-btn[data-screen="secret-message-screen"]');

// Carrossel de Fotos
function initCarousel() {
    let carouselInterval = setInterval(nextSlide, 4000);
    
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(carouselInterval);
            changeSlide(index);
            carouselInterval = setInterval(nextSlide, 4000);
        });
    });
    
    changeQuote();
}

function nextSlide() {
    let nextIndex = (gameState.currentSlide + 1) % carouselSlides.length;
    changeSlide(nextIndex);
}

function changeSlide(index) {
    carouselSlides[gameState.currentSlide].classList.remove('active');
    carouselDots[gameState.currentSlide].classList.remove('active');
    
    gameState.currentSlide = index;
    carouselSlides[gameState.currentSlide].classList.add('active');
    carouselDots[gameState.currentSlide].classList.add('active');
    
    if (Math.random() > 0.5) {
        changeQuote();
    }
}

function changeQuote() {
    const randomIndex = Math.floor(Math.random() * gameState.quotes.length);
    loveQuote.innerText = `"${gameState.quotes[randomIndex]}"`;
}

// Atualizar progresso
function updateProgress() {
    const percent = (gameState.currentPhase / gameState.totalPhases) * 100;
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${gameState.currentPhase}/${gameState.totalPhases}`;
}

// Processar código
function processCode(inputCode) {
    const normalizedCode = inputCode.trim().toUpperCase();
    const matchedCode = gameState.codes.find(item => item.code === normalizedCode);
    
    if (matchedCode) {
        const codeNumber = parseInt(normalizedCode.split('-')[1]);
        
        if (codeNumber === gameState.currentPhase + 1) {
            gameState.currentPhase = codeNumber;
            updateProgress();
            
            hintCard.innerHTML = `
                <strong>Mensagem:</strong> "${matchedCode.message}"
                <br><br>
                <strong>Próxima pista:</strong> "${gameState.hints[gameState.currentPhase] || 'Você completou todas as pistas!'}"
            `;
            
            createHeartBurst();
            
            if (gameState.currentPhase === gameState.totalPhases) {
                gameState.completed = true;
                setTimeout(showFinalScreen, 2000);
                localStorage.setItem('loveGameCompleted', 'true');
            }
        } else if (codeNumber <= gameState.currentPhase) {
            showFeedback("Você já encontrou este código amor!", 'info');
        } else {
            showFeedback("Este código é para uma etapa posterior!", 'warning');
        }
    } else {
        showFeedback("Código não reconhecido, tente novamente!", 'error');
    }
    
    manualCodeInput.value = "";
}

// Mostrar tela final
function showFinalScreen() {
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById('final-screen').classList.add('active');
    
    // Desbloquear mensagem secreta
    if (messageLock) {
        messageLock.style.display = 'none';
    }
    
    if (secretText) {
        secretText.innerHTML = `
            <strong>Mensagem Secreta Desbloqueada!</strong><br><br>
            Meu amor, chegou o momento mais especial...<br><br>
            Se este sentimento que tenho por você pudesse ser traduzido em palavras, 
            elas não caberiam neste mundo.<br><br>
            A pergunta mais importante de todas está esperando por você no terraço. 
            Venha me encontrar...
        `;
    }
    
    // Ativar botão de mensagem secreta
    if (secretMessageBtn) {
        secretMessageBtn.classList.add('unlocked');
        secretMessageBtn.style.animation = 'pulsar 1s infinite';
    }
    
    showConfetti();
}

// Feedback
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.innerHTML = message;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('fade-out');
        setTimeout(() => document.body.removeChild(feedback), 500);
    }, 3000);
}

// Confetti
function showConfetti() {
    confettiContainer.style.display = 'block';
    confettiContainer.innerHTML = '';
    
    const colors = ['#8a2be2', '#ff6bff', '#ffffff', '#e68bfc', '#c062ff'];
    
    for (let i = 0; i < 150; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti');
        
        const size = Math.random() * 10 + 5;
        piece.style.width = `${size}px`;
        piece.style.height = `${size}px`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        piece.style.animationDelay = `${Math.random() * 3}s`;
        
        confettiContainer.appendChild(piece);
    }
    
    setTimeout(() => {
        confettiContainer.style.display = 'none';
    }, 6000);
}

// Heart burst effect
function createHeartBurst() {
    // Implementação do efeito de corações
}

// Inicialização
function init() {
    initCarousel();
    
    // Verificar se já completou o jogo
    if (localStorage.getItem('loveGameCompleted') === 'true') {
        gameState.completed = true;
        gameState.currentPhase = gameState.totalPhases;
        updateProgress();
        
        if (messageLock) messageLock.style.display = 'none';
        if (secretText) {
            secretText.innerHTML = `
                <strong>Mensagem Secreta Desbloqueada!</strong><br><br>
                Você já completou nossa jornada especial!<br><br>
                Esta mensagem é só para lembrar o quanto você é especial para mim...
            `;
        }
        if (secretMessageBtn) secretMessageBtn.classList.add('unlocked');
    }
    
    // Event listeners
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetScreen = this.getAttribute('data-screen');
            navButtons.forEach(btn => btn.classList.remove('active'));
            screens.forEach(screen => screen.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetScreen).classList.add('active');
        });
    });
    
    startButton.addEventListener('click', function() {
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById('game-screen').classList.add('active');
        navButtons.forEach(btn => btn.classList.remove('active'));
    });
    
    submitCodeButton.addEventListener('click', function() {
        const code = manualCodeInput.value.trim().toUpperCase();
        processCode(code);
    });
    
    manualCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const code = this.value.trim().toUpperCase();
            processCode(code);
        }
    });
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);