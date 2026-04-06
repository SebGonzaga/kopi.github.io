/**
 * KRĀV TANAUAN - Industrial Coffee & Kitchen
 * Core Logic: Menu, AI Barista, Theme Toggle, & UI Effects
 */

const menuData = [
    // --- SIGNATURES ---
    { id: 'black-latte', name: "Black Latte", price: "₱165", cat: "signatures", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800", feat: true, desc: "Our iconic activated charcoal latte. Bold, smooth, and industrial." },
    { id: 'sea-salt-latte', name: "Sea Salt Latte", price: "₱170", cat: "signatures", img: "https://images.unsplash.com/photo-1572442388796-11668a67e13d?q=80&w=800", feat: false, desc: "Sweet cream foam with hand-harvested sea salt over cold brew." },
    { id: 'dirty-matcha', name: "Dirty Matcha", price: "₱175", cat: "signatures", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=800", feat: false, desc: "Ceremonial matcha shot layered with our signature espresso." },

    // --- ESPRESSO ---
    { id: 'spanish-latte', name: "Spanish Latte", price: "₱155", cat: "espresso", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", feat: true, desc: "A crowd favorite. Sweetened condensed milk and double espresso." },
    { id: 'americano', name: "Americano", price: "₱120", cat: "espresso", img: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=800", feat: false, desc: "Clean, bold shots of espresso with hot or iced water." },
    { id: 'cappuccino', name: "Cappuccino", price: "₱145", cat: "espresso", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800", feat: false, desc: "Perfectly frothed milk with a dense, silky micro-foam." },

    // --- NON-COFFEE ---
    { id: 'hibiscus-tea', name: "Hibiscus Berry", price: "₱140", cat: "non-coffee", img: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=800", feat: false, desc: "Iced berry infusion with fresh mint and hibiscus petals." },
    { id: 'dark-cocoa', name: "Dark Cocoa", price: "₱150", cat: "non-coffee", img: "https://images.unsplash.com/photo-1544787210-282bbd485703?q=80&w=800", feat: true, desc: "70% Belgian chocolate frothed with creamy full cream milk." },

    // --- KITCHEN ---
    { id: 'truffle-pasta', name: "Truffle Pasta", price: "₱280", cat: "kitchen", img: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=800", feat: true, desc: "Wild mushrooms and truffle cream sauce topped with parmesan." },
    { id: 'tanauan-tapa', name: "Signature Tapa", price: "₱220", cat: "kitchen", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800", feat: false, desc: "Angus beef tapa, garlic rice, and egg. A Filipino classic." },
    { id: 'krav-burger', name: "Krāv Burger", price: "₱245", cat: "kitchen", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", feat: false, desc: "Quarter-pound beef, cheddar, and house sauce on brioche." }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    // ================= SELECTORS =================
    const grid = document.getElementById('menu-grid');
    const filters = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('menu-search');
    const modal = document.getElementById('item-modal');
    const closeModal = document.getElementById('close-modal');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const chatTrigger = document.getElementById('ai-trigger');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('chat-messages');
    const mobileAiBtn = document.getElementById('mobile-ai-btn');

    // ================= THEME ENGINE =================
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.setAttribute('data-lucide', 'sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    };

    // Load saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        showNotification(`Theme: ${newTheme.toUpperCase()}`);
    });

    // ================= MENU RENDERER =================
    function renderMenu(items, activeFilter = 'signatures') {
        grid.innerHTML = '';
        
        if (items.length === 0) {
            grid.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--gray);">No Krāv signatures found. Try "Latte" or "Pasta".</p>`;
            return;
        }

        items.forEach(item => {
            // Logic: Show as 'featured' card if it's marked feat AND we aren't searching
            const isFeatured = item.feat && !searchInput.value;
            const card = document.createElement('div');
            card.className = `menu-card ${isFeatured ? 'featured' : ''}`;
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="card-content">
                    <h4>${item.name}</h4>
                    <p class="price">${item.price}</p>
                </div>
            `;
            card.onclick = () => suggestItem(item.id);
            grid.appendChild(card);
        });
    }

    // Initial Filter (Signatures as landing default)
    renderMenu(menuData.filter(i => i.cat === 'signatures'));

    // Filter Navigation
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;
            const filtered = menuData.filter(i => i.cat === cat);
            renderMenu(filtered, cat);
        });
    });

    // Search Logic
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Clear active states on buttons while searching
        filters.forEach(b => b.classList.remove('active'));
        
        const filteredResults = menuData.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.cat.toLowerCase().includes(query)
        );
        renderMenu(filteredResults);
    });

    // ================= MODAL SYSTEM =================
    window.suggestItem = function(itemId) {
        const item = menuData.find(i => i.id === itemId);
        if (!item) return;

        document.getElementById('modal-img').src = item.img;
        document.getElementById('modal-name').textContent = item.name;
        document.getElementById('modal-desc').textContent = item.desc;
        document.getElementById('modal-price').textContent = item.price;

        modal.style.display = 'flex';
    };

    closeModal?.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    // ================= AI BARISTA LOGIC =================
    const toggleChat = () => {
        const isHidden = window.getComputedStyle(chatWindow).display === 'none';
        chatWindow.style.display = isHidden ? 'flex' : 'none';
        if(isHidden) userInput.focus();
    };

    chatTrigger?.addEventListener('click', toggleChat);
    mobileAiBtn?.addEventListener('click', toggleChat);
    closeChat?.addEventListener('click', () => chatWindow.style.display = 'none');

    function getAIResponse(input) {
        const text = input.toLowerCase();
        if (text.includes("recommend") || text.includes("best") || text.includes("coffee")) {
            return `You should try the <strong>Black Latte</strong>. It's our industrial soul in a cup. <br>
                    <button onclick="suggestItem('black-latte')" class="btn-text">View Details</button>`;
        }
        if (text.includes("hungry") || text.includes("food") || text.includes("pasta")) {
            return `The <strong>Truffle Pasta</strong> is rich and aromatic. Highly recommended! <br>
                    <button onclick="suggestItem('truffle-pasta')" class="btn-text">View Details</button>`;
        }
        if (text.includes("sweet") || text.includes("cold")) {
            return `The <strong>Spanish Latte</strong> over ice is the perfect sweet pick-me-up. <br>
                    <button onclick="suggestItem('spanish-latte')" class="btn-text">View Details</button>`;
        }
        return "I'm still learning the menu, but our Tanauan baristas are experts! Try asking about our signatures.";
    }

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        userInput.value = "";

        setTimeout(() => {
            appendMessage('bot', getAIResponse(text));
        }, 800);
    }

    function appendMessage(sender, content) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}`;
        msgDiv.innerHTML = content;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendBtn?.addEventListener('click', sendMessage);
    userInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // ================= FX & POLISH =================
    
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-progress").style.width = scrolled + "%";
    });

    // Notification System
    window.showNotification = function(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Promo Interaction
    document.querySelector('.promo-wrapper').onclick = () => {
        showNotification("Promo Code 'KRAVSTUDENT' ready for your next visit!");
    };

    // Mobile Navigation Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
});

console.log("Krāv Tanauan Online. System Integrated.");