// Combined menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const combinedMenu = document.querySelector('.combined-menu');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!hamburgerBtn || !combinedMenu || !overlay) {
        return;
    }
    
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        combinedMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (combinedMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        combinedMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle menu when hamburger button is clicked
    hamburgerBtn.addEventListener('click', toggleMenu);
    
    // Close menu when overlay is clicked
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && combinedMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && combinedMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu when clicking on menu links (for better UX)
    const menuLinks = combinedMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation to complete
            setTimeout(closeMenu, 150);
        });
    });
});