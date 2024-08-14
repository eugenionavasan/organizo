import { Header } from "@/app/landing/sections/Header";
import { Hero } from "@/app/landing/sections/Hero";
import { LogoTicker } from "@/app/landing/sections/LogoTicker";
import { ProductShowcase } from "@/app/landing/sections/ProductShowcase";
import { Pricing } from "@/app/landing/sections/Pricing";
import { Testimonials } from "./landing/sections/Testimonials";
import { CallToAction } from "./landing/sections/CallToAction";
import { Footer } from "./landing/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
