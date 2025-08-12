// Eshuholigi.pro - Main JavaScript File
// Mobile menu toggle functionality and other interactive features

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eshuholigi.pro website loaded successfully!');
    
    // Mobile menu toggle functionality
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    // Toggle mobile menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        console.log('Hamburger clicked');
        toggleMobileMenu();
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle mobile menu open/close
 */
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Update ARIA attributes for accessibility
    const isOpen = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    
    // Prevent body scroll when menu is open
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

/**
 * Initialize scroll animations for fade-in elements
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) {
        return;
    }
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                event.preventDefault();
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Smooth scroll to target
                const headerHeight = document.querySelector('.navbar')?.offsetHeight || 60;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle scroll events for navbar styling (optional enhancement)
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    const handleScroll = debounce(function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize form validation (if forms are present)
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            const isValid = validateForm(form);
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
}

/**
 * Basic form validation
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

/**
 * Initialize lazy loading for images (optional enhancement)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0 || !('IntersectionObserver' in window)) {
        return;
    }
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Export functions for potential use in other scripts
window.EshuholigiApp = {
    toggleMobileMenu: toggleMobileMenu,
    closeMobileMenu: closeMobileMenu,
    initMobileMenu: initMobileMenu,
    initScrollAnimations: initScrollAnimations,
    initSmoothScrolling: initSmoothScrolling
};
