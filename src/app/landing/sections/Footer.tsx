import logo from "@/app/landing/assets/logosaas.png";
import SocialX from "@/app/landing/assets/social-x.svg";
import SocialInsta from "@/app/landing/assets/social-insta.svg";
import SocialLinkin from "@/app/landing/assets/social-linkedin.svg";
import SocialPin from "@/app/landing/assets/social-pin.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <>
      <footer className="bg-black text-[#bcbcbc] text-sm py-10 text-center ">
        <div className="container">
          <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#f87bff,#fb92cf,#ffdd9b,#c2f0b1,#2fd8fe)] before:absolute">
            <Image
              src={logo}
              alt="Saas logo"
              height={40}
              className="relative"
            />
          </div>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <SocialX />
          <SocialInsta />
          <SocialLinkin />
          <SocialPin />
        </div>
        <p className="mt-6"> 2024 Organnizo, Inc. All right reserved</p>
      </footer>
    </>
  );
};
