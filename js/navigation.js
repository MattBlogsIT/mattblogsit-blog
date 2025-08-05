/**
 * Dynamic navigation management for Matt Blogs IT
 * Automatically discovers folders and builds navigation structure
 */

class Navigation {
    constructor() {
        this.currentPath = window.location.pathname;
        this.repositoryName = 'mattblogsit-dev';
        this.basePath = this.getRepositoryBasePath();
        this.currentFolder = this.getCurrentFolder();
        this.isInSubfolder = this.currentFolder !== '';
        this.init();
    }

    init() {
        this.renderNavigation();
        this.renderChildNavigation();
        this.setActiveNavItem();
    }

    getRepositoryBasePath() {
        // Determine if we're running locally or on GitHub Pages
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Local development - use relative paths from current directory
            return this.getLocalBasePath();
        } else {
            // GitHub Pages - use absolute paths within repository
            return `/${this.repositoryName}/`;
        }
    }

    getLocalBasePath() {
        // For local development, calculate relative path based on current directory depth
        const pathSegments = this.currentPath.split('/').filter(segment => segment && segment !== 'index.html');
        let depth = 0;
        
        const fileName = pathSegments[pathSegments.length - 1];
        if (fileName && fileName.includes('.html')) {
            depth = pathSegments.length - 1;
        } else {
            depth = pathSegments.length;
        }
        
        if (depth === 0) {
            return './';
        }
        return '../'.repeat(depth);
    }

    getCurrentFolder() {
        // Extract the path after the repository name for analysis
        let analysisPath = this.currentPath;
        
        // Find the repository segment and get everything after it
        const repoIndex = analysisPath.indexOf(`/${this.repositoryName}/`);
        if (repoIndex !== -1) {
            // Get the path after /repositoryName/
            analysisPath = analysisPath.substring(repoIndex + this.repositoryName.length + 2);
            // Add leading slash back for consistent processing
            analysisPath = '/' + analysisPath;
        }
        
        const pathSegments = analysisPath.split('/').filter(segment => segment && segment !== 'index.html');
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

    getMainNavItems() {
        // Auto-discover main navigation based on site structure
        const mainNav = [];

        // Always include Home
        mainNav.push({
            text: 'Home',
            href: this.basePath,
            id: 'home',
            isActive: this.isHomePage()
        });

        // Auto-discover navigation from site structure
        // This simulates what would be discovered by scanning the file system
        const siteStructure = this.getSiteStructure();
        
        siteStructure.pages.forEach(page => {
            mainNav.push({
                text: this.capitalize(page.replace('.html', '')),
                href: this.basePath + page,
                id: page.replace('.html', ''),
                isActive: this.isCurrentPage(page)
            });
        });

        siteStructure.folders.forEach(folder => {
            mainNav.push({
                text: this.capitalize(folder),
                href: this.basePath + folder + '.html',
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
            const childBasePath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? './' 
                : `${this.basePath}posts/`;
                
            childPages.push({
                text: 'Sample Post - Getting Started',
                href: childBasePath + 'sample-post.html',
                id: 'sample-post'
            });
        }

        return childPages;
    }

    setActiveNavItem() {
        // Active states are now set during rendering
    }

    isHomePage() {
        // Check if we're on the home page (index.html or root)
        const path = this.currentPath;
        return path.endsWith('index.html') || 
               path.endsWith('/') || 
               path === `/${this.repositoryName}` ||
               path === `/${this.repositoryName}/` ||
               path.split('/').pop() === '';
    }

    isCurrentPage(fileName) {
        // Check if the current path matches the given file
        return this.currentPath.endsWith(fileName);
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});