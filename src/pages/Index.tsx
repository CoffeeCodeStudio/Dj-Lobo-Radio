import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import SocialGallerySection from "@/components/SocialGallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScheduleSection from "@/components/ScheduleSection";
import EquipmentSection from "@/components/EquipmentSection";
import ContactSection from "@/components/ContactSection";
import LiveChat from "@/components/LiveChat";
import Footer from "@/components/Footer";
import NowPlayingBar from "@/components/NowPlayingBar";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Hoppa till huvudinnehåll
      </a>

      {/* Moving mesh gradient background */}
      <div className="mesh-gradient-bg" aria-hidden="true"></div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Hem - Hero with id for navigation */}
            <div id="hem">
              <HeroSection />
            </div>
            
            {/* Boka spelning */}
            <BookingSection />
            
            {/* Mina Mixar - YouTube/Mixcloud section */}
            <div id="mixar">
              <SocialGallerySection />
            </div>
            
            {/* Mina Referenser */}
            <TestimonialsSection />
            
            {/* Mina Spelningar - Schedule/Events */}
            <div id="spelningar">
              <ScheduleSection />
            </div>
            
            {/* Min utrustning */}
            <EquipmentSection />
            
            {/* Kontakt */}
            <ContactSection />
            
            {/* Om oss */}
            <div id="om-oss">
              <AboutSection />
            </div>
            
            {/* Live Chat */}
            <LiveChat />
          </div>
        </main>
        <Footer />
        <NowPlayingBar />
        <FloatingChatButton />
      </div>
    </div>
  );
};

export default Index;
