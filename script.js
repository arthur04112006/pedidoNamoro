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
        const mapDots = document.querySelectorAll('.map-dot');
        const finalText = document.getElementById('final-text');
        const secretText = document.getElementById('secret-text');
        const confettiContainer = document.getElementById('confetti');
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const carouselDots = document.querySelectorAll('.carousel-dot');
        const loveQuote = document.querySelector('.love-quote');

        // Inicialização de partículas
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Tamanho aleatório
                const size = Math.random() * 7 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Posição inicial aleatória
                particle.style.left = `${Math.random() * 100}%`;
                
                // Atraso de animação aleatório
                const animationDelay = Math.random() * 10;
                particle.style.animation = `float ${8 + Math.random() * 7}s linear ${animationDelay}s infinite`;
                
                // Cor aleatória (tons de roxo e rosa)
                const colors = ['rgba(138, 43, 226, 0.7)', 'rgba(255, 107, 255, 0.7)', 'rgba(255, 255, 255, 0.7)'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Carrossel de Fotos
        function initCarousel() {
            // Iniciar o carrossel com alteração automática de slides
            let carouselInterval = setInterval(nextSlide, 4000);
            
            // Configurar controles do carrossel (dots)
            carouselDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(carouselInterval);
                    changeSlide(index);
                    carouselInterval = setInterval(nextSlide, 4000);
                });
            });
            
            // Configurar citação aleatória
            changeQuote();
        }
        
        // Mudar para o próximo slide
        function nextSlide() {
            let nextIndex = (gameState.currentSlide + 1) % carouselSlides.length;
            changeSlide(nextIndex);
        }
        
        // Mudar slide
        function changeSlide(index) {
            // Desativar slide atual
            carouselSlides[gameState.currentSlide].classList.remove('active');
            carouselDots[gameState.currentSlide].classList.remove('active');
            
            // Ativar novo slide
            gameState.currentSlide = index;
            carouselSlides[gameState.currentSlide].classList.add('active');
            carouselDots[gameState.currentSlide].classList.add('active');
            
            // Alterar a citação quando mudar o slide
            if (Math.random() > 0.5) {
                changeQuote();
            }
        }
        
        // Mudar citação
        function changeQuote() {
            const randomIndex = Math.floor(Math.random() * gameState.quotes.length);
            loveQuote.innerText = `"${gameState.quotes[randomIndex]}"`;
        }
        
        // Efeitos de coração
        function createHeartBurst() {
            const heartCount = 15;
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%)';
            container.style.zIndex = '1000';
            container.style.pointerEvents = 'none';
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'absolute';
                heart.style.fontSize = `${Math.random() * 20 + 20}px`;
                heart.style.opacity = '0';
                
                // Posição aleatória
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const startX = 0;
                const startY = 0;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                // Animar
                heart.animate([
                    { transform: `translate(${startX}px, ${startY}px) scale(0.5)`, opacity: 0 },
                    { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 1, offset: 0.1 },
                    { transform: `translate(${endX}px, ${endY}px) scale(0.5)`, opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                });
                
                container.appendChild(heart);
            }
            
            document.body.appendChild(container);
            
            // Remover após a animação
            setTimeout(() => {
                document.body.removeChild(container);
            }, 1500);
        }

        // Inicializar scanner QR Code
        function initScanner() {
            const video = document.getElementById('scanner');
            let canvasElement = document.createElement('canvas');
            let canvas = canvasElement.getContext('2d');
            let scanning = false;
            
            // Configurar câmera
            navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            }).then(function(stream) {
                video.srcObject = stream;
                video.play();
                
                // Função para verificar o QR Code
                function tick() {
                    if (video.readyState === video.HAVE_ENOUGH_DATA && !scanning) {
                        scanning = true;
                        
                        canvasElement.height = video.videoHeight;
                        canvasElement.width = video.videoWidth;
                        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                        
                        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                        const code = jsQR(imageData.data, imageData.width, imageData.height, {
                            inversionAttempts: "dontInvert",
                        });
                        
                        if (code) {
                            console.log("QR Code detectado:", code.data);
                            processCode(code.data);
                            
                            // Pausa temporária após detectar um código
                            setTimeout(() => {
                                scanning = false;
                            }, 2000);
                        } else {
                            scanning = false;
                        }
                    }
                    requestAnimationFrame(tick);
                }
                
                tick();
            }).catch(function(err) {
                console.error("Erro ao acessar a câmera: ", err);
                showFeedback("Não foi possível acessar a câmera. Por favor, utilize o código manual.", 'error');
            });
        }

        // Processar código (QR ou manual)
        function processCode(inputCode) {
            const matchedCode = gameState.codes.find(item => item.code === inputCode);
            
            if (matchedCode && gameState.currentPhase < gameState.totalPhases) {
                // Atualizar progresso
                gameState.currentPhase++;
                updateProgress();
                
                // Atualizar mapa
                if (gameState.currentPhase <= gameState.totalPhases) {
                    mapDots[gameState.currentPhase - 1].classList.add('completed');
                }
                
                // Mostrar mensagem e próxima dica
                hintCard.innerHTML = `
                    <strong>Mensagem:</strong> "${matchedCode.message}"
                    <br><br>
                    <strong>Próxima pista:</strong> "${gameState.currentPhase < gameState.totalPhases ? 
                        gameState.hints[gameState.currentPhase] : 'Você completou todas as pistas!'}"
                `;
                
                // Efeito de celebração para cada fase
                createHeartBurst();
                
                // Verificar se completou o jogo
                if (gameState.currentPhase === gameState.totalPhases) {
                    setTimeout(() => {
                        showFinalScreen();
                    }, 3000);
                }
            } else if (matchedCode) {
                // Código correto, mas já processado
                alert("Você já escaneou este QR Code. Continue procurando o próximo!");
            } else {
                // Código inválido
                alert("Código inválido! Tente novamente.");
            }
            
            // Limpar input manual
            manualCodeInput.value = "";
        }
        
        // Mostrar confetti
        function showConfetti() {
            const confetti = document.getElementById('confetti');
            confetti.style.display = 'block';
            
            const confettiCount = 150;
            const colors = ['#8a2be2', '#ff6bff', '#ffffff', '#e68bfc', '#c062ff'];
            
            confetti.innerHTML = '';
            
            for (let i = 0; i < confettiCount; i++) {
                const confettiPiece = document.createElement('div');
                confettiPiece.classList.add('confetti');
                
                // Estilo aleatório para cada peça
                const size = Math.random() * 10 + 5;
                confettiPiece.style.width = `${size}px`;
                confettiPiece.style.height = `${size}px`;
                confettiPiece.style.background = colors[Math.floor(Math.random() * colors.length)];
                confettiPiece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confettiPiece.style.left = `${Math.random() * 100}%`;
                
                // Animar queda de confetti
                confettiPiece.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
                confettiPiece.style.animationDelay = `${Math.random() * 3}s`;
                
                confetti.appendChild(confettiPiece);
            }
            
            setTimeout(() => {
                confetti.style.display = 'none';
            }, 6000);
        }
        
        // Mostrar tela final
        function showFinalScreen() {
            // Trocar para tela final
            screens.forEach(screen => screen.classList.remove('active'));
            document.getElementById('final-screen').classList.add('active');
            
            // Efeitos visuais
            showConfetti();
            createHeartBurst();
            
            // Desbloquear mensagem secreta
            secretText.innerHTML = `
                Meu amor, chegou o momento mais especial... <br><br>
                Se este sentimento que tenho por você pudesse ser traduzido em palavras, 
                elas não caberiam neste mundo. <br><br>
                A pergunta mais importante de todas está esperando por você no terraço. 
                Venha me encontrar...
            `;
            
            // Atualizar botão na navegação para "Mensagem" para ficar piscando
            const messageBtn = document.querySelector('.nav-btn[data-screen="secret-message-screen"]');
            messageBtn.classList.add('active');
            messageBtn.style.animation = 'pulsar 1s infinite';
        }
        
        // Inicializar tudo
        document.addEventListener('DOMContentLoaded', function() {
            // Criar partículas
            createParticles();
            
            // Inicializar carrossel
            initCarousel();
            
            // Inicializar navegação
            navButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetScreen = this.getAttribute('data-screen');
                    
                    // Desativar todos os botões e telas
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    screens.forEach(screen => screen.classList.remove('active'));
                    
                    // Ativar botão e tela atual
                    this.classList.add('active');
                    document.getElementById(targetScreen).classList.add('active');
                });
            });
            
            // Botão iniciar jornada
            startButton.addEventListener('click', function() {
                screens.forEach(screen => screen.classList.remove('active'));
                document.getElementById('game-screen').classList.add('active');
                
                // Inicializar scanner
                initScanner();
                
                // Atualizar navegação
                navButtons.forEach(btn => btn.classList.remove('active'));
            });
            
            // Botão para código manual
            submitCodeButton.addEventListener('click', function() {
                const code = manualCodeInput.value.trim().toUpperCase();
                processCode(code);
            });
            
            // Enter no input de código manual
            manualCodeInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const code = this.value.trim().toUpperCase();
                    processCode(code);
                }
            });
            
            // Atualizar progresso
            function updateProgress() {
                const percent = (gameState.currentPhase / gameState.totalPhases) * 100;
                progressFill.style.width = `${percent}%`;
                progressText.textContent = `${gameState.currentPhase}/${gameState.totalPhases}`;
            }
            function isValidCode(code) {
                // Verifica se o código está no formato correto (AMOR-1, AMOR-2, etc.)
                if (!/^AMOR-\d+$/.test(code)) {
                    return false;
                }
                
                // Extrai o número do código
                const codeNumber = parseInt(code.split('-')[1]);
                
                // Verifica se o número está dentro do intervalo válido (1 a totalPhases)
                return codeNumber >= 1 && codeNumber <= gameState.totalPhases;
            }
            function processCode(inputCode) {
                // Normaliza o código (remove espaços, coloca em maiúsculas)
                const normalizedCode = inputCode.trim().toUpperCase();
                
                // Verifica se o código é válido
                if (!isValidCode(normalizedCode)) {
                    showFeedback("Código inválido! Tente novamente.", 'error');
                    return;
                }
                
                // Extrai o número do código (1-5)
                const codeNumber = parseInt(normalizedCode.split('-')[1]);
                
                // Verifica se é o próximo código esperado
                if (codeNumber !== gameState.currentPhase + 1) {
                    if (codeNumber <= gameState.currentPhase) {
                        showFeedback("Você já escaneou este QR Code. Continue procurando o próximo!", 'info');
                    } else {
                        showFeedback("Este código é para uma etapa posterior! Complete as etapas anteriores primeiro.", 'warning');
                    }
                    return;
                }
                
                // Atualiza o progresso
                gameState.currentPhase = codeNumber;
                updateProgress();
                
                // Marca o ponto no mapa como completado
                mapDots[gameState.currentPhase - 1].classList.add('completed');
                
                // Mostra mensagem e próxima dica
                const currentCode = gameState.codes[gameState.currentPhase - 1];
                showFeedback(`
                    <strong>Mensagem:</strong> "${currentCode.message}"
                    <br><br>
                    <strong>Próxima pista:</strong> "${gameState.currentPhase < gameState.totalPhases ? 
                        gameState.hints[gameState.currentPhase] : 'Você completou todas as pistas!'}"
                `, 'success');
                
                // Efeitos visuais
                createHeartBurst();
                
                // Verifica se completou o jogo
                if (gameState.currentPhase === gameState.totalPhases) {
                    setTimeout(showFinalScreen, 3000);
                }
                
                // Limpa o input manual se estiver sendo usado
                manualCodeInput.value = "";
            }
            
            function showFeedback(message, type) {
                // Cria um elemento de feedback temporário
                const feedback = document.createElement('div');
                feedback.className = `feedback ${type}`;
                feedback.innerHTML = message;
                
                // Adiciona ao corpo do documento
                document.body.appendChild(feedback);
                
                // Remove após alguns segundos
                setTimeout(() => {
                    feedback.classList.add('fade-out');
                    setTimeout(() => document.body.removeChild(feedback), 500);
                }, 3000);
            }
        });
    