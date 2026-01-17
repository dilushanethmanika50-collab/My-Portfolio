// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme system
    initTheme();
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 500);
    });

    // Initialize all components
    initScrollAnimations();
    initSkillBars();
    initSmoothScrolling();
    initMobileMenu();
    initBackToTop();
    initContactForm();
    initLightbox();
    initCVButton();
    initWhatsAppButton();
    initStickyNav();
});

// ==================== THEME SYSTEM ====================
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggleBtn i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScrolling() {
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
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ==================== SKILL BARS ====================
function initSkillBars() {
    // Store initial data attributes
    document.querySelectorAll('.skill-progress-bar').forEach(bar => {
        bar.dataset.initialProgress = bar.dataset.progress;
    });
}

function animateSkillBars() {
    document.querySelectorAll('.skill-progress-bar').forEach(bar => {
        const progress = bar.dataset.initialProgress;
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== LIGHTBOX ====================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('[data-lightbox]');
    
    // Open lightbox on gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-image');
            if (img) {
                lightboxImg.src = img.src.replace('&w=400&h=400', '&w=1200&h=800');
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    alert(`Thank you, ${formData.name}! Your message has been received. I'll get back to you soon at ${formData.email}.`);
    
    // Reset form
    event.target.reset();
    
    // Log to console (replace with actual backend integration)
    console.log('Form submitted:', formData);
}

// ==================== CV DOWNLOAD BUTTON ====================
function initCVButton() {
    const cvButton = document.getElementById('cvDownloadBtn');
    
    if (cvButton) {
        cvButton.addEventListener('click', downloadCV);
    }
}

function downloadCV() {
    const cvContent = `
DILUSHA ARCHANA - CV
====================

WEB DEVELOPER | VIDEO EDITOR | TECH SPECIALIST | LIVE STREAMER

CONTACT:
📧 Email: dilushaarchana00@gmail.com
📱 WhatsApp: +94 70 522 0051
📍 Location: Sri Lanka

SKILLS:
• Video Editing (Premiere Pro, After Effects) - 90%
• Video Production - 85%
• Graphic Design (Canva, Photoshop) - 85%
• Minecraft Server Development - 75%
• Computer Hardware & Networking - 95%
• Web Development (HTML, CSS, JS, React) - 80%
• Live Streaming (OBS, Streamlabs) - 70%

QUALIFICATIONS:
• Certificate in Computer Hardware & Networking
• Web Development Training (Full-Stack)
• Video Production Workshops
• 3+ Years Minecraft Server Management
• 30+ Freelance Projects Completed
• 1K+ Live Streaming Followers

LANGUAGES:
• English (Fluent)
• Sinhala (Native)

SOCIAL:
• YouTube: youtube.com/@dilushaarchana
• Facebook: facebook.com/dilushaarchana
• Instagram: instagram.com/dilushaarchana
    `;
    
    // Create and download a text file (replace with actual PDF URL in production)
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dilusha-Archana-CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('CV download initiated! In production, this would download a PDF version.');
}

// ==================== WHATSAPP FLOATING BUTTON ====================
function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappFloat');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            window.open('https://wa.me/94705220051', '_blank');
        });
    }
}

// ==================== STICKY NAVIGATION SHADOW ====================
function initStickyNav() {
    const nav = document.getElementById('navbar');
    
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
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

// Optimize scroll event listener
const optimizedScroll = debounce(() => {
    // Additional scroll-based logic can go here
}, 10);

window.addEventListener('scroll', optimizedScroll);