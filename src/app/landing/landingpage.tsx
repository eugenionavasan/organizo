"use client";
import { useEffect } from "react";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { LogoTicker } from "./sections/LogoTicker";
import { ProductShowcase } from "./sections/ProductShowcase";
import { Pricing } from "./sections/Pricing";
import { Testimonials } from "./sections/Testimonials";
import { CallToAction } from "./sections/CallToAction";
import { Footer } from "./sections/Footer";

export default function LandingPage() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 100; // Adjust this value based on your navbar's height
    const elementPosition = element?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const landingPageElement = document.querySelector(".landing-page");
    if (landingPageElement) {
      (landingPageElement as HTMLElement).style.scrollBehavior = "smooth";
    }
    return () => {
      if (landingPageElement) {
        (landingPageElement as HTMLElement).style.scrollBehavior = "auto";
      }
    };
  }, []);

  // Add event listeners to the navbar links to handle smooth scrolling
  useEffect(() => {
    const navbarLinks = document.querySelectorAll('nav a[href^="#"]');
    navbarLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        if (targetId) {
          handleScrollTo(targetId);
        }
      });
    });

    return () => {
      navbarLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
