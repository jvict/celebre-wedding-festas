import { AgendaSection } from '@/features/home/components/agenda-section';
import { CategoryGrid } from '@/features/home/components/category-grid';
import { ClosingCta } from '@/features/home/components/closing-cta';
import { Hero } from '@/features/home/components/hero';
import { HowItWorks } from '@/features/home/components/how-it-works';
import { PrivacySection } from '@/features/home/components/privacy-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <AgendaSection />
      <HowItWorks />
      <PrivacySection />
      <ClosingCta />
    </>
  );
}
