import React from 'react';
import styled from 'styled-components';

const CORE_CARDS = [
  {
    name: 'Java',
    note: 'Primary backend language (6+ yrs)',
    badge: 'Core',
    glyph: 'JVM',
    angle: -18,
    offsetX: -288,
    offsetY: 26,
  },
  {
    name: 'Spring Boot',
    note: 'Microservices, REST & Spring Cloud',
    badge: 'API',
    glyph: 'SB',
    angle: -12,
    offsetX: -192,
    offsetY: 11,
  },
  {
    name: 'Apache Kafka',
    note: 'Zero-loss manual offset streaming',
    badge: 'Stream',
    glyph: 'KFK',
    angle: -6,
    offsetX: -96,
    offsetY: 3,
  },
  {
    name: 'PostgreSQL',
    note: 'ACID ledger & SELECT FOR UPDATE',
    badge: 'ACID',
    glyph: 'PG',
    angle: 0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    name: 'Quarkus',
    note: 'Flink migration (<300 MB RAM)',
    badge: 'Cloud',
    glyph: 'QKS',
    angle: 6,
    offsetX: 96,
    offsetY: 3,
  },
  {
    name: 'Kubernetes',
    note: 'Production container orchestration',
    badge: 'K8s',
    glyph: 'K8S',
    angle: 12,
    offsetX: 192,
    offsetY: 11,
  },
  {
    name: 'Docker',
    note: 'Lean container builds & tooling',
    badge: 'Runtime',
    glyph: 'DKR',
    angle: 18,
    offsetX: 288,
    offsetY: 26,
  },
];

const STACK_GROUPS = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Spring Boot', 'Spring Cloud', 'FastAPI', 'Quarkus', 'Node.js', 'Express'],
  },
  {
    label: 'AI & LLM',
    items: [
      'Google Gemini',
      'Anthropic',
      'OpenAI API',
      'LangChain',
      'Hugging Face',
      'Ollama',
      'RAG & Agents',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Angular'],
  },
  {
    label: 'Data & Messaging',
    items: [
      'PostgreSQL',
      'SQL Server',
      'MongoDB',
      'Redis',
      'SQLModel',
      'Apache Kafka',
      'RabbitMQ',
      'Couchbase',
      'MySQL',
      'Oracle',
    ],
  },
  {
    label: 'Infra & Tooling',
    items: ['Docker', 'Kubernetes', 'AWS', 'SonarQube', 'JUnit', 'Git', 'Postman'],
  },
];

const EXPLORING_ITEMS = ['Solidity', 'Ethereum', 'Web3.js'];

const StyledStackSection = styled.section`
  max-width: 1120px;

  .fan-stage {
    position: relative;
    height: 290px;
    margin: 40px auto 52px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 860px) {
      height: auto;
      justify-content: flex-start;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 14px;
      padding: 8px 4px 16px;
      margin: 28px 0 36px;
    }
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .group-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 20px 22px;

    h3 {
      margin: 0 0 12px;
      font-size: var(--fz-md);
      font-weight: 600;
      color: var(--cream);
    }

    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      padding: 6px 13px;
      font-size: var(--fz-xs);
      font-weight: 500;
      color: var(--text-secondary);
      background: rgba(1, 7, 54, 0.55);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
    }
  }

  .exploring-box {
    background: var(--surface);
    border: 1px dashed rgba(252, 241, 208, 0.35);
    border-radius: var(--radius-card);
    padding: 20px 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    .exploring-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .exploring-tag {
        display: inline-flex;
        align-self: flex-start;
        padding: 4px 12px;
        border-radius: var(--radius-pill);
        background: rgba(252, 241, 208, 0.14);
        color: var(--cream);
        font-size: var(--fz-xs);
        font-weight: 600;
        letter-spacing: 0.02em;
      }

      p {
        margin: 0;
        font-size: var(--fz-sm);
        color: var(--text-muted);
      }
    }

    .exploring-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .chip {
        padding: 6px 14px;
        border-radius: var(--radius-pill);
        background: rgba(34, 57, 111, 0.45);
        border: 1px solid var(--border);
        color: var(--cream);
        font-size: var(--fz-xs);
        font-weight: 500;
      }
    }
  }
`;

const FanCard = styled.div`
  position: absolute;
  width: 162px;
  height: 214px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 14px 28px rgba(1, 7, 54, 0.45);
  z-index: ${({ index }) => 4 - Math.abs(index - 3) + 1};
  transform: ${({ offsetX, offsetY, angle }) =>
    `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${angle}deg)`};

  .card-badge {
    align-self: flex-end;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: rgba(34, 57, 111, 0.7);
    color: var(--cream);
    font-size: 11px;
    font-weight: 600;
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;

    span {
      padding: 8px 14px;
      border-radius: 12px;
      background: rgba(252, 241, 208, 0.12);
      border: 1px solid rgba(252, 241, 208, 0.28);
      color: var(--cream);
      font-size: var(--fz-md);
      font-weight: 600;
      letter-spacing: 0.04em;
    }
  }

  .card-name {
    font-size: var(--fz-md);
    font-weight: 600;
    color: var(--cream);
    text-align: center;
  }

  .card-note {
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.35;
  }

  @media (max-width: 860px) {
    position: relative;
    flex: 0 0 162px;
    height: 204px;
    transform: none;
    scroll-snap-align: start;
    z-index: 1;
  }
`;

const Stack = () => (
  <StyledStackSection id="stack">
    <span className="section-kicker">Core capabilities</span>
    <h2 className="section-heading">Technology Stack</h2>
    <p className="section-intro">
      Core backend specialization in Java, Spring Boot / Spring Cloud, Quarkus, Apache Kafka,
      PostgreSQL, Kubernetes, and Docker — paired with end-to-end delivery across frontend, data,
      and applied AI workflows.
    </p>

    <div className="fan-stage" aria-label="Core backend stack cards">
      {CORE_CARDS.map((card, i) => (
        <FanCard
          key={card.name}
          index={i}
          offsetX={card.offsetX}
          offsetY={card.offsetY}
          angle={card.angle}>
          <span className="card-badge">{card.badge}</span>
          <div className="card-icon" aria-hidden="true">
            <span>{card.glyph}</span>
          </div>
          <div>
            <div className="card-name">{card.name}</div>
            <div className="card-note">{card.note}</div>
          </div>
        </FanCard>
      ))}
    </div>

    <div className="groups-grid" aria-label="Full stack capabilities by category">
      {STACK_GROUPS.map(group => (
        <div className="group-card" key={group.label}>
          <h3>{group.label}</h3>
          <div className="chip-list">
            {group.items.map(item => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="exploring-box" aria-label="Currently exploring technologies">
      <div className="exploring-meta">
        <span className="exploring-tag">Exploring (not production mastered)</span>
        <p>Currently exploring: autonomous AI agent workflows &amp; Web3 fundamentals.</p>
      </div>
      <div className="exploring-chips">
        {EXPLORING_ITEMS.map(item => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  </StyledStackSection>
);

export default Stack;
