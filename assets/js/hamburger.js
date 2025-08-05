// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!hamburgerBtn || !sidebar || !overlay) {
        return;
    }
    
    function toggleSidebar() {
        hamburgerBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeSidebar() {
        hamburgerBtn.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle sidebar when hamburger button is clicked
    hamburgerBtn.addEventListener('click', toggleSidebar);
    
    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Close sidebar when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Close sidebar when clicking on sidebar links (for better UX)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation to complete
            setTimeout(closeSidebar, 100);
        });
    });
});