import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScheduleSection from "@/components/ScheduleSection";
import CalendarSection from "@/components/CalendarSection";
import MixcloudSection from "@/components/MixcloudSection";
import Footer from "@/components/Footer";
import NowPlayingBar from "@/components/NowPlayingBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Light leak backgrounds */}
      <div className="light-leak-purple"></div>
      <div className="light-leak-blue"></div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ScheduleSection />
          <CalendarSection />
          <MixcloudSection />
          <Footer />
        </main>
        <NowPlayingBar />
      </div>
    </div>
  );
};

export default Index;
