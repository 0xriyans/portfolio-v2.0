/**
 * Remove Gatsby's eager script/fetch preload links so the hero font and HTML
 * win priority before below-the-fold chunks.
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
