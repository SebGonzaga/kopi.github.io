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