// Game data
const games = [
    {
        title: "Vex 8",
        description: "Challenging platformer with tricky obstacles",
        image: "https://static.keygames.com/4/117014/103021/1200x630/vex-8.webp",
        url: "https://mochaservices.github.io/gamelib/Vex8/"
    },
    {
        title: "2048",
        description: "Addictive number matching puzzle game",
        image: "https://2048.gg/assets/img/2048-game.png",
        url: "https://mochaservices.github.io/gamelib/2048/"
    },
    {
        title: "Bitlife",
        description: "Life simulation with endless choices",
        image: "https://th.bing.com/th/id/OIP.Ukh6ImmDrP2MGX2bTSlAVgHaHa?rs=1&pid=ImgDetMain",
        url: "https://mochaservices.github.io/gamelib/bitlife"
    },
    {
        title: "Subway Surfers",
        description: "High-speed endless runner adventure",
        image: "https://th.bing.com/th/id/OIP.e0lkj3dn15lIFeL2r6jm5wAAAA?rs=1&pid=ImgDetMain",
        url: "https://mochaservices.github.io/gamelib/subway-surfers"
    },
    {
        title: "Stickman Hook",
        description: "Swing through levels with physics",
        image: "https://img.gamemonetize.com/s9lk2v2gr5fmjg8wmy913dqx6wswmwwe/512x384.jpg",
        url: "https://mochaservices.github.io/gamelib/stickman-hook"
    },
    {
        title: "Retro Bowl",
        description: "Retro-style football and team management",
        image: "https://play-lh.googleusercontent.com/WRM5Y1xZmzcCP1YtO5zl6G2g7CU5c5ZfjX4UVrgi1bpNgkfy-wuB-bQx3kkeRfaGYQ",
        url: "https://mochaservices.github.io/gamelib/retro-bowl"
    },
    {
        title: "Jetpack Joyride",
        description: "Action-packed jetpack endless runner",
        image: "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/d5d34cb9ce7b617b93338982aa0958ab.png",
        url: "https://mochaservices.github.io/gamelib/jetpack"
    },
    {
        title: "Doom",
        description: "Classic first-person shooter",
        image: "https://example.com/doom.jpg",
        url: "https://archive.org/details/doom-play"
    },
    {
        title: "Pacman",
        description: "Arcade classic maze chase game",
        image: "https://example.com/pacman.jpg",
        url: "https://pacman.live"
    },
    {
        title: "Snake",
        description: "Classic snake eating game",
        image: "https://example.com/snake.jpg",
        url: "https://snake.io"
    }
];

// Initial loader
document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const progress = document.querySelector('.progress');

    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 200;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            setTimeout(() => {
                loaderWrapper.style.opacity = '0';
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                    populateGames();
                }, 500);
            }, 500);
        }
        progress.style.width = width + '%';
    }, 200);
});

// Populate games grid
function populateGames() {
    const gamesGrid = document.getElementById('gamesGrid');

    games.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s both`;

        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
            </div>
        `;

        gameCard.addEventListener('click', () => loadGame(game));
        gamesGrid.appendChild(gameCard);
    });
}

// Modify the loadGame function
function loadGame(game) {
    const gameOverlay = document.getElementById('gameOverlay');
    const loadingGameName = document.getElementById('loadingGameName');
    const gameProgress = document.querySelector('.game-progress');

    loadingGameName.textContent = game.title;
    gameOverlay.style.display = 'flex';

    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 150;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            setTimeout(() => {
                openInBlank(game.url);
                gameOverlay.style.display = 'none';
                gameProgress.style.width = '0%';
            }, 500);
        }
        gameProgress.style.width = width + '%';
    }, 100);
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        const description = card.querySelector('.game-description').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            // Only play animation if search is cleared
            if (searchTerm === '') {
                card.style.animation = 'slideIn 0.5s ease-out forwards';
            } else {
                card.style.animation = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const gameCards = document.querySelectorAll('.game-card');
    const focused = document.activeElement;
    let index = Array.from(gameCards).indexOf(focused);

    switch (e.key) {
        case 'ArrowRight':
            index = Math.min(index + 1, gameCards.length - 1);
            gameCards[index].focus();
            break;
        case 'ArrowLeft':
            index = Math.max(index - 1, 0);
            gameCards[index].focus();
            break;
        case 'ArrowUp':
            index = Math.max(index - 4, 0);
            gameCards[index].focus();
            break;
        case 'ArrowDown':
            index = Math.min(index + 4, gameCards.length - 1);
            gameCards[index].focus();
            break;
        case 'Enter':
            if (focused.classList.contains('game-card')) {
                const title = focused.querySelector('.game-title').textContent;
                const game = games.find(g => g.title === title);
                loadGame(game);
            }
            break;
    }
});

// Add hover effects for game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Add lazy loading for images
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
};

// Add smooth transitions between pages
const transitionPages = () => {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');

            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
};

// Add local storage for recently played games
const updateRecentlyPlayed = (game) => {
    let recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    recentGames = recentGames.filter(g => g.title !== game.title);
    recentGames.unshift(game);
    recentGames = recentGames.slice(0, 5);
    localStorage.setItem('recentGames', JSON.stringify(recentGames));
};

// Initialize all features
const init = () => {
    createCategoryFilters();
    lazyLoadImages();
    transitionPages();

    // Add keyboard accessibility
    document.querySelectorAll('.game-card').forEach(card => {
        card.setAttribute('tabindex', '0');
    });

    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }
};

function openInBlank(url) {
    const win = window.open('about:blank', '_blank');
    const iframe = win.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.src = url;

    win.document.body.style.margin = '0';
    win.document.body.appendChild(iframe);
}

// Call init when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

