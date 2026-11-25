import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import CalibreRegularWoff2 from '@fonts/Calibre/Calibre-Regular.woff2';
import CalibreSemiboldWoff2 from '@fonts/Calibre/Calibre-Semibold.woff2';

const Head = ({
  title = null,
  description = null,
  image = null,
  pathname = '/',
  language = 'en',
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl
          defaultImage: image
          twitterUsername
        }
      }
    }
  `);

  const { defaultTitle, defaultDescription, siteUrl, defaultImage, twitterUsername } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  const documentTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <>
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{documentTitle}</title>

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={seo.url} />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href={CalibreSemiboldWoff2}
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href={CalibreRegularWoff2}
        crossOrigin="anonymous"
      />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  language: PropTypes.string,
};
