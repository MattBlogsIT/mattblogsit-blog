/**
 * GDPR Cookie Consent Banner
 * Privacy-compliant consent management for analytics
 */

class CookieConsent {
    constructor() {
        this.consentKey = 'cookie_consent_status';
        this.analyticsKey = 'analytics_consent';
        this.bannerShown = false;
        this.init();
    }

    init() {
        // Check if consent has already been given
        const consentStatus = localStorage.getItem(this.consentKey);
        
        if (!consentStatus && !this.bannerShown) {
            this.showBanner();
        }
    }

    showBanner() {
        if (this.bannerShown) return;
        
        const banner = this.createBanner();
        document.body.appendChild(banner);
        this.bannerShown = true;
        
        // Add event listeners
        this.setupEventListeners(banner);
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3>🍪 Cookie Preferences</h3>
                    <p>This site uses Google Analytics to improve user experience and analyze site traffic. We respect your privacy and only collect anonymous usage data.</p>
                    <p>You can change your preferences anytime using the cookie settings in the footer.</p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-decline" class="cookie-btn cookie-btn-decline">
                        Decline Analytics
                    </button>
                    <button id="cookie-accept" class="cookie-btn cookie-btn-accept">
                        Accept Analytics
                    </button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn-settings">
                        Cookie Settings
                    </button>
                </div>
            </div>
        `;

        return banner;
    }

    setupEventListeners(banner) {
        const acceptBtn = banner.querySelector('#cookie-accept');
        const declineBtn = banner.querySelector('#cookie-decline');
        const settingsBtn = banner.querySelector('#cookie-settings');

        acceptBtn.addEventListener('click', () => this.acceptAnalytics());
        declineBtn.addEventListener('click', () => this.declineAnalytics());
        settingsBtn.addEventListener('click', () => this.showSettings());
    }

    acceptAnalytics() {
        this.setConsent('accepted', 'granted');
        this.hideBanner();
        
        // Grant analytics consent
        if (window.AnalyticsConsent) {
            window.AnalyticsConsent.grant();
        }
        
        this.showNotification('Analytics enabled. Thank you!', 'success');
    }

    declineAnalytics() {
        this.setConsent('declined', 'denied');
        this.hideBanner();
        
        // Deny analytics consent
        if (window.AnalyticsConsent) {
            window.AnalyticsConsent.deny();
        }
        
        this.showNotification('Analytics disabled. Your privacy is respected.', 'info');
    }

    setConsent(status, analyticsStatus) {
        localStorage.setItem(this.consentKey, status);
        localStorage.setItem(this.analyticsKey, analyticsStatus);
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
            this.bannerShown = false;
        }
    }

    showSettings() {
        this.showSettingsModal();
    }

    showSettingsModal() {
        const modal = this.createSettingsModal();
        document.body.appendChild(modal);
        
        // Setup modal event listeners
        this.setupModalEventListeners(modal);
    }

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2>Cookie Settings</h2>
                    <button class="cookie-modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-category">
                        <h3>Essential Cookies</h3>
                        <p>Required for basic site functionality, theme preferences, and security.</p>
                        <label class="cookie-switch">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-slider"></span>
                            <span class="cookie-label">Always Enabled</span>
                        </label>
                    </div>
                    <div class="cookie-category">
                        <h3>Analytics Cookies</h3>
                        <p>Help us understand how visitors interact with our site to improve content and performance.</p>
                        <label class="cookie-switch">
                            <input type="checkbox" id="analytics-toggle" ${this.getAnalyticsConsent() === 'granted' ? 'checked' : ''}>
                            <span class="cookie-slider"></span>
                            <span class="cookie-label">Google Analytics</span>
                        </label>
                    </div>
                    <div class="cookie-info">
                        <h4>What data do we collect?</h4>
                        <ul>
                            <li>Anonymous page views and session duration</li>
                            <li>Technical performance metrics (Core Web Vitals)</li>
                            <li>General location (country/region only)</li>
                            <li>Device type and browser information</li>
                        </ul>
                        <p><strong>We do not collect:</strong> Personal information, IP addresses, or track users across other websites.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="save-cookie-settings" class="cookie-btn cookie-btn-accept">
                        Save Preferences
                    </button>
                </div>
            </div>
        `;

        return modal;
    }

    setupModalEventListeners(modal) {
        const closeBtn = modal.querySelector('.cookie-modal-close');
        const saveBtn = modal.querySelector('#save-cookie-settings');
        const analyticsToggle = modal.querySelector('#analytics-toggle');

        closeBtn.addEventListener('click', () => this.closeModal(modal));
        saveBtn.addEventListener('click', () => {
            const analyticsEnabled = analyticsToggle.checked;
            
            if (analyticsEnabled) {
                this.acceptAnalytics();
            } else {
                this.declineAnalytics();
            }
            
            this.closeModal(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
    }

    closeModal(modal) {
        modal.remove();
    }

    getAnalyticsConsent() {
        return localStorage.getItem(this.analyticsKey) || 'denied';
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `cookie-notification cookie-notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Public method to open settings
    openSettings() {
        this.showSettingsModal();
    }
}

// Initialize cookie consent when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.cookieConsent = new CookieConsent();
});

// Global function for footer link
window.openCookieSettings = function() {
    if (window.cookieConsent) {
        window.cookieConsent.openSettings();
    }
};