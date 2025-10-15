// Scripts pour la documentation cross-env-cmd

// Fonction pour copier du texte dans le presse-papiers
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Utiliser l'API Clipboard moderne
        navigator.clipboard.writeText(text).then(function() {
            showCopySuccess();
        }).catch(function(err) {
            console.error('Erreur lors de la copie: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Fallback pour les navigateurs plus anciens
        fallbackCopyTextToClipboard(text);
    }
}

// Fonction de fallback pour la copie
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Éviter le défilement vers le bas
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('Erreur lors de la copie: ', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// Afficher le succès de la copie
function showCopySuccess() {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Copié!';
    btn.classList.add('copied');
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
    }, 2000);
}

// Afficher l'erreur de copie
function showCopyError() {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '❌ Erreur';
    btn.classList.add('error');
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('error');
    }, 2000);
}

// Smooth scrolling pour la navigation
function initSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Highlight de la section active
function initActiveSectionHighlight() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Fonction pour créer un bouton de copie automatiquement
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        // Vérifier s'il n'y a pas déjà un bouton
        if (!block.parentNode.querySelector('.copy-btn')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '📋 Copier';
            copyBtn.onclick = function() {
                copyToClipboard(block.textContent);
            };
            block.parentNode.insertBefore(copyBtn, block.nextSibling);
        }
    });
}

// Fonction pour ajouter la numérotation des lignes
function addLineNumbers() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        const lines = block.textContent.split('\n');
        if (lines.length > 1) {
            const numberedContent = lines.map((line, index) => {
                return `<span class="line-number">${index + 1}</span>${line}`;
            }).join('\n');
            block.innerHTML = numberedContent;
        }
    });
}

// Fonction pour le mode sombre
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow);
        transition: var(--transition);
    `;
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Restaurer le mode sombre si activé
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    document.body.appendChild(darkModeToggle);
}

// Fonction pour ajouter un bouton "Retour en haut"
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: var(--shadow);
        transition: var(--transition);
        opacity: 0;
        visibility: hidden;
    `;
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(backToTopBtn);
}

// Fonction pour ajouter un indicateur de progression de lecture
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-color);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Fonction pour ajouter des styles CSS supplémentaires
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dark-mode {
            background-color: #1a1a1a !important;
            color: #e0e0e0 !important;
        }
        
        .dark-mode .section {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
        }
        
        .dark-mode .code-block {
            background-color: #1e1e1e !important;
            color: #d4d4d4 !important;
        }
        
        .dark-mode nav {
            background-color: #2d2d2d !important;
        }
        
        .dark-mode nav a {
            color: #e0e0e0 !important;
        }
        
        .line-number {
            color: #666;
            margin-right: 1rem;
            user-select: none;
        }
        
        .copy-btn.error {
            background: var(--danger-color);
        }
        
        .back-to-top:hover,
        .dark-mode-toggle:hover {
            transform: scale(1.1);
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Fonction d'initialisation principale
function init() {
    // Initialiser toutes les fonctionnalités
    initSmoothScrolling();
    initActiveSectionHighlight();
    addCopyButtons();
    addLineNumbers();
    initDarkMode();
    addBackToTopButton();
    addReadingProgress();
    addAdditionalStyles();
    
    // Ajouter un délai pour les animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Initialiser quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exporter les fonctions pour utilisation externe
window.copyToClipboard = copyToClipboard;

