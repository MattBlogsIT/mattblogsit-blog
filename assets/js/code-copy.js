/**
 * Code Copy Functionality with Line Numbers
 * Adds copy buttons to code blocks and ensures line numbers don't get copied
 */

(function() {
    'use strict';

    function initCodeCopy() {
        // Add copy buttons to all code blocks
        const codeBlocks = document.querySelectorAll('.highlight');
        
        codeBlocks.forEach((codeBlock, index) => {
            addCopyButton(codeBlock, index);
        });
    }

    function addCopyButton(codeBlock, index) {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-code-button');
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        copyButton.textContent = 'Copy';
        copyButton.setAttribute('data-code-index', index);

        // Add click event listener
        copyButton.addEventListener('click', function(e) {
            e.preventDefault();
            copyCodeToClipboard(this, codeBlock);
        });

        // Add keyboard support
        copyButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyCodeToClipboard(this, codeBlock);
            }
        });

        // Insert button into code block
        codeBlock.appendChild(copyButton);
    }

    function copyCodeToClipboard(button, codeBlock) {
        let codeText = extractCodeText(codeBlock);

        // Copy to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            // Use modern clipboard API
            navigator.clipboard.writeText(codeText).then(() => {
                showCopySuccess(button);
            }).catch(err => {
                console.warn('Failed to copy code:', err);
                fallbackCopyToClipboard(codeText, button);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyToClipboard(codeText, button);
        }
    }

    function extractCodeText(codeBlock) {
        // Clone the code block to avoid modifying the original
        const clone = codeBlock.cloneNode(true);
        
        // Remove the copy button from the clone
        const copyBtn = clone.querySelector('.copy-code-button');
        if (copyBtn) {
            copyBtn.remove();
        }
        
        // Remove line numbers if they exist
        const lineNumbers = clone.querySelectorAll('.linenos, .lineno, .gl');
        lineNumbers.forEach(ln => ln.remove());
        
        // Remove any table structure that might be used for line numbers
        const tables = clone.querySelectorAll('table');
        tables.forEach(table => {
            const codeCell = table.querySelector('td:last-child, td.code');
            if (codeCell) {
                // Replace table with just the code content
                table.parentNode.replaceChild(codeCell, table);
            }
        });
        
        // Get the text content
        let codeText = '';
        const codeElement = clone.querySelector('code, pre');
        if (codeElement) {
            codeText = codeElement.textContent || codeElement.innerText || '';
        } else {
            codeText = clone.textContent || clone.innerText || '';
        }

        // Clean up the text (remove extra whitespace at start/end)
        return codeText.trim();
    }

    function fallbackCopyToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(button);
            } else {
                showCopyError(button);
            }
        } catch (err) {
            console.warn('Fallback copy failed:', err);
            showCopyError(button);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    function showCopyError(button) {
        const originalText = button.textContent;
        button.textContent = 'Error';
        button.style.background = '#dc3545';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeCopy);
    } else {
        initCodeCopy();
    }
})();