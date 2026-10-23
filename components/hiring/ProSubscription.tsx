
"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Crown,
  Phone,
  MessageSquare,
  Link2,
  UserCheck,
  FileCheck,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const PRIMARY_COLOR = "#093697";

const plans = [
  {
    id: "essential",
    name: "Essential",
    description: "Perfect for getting started",
    price: 2999,
    duration: 1,
    popular: false,
    features: [
      "1-on-1 Career Consultation",
      "LinkedIn Profile Review",
      "Interview Preparation Guide",
      "Resume Enhancement",
      "Basic Job Search Support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Most popular choice",
    price: 7999,
    duration: 3,
    popular: true,
    features: [
      "Everything in Essential",
      "Weekly Career Coaching",
      "Mock Interview Sessions",
      "Professional Network Access",
      "Priority Job Referrals",
      "Salary Negotiation Support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Complete career transformation",
    price: 14999,
    duration: 6,
    popular: false,
    features: [
      "Everything in Professional",
      "Dedicated Career Mentor",
      "Industry Leader Connections",
      "Executive Interview Prep",
      "Personal Branding Strategy",
      "Placement Support",
    ],
  },
];

const services = [
  {
    icon: Phone,
    title: "1-on-1 Career Consultations",
    description:
      "Personal career strategy sessions focused on your goals and professional growth.",
  },
  {
    icon: MessageSquare,
    title: "Complete Interview Support",
    description:
      "Mock interviews, behavioral preparation, and interview coaching.",
  },
  {
    icon: Link2,
    title: "LinkedIn Profile Optimization",
    description:
      "Professional profile reviews to improve your visibility to recruiters.",
  },
  {
    icon: UserCheck,
    title: "Professional Network Referrals",
    description:
      "Career networking support and opportunities to connect with recruiters.",
  },
  {
    icon: FileCheck,
    title: "Premium Resource Library",
    description:
      "Interview guides, resume resources, and career development materials.",
  },
  {
    icon: Clock3,
    title: "Priority Opportunity Access",
    description:
      "Early access to eligible job opportunities and professional resources.",
  },
];

export default function ProSubscriptionSection() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#093697]">
            <Crown size={16} />
            <span>Career Membership</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            Professional{" "}
            <span style={{ color: PRIMARY_COLOR }}>
              Membership
            </span>
          </h1>

          <div className="mx-auto mb-7 h-1 w-24 rounded-full bg-[#093697]" />

          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-600 md:text-xl">
            Accelerate your career with professional guidance,
            exclusive resources, and opportunities designed to
            support your next career move.
          </p>
        </div>

        {/* Services */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
              Everything You Need to Grow
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Explore the support available through our career plans.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50 p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#093697] text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon size={25} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold leading-7 text-gray-950 lg:min-h-[56px]">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-950">
              Choose Your{" "}
              <span className="text-[#093697]">
                Plan
              </span>
            </h2>

            <div className="mx-auto my-6 h-1 w-20 rounded-full bg-[#093697]" />

            <p className="mx-auto max-w-2xl text-lg leading-7 text-gray-600">
              Select the membership duration that fits your
              career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-2xl border-2 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                  plan.popular
                    ? "border-[#093697] shadow-lg"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#093697] px-5 py-2 text-xs font-bold tracking-wide text-white">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8 flex min-h-[240px] flex-col items-center text-center">
                  <div
                    className={`mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-blue-50 text-[#093697]"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <Crown size={30} />
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-gray-950">
                    {plan.name}
                  </h3>

                  <p className="min-h-12 text-base leading-6 text-gray-600">
                    {plan.description}
                  </p>

                  <div className="mt-auto w-full pt-5">
                    <div className="flex flex-wrap items-baseline justify-center gap-x-1 gap-y-2">
                      <span className="text-4xl font-extrabold tracking-tight text-gray-950">
                        ₹{plan.price.toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm text-gray-500">
                        / {plan.duration}{" "}
                        {plan.duration === 1
                          ? "month"
                          : "months"}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Total plan price
                    </p>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="mb-9 flex flex-1 flex-col gap-4 border-t border-gray-100 pt-7 text-left">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={19}
                        className="mt-0.5 shrink-0 text-[#093697]"
                      />

                      <span className="text-sm leading-6 text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Login CTA */}
                <button
                  type="button"
                  onClick={goToLogin}
                  className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    plan.popular
                      ? "bg-[#093697] text-white hover:bg-[#072a7a]"
                      : "bg-gray-950 text-white hover:bg-[#093697]"
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-6 text-gray-500">
            Sign in to continue. Selecting a plan does not
            initiate a payment.
          </p>
        </div>

        {/* Final CTA */}
      </div>
    </section>
  );
}
