import { css } from 'styled-components';

import CalibreRegularWoff from '@fonts/Calibre/Calibre-Regular.woff';
import CalibreRegularWoff2 from '@fonts/Calibre/Calibre-Regular.woff2';
import CalibreMediumWoff from '@fonts/Calibre/Calibre-Medium.woff';
import CalibreMediumWoff2 from '@fonts/Calibre/Calibre-Medium.woff2';
import CalibreSemiboldWoff from '@fonts/Calibre/Calibre-Semibold.woff';
import CalibreSemiboldWoff2 from '@fonts/Calibre/Calibre-Semibold.woff2';

const calibreNormalWeights = {
  400: [CalibreRegularWoff, CalibreRegularWoff2],
  500: [CalibreMediumWoff, CalibreMediumWoff2],
  600: [CalibreSemiboldWoff, CalibreSemiboldWoff2],
};

const calibre = {
  name: 'Calibre',
  normal: calibreNormalWeights,
};

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0];
    const woff2 = formats[1];

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: swap;
      }
    `;
  }

  return styles;
};

const Fonts = css`
  ${createFontFaces(calibre)}
`;

export default Fonts;
