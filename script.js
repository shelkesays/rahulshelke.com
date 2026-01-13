document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference, if any, on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme == 'dark') {
        document.body.classList.add('dark-mode');
    } else if (currentTheme == 'light') {
        document.body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = 'light';

            // Check current effective theme
            if (document.body.classList.contains('dark-mode')) {
                // Currently forced dark -> switch to light
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                theme = 'light';
            } else if (document.body.classList.contains('light-mode')) {
                // Currently forced light -> switch to dark
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                theme = 'dark';
            } else {
                // No class set (using system default)
                if (prefersDarkScheme.matches) {
                    // System is dark -> switch to light
                    document.body.classList.add('light-mode');
                    theme = 'light';
                } else {
                    // System is light -> switch to dark
                    document.body.classList.add('dark-mode');
                    theme = 'dark';
                }
            }

            localStorage.setItem('theme', theme);
        });
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    console.log('Leadership Profile Loaded.');
});
