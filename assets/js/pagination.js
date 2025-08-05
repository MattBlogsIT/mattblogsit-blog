// Client-side pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-container');
    const paginationInfo = document.getElementById('pagination-info');
    const paginationNav = document.getElementById('pagination-nav');
    const perPageSelect = document.getElementById('posts-per-page');
    
    if (!postsContainer || !perPageSelect) return;
    
    // Get all posts
    const allPosts = Array.from(postsContainer.querySelectorAll('.post-preview'));
    
    // Configuration
    let currentPage = 1;
    let postsPerPage = parseInt(perPageSelect.value);
    
    // Function to display posts for current page
    function displayPosts() {
        const totalPages = Math.ceil(allPosts.length / postsPerPage);
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        
        // Hide all posts
        allPosts.forEach(post => {
            post.style.display = 'none';
        });
        
        // Show posts for current page
        for (let i = startIndex; i < endIndex && i < allPosts.length; i++) {
            allPosts[i].style.display = 'block';
        }
        
        // Update pagination info
        const startPost = allPosts.length > 0 ? startIndex + 1 : 0;
        const endPost = Math.min(endIndex, allPosts.length);
        paginationInfo.textContent = `Showing posts ${startPost}-${endPost} of ${allPosts.length}`;
        
        // Update pagination controls
        updatePaginationControls(totalPages);
    }
    
    // Function to update pagination controls
    function updatePaginationControls(totalPages) {
        paginationNav.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Previous button
        const prevBtn = document.createElement(currentPage === 1 ? 'span' : 'a');
        prevBtn.className = 'pagination-btn prev-btn' + (currentPage === 1 ? ' disabled' : '');
        prevBtn.textContent = '← Previous';
        if (currentPage > 1) {
            prevBtn.href = '#';
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage--;
                displayPosts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        paginationNav.appendChild(prevBtn);
        
        // Page numbers container
        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'page-numbers';
        
        // Calculate page range
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }
        
        // First page and ellipsis
        if (startPage > 1) {
            addPageNumber(1);
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
        
        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            addPageNumber(i);
        }
        
        // Last page and ellipsis
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
            addPageNumber(totalPages);
        }
        
        function addPageNumber(pageNum) {
            const pageLink = document.createElement(pageNum === currentPage ? 'span' : 'a');
            pageLink.className = 'page-number' + (pageNum === currentPage ? ' active' : '');
            pageLink.textContent = pageNum;
            if (pageNum !== currentPage) {
                pageLink.href = '#';
                pageLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = pageNum;
                    displayPosts();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
            pageNumbers.appendChild(pageLink);
        }
        
        paginationNav.appendChild(pageNumbers);
        
        // Next button
        const nextBtn = document.createElement(currentPage === totalPages ? 'span' : 'a');
        nextBtn.className = 'pagination-btn next-btn' + (currentPage === totalPages ? ' disabled' : '');
        nextBtn.textContent = 'Next →';
        if (currentPage < totalPages) {
            nextBtn.href = '#';
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage++;
                displayPosts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        paginationNav.appendChild(nextBtn);
    }
    
    // Handle posts per page change
    perPageSelect.addEventListener('change', function() {
        postsPerPage = parseInt(this.value);
        currentPage = 1;
        displayPosts();
    });
    
    // Initial display
    displayPosts();
});