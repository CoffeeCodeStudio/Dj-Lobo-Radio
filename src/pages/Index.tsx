import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div id="hem">
        <HeroSection />
      </div>
      <ErrorBoundary>
        <AboutSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <div id="kontakt">
          <ContactSection />
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default Index;
