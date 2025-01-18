// ==UserScript==
// @name         Twitter UI Cleanup
// @namespace    https://github.com/Daminator4113/Twitter-UI-Cleanup
// @version      1.1
// @author       Daminator4113
// @description  Remove unwanted buttons and sections on Twitter
// @license      MIT
// @icon         https://abs.twimg.com/favicons/twitter.2.ico
// @match        https://twitter.com/*
// @match        https://x.com/*
// ==/UserScript==

(function() {
    'use strict';

    const removeParent = (selector, levels, tagName) => {
        const element = document.querySelector(selector);
        if (element) {
            let parent = element;
            for (let i = 0; i < levels; i++) {
                parent = parent.parentElement;
                if (!parent) break;
            }
            if (parent?.tagName === tagName) {
                //console.log('REMOVE',parent);
                parent.remove();
            }
        }
    };

    // The order of removal is important!
    const removeElements = () => {
        removeParent('aside a[href*="/i/premium_sign_up"]', 3, 'DIV'); // "Try Premium for free" section

        const selectors = [
            'a[href*="/i/grok"]', // Grok
            'a[href*="/i/premium_sign_up"]', // Twitter Blue
            'a[href*="/i/verified-orgs-signup"]', // Verified organizations
            'button[data-testid="grokImgGen"]', // "Generate Image with Grok" button.
            'div[data-testid="GrokDrawer"]', // Grok Drawer
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });

        const grokSVG = 'path[d="M2.205 7.423L11.745 21h4.241L6.446 7.423H2.204zm4.237 7.541L2.2 21h4.243l2.12-3.017-2.121-3.02zM16.957 0L9.624 10.435l2.122 3.02L21.2 0h-4.243zm.767 6.456V21H21.2V1.51l-3.476 4.946z"]'
        removeParent(grokSVG, 4, 'BUTTON'); // Grok profil resume
    };

    const observer = new MutationObserver(removeElements);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    removeElements();
})();
