'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import Footer from '../components/footer';
import { FadeUp } from '../functions/fadeup';
import { StaggerContainer } from '../functions/staggercontainer';
import Chatbot from '../components/chatbot';
import Splash from '../components/splash';

/* ── Stagger children wrapper ── */


const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Data ─────────────────────────────────────────── */
const SERVICES = [
  {
    step: '01',
    title: 'Consult & Align',
    desc: 'Understanding your exact business model, pain points, and objectives to build a clear transformation roadmap.',
    accent: false,
  },
  {
    step: '02',
    title: 'Build & Architect',
    desc: 'Crafting bespoke intelligent systems and automation pipelines engineered for reliability and long-term expansion.',
    accent: true,
  },
  {
    step: '03',
    title: 'Integrate & Scale',
    desc: 'Deploying solutions smoothly into your workflow with active monitoring to drive measurable scale and efficiency.',
    accent: false,
  },
];

/* ─── Page ─────────────────────────────────────────── */
export default function Page() {
  const [splashComplete, setSplashComplete] = useState(false);
  const [showRobot, setShowRobot] = useState(false);

  const heroRef = useRef(null);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { amount: 0.1 });

  // Scroll animations for fixed/sticky mascot
  const { scrollY } = useScroll();
  // Centered at scroll 0 (translation 0), moves to left column (translation -30vw) at scroll 500
  const robotX = useTransform(scrollY, [0, 500], ['0vw', '-30vw']);
  const robotScale = useTransform(scrollY, [0, 500], [1.1, 0.82]);
  
  // Non-linear rotation to make the flat sides of the 2D image spin by instantly
  const robotRotateY = useTransform(
    scrollY,
    [0, 150, 250, 350, 450, 500],
    [0, 15, 165, 195, 345, 360]
  );

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleSplashComplete = () => {
    setSplashComplete(true);
    setTimeout(() => {
      setShowRobot(true);
    }, 200); // Quick trigger right as splash vanishes
  };

  return (
    <main className="overflow-x-hidden" style={{ background: '#0a0e10' }}>
      {/* 3-Sec Splash Screen */}
      {!splashComplete && <Splash onComplete={handleSplashComplete} />}

      <Chatbot />

      {/* Sticky Robot (Desktop only) */}
      {showRobot && (
        <motion.div
          style={{ x: robotX, perspective: 1200 }}
          animate={{ opacity: footerInView ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex fixed left-0 top-0 w-screen h-screen pointer-events-none z-30 items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{
              scale: robotScale,
              rotateY: robotRotateY,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 75, damping: 14 }}
            className="relative w-[32vw] h-[32vw] max-w-[450px] max-h-[450px]"
          >
            {/* Nested floating/swaying loop to animate the mascot with a wavy 3D gesture */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateZ: [0, -2.5, 2.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full relative"
            >
              {/* Front Face (Original Mascot) */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <Image
                  src="/robot-mascot.png"
                  alt="Robot mascot front"
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  priority
                  className="object-contain drop-shadow-[0_0_28px_rgba(11,141,166,0.35)]"
                />
              </div>

              {/* Back Face (Backside Mascot) */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <Image
                  src="/mascot_backside.png"
                  alt="Robot mascot back"
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  priority
                  className="object-contain drop-shadow-[0_0_28px_rgba(11,141,166,0.35)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 overflow-hidden pt-28 pb-16"
      >
        {/* Grid background */}
        <div className="grid-bg absolute inset-0 pointer-events-none" />

        {/* Ambient glows */}
        <div className="teal-glow absolute -top-32 -left-32 w-[600px] h-[600px] opacity-30 pointer-events-none" />
        <div className="gold-glow absolute top-1/2 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none" />
        <div className="teal-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] opacity-10 pointer-events-none" />

        {/* Responsive Content Container */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1400px] mx-auto pt-24 px-6 sm:px-12 flex flex-col items-center justify-center min-h-[70vh]"
        >
          {/* Symmetrical Columns: Left Cards - Robot Space - Right Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center w-full">
            
            {/* Left Column: Floating Service Cards */}
            <div className="col-span-1 md:col-span-5 hidden md:flex flex-col gap-10 text-right items-end pr-10">
              {[
                { title: 'Custom AI Solutions', desc: 'Tailored models aligned with your business context.' },
                { title: 'Autonomous AI Agents', desc: 'Self-correcting workflows executing complex tasks.' },
                { title: 'LLM & GenAI Integration', desc: 'Deploying state-of-the-art models inside your software.' }
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: idx === 1 ? -78 : -30 }}
                  animate={{ opacity: 1, x: idx === 1 ? -48 : 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                  className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col text-right gap-1 hover:border-primary-teal/20 transition-all duration-300 w-full max-w-[360px]"
                  style={{ background: 'rgba(17, 22, 25, 0.45)' }}
                >
                  <span className="font-display text-[15px] text-on-surface font-semibold">{card.title}</span>
                  <span className="font-body text-[12px] text-on-surface-variant mt-0.5 leading-normal">{card.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Middle Column: Robot Mascot (Placeholder space on desktop, inline image on mobile) */}
            <div className="col-span-1 md:col-span-2 flex justify-center items-center h-[260px] sm:h-[300px] md:h-[350px]">
              {/* Inline Robot Mascot for Mobile only */}
              {showRobot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 75, damping: 14 }}
                  className="block md:hidden relative w-[220px] h-[220px]"
                >
                  <Image
                    src="/robot-mascot.png"
                    alt="Robot mascot"
                    fill
                    sizes="220px"
                    priority
                    className="object-contain drop-shadow-[0_0_20px_rgba(11,141,166,0.35)]"
                  />
                </motion.div>
              )}
            </div>

            {/* Right Column: Floating Service Cards */}
            <div className="col-span-1 md:col-span-5 hidden md:flex flex-col gap-10 text-left items-start pl-10">
              {[
                { title: 'Tech Consulting & Strategy', desc: 'Navigating adoption surface with structured roadmaps.' },
                { title: 'Data Intelligence & Analytics', desc: 'Mining business velocity out of raw database inputs.' },
                { title: 'Full-Stack Development', desc: 'Engineering robust software to back integration layers.' }
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: idx === 1 ? 78 : 30 }}
                  animate={{ opacity: 1, x: idx === 1 ? 48 : 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                  className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col text-left gap-1 hover:border-primary-teal/20 transition-all duration-300 w-full max-w-[360px]"
                  style={{ background: 'rgba(17, 22, 25, 0.45)' }}
                >
                  <span className="font-display text-[15px] text-on-surface font-semibold">{card.title}</span>
                  <span className="font-body text-[12px] text-on-surface-variant mt-0.5 leading-normal">{card.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Mobile Stack of Cards */}
            <div className="col-span-1 md:hidden flex flex-col gap-4 mt-6 w-full max-w-sm mx-auto">
              {[
                { title: 'Custom AI Solutions', label: 'Custom AI' },
                { title: 'Autonomous AI Agents', label: 'Agents' },
                { title: 'LLM & GenAI Integration', label: 'GenAI' },
                { title: 'Tech Consulting & Strategy', label: 'Consulting' },
                { title: 'Data Intelligence & Analytics', label: 'Data' },
                { title: 'Full-Stack Development', label: 'Development' }
              ].map((card) => (
                <div
                  key={card.title}
                  className="glass-card p-4 rounded-xl border border-white/5 flex justify-between items-center text-left"
                >
                  <span className="font-display text-[13.5px] text-on-surface font-semibold">{card.title}</span>
                  <span className="hud-chip" style={{ fontSize: '6px', padding: '0.12rem 0.4rem' }}>{card.label}</span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>

      {/* Process (Automation Pipeline) */}
      <section
        id="solutions"
        className="py-24 sm:py-28 md:py-32 lg:py-36 px-5 sm:px-8 md:px-12 md:pl-[40vw] max-w-[1400px] mx-auto relative"
      >
        {/* Section glow */}
        <div className="teal-glow hidden lg:block absolute top-1/2 -right-48 w-[500px] h-[500px] -z-10 opacity-25 pointer-events-none" />

        {/* Section header */}
        <FadeUp className="text-center md:text-left mb-14 sm:mb-18 md:mb-20 space-y-4 sm:space-y-5">
          <div className="hud-chip">The Automation Pipeline</div>
          <h2 className="font-display font-normal text-on-surface"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}>
            From Signal to Scale
          </h2>
          <p className="font-body text-on-surface-variant leading-relaxed max-w-lg"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)' }}>
            A proven three-phase methodology built for speed, precision, and lasting ROI.
          </p>
        </FadeUp>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 md:max-w-3xl">
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              variants={cardVariant}
              className="glass-card group relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] p-7 sm:p-8 md:p-9 flex flex-col text-left"
              style={svc.accent ? { background: 'rgba(11,141,166,0.04)', borderColor: 'rgba(11,141,166,0.18)' } : {}}
            >
              {/* Top accent glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${svc.accent ? 'rgba(11,141,166,0.18)' : 'rgba(11,141,166,0.09)'} 0%, transparent 70%)` }}
              />

              {/* Step indicator and Popular badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-primary-teal font-semibold tracking-wider text-xs sm:text-sm border border-primary-teal/20 rounded-full px-3 py-1 bg-[#0a0e10]/60">
                  Step {svc.step}
                </span>
                {svc.accent && (
                  <div className="hud-chip animate-pulse" style={{ fontSize: '8px', padding: '0.18rem 0.6rem' }}>
                    <span className="w-1 h-1 rounded-full bg-primary-teal flex-shrink-0"
                      style={{ boxShadow: '0 0 4px #0b8da6' }} />
                    Active Phase
                  </div>
                )}
              </div>

              <h3 className="font-display font-normal text-on-surface mb-3 text-xl sm:text-2xl">
                {svc.title}
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed flex-grow text-md">
                {svc.desc}
              </p>

              {/* Bottom bar */}
              <div className="card-bar" style={svc.accent ? { background: 'rgba(11,141,166,0.55)' } : {}} />
            </motion.div>
          ))}
        </StaggerContainer>
      </section>

      {/*About*/}
      <section
        id="about"
        className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 md:pl-[40vw]"
      >
        <div className="max-w-[1280px] md:max-w-3xl">
          <FadeUp>
            <div className="glass-card relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] p-10 sm:p-14 flex flex-col text-left">

              {/* Background decoration */}
              <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
              <div className="teal-glow absolute -top-20 -right-20 w-72 h-72 opacity-40 pointer-events-none" />
              <div className="gold-glow absolute -bottom-20 -left-20 w-64 h-64 opacity-30 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-10">
                {/* Left Column (Who We Are) */}
                <div className="space-y-5 sm:space-y-6">
                  <div className="hud-chip">Who We Are</div>

                  <h2
                    className="font-display font-normal text-on-surface leading-[1.1]"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                  >
                    We bridge the gap between complex data and <span className="gradient-text">actionable automation</span>.
                  </h2>

                  <p className="font-body text-on-surface-variant leading-relaxed text-md sm:text-base">
                    At Ad Meliora, we engineer custom AI workflow pipelines, autonomous nodes, and integration systems designed to fit your unique operational architecture. We operate on a simple premise: technology should adapt to your business processes—not the other way around. By streamlining manual bottlenecks, we empower teams to reclaim valuable time and maximize productivity.
                  </p>
                </div>

                {/* Right Column (CTA Card) */}
                <div className="w-full flex justify-center">
                  <div
                    className="p-8 sm:p-10 rounded-[1.5rem] border text-center flex flex-col items-center gap-6 w-full"
                    style={{
                      background: 'rgba(10,14,16,0.5)',
                      borderColor: 'rgba(62,72,76,0.18)'
                    }}
                  >
                    <h3
                      className="font-display font-normal text-on-surface leading-snug text-xl sm:text-2xl"
                    >
                      Ready to reclaim your time?
                    </h3>
                    <p className="font-body text-on-surface-variant leading-relaxed text-sm">
                      Partner with us to deploy seamless intelligence into your stack with zero disruption.
                    </p>
                    <Link href="/book-consultation"
                      className="btn-primary gap-2.5 px-7 py-4 sm:px-8 sm:py-4.5 text-[11px] sm:text-xs w-full">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer Wrapper for Ref detection */}
      <div ref={footerRef}>
        <Footer />
      </div>

    </main>
  );
}
