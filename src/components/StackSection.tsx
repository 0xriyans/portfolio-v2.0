import { motion, useReducedMotion } from 'motion/react';
import { StackInteractive } from './StackInteractive';

const VIEWPORT = { once: true, amount: 0.12 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function StackSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="stack" className="scroll-mt-24 text-center">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        className="mx-auto mb-10 max-w-2xl"
      >
        <p className="mb-2 text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase">
          Core &amp; Full-Stack Capabilities
        </p>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight text-[#FFFFFF] sm:text-4xl">
          Technology Stack
        </h2>
        <p className="text-base leading-relaxed text-[#8E8E93]">
          Java, Spring Boot / Spring Cloud, Quarkus, Apache Kafka, PostgreSQL, Kubernetes, and
          Docker — paired with end-to-end delivery across frontend, data, and applied AI workflows.
        </p>
      </motion.div>

      {/* Interactive Stack Fan + Enhanced Categorized Marquee Running Text */}
      <StackInteractive />
    </section>
  );
}
