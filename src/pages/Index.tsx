import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import WhySection from '@/components/WhySection';
import ProgrammeSection from '@/components/ProgrammeSection';
import SpeakersSection from '@/components/SpeakersSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    // Group reveals by their parent section for staggered delays
    const observer = new IntersectionObserver(
      (entries) => {
        // Batch entries that fire together and stagger them
        const visible = entries.filter((e) => e.isIntersecting);
        visible.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          const baseDelay = parseInt(el.dataset.revealDelay || '0', 10);
          setTimeout(() => {
            el.classList.add('visible');
          }, baseDelay + i * 80);
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Assign staggered delays per section
    const sections = mainRef.current.querySelectorAll('section, .stats-bar');
    sections.forEach((section) => {
      const reveals = section.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .section-line');
      reveals.forEach((el, i) => {
        (el as HTMLElement).dataset.revealDelay = String(i * 100);
        observer.observe(el);
      });
    });

    // Also observe any top-level reveals
    mainRef.current.querySelectorAll(':scope > .reveal, :scope > .reveal-left, :scope > .reveal-right, :scope > .reveal-scale, :scope > .reveal-fade, :scope > .section-line').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }

        .reveal {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Variant: slide from left */
        .reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Variant: slide from right */
        .reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Variant: scale up */
        .reveal-scale {
          opacity: 0;
          transform: scale(0.88);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-scale.visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Variant: fade only (no movement) */
        .reveal-fade {
          opacity: 0;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity;
        }
        .reveal-fade.visible {
          opacity: 1;
        }

        /* Section divider line animation */
        .section-line {
          width: 0;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-line.visible {
          width: 100%;
        }

        /* Smooth hover transitions for cards */
        .why-card-hover {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .why-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 51, 38, 0.12);
        }

        .speaker-card-hover {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .speaker-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 51, 38, 0.1);
        }
      `}</style>
      <Navbar />
      <div ref={mainRef}>
        <HeroSection />
        <StatsBar />
        <WhySection />
        <ProgrammeSection />
        <SpeakersSection />
        <FaqSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
