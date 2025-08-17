/**
 * RAHUL SHELKE PORTFOLIO - JAVASCRIPT
 * All interactive functionality for the portfolio website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // PARTICLE SYSTEM
    // =============================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // =============================================
    // NAVBAR SCROLL EFFECT
    // =============================================
    function handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // =============================================
    // SMOOTH SCROLLING
    // =============================================
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(targetId);
                }
            });
        });
    }
    
    // =============================================
    // UPDATE ACTIVE NAV LINK
    // =============================================
    function updateActiveNavLink(targetId) {
        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // =============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =============================================
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('stat-card')) {
                        animateStatCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    // =============================================
    // TYPING EFFECT FOR HERO TITLE
    // =============================================
    function setupTypingEffect() {
        const heroTitle = document.querySelector('.nav-container .logo');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // =============================================
    // ANIMATE STAT COUNTERS
    // =============================================
    function animateStatCounter(element) {
        // Check if already animated
        if (element.dataset.animated === 'true') return;
        
        const statNumber = element.querySelector('.stat-number');
        if (!statNumber) return;
        
        const text = statNumber.textContent;
        const isPercentage = text.includes('%');
        const hasPlus = text.includes('+');
        const targetNumber = parseInt(text.replace(/[^0-9]/g, ''));
        
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 30);
        const duration = 2000; // 2 seconds
        const stepTime = duration / (targetNumber / increment);
        
        const counter = setInterval(() => {
            currentNumber += increment;
            
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
                element.dataset.animated = 'true';
            }
            
            let displayText = currentNumber;
            if (hasPlus) displayText += '+';
            if (isPercentage) displayText += '%';
            
            statNumber.textContent = displayText;
        }, stepTime);
    }
    
    // =============================================
    // SKILL TAG HOVER EFFECTS
    // =============================================
    function setupSkillTagEffects() {
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateY(-2px)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        });
    }
    
    // =============================================
    // SECTION VISIBILITY TRACKER
    // =============================================
    function setupSectionTracker() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            // Update nav links based on current section
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // =============================================
    // MOBILE MENU TOGGLE (Future Enhancement)
    // =============================================
    function setupMobileMenu() {
        // Placeholder for mobile menu functionality
        // Can be implemented when adding a hamburger menu
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768) {
            // Mobile menu logic here
        }
    }
    
    // =============================================
    // LAZY LOADING FOR IMAGES
    // =============================================
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // =============================================
    // COPY TO CLIPBOARD FOR CONTACT INFO
    // =============================================
    function setupCopyToClipboard() {
        document.querySelectorAll('.contact-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // Only for non-link items (future enhancement)
                if (this.dataset.copy) {
                    e.preventDefault();
                    navigator.clipboard.writeText(this.dataset.copy).then(() => {
                        // Show tooltip or notification
                        showNotification('Copied to clipboard!');
                    });
                }
            });
        });
    }
    
    // =============================================
    // SHOW NOTIFICATION
    // =============================================
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // =============================================
    // HANDLE RESIZE EVENTS
    // =============================================
    function handleResize() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(resizeTimer);
            
            resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        });
    }
    
    // =============================================
    // PRELOADER (Optional)
    // =============================================
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }
    
    // =============================================
    // INITIALIZE ALL FUNCTIONS
    // =============================================
    function init() {
        createParticles();
        handleNavbarScroll();
        setupSmoothScrolling();
        setupIntersectionObserver();
        setupTypingEffect();
        setupSkillTagEffects();
        setupSectionTracker();
        setupMobileMenu();
        setupLazyLoading();
        setupCopyToClipboard();
        handleResize();
        hidePreloader();
        
        // Log successful initialization
        console.log('Portfolio website initialized successfully!');
    }
    
    // Initialize everything
    init();
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Debounce function to limit how often a function can fire
 */
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

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Optimize scroll events with throttling
const optimizedScroll = throttle(() => {
    // Scroll-based operations
}, 100);

window.addEventListener('scroll', optimizedScroll);

// =============================================
// ANIMATION KEYFRAMES (for JS-based animations)
// =============================================
const animationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .resize-animation-stopper * {
        animation-play-state: paused !important;
        transition: none !important;
    }
`;

// Add animation styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// =============================================
// ERROR HANDLING
// =============================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can add error tracking here if needed
});

// =============================================
// CONSOLE MESSAGE
// =============================================
console.log('%c Welcome to Rahul Shelke\'s Portfolio! ', 
    'background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; font-size: 20px; padding: 10px;');
console.log('%c 🚀 Engineered with passion and 100% caffeine-fueled! ', 
    'color: #6366f1; font-size: 14px;');
console.log('%c 📧 Let\'s connect: https://rahulshelke.com ', 
    'color: #06b6d4; font-size: 12px;');
