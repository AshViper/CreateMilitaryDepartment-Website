document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./data/versions.json');
        const data = await response.json();
        
        const versionList = document.getElementById('version-list');
        const latestVersionSpan = document.getElementById('latest-version-text');
        
        if (latestVersionSpan) {
            latestVersionSpan.textContent = data.latest_version;
        }

        data.versions.forEach((v, index) => {
            const isLatest = v.version === data.latest_version;
            const downloadUrl = `${data.repository}/releases/download/${v.release_tag}/${v.file_name}`;
            
            const card = document.createElement('div');
            card.className = 'version-card';
            card.innerHTML = `
                <div class="version-info">
                    <div class="badge-group">
                        ${isLatest ? '<span class="badge latest">LATEST</span>' : ''}
                        <span class="badge">${v.mc_version}</span>
                        <span class="badge">${v.loader}</span>
                        <span class="badge">${v.date}</span>
                    </div>
                    <h3>v${v.version}</h3>
                    <p class="changelog">${v.changelog}</p>
                </div>
                <div class="version-action">
                    <a href="${downloadUrl}" class="download-link" target="_blank">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Download
                    </a>
                </div>
            `;
            versionList.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading versions:', error);
        document.getElementById('version-list').innerHTML = '<p style="color: #ef4444;">Failed to load modpack data. Please check back later.</p>';
    }
});
