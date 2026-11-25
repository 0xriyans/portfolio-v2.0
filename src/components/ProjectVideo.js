import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #070c0a;
  overflow: hidden;

  video,
  img.poster-fallback {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/**
 * Plays muted looping WebM/MP4 project previews only while visible on screen,
 * falling back to a static poster image under prefers-reduced-motion or data-saver mode.
 */
const ProjectVideo = ({ webmSrc, mp4Src, posterSrc, title }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [saveData, setSaveData] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData) {
      setSaveData(true);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]) {
          setInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (prefersReducedMotion || saveData || !inView) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [inView, prefersReducedMotion, saveData]);

  const disableVideo = prefersReducedMotion || saveData;

  return (
    <VideoFrame ref={containerRef}>
      {disableVideo && posterSrc ? (
        <img className="poster-fallback" src={posterSrc} alt={title} loading="lazy" />
      ) : (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc || undefined}
          aria-label={`${title} demo preview`}>
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
        </video>
      )}
    </VideoFrame>
  );
};

ProjectVideo.propTypes = {
  webmSrc: PropTypes.string,
  mp4Src: PropTypes.string,
  posterSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default ProjectVideo;
