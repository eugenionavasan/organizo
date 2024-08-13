import { Header } from "@/app/landing/sections/Header";
import { Hero } from "@/app/landing/sections/Hero";
import { LogoTicker } from "@/app/landing/sections/LogoTicker";
import { ProductShowcase } from "@/app/landing/sections/ProductShowcase";
import { Pricing } from "@/app/landing/sections/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
    </>
  );
}
