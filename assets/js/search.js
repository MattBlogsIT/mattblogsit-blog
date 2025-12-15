// Search functionality - wrapped in IIFE to avoid global pollution
(function() {
    'use strict';
    
    let posts = [];
    let searchDropdown = null;
    let searchInput = null;
    let searchResults = null;
    const MAX_RESULTS = 5;
    const MIN_QUERY_LENGTH = 2;
    const MAX_QUERY_LENGTH = 100;
    
    // Make toggleSearch available globally
    window.toggleSearch = function() {
        if (!searchDropdown) {
            searchDropdown = document.getElementById('search-dropdown');
            searchInput = document.getElementById('search-input');
            searchResults = document.getElementById('search-results');
            
            if (!searchDropdown || !searchInput || !searchResults) {
                if (window.BlogUtils) {
                    window.BlogUtils.displayError('Search functionality is temporarily unavailable', 'search-results');
                }
                return;
            }
            
            // Load search data if not already loaded
            if (posts.length === 0) {
                // Use relative path that works with GitHub Pages and custom domain
                const basePath = '';
                fetch(basePath + '/search.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        posts = data;
                    })
                    .catch(error => {
                        if (window.BlogUtils) {
                            window.BlogUtils.displayError('Unable to load search data. Please try again later.', 'search-results');
                        }
                    });
            }
            
            // Add search input listener with debouncing
            const debouncedSearch = window.BlogUtils ? 
                window.BlogUtils.debounce(handleSearchInput, 300) : 
                handleSearchInput;
            
            searchInput.removeEventListener('input', debouncedSearch);
            searchInput.addEventListener('input', debouncedSearch);
        }
        
        searchDropdown.classList.toggle('active');
        if (searchDropdown.classList.contains('active')) {
            // Small delay to ensure the dropdown is visible before focusing
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }
    };

    // Separate function for handling search input
    function handleSearchInput(e) {
        const query = window.BlogUtils ? 
            window.BlogUtils.sanitizeInput(e.target.value, MAX_QUERY_LENGTH) : 
            e.target.value;
        performSearch(query);
    }

    function performSearch(query) {
        // Validate query length
        if (query.length < MIN_QUERY_LENGTH) {
            searchResults.innerHTML = '';
            return;
        }

        if (query.length > MAX_QUERY_LENGTH) {
            searchResults.innerHTML = '<div class="search-no-results">Search query too long</div>';
            return;
        }

        const searchQuery = query.toLowerCase();
        const results = posts.filter(post => {
            const searchText = (
                (post.title || '') + ' ' +
                (post.excerpt || '') + ' ' +
                (post.content || '')
            ).toLowerCase();
            return searchText.includes(searchQuery);
        });

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        // Clear previous results
        searchResults.innerHTML = '';

        // Create results using DOM manipulation to prevent XSS
        results.slice(0, MAX_RESULTS).forEach(post => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.style.cursor = 'pointer';

            // Add click handler
            resultItem.addEventListener('click', function() {
                window.location.href = post.url;
            });

            // Title
            const titleDiv = document.createElement('div');
            titleDiv.className = 'search-result-title';
            titleDiv.textContent = post.title || 'Untitled';
            resultItem.appendChild(titleDiv);

            // Excerpt
            if (post.excerpt) {
                const excerptDiv = document.createElement('div');
                excerptDiv.className = 'search-result-excerpt';
                excerptDiv.textContent = post.excerpt.substring(0, 100) + '...';
                resultItem.appendChild(excerptDiv);
            }

            searchResults.appendChild(resultItem);
        });
    }

// Close search dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (searchDropdown && searchDropdown.classList.contains('active')) {
        // Check if click is outside search elements (including mobile search)
        if (!e.target.closest('.search-icon') && 
            !e.target.closest('.mobile-search') && 
            !e.target.closest('.search-dropdown')) {
            searchDropdown.classList.remove('active');
        }
    }
});

    // Close search on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchDropdown && searchDropdown.classList.contains('active')) {
            searchDropdown.classList.remove('active');
        }
    });
    
})(); // End IIFE