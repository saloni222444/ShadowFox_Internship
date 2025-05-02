const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
    });
});

// Countdown Timer for IPL 2025 (starts March 22, 2025)
function updateCountdown() {
    const iplStartDate = new Date('March 22, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = iplStartDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Player Data for 2025 (projected)
const players = [
    {
        id: 1,
        name: "Rohit Sharma",
        role: "Batsman",
        category: "batsmen",
        image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png",
        stats: "6,000+ MI runs | 5 titles"
    },
    {
        id: 2,
        name: "Jasprit Bumrah",
        role: "Bowler",
        category: "bowlers",
        image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_800,q_50/lsci/db/PICTURES/CMS/399400/399415.jpg",
        stats: "180+ wickets | Economy: 6.99"
    },
    {
        id: 3,
        name: "Suryakumar Yadav",
        role: "Batsman",
        category: "batsmen",
        image: "https://p.imgci.com/db/PICTURES/CMS/346700/346783.jpg",
        stats: "2,500+ MI runs | 150+ SR"
    },
    {
        id: 4,
        name: "Ishan Kishan",
        role: "Wicketkeeper",
        category: "batsmen",
        image: "https://ipltable.in/wp-content/uploads/2024/02/image-16-700x700.jpeg",
        stats: "1,800+ MI runs | 140+ SR"
    },
    {
        id: 5,
        name: "Hardik Pandya",
        role: "All-Rounder",
        category: "allrounders",
        image: "https://c.ndtvimg.com/2025-04/12806hbo_sc_625x300_04_April_25.jpeg?im=FeatureCrop,algorithm=dnn,width=806,height=605",
        stats: "1,500+ runs | 50+ wickets"
    }
];

// Render Players
function renderPlayers(category = 'all') {
    const playersGrid = document.querySelector('.players-grid');
    playersGrid.innerHTML = '';

    const filteredPlayers = category === 'all' 
        ? players 
        : players.filter(player => player.category === category);

    filteredPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <img src="${player.image}" alt="${player.name}" class="player-img">
            <div class="player-info">
                <h3>${player.name}</h3>
                <span class="player-role">${player.role}</span>
                <p>${player.stats}</p>
            </div>
        `;
        playersGrid.appendChild(playerCard);
    });
}

// Category Filter
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPlayers(btn.dataset.category);
    });
});

// Initial render
renderPlayers();

// Match Data for 2025 (projected)
const matches = {
    upcoming: [
        {
            id: 1,
            date: "March 29, 2025",
            teams: ["MI", "CSK"],
            venue: "Wankhede Stadium, Mumbai",
            time: "7:30 PM"
        },
        {
            id: 2,
            date: "April 2, 2025",
            teams: ["MI", "RCB"],
            venue: "Chinnaswamy Stadium, Bengaluru",
            time: "7:30 PM"
        }
    ],
    results: [
        {
            id: 3,
            date: "March 24, 2025",
            teams: ["MI", "DC"],
            venue: "Wankhede Stadium, Mumbai",
            result: "MI won by 5 wickets"
        }
    ]
};


// Fan Gallery Slider
function initGallerySlider() {
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Navigation buttons
    document.querySelector('.gallery-nav.prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });
    
    document.querySelector('.gallery-nav.next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });
    
    // Auto-rotate slides
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % slides.length;
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        }
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function updateSlider() {
        slider.scrollTo({
            left: currentSlide * slider.offsetWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

// Initialize gallery slider when DOM loads
document.addEventListener('DOMContentLoaded', initGallerySlider);
// Render Matches
function renderMatches(tab = 'upcoming') {
    const matchesContainer = document.querySelector('.matches-container');
    matchesContainer.innerHTML = '';

    matches[tab].forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        
        if (tab === 'upcoming') {
            matchCard.innerHTML = `
                <div class="match-teams">
                    <div class="team">
                        <img src="https://1000logos.net/wp-content/uploads/2022/08/Mumbai-Indians-Logo.png" alt="MI">
                        <span class="team-name">Mumbai Indians</span>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png" alt="${match.teams[1]}">
                        <span class="team-name">${match.teams[1]}</span>
                    </div>
                </div>
                <div class="match-details">
                    <p class="match-date">${match.date}</p>
                    <p class="match-venue">${match.venue}</p>
                    <p class="match-time">${match.time}</p>
                </div>
            `;
        } else {
            matchCard.innerHTML = `
                <div class="match-teams">
                    <div class="team">
                        <img src="https://1000logos.net/wp-content/uploads/2022/08/Mumbai-Indians-Logo.png" alt="MI">
                        <span class="team-name">Mumbai Indians</span>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team">
                        <img src="https://www.pngguru.in/storage/uploads/images/Delhi%20capitals%20logo%20HD%20PNG%20with%20Transparent%20Background_1680269793_664865626.webp" alt="${match.teams[1]}">
                        <span class="team-name">${match.teams[1]}</span>
                    </div>
                </div>
                <div class="match-details">
                    <p class="match-date">${match.date}</p>
                    <p class="match-venue">${match.venue}</p>
                    <p class="match-result">${match.result}</p>
                </div>
            `;
        }

        matchesContainer.appendChild(matchCard);
    });
}

// Enhanced Gallery Slider with Keyboard Support
function initGallerySlider() {
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;
    
    // Create navigation dots
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            if (!isPaused) {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            }
        }, 5000);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }
    
    // Update slider position and dots
    function updateSlider() {
        slider.scrollTo({
            left: currentSlide * slider.offsetWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Reset auto-slide timer
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Navigation buttons
    document.querySelector('.gallery-nav.prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    });
    
    document.querySelector('.gallery-nav.next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
    });
    
    // Pause on hover/focus
    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);
    slider.addEventListener('focusin', () => isPaused = true);
    slider.addEventListener('focusout', () => isPaused = false);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isPaused = true;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isPaused = false;
        resetAutoSlide();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % slides.length;
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        }
        updateSlider();
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
            resetAutoSlide();
        }
    });
    
    // Initialize
    createDots();
    startAutoSlide();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        slider.scrollTo({
            left: currentSlide * slider.offsetWidth,
            behavior: 'auto'
        });
    });
}

// Initialize gallery slider when DOM loads
document.addEventListener('DOMContentLoaded', initGallerySlider);
// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMatches(btn.dataset.tab);
    });
});

// Initial render
renderMatches();

// Poll Submission
document.getElementById('mvp-poll').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedPlayer = document.querySelector('input[name="mvp"]:checked').value;
    alert(`Thanks for voting! You selected ${selectedPlayer} as MI's 2025 MVP.`);
    e.target.reset();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
