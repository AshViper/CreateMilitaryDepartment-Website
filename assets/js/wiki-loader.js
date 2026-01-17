document.addEventListener('DOMContentLoaded', async () => {
    // 汎用フェッチ関数
    async function loadData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            console.error('Data load error:', e);
            return null;
        }
    }

    // Wiki Blocks の描画
    const blockList = document.getElementById('block-list');
    if (blockList) {
        const blocks = await loadData('../data/blocks.json');
        if (blocks) {
            blockList.innerHTML = '';
            blocks.forEach(block => {
                const card = document.createElement('div');
                card.className = 'block-card reveal';
                card.innerHTML = `
                    <div class="block-icon">${block.icon}</div>
                    <div>
                        <h3>${block.name}</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${block.description}</p>
                        <ul style="color: var(--text-secondary); font-size: 0.9rem; margin-left:1rem;">
                            ${block.specs.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                `;
                blockList.appendChild(card);
            });
            if (typeof reveal === 'function') reveal();
        }
    }

    // Gallery の描画
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const gallery = await loadData('../data/gallery.json');
        if (gallery) {
            gallery.forEach(item => {
                const card = document.createElement('div');
                card.className = 'gallery-item reveal';
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="gallery-img">
                    <div class="gallery-info">
                        <span class="author-badge">Created by ${item.author}</span>
                        <h3>${item.title}</h3>
                        <p style="color:var(--text-secondary); font-size:0.9rem;">${item.description}</p>
                    </div>
                `;
                galleryGrid.insertBefore(card, galleryGrid.lastElementChild);
            });
            if (typeof reveal === 'function') reveal();
        }
    }
});
