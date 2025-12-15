/**
 * Utility functions for security and common operations
 */

(function(window) {
    'use strict';
    
    // HTML escaping function to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Input validation function
    function sanitizeInput(input, maxLength = 100) {
        if (typeof input !== 'string') {
            return '';
        }
        // Remove any potentially dangerous characters and limit length
        return input
            .replace(/[<>]/g, '') // Remove angle brackets
            .trim()
            .substring(0, maxLength);
    }
    
    // Debounce function for rate limiting
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Error display function for user-friendly messages
    function displayError(message, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            container.innerHTML = '';
            container.appendChild(errorDiv);
        }
    }
    
    // Export utilities to window object
    window.BlogUtils = {
        escapeHtml: escapeHtml,
        sanitizeInput: sanitizeInput,
        debounce: debounce,
        displayError: displayError
    };
    
})(window);