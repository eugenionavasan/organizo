import ArrowRight from "@/app/landing/assets/arrow-right.svg";
import Logo from "@/app/landing/assets/logosaas.png";
import Image from "next/image";
import MenuIcon from "@/app/landing/assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-xl z-20">
      {/* Banner */}
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-#ffffff/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center" />
        </div>
      </div>
      {/* Navbar */}
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Organizo" height={40} width={40} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black items-center">
              <a href="#hero">Home</a>

              <a href="#customers">Customers</a>
              <a href="#preview">Preview</a>
              <a href="#pricing">Pricing</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#">Login</a>
              <button className="btn btn-primary">Book a Demo</button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
