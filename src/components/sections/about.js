import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { FaServer, FaDatabase, FaNetworkWired, FaDocker } from 'react-icons/fa';

const StyledAboutSection = styled.section`
  max-width: 960px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 40px;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
`;

const StyledText = styled.div`
  ${({ theme }) => theme.mixins.glassmorphism};
  padding: 55px 30px 30px;
  font-family: var(--font-sans);

  @media (max-width: 768px) {
    padding: 50px 20px 24px;
  }

  &::after {
    content: 'cat whoami.txt';
  }

  p {
    line-height: 1.65;
    margin-bottom: 18px;
    color: var(--light-slate);
    font-size: var(--fz-md);
  }

  strong {
    color: var(--green);
    font-weight: 600;
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 70%;
    max-width: 280px;
    order: -1;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    background: #0d1117;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 102, 0.25);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
    padding-top: 40px;
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
      content: 'riyan_sugiarto.png';
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
    }

    .img {
      position: relative;
      display: block;
      width: 100%;
    }
  }
`;

const StyledVerifiedMetrics = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 10px 0 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }

  .metric-card {
    background: #0d1117;
    border: 1px solid rgba(0, 255, 102, 0.25);
    border-radius: 6px;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .metric-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--pink);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .metric-value {
      font-family: var(--font-mono);
      font-size: clamp(20px, 2.2vw, 24px);
      font-weight: 700;
      color: var(--green);
      font-variant-numeric: tabular-nums;
      line-height: 1.2;
    }

    .metric-desc {
      font-family: var(--font-sans);
      font-size: var(--fz-xs);
      color: var(--slate);
      line-height: 1.45;
    }

    code {
      font-size: 11px;
      color: var(--green);
      background: rgba(0, 255, 102, 0.08);
      padding: 1px 4px;
    }
  }
`;

const StyledSkills = styled.div`
  grid-column: 1 / -1;
  margin-top: 10px;

  .skills-heading {
    margin-bottom: 24px;
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
      flex: 1;
      background-color: rgba(0, 255, 102, 0.2);
      margin-left: 20px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    background: #0d1117;
    border: 1px solid rgba(0, 255, 102, 0.2);
    border-radius: 6px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease;

    &:hover {
      border-color: var(--green);
      transform: translateY(-2px);
    }
  }

  .card-top {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      color: var(--green);
      font-size: 18px;
      display: flex;
      align-items: center;
    }

    .card-title {
      font-family: var(--font-mono);
      color: var(--white);
      font-size: var(--fz-sm);
      font-weight: 600;
    }
  }

  .card-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .skill-tag {
      background: rgba(2, 12, 27, 0.7);
      border: 1px solid rgba(0, 255, 102, 0.22);
      color: var(--light-slate);
      padding: 5px 10px;
      border-radius: 3px;
      font-family: var(--font-mono);
      font-size: 12px;
      display: inline-flex;
      align-items: center;

      &::before {
        content: '>';
        color: var(--green);
        margin-right: 6px;
        font-weight: 700;
      }
    }
  }
`;

const About = () => {
  const { t } = useTranslation();

  const stackGroups = [
    {
      title: t('tech_backend_title'),
      skills: t('tech_backend_skills'),
      icon: <FaServer />,
    },
    {
      title: t('tech_streaming_title'),
      skills: t('tech_streaming_skills'),
      icon: <FaNetworkWired />,
    },
    {
      title: t('tech_data_title'),
      skills: t('tech_data_skills'),
      icon: <FaDatabase />,
    },
    {
      title: t('tech_infra_title'),
      skills: t('tech_infra_skills'),
      icon: <FaDocker />,
    },
  ];

  return (
    <StyledAboutSection id="about">
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
              quality={90}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Riyan Sugiarto"
            />
          </div>
        </StyledPic>

        <StyledVerifiedMetrics aria-label="Verified engineering metrics">
          <div className="metric-card">
            <div className="metric-label">EXPERIENCE</div>
            <div className="metric-value">6+ Years</div>
            <div className="metric-desc">
              Backend &amp; Full-Stack engineering across insurance, credit guarantees, and telecom.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">PRUHUB // MEMORY</div>
            <div className="metric-value">60%+ Drop</div>
            <div className="metric-desc">
              Container memory reduced from &gt;1.5 GB to &lt;300 MB in Flink-to-Quarkus migration.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">PRUHUB // WITHDRAWAL</div>
            <div className="metric-value">2 Days → Real-Time</div>
            <div className="metric-desc">
              Zero-loss Apache Kafka streaming with manual offset commit &amp; PostgreSQL ACID
              ledger.
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">ASKRINDO // MIDTRANS</div>
            <div className="metric-value">2-Layer Lock</div>
            <div className="metric-desc">
              Redis <code>SET lock:pay:&#123;order_id&#125; NX EX 30</code> + DB{' '}
              <code>SELECT ... FOR UPDATE</code>, idempotent HTTP 200.
            </div>
          </div>
        </StyledVerifiedMetrics>

        <StyledSkills id="stack">
          <h3 className="skills-heading">[ CORE_STACK ]</h3>
          <div className="skills-grid">
            {stackGroups.map((group, i) => (
              <div className="skill-card" key={i}>
                <div className="card-top">
                  <div className="icon">{group.icon}</div>
                  <div className="card-title">{group.title}</div>
                </div>
                <div className="card-skills">
                  {group.skills.split(', ').map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
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
