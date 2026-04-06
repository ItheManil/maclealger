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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    mainRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: none;
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
