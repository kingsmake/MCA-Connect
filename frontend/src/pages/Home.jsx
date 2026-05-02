import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyMCA from '../components/WhyMCA';
import Careers from '../components/Careers';
import Stats from '../components/Stats';
import Timeline from '../components/Timeline';
import Quiz from '../components/Quiz';
import QRSection from '../components/QRSection';
import InterestForm from '../components/InterestForm';
import Videos from '../components/Videos';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative z-10">
      <Navbar />
      <main>
        <Hero />
        <WhyMCA />
        <Careers />
        <Stats />
        <Timeline />
        <Quiz />
        <QRSection />
        <InterestForm />
        <Videos />
      </main>
      <Footer />
    </div>
  );
}
