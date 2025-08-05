// Collapsible sections functionality for archive and category pages
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const header = content.previousElementSibling;
    
    content.classList.toggle('active');
    header.classList.toggle('active');
}

// Initialize collapsible sections
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with first section open
    const firstContent = document.querySelector('.collapsible-content');
    const firstHeader = document.querySelector('.collapsible-header');
    if (firstContent && firstHeader) {
        firstContent.classList.add('active');
        firstHeader.classList.add('active');
    }
    
    // Add click event listeners to all collapsible headers
    const headers = document.querySelectorAll('.collapsible-header');
    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content && content.classList.contains('collapsible-content')) {
                content.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    });
});