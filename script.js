// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
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

// Menu Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding menu items
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.classList.contains(targetTab)) {
                item.classList.add('active');
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-content, .about-content, .menu-grid, .contact-content, .coffee-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Parallax effect for hero steam
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const steam = document.querySelector('.coffee-steam');
    const speed = scrolled * 0.5;
    
    if (steam) {
        steam.style.transform = `translateY(${speed}px) scale(1)`;
    }
});

// Preloader (optional - remove if not needed)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization - throttle scroll events
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

window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16));

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});
// Chatbox Functionality
const chatbox = document.getElementById('chatbox');
const chatToggle = document.querySelector('.chatbox-toggle');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.querySelector('.chatbox-messages');

// Toggle chatbox
document.querySelector('.btn-secondary[href="#chatbox"]').addEventListener('click', (e) => {
    e.preventDefault();
    chatbox.classList.add('active');
});

chatToggle.addEventListener('click', () => {
    chatbox.classList.remove('active');
});

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Simulate AI response
    setTimeout(() => {
        const responses = getAIResponse(message.toLowerCase());
        addMessage(responses, 'bot');
    }, 1000);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(message) {
    const responses = {
        'today': "☀️ Perfect day for our **Nitro Cold Brew**! It's smooth, creamy, and refreshing - exactly what you need for Tanauan's weather! 💨",
        'good': "I'd recommend our **Batangas Single Origin** brewed as pour-over. Bright citrus notes with smooth chocolate finish! 🌞",
        'study': "For studying, try our **House Blend Americano**. Strong enough to keep you focused, smooth enough not to jitter you! 📚",
        'work': "Our **Classic Cappuccino** is perfect for work - balanced energy with that comforting milk foam! ☕",
        'adobo': "**Batangas Single Origin** pairs perfectly with adobo! The citrus brightness cuts through the richness. 🇵🇭",
        'sweet': "Try our **Vanilla Latte** with house-made syrup. Creamy, sweet, and not too heavy! 🍦",
        'cold': "**Nitro Cold Brew** all the way! Nitrogen gives it that creamy Guinness-like texture without dairy! ❄️",
        'hot': "Our **French Press** brings out maximum flavor. Rich body with chocolate and nutty notes! 🔥",
        'beans': "Get our **House Blend beans (250g)** for home brewing. Perfect for drip coffee makers! ☕🏠",
        'beginner': "Start with our **House Blend** - approachable, balanced, and won't overwhelm you! 😊",
        'default': "Try our **Nitro Cold Brew** today! It's our bestseller in Tanauan. What else can I help with? ☕"
    };

    for (const [key, response] of Object.entries(responses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    return responses.default;
}

// Enhanced menu grid responsiveness
const menuGrid = document.querySelector('.menu-grid');
const resizeObserver = new ResizeObserver(() => {
    const containerWidth = menuGrid.offsetWidth;
    if (containerWidth < 900) {
        menuGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    } else {
        menuGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
    }
});
resizeObserver.observe(menuGrid);

// Auto-scroll to active menu section
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        // Scroll to menu section smoothly
        document.getElementById('menu').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});