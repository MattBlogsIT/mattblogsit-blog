// Collapsible sections functionality for archive and category pages
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const header = content.previousElementSibling;
    
    content.classList.toggle('active');
    header.classList.toggle('active');
}

// Initialize collapsible sections
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all collapsible headers
    const headers = document.querySelectorAll('.collapsible-header');
    headers.forEach(function(header) {
        header.addEventListener('click', function(e) {
            // Prevent default if clicking on anchor link
            if (e.target.classList.contains('category-anchor')) {
                e.preventDefault();
            }
            
            const content = this.nextElementSibling;
            if (content && content.classList.contains('collapsible-content')) {
                content.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    });
    
    // Handle URL anchors (for direct category links)
    function handleAnchorLink() {
        const hash = window.location.hash;
        if (hash) {
            const targetHeader = document.querySelector(hash);
            if (targetHeader && targetHeader.classList.contains('collapsible-header')) {
                const content = targetHeader.nextElementSibling;
                if (content && content.classList.contains('collapsible-content')) {
                    // Expand the target section
                    content.classList.add('active');
                    targetHeader.classList.add('active');
                    
                    // Scroll to the header with a small offset
                    setTimeout(function() {
                        targetHeader.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 100);
                }
            }
        } else {
            // If no anchor, open first section by default
            const firstContent = document.querySelector('.collapsible-content');
            const firstHeader = document.querySelector('.collapsible-header');
            if (firstContent && firstHeader) {
                firstContent.classList.add('active');
                firstHeader.classList.add('active');
            }
        }
    }
    
    // Handle initial page load
    handleAnchorLink();
    
    // Handle hash changes (when user clicks anchor links)
    window.addEventListener('hashchange', function() {
        handleAnchorLink();
    });
});