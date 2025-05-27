document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const discordButtons = document.querySelectorAll('.discord-btn, .btn-primary');
    discordButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.open('https://discord.gg/', '_blank');
        });
    });

    const mainLogo = document.getElementById('main-logo');
    if (mainLogo) {
        mainLogo.addEventListener('click', function(e) {
            createStarBurst(e.target);
        });
    }

    const lunarTexts = document.querySelectorAll('#nav-lunar-text, .brand-highlight');
    lunarTexts.forEach(text => {
        text.addEventListener('click', function(e) {
            createStarBurst(e.target);
        });
    });

    const gamesBtn = document.getElementById('games-btn');
    const gamesDropdown = document.getElementById('games-dropdown');
    const communityBtn = document.querySelector('a[href="#community"]');

    if (gamesBtn) {
        gamesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            createStarBurst(e.target);
        });
    }

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const scriptName = e.target.getAttribute('data-script');
            createStarBurst(e.target);

            showScriptNotification(scriptName);
            const specificScript = document.getElementById(`${scriptName}-script`);
            if (specificScript) {
                specificScript.scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightScript(specificScript);
            } else {
                const scriptsSection = document.querySelector('.scripts');
                if (scriptsSection) {
                    scriptsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    function showScriptNotification(scriptName) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #666666, #444444);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(100, 100, 100, 0.4);
            animation: slideIn 0.3s ease-out;
        `;

        const displayName = scriptName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        notification.textContent = `Selected: ${displayName} Script`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function highlightScript(scriptElement) {
        document.querySelectorAll('.script-card').forEach(card => {
            card.classList.remove('highlighted');
        });

        scriptElement.classList.add('highlighted');

        setTimeout(() => {
            scriptElement.classList.remove('highlighted');
        }, 3000);
    }

    if (communityBtn) {
        communityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://discord.gg/', '_blank');
            createStarBurst(e.target);
        });
    }

    const getScriptBtn = document.querySelector('.get-script-btn');
    if (getScriptBtn) {
        getScriptBtn.addEventListener('click', function() {
            const scriptCode = document.querySelector('.script-code');
            if (scriptCode) {
                scriptCode.style.display = scriptCode.style.display === 'none' ? 'block' : 'none';
            } else {
                createScriptCodeSection();
            }
        });
    }

    const exploreBtn = document.querySelector('.btn-secondary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const scriptsSection = document.querySelector('.scripts');
            if (scriptsSection) {
                scriptsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const scriptCards = document.querySelectorAll('.script-card');
    scriptCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

function createStarBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const starTypes = [
        { svg: 'logo-star.svg', size: 20, count: 3 },
        { svg: 'text-star.svg', size: 16, count: 3 },
        { svg: 'diamond-star.svg', size: 12, count: 2 }
    ];

    let starIndex = 0;

    starTypes.forEach(starType => {
        for (let i = 0; i < starType.count; i++) {
            const star = document.createElement('div');
            star.innerHTML = `<img src="assets/${starType.svg}" width="${starType.size}" height="${starType.size}" style="filter: drop-shadow(0 0 8px rgba(100, 100, 100, 0.8));">`;
            star.style.cssText = `
                position: fixed;
                left: ${centerX - starType.size/2}px;
                top: ${centerY - starType.size/2}px;
                pointer-events: none;
                z-index: 10000;
            `;

            document.body.appendChild(star);

            const angle = (starIndex / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const distance = 80 + Math.random() * 60;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            const duration = 800 + Math.random() * 400;
            star.animate([
                {
                    transform: 'translate(0, 0) scale(0) rotate(0deg)',
                    opacity: 0,
                    filter: 'drop-shadow(0 0 5px rgba(100, 100, 100, 0.5))'
                },
                {
                    transform: `translate(${(endX - centerX) * 0.3}px, ${(endY - centerY) * 0.3}px) scale(1.2) rotate(180deg)`,
                    opacity: 1,
                    filter: 'drop-shadow(0 0 15px rgba(100, 100, 100, 1))',
                    offset: 0.3
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0.3) rotate(720deg)`,
                    opacity: 0,
                    filter: 'drop-shadow(0 0 3px rgba(100, 100, 100, 0.3))'
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, duration);

            starIndex++;
        }
    });
}

function createScriptCodeSection() {
    const scriptCard = document.querySelector('.script-card');
    const scriptCodeHTML = `
        <div class="script-code" style="margin-top: 2rem; padding: 1.5rem; background: rgba(0, 0, 0, 0.5); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="color: #8b4513; font-weight: 600;">Script</h4>
                <button class="copy-btn" style="background: rgba(139, 69, 19, 0.2); color: #8b4513; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            <pre style="background: #000; padding: 1rem; border-radius: 6px; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 0.9rem; color: #00ff00;"><code>luxy rei delas</code></pre>
        </div>
    `;

    scriptCard.insertAdjacentHTML('beforeend', scriptCodeHTML);

    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const code = document.querySelector('.script-code code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            });
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '✨';
        particle.style.cssText = `
            position: absolute;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.6);
            animation: simpleFloat ${Math.random() * 10 + 8}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes simpleFloat {
        0% {
            transform: translateY(100vh);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-20vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', createParticles);

function createCursorTrail() {
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 100) return;
        lastTime = now;
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 0.6rem;
            pointer-events: none;
            z-index: 9999;
            animation: fadeOut 0.8s ease-out forwards;
        `;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 800);
    });

    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(trailStyle);
}

createCursorTrail();

function createContinuousStars() {
    const logo = document.getElementById('main-logo');
    const lunarTexts = document.querySelectorAll('#nav-lunar-text, .brand-highlight');

    function emitStar(element, isLogo = false) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const starType = isLogo ? 'logo-star.svg' : 'text-star.svg';
        const size = isLogo ? 18 : 14;

        const star = document.createElement('div');
        star.innerHTML = `<img src="assets/${starType}" width="${size}" height="${size}" style="filter: drop-shadow(0 0 10px rgba(100, 100, 100, 0.8));">`;
        star.style.cssText = `
            position: fixed;
            left: ${centerX - size/2}px;
            top: ${centerY - size/2}px;
            pointer-events: none;
            z-index: 100;
            animation: enhancedStarFloat 4s ease-out forwards;
        `;

        document.body.appendChild(star);

        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 4000);
    }

    if (logo) {
        setInterval(() => emitStar(logo, true), 4000);
        setTimeout(() => emitStar(logo, true), 1000);
    }

    lunarTexts.forEach((text, index) => {
        setInterval(() => emitStar(text, false), 5000);
        setTimeout(() => emitStar(text, false), 2000 + index * 1000);
    });

    const starStyle = document.createElement('style');
    starStyle.textContent = `
        @keyframes enhancedStarFloat {
            0% {
                transform: translateY(0px) scale(0.5) rotate(0deg);
                opacity: 0;
                filter: drop-shadow(0 0 5px rgba(100, 100, 100, 0.5));
            }
            20% {
                transform: translateY(-20px) scale(1) rotate(72deg);
                opacity: 1;
                filter: drop-shadow(0 0 15px rgba(100, 100, 100, 1));
            }
            80% {
                transform: translateY(-80px) scale(1.2) rotate(288deg);
                opacity: 0.8;
                filter: drop-shadow(0 0 20px rgba(100, 100, 100, 0.8));
            }
            100% {
                transform: translateY(-120px) scale(0.3) rotate(360deg);
                opacity: 0;
                filter: drop-shadow(0 0 5px rgba(100, 100, 100, 0.2));
            }
        }
    `;
    document.head.appendChild(starStyle);
}

createContinuousStars();

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

console.log(`
██╗     ██╗   ██╗███╗   ██╗ █████╗ ██████╗
██║     ██║   ██║████╗  ██║██╔══██╗██╔══██╗
██║     ██║   ██║██╔██╗ ██║███████║██████╔╝
██║     ██║   ██║██║╚██╗██║██╔══██║██╔══██╗
███████╗╚██████╔╝██║ ╚████║██║  ██║██║  ██║
╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝

Welcome to Lunar Script Hub!
Premium gaming scripts for enhanced gameplay.
`);
