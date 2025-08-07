/**
 * Google Analytics 4 Implementation with Privacy Compliance
 * - Respects user consent via cookie banner
 * - Uses Google Consent Mode v2
 * - Implements Core Web Vitals tracking
 * - GDPR compliant implementation
 */

// Initialize data layer
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

// Initialize Google Analytics with privacy-first configuration
function initializeGA4() {
    // Set default consent state (denied until user consents)
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'granted', // Always granted for security
        'wait_for_update': 2000
    });

    gtag('js', new Date());

    // Configure GA4 with privacy-first settings
    gtag('config', 'G-XPX6WGJE8W', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure',
        'allow_google_signals': false, // Disable advertising features
        'allow_ad_personalization_signals': false,
        'restricted_data_processing': true
    });
}

// Track Core Web Vitals for performance monitoring
function trackWebVitals() {
    try {
        // Only track if user has consented to analytics
        if (getAnalyticsConsent() === 'granted') {
            // Import web-vitals library dynamically
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({onCLS, onFID, onFCP, onLCP, onTTFB}) => {
                onCLS(metric => gtag('event', metric.name, metric));
                onFID(metric => gtag('event', metric.name, metric));
                onFCP(metric => gtag('event', metric.name, metric));
                onLCP(metric => gtag('event', metric.name, metric));
                onTTFB(metric => gtag('event', metric.name, metric));
            }).catch(error => {
                console.warn('Web Vitals tracking failed:', error);
            });
        }
    } catch (error) {
        console.warn('Web Vitals tracking initialization failed:', error);
    }
}

// Track custom events for technical content
function trackTechnicalContent() {
    // Only set up tracking if consent is granted
    if (getAnalyticsConsent() !== 'granted') {
        return;
    }

    // Track code block interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('pre') || e.target.closest('code')) {
            gtag('event', 'code_interaction', {
                'event_category': 'technical_content',
                'event_label': 'code_block_click'
            });
        }
    });

    // Track external security/tech links
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes(window.location.hostname)) {
            gtag('event', 'external_link', {
                'event_category': 'outbound',
                'event_label': e.target.href
            });
        }
    });

    // Track search usage
    const searchButton = document.querySelector('.search-toggle');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            gtag('event', 'search_open', {
                'event_category': 'engagement',
                'event_label': 'search_toggle'
            });
        });
    }

    // Track theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            gtag('event', 'theme_change', {
                'event_category': 'engagement',
                'event_label': 'theme_toggle'
            });
        });
    }
}

// Consent management functions
function getAnalyticsConsent() {
    return localStorage.getItem('analytics_consent') || 'denied';
}

function setAnalyticsConsent(consent) {
    localStorage.setItem('analytics_consent', consent);
    
    if (consent === 'granted') {
        // Update Google Consent Mode
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
        
        // Initialize tracking features
        trackWebVitals();
        trackTechnicalContent();
        
        console.log('Analytics consent granted - tracking enabled');
    } else {
        // Revoke consent
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
        
        console.log('Analytics consent denied - tracking disabled');
    }
}

// Initialize analytics system
function initializeAnalytics() {
    // Load GA4 script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XPX6WGJE8W';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = function() {
        initializeGA4();
        
        // Check for existing consent on page load
        if (getAnalyticsConsent() === 'granted') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            trackWebVitals();
            trackTechnicalContent();
        }
    };
}

// Public API for consent management
window.AnalyticsConsent = {
    grant: function() {
        setAnalyticsConsent('granted');
    },
    deny: function() {
        setAnalyticsConsent('denied');
    },
    getStatus: function() {
        return getAnalyticsConsent();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
});