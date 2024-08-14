import ArrowRight from "@/app/landing/assets/arrow-right.svg";
import starImage from "@/app/landing/assets/star.png";
import springImage from "@/app/landing/assets/spring.png";
import Image from "next/image";

export const CallToAction = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-[#d2dcff] py-24">
        <div className="container">
          <div className="section-heading relative">
            <h2 className="section-title">Try it for free today</h2>
            <p className="section-description mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              ex tenetur possimus in blanditiis laborum ullam eos velit quia ad
              maxime.
            </p>
            <Image
              src={starImage}
              alt="star"
              width={360}
              className="absolute -left-[350px] -top-[137px] overflow-x-clip"
            />
            <Image
              src={springImage}
              alt="spring"
              width={360}
              className="absolute -right-[331px] -top-[19px] overflow-x-clip"
            />
            <div className="flex gap-2 mt-10 justify-center">
              <button className="btn btn-primary">Try for free</button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowRight className="w-5 h-5 " />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
