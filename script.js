const baseURL = "https://mochaservices.github.io/gamelib";
const secondaryURL = "https://mochaservices.github.io/games"
const games = [
    {
        title: "Vex 8",
        image: "https://static.keygames.com/4/117014/103021/1200x630/vex-8.webp",
        url: `${baseURL}/Vex8/`
    },
    {
        title: "2048",
        url: `${baseURL}/2048`
    },
    {
        title: "Bitlife",
        url: `${baseURL}/bitlife/`
    },
    {
        title: "Subway Surfers",
        url: `${baseURL}/subway-surfers`
    },
    {
        title: "Stickman Hook",
        url: `${baseURL}/stickman-hook`
    },
    {
        title: "Retro Bowl",
        url: `${baseURL}/retro-bowl`
    },
    {
        title: "Jetpack Joyride",
        url: `${baseURL}/jetpack`
    },
    {
        title: "Slope",
        url: `${baseURL}/slope`
    },
    {
        title: "OvO",
        url: `${baseURL}/ovo`
    },
    {
        title: "Tiny Fishing",
        url: `${baseURL}/tiny-fishing`
    },
    {
        title: "Super Mario 64",
        url: `${baseURL}/sm64`
    },
    {
        title: "DogeMiner",
        image: "https://www.tynker.com/projects/images/fa05912bfa019f2822a07833c115fdb5e50db7dd/image4---image.png",
        url: `${baseURL}/DogeMiner/`
    },
    {
        title: "10 Minutes Till Dawn",
        url: `${baseURL}/10-minutes-till-dawn`
    },
    {
        title: "Basketball Stars",
        url: `${baseURL}/basketball-stars`
    },
    {
        title: "Ragdoll Archers",
        url: `${secondaryURL}/ragdoll-archers`
    }
];

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

function sortGamesAlphabetically(gamesArray) {
    return [...gamesArray].sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
}

// Helper function to convert game title to filename format
function getImageFilename(title) {
    // Convert title to lowercase and replace spaces with hyphens
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Modified populateGames function with fallback
function populateGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    // Clear existing games
    gamesGrid.innerHTML = '';
    // Sort games before populating
    const sortedGames = sortGamesAlphabetically(games);
    sortedGames.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';

        // Get image filename from game title
        const imageFilename = getImageFilename(game.title);

        gameCard.innerHTML = `
            <picture>
                <source srcset="images/${imageFilename}.webp" type="image/webp">
                <source srcset="images/${imageFilename}.png" type="image/png">
                <img src="images/${imageFilename}.png" alt="${game.title}" class="game-image">
            </picture>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
            </div>
        `;
        gameCard.addEventListener('click', () => loadGame(game));
        gamesGrid.appendChild(gameCard);
    });
}

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

const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const title = card.querySelector('.game-title').textContent.toLowerCase();

        if (title.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.style.display !== 'none') {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        }
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

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

const updateRecentlyPlayed = (game) => {
    let recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    recentGames = recentGames.filter(g => g.title !== game.title);
    recentGames.unshift(game);
    recentGames = recentGames.slice(0, 5);
    localStorage.setItem('recentGames', JSON.stringify(recentGames));
};

const init = () => {
    lazyLoadImages();
    transitionPages();
    
    document.querySelectorAll('.game-card').forEach(card => {
        card.setAttribute('tabindex', '0');
    });
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
