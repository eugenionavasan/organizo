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
      "Up to 5 calendars",
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
    <section>
      <div className="container">
        <h2 className="section-title">Pricing</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          dolorum, quas, quia, quidem voluptatem doloribus ex quos tempore
          molestias atque.
        </p>
      </div>
    </section>
  );
};
