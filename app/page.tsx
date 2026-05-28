import PageLoader           from "@/components/PageLoader";
import EtherealBeamsSection from "@/components/EtherealBeamsSection";
import Services             from "@/components/Services";
import Clients              from "@/components/Clients";
// import Testimonials         from "@/components/Testimonials";
import TeamSection          from "@/components/TeamSection";
import Contact              from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "var(--white)", color: "var(--black)" }}>
      <PageLoader />

      <EtherealBeamsSection />
      <Services />
      <Clients />
      {/* <Testimonials /> */}
      <TeamSection />
      <Contact />
    </main>
  );
}
