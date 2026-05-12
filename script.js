function loadInitialTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme == 'dark') {
        document.body.classList.add('dark-mode');
    } else if (currentTheme == 'light') {
        document.body.classList.add('light-mode');
    }
}

function applyNextTheme(prefersDarkScheme) {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        return 'light';
    }
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        return 'dark';
    }
    if (prefersDarkScheme.matches) {
        document.body.classList.add('light-mode');
        return 'light';
    }
    document.body.classList.add('dark-mode');
    return 'dark';
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const theme = applyNextTheme(prefersDarkScheme);
        localStorage.setItem('theme', theme);
    });
}

function closeMobileMenu(menuToggle, navLinks) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => closeMobileMenu(menuToggle, navLinks));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadInitialTheme();
    setupThemeToggle();
    setupMobileMenu();
});
