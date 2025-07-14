import { Header } from '../components/pdf-uploads/Header';
import { Hero } from '../components/pdf-uploads/Hero';
import { FeaturedPublications } from '../components/pdf-uploads/FeaturedPublications';
import { FeaturedSeries } from '../components/pdf-uploads/FeaturedSeries';
import { AllPublications } from '../components/pdf-uploads/AllPublications';
import { Footer } from '../components/pdf-uploads/Footer';

const PdfUploads = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedPublications />
      <FeaturedSeries />
      <AllPublications />
      <Footer />
    </div>
  );
};

export default PdfUploads; 