import HeroSection from '@/components/sections/hero-section';
import BadgesSection from '@/components/sections/badges-section';
import PhotoCarousel from '@/components/sections/photo-carousel';
import FeatureSections from '@/components/sections/feature-sections';
import GetStartedSection from '@/components/sections/get-started-section';
import MoreFeaturesSection from '@/components/sections/more-features-section';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <BadgesSection />
      <PhotoCarousel />
      <FeatureSections />
      <GetStartedSection />
      <MoreFeaturesSection />
    </div>
  );
}
