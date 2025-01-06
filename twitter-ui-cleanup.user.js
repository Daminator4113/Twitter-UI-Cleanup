// ==UserScript==
// @name         Twitter UI Cleanup
// @namespace    https://github.com/Daminator4113/Twitter-UI-Cleanup
// @version      1.0
// @author       Daminator4113
// @description  Remove unwanted buttons and sections on Twitter
// @license      MIT
// @icon         https://abs.twimg.com/favicons/twitter.2.ico
// @match        https://twitter.com/*
// @match        https://x.com/*
// ==/UserScript==

(function() {
    'use strict';

    const removeElements = () => {
        const selectors = [
            'a[href*="/i/grok"]', // Grok
            'a[href*="/i/premium_sign_up"]', // Twitter Blue
            'a[href*="/i/verified-orgs-signup"]', // Verified organizations
            'button[data-testid="grokImgGen"]' // "Generate Image with Grok" button
        ];

        const premiumLinkContainer = document.querySelector('aside a[href*="/i/premium_sign_up"]')?.closest('div')?.parentElement; // "Try Premium for free" section
        if (premiumLinkContainer?.tagName === 'DIV') {
            premiumLinkContainer.remove();
        }

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });
    };

    const observer = new MutationObserver(() => {
        removeElements();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    removeElements();
})();
