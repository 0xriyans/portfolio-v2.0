interface DiagramSpec {
  header: string;
  badge: string;
  nodes: { title: string; sub: string }[];
  footer: string;
}

const DIAGRAMS: Record<string, DiagramSpec> = {
  pruhub: {
    header: 'PRUHUB · FLINK -> QUARKUS & REAL-TIME WITHDRAWALS',
    badge: '>1.5 GB -> <300 MB (60%+)  |  2 DAYS -> REAL-TIME  |  ZERO-LOSS KAFKA',
    nodes: [
      { title: 'Apache Flink (Legacy)', sub: 'Replaced >1.5 GB JVM' },
      { title: 'Quarkus Microservices', sub: '<300 MB Container' },
      { title: 'Apache Kafka', sub: 'Manual Offset Commit' },
      { title: 'PostgreSQL + Couchbase', sub: 'ACID Ledger + JSON' },
    ],
    footer: 'Re-engineered withdrawals from 2 business days to real-time execution',
  },
};

const DEFAULT_SPEC = (title: string): DiagramSpec => ({
  header: title.toUpperCase(),
  badge: 'PRODUCTION ARCHITECTURE',
  nodes: [
    { title: 'Client', sub: 'Request' },
    { title: 'Spring Boot', sub: 'Microservice' },
    { title: 'Apache Kafka', sub: 'Event Bus' },
    { title: 'PostgreSQL', sub: 'Persistence' },
  ],
  footer: 'Production system architecture',
});

const XS = [24, 174, 328, 482] as const;

export function ProjectDiagram({
  type = 'default',
  title,
  featured = false,
}: {
  type?: string;
  title: string;
  featured?: boolean;
}) {
  const spec = DIAGRAMS[type] ?? DEFAULT_SPEC(title);

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-[#010736]/10 bg-[#FFFFFF] ${
        featured ? 'aspect-[16/8]' : 'aspect-[16/10]'
      }`}
      role="img"
      aria-label={`${title} architecture diagram`}
    >
      <svg viewBox="0 0 640 310" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id={`grid-${type}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="#010736"
              strokeOpacity="0.06"
              strokeWidth="1"
            />
          </pattern>
          <marker
            id={`arrow-${type}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#010736" />
          </marker>
        </defs>

        <rect width="640" height="310" fill="#FCF1D0" fillOpacity="0.35" />
        <rect width="640" height="310" fill={`url(#grid-${type})`} />

        <rect x="0" y="0" width="640" height="42" fill="#FFFFFF" />
        <line
          x1="0"
          y1="42"
          x2="640"
          y2="42"
          stroke="#010736"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <text x="22" y="26" fill="#010736" fontSize="11.5" fontWeight="700" letterSpacing="0.04em">
          {spec.header}
        </text>

        <rect x="20" y="58" width="600" height="30" rx="15" fill="#010736" />
        <text x="320" y="77" textAnchor="middle" fill="#FCF1D0" fontSize="11" fontWeight="600">
          {spec.badge}
        </text>

        {[0, 1, 2].map(idx => {
          const x1 = XS[idx] + 134;
          const x2 = XS[idx + 1] - 4;
          return (
            <line
              key={idx}
              x1={x1}
              y1={154}
              x2={x2}
              y2={154}
              stroke="#010736"
              strokeWidth="1.75"
              strokeOpacity="0.7"
              markerEnd={`url(#arrow-${type})`}
            />
          );
        })}

        {spec.nodes.map((node, idx) => (
          <g key={node.title}>
            <rect
              x={XS[idx]}
              y="116"
              width="134"
              height="76"
              rx="12"
              fill={idx === 1 ? '#010736' : '#FFFFFF'}
              stroke="#010736"
              strokeOpacity={idx === 1 ? 1 : 0.16}
              strokeWidth="1.5"
            />
            <text
              x={XS[idx] + 67}
              y="148"
              textAnchor="middle"
              fill={idx === 1 ? '#FCF1D0' : '#010736'}
              fontSize="11.5"
              fontWeight="700"
            >
              {node.title}
            </text>
            <text
              x={XS[idx] + 67}
              y="168"
              textAnchor="middle"
              fill={idx === 1 ? '#FCF1D0' : '#22396F'}
              fillOpacity={idx === 1 ? 0.85 : 1}
              fontSize="10.5"
            >
              {node.sub}
            </text>
          </g>
        ))}

        <rect x="0" y="264" width="640" height="46" fill="#FFFFFF" />
        <line
          x1="0"
          y1="264"
          x2="640"
          y2="264"
          stroke="#010736"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <text x="320" y="292" textAnchor="middle" fill="#22396F" fontSize="11.5" fontWeight="500">
          {spec.footer}
        </text>
      </svg>
    </div>
  );
}
