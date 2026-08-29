'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Splash({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  const handleAnimationComplete = () => {
    document.body.style.overflow = '';
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0e10]"
        >
          {/* Subtle grid background pattern to match the website theme */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e10] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-52 h-52 flex items-center justify-center"
            >
              <Image
                src="/sec.logo-removebg-preview.png"
                alt="Ad Meliora Logo"
                fill
                sizes="208px"
                priority
                className="object-contain"
              />
              
              {/* Subtitle positioned absolutely to ensure the logo is mathematically centered */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute top-[108%] left-1/2 -translate-x-1/2 font-label text-[11px] tracking-[0.25em] text-[#70d4ef] uppercase text-center w-max"
                style={{ textShadow: '0 0 12px rgba(112, 212, 239, 0.15)' }}
              >
                Precision AI Automation
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
