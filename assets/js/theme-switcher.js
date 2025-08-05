/**
 * Accessible Theme Switcher
 * Supports light/dark theme switching with system preference detection
 */

class ThemeSwitcher {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.themeText = document.getElementById('theme-text');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        this.init();
    }
    
    init() {
        // Mark as initialized
        document.documentElement.setAttribute('data-theme-initialized', 'true');
        
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listeners
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!this.getStoredTheme()) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        // Handle keyboard navigation
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }
    
    storeTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            // localStorage not available, continue without storing
        }
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update button appearance
        if (theme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeText.textContent = 'Light';
            this.themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeText.textContent = 'Dark';
            this.themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
        
        // Store theme preference
        this.storeTheme(theme);
        
        // Announce theme change to screen readers
        this.announceThemeChange(theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    announceThemeChange(theme) {
        // Create a temporary element to announce the change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        announcement.textContent = `Switched to ${theme} theme`;
        document.body.appendChild(announcement);
        
        // Remove the announcement after a short delay
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize theme switcher when DOM is loaded
function initThemeSwitcher() {
    try {
        // Check if elements exist before initializing
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        
        if (themeToggle && themeIcon && themeText) {
            new ThemeSwitcher();
            console.log('Theme switcher initialized successfully');
        } else {
            console.warn('Theme switcher elements not found:', {
                toggle: !!themeToggle,
                icon: !!themeIcon,
                text: !!themeText
            });
        }
    } catch (error) {
        console.error('Error initializing theme switcher:', error);
    }
}

// Multiple initialization strategies to ensure it works
document.addEventListener('DOMContentLoaded', initThemeSwitcher);

// Fallback for if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
    // DOM is already ready
    setTimeout(initThemeSwitcher, 10);
}

// Additional fallback with window.onload
window.addEventListener('load', () => {
    // Only initialize if not already done
    if (!document.documentElement.hasAttribute('data-theme-initialized')) {
        initThemeSwitcher();
    }
});