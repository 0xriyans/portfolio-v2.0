import React, { useState, useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled, { keyframes, css } from 'styled-components';
import { FaJava, FaAws, FaRobot, FaServer, FaDatabase, FaCode, FaCheckCircle, FaNetworkWired, FaBrain, FaFileAlt, FaDesktop, FaProjectDiagram } from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiPostgresql, SiRedis, SiGraphql, SiKubernetes, SiElasticsearch, SiGithubactions } from 'react-icons/si';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const pulseBar = keyframes`
  0% { opacity: 0.15; }
  100% { opacity: 0.4; }
`;

const loadBar = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`;

const scanAnim = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(500%); }
`;

const glitchImage = keyframes`
  0% { filter: hue-rotate(0deg) contrast(150%) saturate(200%); transform: translate(0) }
  20% { filter: hue-rotate(90deg) contrast(150%) saturate(200%); transform: translate(-2px, 2px) }
  40% { filter: hue-rotate(180deg) contrast(150%) saturate(200%); transform: translate(-2px, -2px) }
  60% { filter: hue-rotate(270deg) contrast(150%) saturate(200%); transform: translate(2px, 2px) }
  80% { filter: hue-rotate(360deg) contrast(150%) saturate(200%); transform: translate(2px, -2px) }
  100% { filter: hue-rotate(0deg) contrast(150%) saturate(200%); transform: translate(0) }
`;

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    padding: 50px;
    border-radius: 20px;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      padding: 0;
    }
  }
`;

const StyledIntegratedStats = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin: 40px 0 60px 0;
  ${({ theme }) => theme.mixins.glassmorphism};
  position: relative;
  transition: var(--transition);

  &:hover {
    border-color: var(--pink);
    box-shadow: inset 0 0 20px rgba(184, 255, 0, 0.2), 0 0 20px rgba(184, 255, 0, 0.4);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    clip-path: none;
    border-radius: var(--border-radius);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    padding: 30px 20px;

    &:not(:last-child) {
      border-right: 1px solid rgba(0, 255, 102, 0.15);
      
      @media (max-width: 768px) {
        border-right: none;
        border-bottom: 1px solid rgba(0, 255, 102, 0.15);
      }
    }

    .stat-number {
      font-family: var(--font-heading);
      font-size: clamp(40px, 4vw, 55px);
      font-weight: 700;
      color: var(--blue);
      text-shadow: 0 0 10px rgba(0, 255, 102, 0.4);
      line-height: 1;
      margin-bottom: 10px;
      display: flex;
      align-items: baseline;
      justify-content: center;

      span.unit {
        font-size: clamp(16px, 2vw, 20px);
        color: var(--pink);
        font-family: var(--font-mono);
        font-weight: 500;
        margin-left: 5px;
        text-shadow: none;
      }
    }

    .stat-title {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--yellow);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    
    .stat-desc {
      font-family: var(--font-sans);
      font-size: var(--fz-xxs);
      color: var(--slate);
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }
  }
`;

const StyledText = styled.div`
  ${({ theme }) => theme.mixins.glassmorphism};
  padding: 60px 30px 30px;
  font-family: var(--font-mono);

  @media (max-width: 768px) {
    padding: 50px 20px 20px;
  }

  &::after {
    content: 'cat about.txt';
  }

  p {
    line-height: 1.6;
    margin-bottom: 20px;
    color: var(--slate);
    font-size: var(--fz-md);
  }

  strong {
    color: var(--green, #00ff66);
    font-weight: 500;
  }
`;

const StyledSkills = styled.div`
  grid-column: 1 / -1;
  margin-top: 20px;

  .skills-heading {
    margin-bottom: 30px;
    font-family: var(--font-mono);
    color: var(--white);
    font-size: var(--fz-md);
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    
    &::after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.1);
      margin-left: 20px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    
    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    ${({ theme }) => theme.mixins.glassmorphism};
    padding: 60px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
    position: relative;
    transition: var(--transition);
    overflow: hidden;

    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-5px);
    }
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;

    .icon {
      color: var(--white);
      font-size: 20px;
    }

    .version {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--light-slate);
    }
  }

  .card-title {
    font-family: var(--font-mono);
    color: var(--white);
    font-size: var(--fz-md);
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .card-skills {
    font-family: var(--font-mono);
    color: var(--slate);
    font-size: 11px;
    line-height: 1.5;
    margin-bottom: 20px;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-content: flex-start;

    .skill-tag {
      background: rgba(2, 12, 27, 0.5); /* Deep dark background */
      border: 1px solid rgba(100, 255, 218, 0.1);
      color: var(--light-slate);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      cursor: default;
      display: inline-flex;
      align-items: center;

      &::before {
        content: '>';
        color: var(--green);
        margin-right: 5px;
        opacity: 0.7;
        font-weight: 600;
        transition: all 0.2s var(--easing);
      }

      &:hover {
        background: rgba(100, 255, 218, 0.05);
        border-color: var(--green);
        color: var(--green);
        transform: translateY(-2px);
        
        &::before {
          opacity: 1;
        }
      }
    }
  }

  .card-bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .integrity-header {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--light-slate);
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      position: relative;
      overflow: hidden;

      .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 2px;
      }
    }
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glitchAnim = keyframes`
  0%, 100% { transform: translate(0); filter: grayscale(100%) contrast(110%); }
  2% { transform: translate(-3px, 2px) skewX(2deg); filter: grayscale(0%) sepia(100%) hue-rotate(300deg) saturate(300%); }
  4% { transform: translate(3px, -2px) skewX(-2deg); filter: grayscale(0%) sepia(100%) hue-rotate(90deg) saturate(300%); }
  6% { transform: translate(0) skewX(0); filter: grayscale(100%) contrast(110%); }
  52% { transform: translate(0); filter: grayscale(100%) contrast(110%); }
  54% { transform: translate(3px, 2px) skewX(-3deg); filter: grayscale(0%) sepia(100%) hue-rotate(0deg) saturate(300%); }
  56% { transform: translate(-3px, -2px) skewX(3deg); filter: grayscale(0%) sepia(100%) hue-rotate(180deg) saturate(300%); }
  58% { transform: translate(0) skewX(0); filter: grayscale(100%) contrast(110%); }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    margin: 0 auto 40px;
    width: 70%;
    max-width: 300px;
    order: -1;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    
    /* Terminal window styles */
    background: #0d1117;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
    padding-top: 40px;
    transition: var(--transition);
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 14px;
      left: 15px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ff5f56;
      box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
      z-index: 2;
    }

    &::after {
      content: 'profile.jpg';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: #161b22;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: var(--light-slate);
      font-size: 11px;
      font-family: var(--font-mono);
      line-height: 40px;
      text-align: center;
      letter-spacing: 1px;
      z-index: 1;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    
    &:hover,
    &:focus {
      outline: 0;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8);

      .img {
        animation: none;
        transform: scale(1.05);
        filter: none;
        transition: var(--transition);
      }
    }

    .img {
      position: relative;
      display: block;
      width: 100%;
      filter: grayscale(100%) contrast(110%);
      animation: ${glitchAnim} 2.5s infinite;
    }
  }
`;

const IntegratedStatBar = ({ title, number, unit, desc }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseFloat(number);
    if (start === end) return;
    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * 2;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(String(start));
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className="stat-item">
      <div className="stat-title">{title}</div>
      <div className="stat-number">{count}<span className="unit">{unit}</span></div>
      <div className="stat-desc">{desc}</div>
    </div>
  );
};

const About = () => {
  const revealContainer = useRef(null);
  const skillsContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    if (skillsContainer.current) {
      observer.observe(skillsContainer.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const techCore = [
    {
      title: t('tech_backend_title'),
      skills: t('tech_backend_skills'),
      version: 'v.Core',
      icon: <FaServer />,
      integrity: 99,
      color: 'var(--green, #00ff66)'
    },
    {
      title: t('tech_frontend_title'),
      skills: t('tech_frontend_skills'),
      version: 'v.UI',
      icon: <FaDesktop />,
      integrity: 92,
      color: 'var(--pink, #b8ff00)'
    },
    {
      title: t('tech_data_title'),
      skills: t('tech_data_skills'),
      version: 'v.Data',
      icon: <FaDatabase />,
      integrity: 97,
      color: 'var(--green, #00ff66)'
    },
    {
      title: t('tech_cloud_title'),
      skills: t('tech_cloud_skills'),
      version: 'v.Ops',
      icon: <FaAws />,
      integrity: 95,
      color: 'var(--pink, #b8ff00)'
    },
    {
      title: t('tech_observability_title'),
      skills: t('tech_observability_skills'),
      version: 'v.Mon',
      icon: <SiElasticsearch />,
      integrity: 94,
      color: 'var(--green, #00ff66)'
    },
    {
      title: t('tech_enterprise_title'),
      skills: t('tech_enterprise_skills'),
      version: 'v.Sync',
      icon: <FaNetworkWired />,
      integrity: 91,
      color: 'var(--pink, #b8ff00)'
    }
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">{t('About Me')}</h2>

      <div className="inner">
        <StyledText>
          <div className="text">
            <p dangerouslySetInnerHTML={{ __html: t('about_p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about_p2') }} />
          </div>
        </StyledText>

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

        <StyledIntegratedStats>
          <IntegratedStatBar title="Experience" number="5" unit="+ Yrs" desc="ENTERPRISE ARCHITECTURE" />
          <IntegratedStatBar title="System Reliability" number="99" unit=".99%" desc="PRODUCTION UPTIME SLA" />
          <IntegratedStatBar title="Data Integrity" number="100" unit="%" desc="ZERO-LOSS STREAMING" />
        </StyledIntegratedStats>

        <StyledSkills ref={skillsContainer}>
          <h2 className="skills-heading">TECH_CORE</h2>
          <div className="skills-grid">
            {techCore && techCore.map((node, i) => (
              <div className="skill-card" key={i}>
                <div className="card-top">
                  <div className="icon">{node.icon}</div>
                  <div className="version">{node.version}</div>
                </div>
                <div className="card-title">{node.title}</div>
                <div className="card-skills">
                  {node.skills.split(', ').map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="card-bottom">
                  <div className="integrity-header">
                    <span>INTEGRITY</span>
                    <span style={{ color: node.color }}>{node.integrity}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: visible ? `${node.integrity}%` : '0%', 
                        backgroundColor: node.color,
                        boxShadow: `0 0 10px ${node.color}`,
                        transition: 'width 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0.3s'
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StyledSkills>
      </div>
    </StyledAboutSection>
  );
};

export default About;
