import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  ${({ theme }) => theme.mixins.glassmorphism};
  max-width: 600px;
  margin: 0 auto 100px;
  padding: 60px 40px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--yellow);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    background: linear-gradient(
      -45deg,
      var(--yellow), 
      var(--pink), 
      var(--blue), 
      var(--yellow)  
    );
    background-size: 300% 300%;
    animation: textLiquidAnim 8s ease infinite reverse;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    background: linear-gradient(135deg, var(--yellow) 0%, var(--pink) 100%);
    color: #ffffff !important;
    border: none;
    box-shadow: 0 10px 30px -10px var(--yellow);
    transition: var(--transition);

    &:hover,
    &:focus {
      background: linear-gradient(135deg, var(--pink) 0%, var(--yellow) 100%);
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -10px var(--pink);
    }
  }

  @keyframes textLiquidAnim {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">{t("What’s Next?")}</h2>

      <h2 className="title">{t("Feel free to reach out")}</h2>

      <p>
      {t("I’m not actively seeking new opportunities at the moment, but I’m always open to meaningful conversations or collaborations. I’ll do my best to respond promptly!")}
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        {t("Say Hello")}
      </a>
    </StyledContactSection>
  );
};

export default Contact;
