const menuData = [
    { name: "Black Latte", price: "₱165", cat: "coffee", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800", feat: true },
    { name: "Truffle Pasta", price: "₱280", cat: "food", img: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=800", feat: false },
    { name: "Spanish Latte", price: "₱155", cat: "coffee", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", feat: false },
    { name: "Grilled Cheese", price: "₱190", cat: "food", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800", feat: false }
];

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const grid = document.getElementById('menu-grid');
    const filters = document.querySelectorAll('.filter-btn');

    function renderMenu(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? menuData : menuData.filter(i => i.cat === filter);
        
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
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Previous Menu Logic remains here...

    const trigger = document.getElementById('ai-trigger');
    const chatWindow = document.getElementById('chat-window');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('chat-messages');

    // Toggle Chat
    trigger.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Handle Sending Messages
    function sendMessage() {
        const text = userInput.value.trim();
        if (text === "") return;

        // User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'msg user';
        userDiv.textContent = text;
        messagesContainer.appendChild(userDiv);

        userInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Mock AI Response (We'll integrate the actual API later)
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'msg bot';
            botDiv.textContent = "That sounds like a vibe! I'd recommend a Black Latte if you need a boost, or our Truffle Pasta if you're hungry.";
            messagesContainer.appendChild(botDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

// Add this to your existing DOMContentLoaded listener

const mobileAiBtn = document.getElementById('mobile-ai-btn');

// Mobile AI Trigger
if (mobileAiBtn) {
    mobileAiBtn.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });
}

// Smooth scroll active state
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

// Final visual touch: console log for developer
console.log("Krāv Tanauan Online. Aesthetic: Industrial. Vibes: Active.");