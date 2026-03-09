import MixCardGrid from "@/components/MixCardGrid";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const MixesPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <ErrorBoundary>
        <MixCardGrid />
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default MixesPage;
