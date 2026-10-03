import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import JobSection from "../components/JobSection";
import CommunitySection from "../components/CommunitySection";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>

      <Navbar />

      <main>

        <Hero />

        <CategorySection />

        <JobSection />

        <CommunitySection />

      </main>

      <Footer />

    </div>
  );
}

export default Home;