// 1. MENU DATA (ONLY ONE)
const menuData = [
    { id: 'black-latte', name: "Black Latte", price: "₱165", cat: "coffee", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800", feat: true, desc: "Our signature activated charcoal blend with premium espresso and velvet steamed milk." },
    { id: 'truffle-pasta', name: "Truffle Pasta", price: "₱280", cat: "food", img: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=800", feat: false, desc: "Aromatic truffle cream sauce, wild mushrooms, and freshly grated parmesan." },
    { id: 'spanish-latte', name: "Spanish Latte", price: "₱155", cat: "coffee", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", feat: false, desc: "Sweetened condensed milk paired with our bold double-shot espresso." }
];

// 2. MAIN SCRIPT
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // ================= MENU =================
    const grid = document.getElementById('menu-grid');
    const filters = document.querySelectorAll('.filter-btn');

    function renderMenu(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all'
            ? menuData
            : menuData.filter(i => i.cat === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = `menu-card ${item.feat && filter === 'all' ? 'featured' : ''}`;
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="card-content">
                    <h4>${item.name}</h4>
                    <p class="price">${item.price}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenu(btn.dataset.filter);
        });
    });

    renderMenu();

    // ================= CHATBOT =================
    const trigger = document.getElementById('ai-trigger');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('chat-messages');
    const mobileAiBtn = document.getElementById('mobile-ai-btn');

    // Toggle Chat
    trigger?.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    closeChat?.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    mobileAiBtn?.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // User message
        const userDiv = document.createElement('div');
        userDiv.className = 'msg user';
        userDiv.textContent = text;
        messagesContainer.appendChild(userDiv);

        userInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // AI response
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'msg bot';
            botDiv.innerHTML = `
                I think you'd love the <strong>Black Latte</strong>.
                <br>
                <button onclick="suggestItem('black-latte')" 
                    style="color:var(--brass); background:none; border:none; text-decoration:underline; cursor:pointer;">
                    View Details
                </button>
            `;
            messagesContainer.appendChild(botDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);
    }

    sendBtn?.addEventListener('click', sendMessage);
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // ================= MODAL =================
    const modal = document.getElementById('item-modal');
    const closeModal = document.getElementById('close-modal');

    window.suggestItem = function(itemId) {
        const item = menuData.find(i => i.id === itemId);
        if (!item) return;

        document.getElementById('modal-img').src = item.img;
        document.getElementById('modal-name').textContent = item.name;
        document.getElementById('modal-desc').textContent = item.desc;
        document.getElementById('modal-price').textContent = item.price;

        modal.style.display = 'flex';
    };

    closeModal?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // ================= NAV SCROLL =================
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});

// FINAL TOUCH
console.log("Krāv Tanauan Online. Aesthetic: Industrial. Vibes: Active.");