import React, { useState, useEffect, useRef, Suspense } from 'react';
import PropTypes from 'prop-types';

/**
 * Defers code-split below-the-fold sections until the user nears them
 * (or the URL hash targets them), keeping initial JS, CSS, and hydration TBT small.
 */
const LazySection = ({
  id,
  maxWidth = 1000,
  minHeight = 480,
  rootMargin = '900px 0px',
  heading,
  children,
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const holderRef = useRef(null);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    if (typeof window !== 'undefined' && id && window.location.hash === `#${id}`) {
      setShouldLoad(true);
      return;
    }

    const node = holderRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0] && entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id, rootMargin, shouldLoad]);

  const fallback = (
    <section
      id={id || undefined}
      style={{
        maxWidth: `${maxWidth}px`,
        minHeight: `${minHeight}px`,
        margin: '0 auto',
      }}>
      {heading && <h2 className="numbered-heading">{heading}</h2>}
    </section>
  );

  return (
    <div ref={holderRef} style={{ width: '100%' }}>
      {shouldLoad ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};

LazySection.propTypes = {
  id: PropTypes.string,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  rootMargin: PropTypes.string,
  heading: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default LazySection;
