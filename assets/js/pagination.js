// Jekyll pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const perPageSelect = document.getElementById('posts-per-page');
    if (!perPageSelect) return;
    
    // Get the site baseurl from the HTML element or default
    const baseUrl = document.documentElement.getAttribute('data-baseurl') || '';
    
    // Set the correct selected value based on current URL
    const currentPath = window.location.pathname;
    if (currentPath.includes('/posts-5/')) {
        perPageSelect.value = '5';
    } else if (currentPath.includes('/posts-25/')) {
        perPageSelect.value = '25';
    } else {
        perPageSelect.value = '10';
    }
    
    // Handle posts per page change
    perPageSelect.addEventListener('change', function() {
        const value = this.value;
        let newPath;
        
        if (value === '5') {
            newPath = baseUrl + '/posts-5/';
        } else if (value === '25') {
            newPath = baseUrl + '/posts-25/';
        } else {
            // Default 10 per page
            newPath = baseUrl + '/posts/';
        }
        
        window.location.href = newPath;
    });
});