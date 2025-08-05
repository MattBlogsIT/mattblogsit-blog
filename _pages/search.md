---
layout: page
title: Search
permalink: /search/
---

<div class="search-container">
  <input type="text" id="search-input" placeholder="Search posts..." autocomplete="off">
  <div id="search-results"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let posts = [];

  // Load search data
  fetch('{{ site.baseurl }}/search.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
    })
    .catch(error => console.error('Error loading search data:', error));

  // Search function
  function performSearch(query) {
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const results = posts.filter(post => {
      const searchText = (post.title + ' ' + post.excerpt + ' ' + post.content).toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    displayResults(results, query);
  }

  // Display search results
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found for "' + query + '"</p>';
      return;
    }

    let html = '<h3>Search Results (' + results.length + ')</h3>';
    html += '<div class="search-results-list">';
    
    results.forEach(post => {
      html += '<article class="search-result">';
      html += '<h4><a href="' + post.url + '">' + post.title + '</a></h4>';
      html += '<div class="search-result-date">' + post.date + '</div>';
      if (post.excerpt) {
        html += '<div class="search-result-excerpt">' + post.excerpt + '</div>';
      }
      html += '</article>';
    });
    
    html += '</div>';
    searchResults.innerHTML = html;
  }

  // Search on input
  searchInput.addEventListener('input', function() {
    performSearch(this.value);
  });

  // Handle URL parameters for direct search
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');
  if (searchQuery) {
    searchInput.value = searchQuery;
    performSearch(searchQuery);
  }
});
</script>

<style>
.search-container {
  max-width: 800px;
  margin: 0 auto;
}

#search-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
}

#search-input:focus {
  outline: none;
  border-color: #007acc;
}

.search-results-list {
  margin-top: 20px;
}

.search-result {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.search-result:last-child {
  border-bottom: none;
}

.search-result h4 {
  margin: 0 0 5px 0;
}

.search-result h4 a {
  color: #007acc;
  text-decoration: none;
}

.search-result h4 a:hover {
  text-decoration: underline;
}

.search-result-date {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.search-result-excerpt {
  line-height: 1.4;
  color: #333;
}
</style>