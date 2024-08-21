"use client";

import productImage from "@/app/landing/assets/product-image.png";
import pyramidImage from "@/app/landing/assets/pyramid.png";
import tubeImage from "@/app/landing/assets/tube.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const transformY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <>
      <section
        id="preview"
        ref={sectionRef}
        className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
      >
        <div className="container">
          <div className="section-heading">
            <div className="flex justify-center">
              <div className="tag">Boost your productivity</div>
            </div>
            <h2 className="section-title mt-5 ">
              A more effective way to manage your business
            </h2>
            <p className="section-desciption mt-5">
            Experience our intuitive dashboard: revenue growth, upcoming appointments, most popular service. Running your business has never been this efficient or insightful.
            </p>
          </div>
          <div className="relative">
            <Image src={productImage} alt="product image" className="mt-10" />
            <motion.img
              src={pyramidImage.src}
              alt="pyramid image"
              height={262}
              width={262}
              className="hidden md:block absolute -right-36 -top-32 "
              style={{
                translateY: transformY,
              }}
            />
            <motion.img
              src={tubeImage.src}
              alt="tube image"
              height={248}
              width={248}
              className="hidden md:block absolute bottom-24 -left-36 "
              style={{
                translateY: transformY,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};
