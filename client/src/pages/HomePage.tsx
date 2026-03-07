import HeroSection from "../components/Home/HeroSection";
import FeatureSection from "../components/Home/FeatureSection";
import HowItWork from "../components/Home/HowItWork";
import CtaSection from "../components/Home/CtaSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelmetSeo from "../components/HelmetSeo";

const homeMetadata = {
  title: "Brainio - Personalized Online Test Platform",
  description:
    "Brainio is an online platform designed for personalized learning assessments. Take tests, track progress, and improve your skills with our AI-powered insights.",
  keywords:
    "online tests, personalized learning, test platform, AI insights, education, quizzes",
};

function HomePage() {
  return (
    <>
      <HelmetSeo
        title={homeMetadata.title}
        description={homeMetadata.description}
        keywords={homeMetadata.keywords}
      />

      <Header />
      <HeroSection />
      <FeatureSection />
      <HowItWork />
      <CtaSection />
      <Footer />
    </>
  );
}

export default HomePage;
