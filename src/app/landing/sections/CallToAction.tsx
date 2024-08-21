"use client";
import ArrowRight from "@/app/landing/assets/arrow-right.svg";
import starImage from "@/app/landing/assets/star.png";
import springImage from "@/app/landing/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <>
      <section
        ref={sectionRef}
        className="bg-gradient-to-b from-white to-[#d2dcff] py-24"
      >
        <div className="container">
          <div className="section-heading relative">
            <h2 className="section-title">Try it for free today</h2>
            <p className="section-description mt-5">
            Ready to elevate your business? Try Organizo for free. Experience firsthand how our powerful tools can streamline your bookings and finances. Start your free trial today!
            </p>
            <motion.img
              src={starImage.src}
              alt="star"
              width={360}
              className="absolute -left-[350px] -top-[137px] overflow-x-clip"
              style={{
                translateY,
              }}
            />
            <motion.img
              src={springImage.src}
              alt="spring"
              width={360}
              className="absolute -right-[331px] -top-[19px] overflow-x-clip"
              style={{
                translateY,
              }}
            />
            <div className="flex gap-2 mt-10 justify-center">
              <button className="btn btn-primary">Get a free trial</button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
