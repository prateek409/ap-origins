// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    navOverlay.classList.remove('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                // Trigger animation
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = '';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});


// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Navbar active state on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-item, .info-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
const statsSection = document.querySelector('.stats');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;

    const counters = document.querySelectorAll('.stat-card h3');
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (!isNaN(number)) {
            let current = 0;
            const increment = Math.ceil(number / 50);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    counter.textContent = text;
                    clearInterval(timer);
                } else {
                    counter.textContent = current + '+';
                }
            }, 30);
        }
    });

    hasAnimated = true;
};

// Trigger counter animation when stats section is visible
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
        }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Scroll-driven background images (crossfade as you scroll)
const scrollBg = document.getElementById('scrollBg');
if (scrollBg) {
    const layers = scrollBg.querySelectorAll('.scroll-bg-layer');
    const n = layers.length;

    let ticking = false;
    function paintScrollBg() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const p = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        if (n <= 1) {
            if (layers[0]) layers[0].style.opacity = '1';
            ticking = false;
            return;
        }
        const u = p * (n - 1);
        const i0 = Math.floor(u);
        const i1 = Math.min(i0 + 1, n - 1);
        const t = u - i0;
        layers.forEach((layer, i) => {
            let op = 0;
            if (i0 === i1) {
                op = i === i0 ? 1 : 0;
            } else if (i === i0) {
                op = 1 - t;
            } else if (i === i1) {
                op = t;
            }
            layer.style.opacity = String(op);
        });
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(paintScrollBg);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', paintScrollBg);
    paintScrollBg();
}

// Add active state styling to nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
