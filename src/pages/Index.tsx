import { useEffect, useRef } from 'react';
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
      const reveals = section.querySelectorAll('.reveal');
      reveals.forEach((el, i) => {
        (el as HTMLElement).dataset.revealDelay = String(i * 100);
        observer.observe(el);
      });
    });

    // Also observe any top-level reveals
    mainRef.current.querySelectorAll(':scope > .reveal').forEach((el) => observer.observe(el));

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
          transform: translateX(-30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Variant: scale up */
        .reveal-scale {
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-scale.visible {
          opacity: 1;
          transform: scale(1);
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
