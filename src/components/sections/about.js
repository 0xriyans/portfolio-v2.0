import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion, useTilt } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    ${({ theme }) => theme.mixins.glassmorphism};
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-gap: 50px;
    padding: 50px;
    border-radius: 20px;

    @media (max-width: 768px) {
      display: block;
      padding: 30px;
    }
  }
`;

const StyledText = styled.div`
  p {
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

const StyledSkills = styled.div`
  grid-column: 1 / -1;
  margin-top: 20px;

  .skills-heading {
    margin-bottom: 20px;
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px 20px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      padding: 14px 24px;
      background-color: rgba(255, 255, 255, 0.08);
      border: none;
      border-radius: 50px;
      color: var(--lightest-slate);
      font-family: var(--font-sans);
      font-size: var(--fz-sm);
      line-height: 1.4;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-align: left;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      cursor: default;

      &:hover {
        background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
        color: var(--white);
        font-weight: 600;
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    margin: 0 auto 40px;
    width: 70%;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);
    overflow: hidden;

    &:hover,
    &:focus {
      outline: 0;
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -15px var(--navy-shadow);
      border-color: rgba(255, 255, 255, 0.2);

      .img {
        transform: scale(1.05);
      }
    }

    .img {
      position: relative;
      display: block;
      width: 100%;
      border-radius: 20px;
      transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const tiltRef = useTilt();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Backend & Core (Java, Spring, Quarkus)',
    'Microservices (Spring Cloud, GraphQL)',
    'Message Brokers (Kafka, Solace)',
    'Databases & Cache (PostgreSQL, Redis)',
    'DevOps & Cloud (K8s, Docker, AWS)',
    'Observability (ELK Stack, SonarQube)',
    'AI & Automation (OCR, IBM BPM)',
    'Frontend (Angular, React, TS)'
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">{t("About Me")}</h2>

      <div className="inner" ref={tiltRef}>
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/riyans-jas.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF', 'JPG']}
              alt="Headshot"
            />
          </div>
        </StyledPic>

        <StyledText>
          <div>
            <p>{t("about_p1")}</p>
            <p>{t("about_p2")}</p>
          </div>
        </StyledText>

        <StyledSkills>
          <p className="skills-heading">{t("Technologies I’ve been working with:")}</p>
          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledSkills>
      </div>
    </StyledAboutSection>
  );
};

export default About;
