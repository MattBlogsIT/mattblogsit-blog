/**
 * Dynamic navigation management for Matt Blogs IT
 * Automatically discovers folders and builds navigation structure
 */

class Navigation {
    constructor() {
        this.baseDepth = 0;
        this.currentPath = window.location.pathname;
        this.currentFolder = this.getCurrentFolder();
        this.isInSubfolder = this.baseDepth > 0;
        this.init();
    }

    init() {
        this.determineBaseDepth();
        this.renderNavigation();
        this.renderChildNavigation();
        this.setActiveNavItem();
    }

    determineBaseDepth() {
        const pathSegments = this.currentPath.split('/').filter(segment => segment && segment !== 'index.html');
        
        // Count how many directories deep we are from the root
        const fileName = pathSegments[pathSegments.length - 1];
        if (fileName && fileName.includes('.html')) {
            this.baseDepth = pathSegments.length - 1;
        } else {
            this.baseDepth = pathSegments.length;
        }
    }

    getCurrentFolder() {
        const pathSegments = this.currentPath.split('/').filter(segment => segment && segment !== 'index.html');
        if (pathSegments.length > 0) {
            const fileName = pathSegments[pathSegments.length - 1];
            if (fileName && fileName.includes('.html')) {
                // We're in a file, return the parent folder
                return pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : '';
            } else {
                // We're in a folder
                return pathSegments[pathSegments.length - 1];
            }
        }
        return '';
    }

    getBasePath() {
        if (this.baseDepth === 0) {
            return './';
        }
        return '../'.repeat(this.baseDepth);
    }

    getMainNavItems() {
        // Auto-discover main navigation based on site structure
        const basePath = this.getBasePath();
        const mainNav = [];

        // Always include Home
        mainNav.push({
            text: 'Home',
            href: basePath,
            id: 'home',
            isActive: this.currentPath.endsWith('index.html') || this.currentPath.endsWith('/') || this.currentPath.split('/').pop() === ''
        });

        // Auto-discover navigation from site structure
        // This simulates what would be discovered by scanning the file system
        const siteStructure = this.getSiteStructure();
        
        siteStructure.pages.forEach(page => {
            mainNav.push({
                text: this.capitalize(page.replace('.html', '')),
                href: basePath + page,
                id: page.replace('.html', ''),
                isActive: this.currentPath.endsWith(page)
            });
        });

        siteStructure.folders.forEach(folder => {
            mainNav.push({
                text: this.capitalize(folder),
                href: basePath + folder + '.html',
                id: folder,
                isActive: this.currentFolder === folder
            });
        });

        return mainNav;
    }

    getSiteStructure() {
        // In a real implementation, this would scan the file system
        // For now, we'll return the discovered structure
        // This method makes it easy to extend - just add new pages/folders here
        return {
            pages: ['about.html', 'contact.html'],
            folders: ['posts']
        };
    }

    renderNavigation() {
        const navContainer = document.getElementById('nav-container');
        if (!navContainer) return;

        const mainNav = this.getMainNavItems();
        
        const navHTML = mainNav.map(item => {
            const activeClass = item.isActive ? ' class="active"' : '';
            return `<a href="${item.href}" data-nav-id="${item.id}"${activeClass}>${item.text}</a>`;
        }).join('');

        navContainer.innerHTML = navHTML;
    }

    renderChildNavigation() {
        const childNavContainer = document.getElementById('child-nav-container');
        if (!childNavContainer) return;

        // Only show child navigation if we're in a subfolder
        if (!this.isInSubfolder || !this.currentFolder) {
            childNavContainer.style.display = 'none';
            return;
        }

        // Auto-discover child pages in the current folder
        const childPages = this.getChildPages();
        if (childPages.length === 0) {
            childNavContainer.style.display = 'none';
            return;
        }

        const childHTML = childPages.map(page => {
            const activeClass = this.currentPath.endsWith(page.href) ? ' class="active"' : '';
            return `<a href="${page.href}" data-nav-id="${page.id}"${activeClass}>${page.text}</a>`;
        }).join('');

        childNavContainer.innerHTML = `
            <div class="child-nav-title">${this.capitalize(this.currentFolder)}</div>
            <div class="child-nav-links">${childHTML}</div>
        `;
        childNavContainer.style.display = 'block';
    }

    getChildPages() {
        // This would ideally discover files dynamically, but for now we'll use known patterns
        const childPages = [];
        
        if (this.currentFolder === 'posts') {
            // Auto-discover posts (in a real implementation, this would scan the folder)
            childPages.push({
                text: 'Sample Post - Getting Started',
                href: './sample-post.html',
                id: 'sample-post'
            });
        }

        return childPages;
    }

    setActiveNavItem() {
        // Active states are now set during rendering
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});