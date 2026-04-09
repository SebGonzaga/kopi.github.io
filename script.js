// ====================== KRAV CAFE - CLEANED SCRIPT.JS ======================

// ==================== MOBILE NAVIGATION ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ==================== SMOOTH SCROLLING ====================
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

// ==================== MENU TABS ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

function switchTab(targetTab) {
    // Remove active from all buttons
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Activate clicked button
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Hide all menu groups
    menuItems.forEach(item => item.classList.remove('active'));

    // Show selected group
    const activeMenu = document.querySelector(`.menu-item.${targetTab}`);
    if (activeMenu) activeMenu.classList.add('active');
}

// Tab click events
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
    });
});

// Set default tab on load
document.addEventListener('DOMContentLoaded', () => {
    switchTab('espresso');
});

// ==================== MINI CART ====================
// ==================== MINI CART LOGIC ====================
// ====================== KRAV CAFE - FIXED CART ======================

let cart = [];

// ==================== MINI CART ELEMENTS ====================
const miniCart = document.getElementById('miniCart');
const cartIcon = document.getElementById('cartIcon');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartIconCount = document.getElementById('cartIconCount');
const cartOverlay = document.getElementById('cartOverlay');
const checkoutBtn = document.getElementById('checkoutBtn');

// Open & Close Cart
function openCart() {
    if (miniCart) miniCart.classList.add('open');
    if (cartOverlay) cartOverlay.style.display = 'block';
}

function closeCart() {
    if (miniCart) miniCart.classList.remove('open');
    if (cartOverlay) cartOverlay.style.display = 'none';
}

if (cartIcon) cartIcon.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

// Add to Cart Function
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseInt(price),
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${name} added to cart! ☕`);
}

// Update Cart UI
function updateCartUI() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #999;">
                <i class="fas fa-coffee" style="font-size: 3.5rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
            </div>`;
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p>₱${item.price} × ${item.quantity}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                    <div style="text-align:right; min-width: 80px;">
                        <strong>₱${itemTotal}</strong><br>
                        <small class="remove-item" data-index="${index}" style="color:#e74c3c; cursor:pointer;">Remove</small>
                    </div>
                </div>
            `;
        });
    }

    if (cartTotalEl) cartTotalEl.textContent = `₱${total}`;
    if (cartIconCount) cartIconCount.textContent = cart.length;
}

// Event Delegation for Add to Order, Quantity, Remove
document.addEventListener('click', function(e) {
    // Add to Order buttons
    if (e.target.classList.contains('add-to-order')) {
        const name = e.target.getAttribute('data-name');
        const price = e.target.getAttribute('data-price');
        if (name && price) addToCart(name, price);
    }

    // Quantity buttons
    if (e.target.classList.contains('qty-btn')) {
        const index = parseInt(e.target.dataset.index);
        if (isNaN(index)) return;

        if (e.target.classList.contains('plus')) {
            cart[index].quantity += 1;
        } else {
            cart[index].quantity -= 1;
            if (cart[index].quantity < 1) cart.splice(index, 1);
        }
        updateCartUI();
    }

    // Remove item
    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            cart.splice(index, 1);
            updateCartUI();
        }
    }
});

// Checkout
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`✅ Order placed successfully!\nTotal: ₱${total}\n\nThank you for choosing Krav Cafe! ☕`);
            cart = [];
            updateCartUI();
            closeCart();
        } else {
            alert("Your cart is empty!");
        }
    });
}

// Notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; bottom: 100px; right: 30px; 
        background: var(--primary); color: white; 
        padding: 15px 22px; border-radius: 12px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.25); z-index: 10003;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transition = 'all 0.4s';
        notif.style.opacity = '0';
        notif.style.transform = 'translateY(20px)';
        setTimeout(() => notif.remove(), 500);
    }, 2500);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

// ==================== CONTACT FORM ====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert("Thank you! Your message has been received. We'll get back to you soon.");
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ==================== CHATBOX ====================
const chatbox = document.getElementById('chatbox');
const chatToggle = document.querySelector('.chatbox-toggle');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.querySelector('.chatbox-messages');

// Open chat from hero button
document.querySelectorAll('.btn-secondary[href="#chatbox"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (chatbox) chatbox.classList.add('active');
        if (chatInput) chatInput.focus();
    });
});

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        if (chatbox) chatbox.classList.remove('active');
    });
}

function sendMessage() {
    if (!chatInput) return;
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    addMessage(messageText, 'user');
    chatInput.value = '';

    setTimeout(() => {
        const aiReply = getAIResponse(messageText.toLowerCase());
        addMessage(aiReply, 'bot');
    }, 800);
}

if (sendBtn) sendBtn.addEventListener('click', sendMessage);
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function addMessage(text, sender) {
    if (!messagesContainer) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(message) {
    const responses = {
        'today': "☀️ Today's bestseller is our **Nitro Cold Brew**! Creamy and refreshing.",
        'good': "I recommend our **Batangas Single Origin** pour-over. Bright and delicious!",
        'study': "For studying, try our **House Blend Americano** — focused energy without jitters.",
        'work': "Our **Classic Cappuccino** is perfect for work sessions.",
        'adobo': "**Batangas Single Origin** pairs amazingly with adobo!",
        'cold': "**Nitro Cold Brew** is highly recommended today!",
        'hot': "Try our **French Press** for rich, full-bodied flavor.",
        'beans': "Our **House Blend (250g)** is great for home brewing!",
        'default': "☕ What kind of coffee are you craving today? I can help recommend something perfect!"
    };

    for (const [key, response] of Object.entries(responses)) {
        if (message.includes(key)) return response;
    }
    return responses.default;
}

// ==================== SCROLL ANIMATIONS ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .coffee-card').forEach(el => {
    observer.observe(el);
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
