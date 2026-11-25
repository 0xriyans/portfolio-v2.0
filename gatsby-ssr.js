import React from 'react';

/**
 * Prevent boot loader flash for returning visitors or users with prefers-reduced-motion.
 */
export const onRenderBody = ({ setPreBodyComponents }) => {
  const skipBootScript = `
    (function() {
      try {
        var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var seen = window.localStorage && window.localStorage.getItem('riyan_boot_seen') === '1';
        if (reduced || seen) {
          document.documentElement.classList.add('skip-boot');
        }
      } catch (e) {}
    })();
  `;

  setPreBodyComponents([
    <script key="skip-boot-check" dangerouslySetInnerHTML={{ __html: skipBootScript }} />,
  ]);
};
