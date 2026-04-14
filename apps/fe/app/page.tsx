import Hero from "@/app/sections/Hero";
import Features from "@/app/sections/Features";
import HowItWorks from "@/app/sections/HowItWorks";
import Testimonial from "@/app/sections/Testimonial";
import Differentiators from "@/app/sections/Differentiators";
import CTA from "@/app/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonial />
      <Differentiators />
      <CTA />
    </main>
  );
}
