/**
 * Centralized navigation management for Matt Blogs IT
 * This file manages the site navigation and automatically determines the correct base path
 */

class Navigation {
    constructor() {
        this.baseDepth = 0;
        this.navItems = [
            { text: 'Home', href: 'index.html', id: 'home' },
            { text: 'About', href: 'about.html', id: 'about' },
            { text: 'Posts', href: 'posts.html', id: 'posts' },
            { text: 'Contact', href: 'contact.html', id: 'contact' }
        ];
        this.init();
    }

    init() {
        this.determineBaseDepth();
        this.renderNavigation();
        this.setActiveNavItem();
    }

    determineBaseDepth() {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment && segment !== 'index.html');
        
        // Count how many directories deep we are from the root
        // Subtract 1 because the last segment might be a file
        const fileName = pathSegments[pathSegments.length - 1];
        if (fileName && fileName.includes('.html')) {
            this.baseDepth = pathSegments.length - 1;
        } else {
            this.baseDepth = pathSegments.length;
        }
    }

    getBasePath() {
        if (this.baseDepth === 0) {
            return './';
        }
        return '../'.repeat(this.baseDepth);
    }

    renderNavigation() {
        const navContainer = document.getElementById('nav-container');
        if (!navContainer) return;

        const basePath = this.getBasePath();
        
        const navHTML = this.navItems.map(item => {
            const href = item.id === 'home' ? basePath : basePath + item.href;
            return `<a href="${href}" data-nav-id="${item.id}">${item.text}</a>`;
        }).join('');

        navContainer.innerHTML = navHTML;
    }

    setActiveNavItem() {
        const currentPage = this.getCurrentPageId();
        const activeLink = document.querySelector(`[data-nav-id="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    getCurrentPageId() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        
        switch (fileName) {
            case 'index.html':
            case '':
                return 'home';
            case 'about.html':
                return 'about';
            case 'posts.html':
                return 'posts';
            case 'contact.html':
                return 'contact';
            default:
                return 'home';
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});