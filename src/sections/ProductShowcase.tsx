import productImage from "@/assets/product-image.png";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import Image from "next/image";

export const ProductShowcase = () => {
  return (
    <section className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] ">
      <div className="container">
        <div className="max.w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="tag">Boost your productivity</div>
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5 ">
            A more effective way to fill your calender
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem.
            Consequuntur blanditiis veritatis at dolore excepturi accusantium
            reprehenderit saepe ad animi?
          </p>
        </div>
        <div className="relative">
          <Image src={productImage} alt="product image" className="mt-10" />
          <Image
            src={pyramidImage}
            alt="pyramid image"
            height={262}
            width={262}
            className="absolute -right-36 -top-32 "
          />
          <Image
            src={tubeImage}
            alt="tube image"
            height={262}
            width={262}
            className="absolute -left-36 -bottom-32 "
          />
        </div>
      </div>
    </section>
  );
};
