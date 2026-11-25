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
          return;
        }
        var done = false;
        var finish = function() {
          if (done) return;
          done = true;
          try { window.localStorage.setItem('riyan_boot_seen', '1'); } catch (e) {}
          document.documentElement.classList.add('skip-boot');
          document.removeEventListener('click', onClick, true);
          document.removeEventListener('keydown', onKey, true);
        };
        var onClick = function() { finish(); };
        var onKey = function(e) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') finish();
        };
        document.addEventListener('click', onClick, true);
        document.addEventListener('keydown', onKey, true);
        setTimeout(function() {
          done = true;
          document.removeEventListener('click', onClick, true);
          document.removeEventListener('keydown', onKey, true);
        }, 1200);
      } catch (e) {}
    })();
  `;

  setPreBodyComponents([
    <script key="skip-boot-check" dangerouslySetInnerHTML={{ __html: skipBootScript }} />,
  ]);
};

/**
 * Remove Gatsby's eager script/fetch preload links so the hero font and HTML
 * win Slow 4G bandwidth priority before below-the-fold bundles.
 */
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  replaceHeadComponents(
    headComponents.filter(
      el =>
        !(
          el &&
          el.type === 'link' &&
          el.props &&
          el.props.rel === 'preload' &&
          (el.props.as === 'script' || el.props.as === 'fetch')
        ),
    ),
  );
};
