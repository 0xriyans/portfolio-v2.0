import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ProjectVideo from './ProjectVideo';
import ProjectDiagram from './ProjectDiagram';

/**
 * Selects project media per Section 4.4 priority:
 * (a) looping WebM/MP4 video if provided, (c) high-contrast screenshot, otherwise (b) animated SVG diagram.
 */
const ProjectMedia = ({ frontmatter, compact = false }) => {
  const { title, cover, diagram, videoWebm, videoMp4, poster } = frontmatter;
  const webmSrc = videoWebm && videoWebm.publicURL;
  const mp4Src = videoMp4 && videoMp4.publicURL;
  const posterSrc = poster && poster.publicURL;

  if (webmSrc || mp4Src) {
    return <ProjectVideo webmSrc={webmSrc} mp4Src={mp4Src} posterSrc={posterSrc} title={title} />;
  }

  const image = cover ? getImage(cover) : null;
  if (image) {
    return <GatsbyImage image={image} alt={title} className="img" />;
  }

  return <ProjectDiagram type={diagram} title={title} compact={compact} />;
};

ProjectMedia.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.object,
    diagram: PropTypes.string,
    videoWebm: PropTypes.shape({ publicURL: PropTypes.string }),
    videoMp4: PropTypes.shape({ publicURL: PropTypes.string }),
    poster: PropTypes.shape({ publicURL: PropTypes.string }),
  }).isRequired,
  compact: PropTypes.bool,
};

export default ProjectMedia;
