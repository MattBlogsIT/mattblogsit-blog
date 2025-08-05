// Search functionality
let posts = [];
let searchDropdown = null;
let searchInput = null;
let searchResults = null;

function toggleSearch() {
    if (!searchDropdown) {
        searchDropdown = document.getElementById('search-dropdown');
        searchInput = document.getElementById('search-input');
        searchResults = document.getElementById('search-results');
        
        // Load search data if not already loaded
        if (posts.length === 0) {
            // Use relative path that works with GitHub Pages
            const basePath = window.location.pathname.includes('/mattblogsit-dev') ? '/mattblogsit-dev' : '';
            fetch(basePath + '/search.json')
                .then(response => response.json())
                .then(data => {
                    posts = data;
                })
                .catch(error => console.error('Error loading search data:', error));
        }
        
        // Add search input listener
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
    }
    
    searchDropdown.classList.toggle('active');
    if (searchDropdown.classList.contains('active')) {
        searchInput.focus();
    }
}

function performSearch(query) {
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }

    const results = posts.filter(post => {
        const searchText = (post.title + ' ' + post.excerpt + ' ' + post.content).toLowerCase();
        return searchText.includes(query.toLowerCase());
    });

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }

    let html = '';
    results.slice(0, 5).forEach(post => {
        html += '<div class="search-result-item" onclick="window.location.href=\'' + post.url + '\'">';
        html += '<div class="search-result-title">' + post.title + '</div>';
        if (post.excerpt) {
            html += '<div class="search-result-excerpt">' + post.excerpt.substring(0, 100) + '...</div>';
        }
        html += '</div>';
    });
    
    searchResults.innerHTML = html;
}

// Close search dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (searchDropdown && !e.target.closest('.search-icon') && !e.target.closest('.search-dropdown')) {
        searchDropdown.classList.remove('active');
    }
});

// Close search on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchDropdown && searchDropdown.classList.contains('active')) {
        searchDropdown.classList.remove('active');
    }
});