// ===== MODERN UPTD BANDAR LAMPUNG SCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollProgress();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initHeroAnimations();
    initParticleEffects();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .about-card, .social-card, .section-header'
    );
    
    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        // Observe for intersection
        observer.observe(element);
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            setTimeout(() => {
                typeWriter(line, text, 100);
            }, index * 1000);
        });
    }
    
    function typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-particles');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== PARTICLE EFFECTS =====
function initParticleEffects() {
    // Add hover particle effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createParticles(this);
        });
    });
    
    function createParticles(element) {
        const particleCount = 6;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position within the card
                const rect = element.getBoundingClientRect();
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                
                particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10;
                    animation: particleFloat 1.5s ease-out forwards;
                `;
                
                element.style.position = 'relative';
                element.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1500);
            }, i * 100);
        }
    }
    
    // Add particle animation CSS
    if (!document.querySelector('#particle-styles')) {
        const particleStyles = document.createElement('style');
        particleStyles.id = 'particle-styles';
        particleStyles.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.5);
                }
            }
        `;
        document.head.appendChild(particleStyles);
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll event listener with throttling
const throttledScrollHandler = throttle(() => {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progressBar');
    
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Progress bar update
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${Math.min(scrolled, 100)}%`;
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
preloadResources();

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.warn('UPTD Script Error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Focus management for better accessibility
document.addEventListener('focusin', (e) => {
    if (e.target.matches('.nav-link')) {
        e.target.style.outline = '2px solid #667eea';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.matches('.nav-link')) {
        e.target.style.outline = 'none';
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🏛️ UPTD I Bandar Lampung
📍 Unit Pelaksana Teknis Daerah
🚀 Modern & Responsive Website
💻 Powered by Modern Web Technologies
`);

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initScrollProgress,
        initSmoothScroll,
        initScrollAnimations,
        debounce,
        throttle
    };
}