"use client";
import CheckIcon from "../assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
const pricingTiers = [
  {
    title: "Free Trial",
    monthlyPrice: 0,
    buttonText: "Start Free Trial",
    popular: false,
    inverse: false,
    features: [
      "Full access for 30 days",
      "Unlimited appointments",
      "Basic notifications",
      "Email support",
    ],
    trialPeriod: "30 days",
    postTrialPrice: 297,
  },
  {
    title: "Pro",
    monthlyPrice: 397,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Unlimited appointments",
      "Custom notifications (SMS & Email)",
      "Advanced reporting and analytics",
      "Priority customer support",
      "Calendar syncing (Google, Outlook, iCloud)",
      "Integration with CRM systems",
    ],
  },
  {
    title: "Premium",
    monthlyPrice: 497,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Unlimited calendars",
      "Unlimited appointments",
      "Branded booking pages",
      "Advanced notifications and reminders",
      "Dedicated account manager",
      "API access",
      "Advanced security features",
      "Multi-language support",
      "Custom mobile app",
    ],
  },
];

export const Pricing = () => {
  return (
    <>
      <section id="pricing" className="py-24 bg-white">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title ">Pricing</h2>
            <p className="section-desciption mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              dolorum, quas, quia.
            </p>
          </div>
          <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
            {pricingTiers.map(
              ({
                title,
                monthlyPrice,
                buttonText,
                popular,
                inverse,
                features,
              }) => (
                <div
                  className={twMerge(
                    "card",
                    inverse === true && "border-black bg-black text-white"
                  )}
                >
                  <div className="flex justify-between">
                    <h3
                      className={twMerge(
                        "text-lg font-bold text-black/50",
                        inverse === true && "text-white/60"
                      )}
                    >
                      {title}
                    </h3>
                    {popular === true && (
                      <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20 ">
                        <motion.span
                          animate={{ backgroundPosition: "100%" }}
                          transition={{
                            repeat: Infinity,
                            easy: "linear",
                            duration: 1,
                            repeatType: "loop",
                          }}
                          className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3bffff,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3bffff,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                        >
                          Popular
                        </motion.span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-[30px]">
                    <span className="text-4xl font-bold tracking-tighter leading-none">
                      {monthlyPrice}
                    </span>
                    <span className="tracking-tight font-bold text-black/40">
                      /month
                    </span>
                  </div>
                  <button
                    className={twMerge(
                      "btn btn-primary w-full mt-[30px]",
                      inverse === true && "bg-white text-black"
                    )}
                  >
                    {buttonText}
                  </button>
                  <ul className="flex flex-col gap-5 mt-8">
                    {features.map((feature) => (
                      <li className="text-sm flex items-center gap-4 ">
                        <CheckIcon className="h-6 w-6" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};
