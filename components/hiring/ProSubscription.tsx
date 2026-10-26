
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
} from "lucide-react";

const PRIMARY_COLOR = "#1256af";

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

const sectionTitle =
  "text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:leading-[1.1]";

const primaryBtn =
  "mt-auto flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#1256af] px-5 py-2.5 !text-sm !font-semibold text-white transition-colors hover:bg-[#0f4b99]";

const quietBtn =
  "mt-auto flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#122a46] px-5 py-2.5 !text-sm !font-semibold text-white transition-colors hover:bg-[#1256af]";

export default function ProSubscriptionSection() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-6 flex flex-col items-center">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b93a3]">
              <Crown size={14} className="text-[#1256af]" />
              Career Membership
            </p>
            <span
              aria-hidden="true"
              className="mt-2.5 block h-[2px] w-7 rounded-full bg-[#c4a265]"
            />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Professional{" "}
            <span style={{ color: PRIMARY_COLOR }}>
              Membership
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-7 text-[#5c6b80] sm:text-base">
            Accelerate your career with professional guidance,
            exclusive resources, and opportunities designed to
            support your next career move.
          </p>
        </div>

        {/* Services */}
        <div className="mb-16 sm:mb-20">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className={sectionTitle}>
              Everything You Need to Grow
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4a607a] sm:text-base">
              Explore the support available through our career plans.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group flex h-full flex-col rounded-2xl border border-[#e4e9f0] bg-[#f8fafc] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#dce7f3] hover:bg-white hover:shadow-[0_16px_40px_rgba(16,33,58,0.08)]"
                >
                  <div className="mb-5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1256af] text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon size={20} />
                  </div>

                  <h3 className="mb-2 text-lg font-extrabold leading-7 tracking-tight text-[#122a46] lg:min-h-[56px]">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#4a607a]">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Choose Your{" "}
              <span className="text-[#1256af]">
                Plan
              </span>
            </h2>

            <span
              aria-hidden="true"
              className="mx-auto mt-4 block h-[2px] w-7 rounded-full bg-[#c4a265]"
            />

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#5c6b80] sm:text-base">
              Select the membership duration that fits your
              career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,33,58,0.08)] sm:p-7 ${
                  plan.popular
                    ? "border-[#1256af] shadow-[0_16px_40px_rgba(16,33,58,0.06)]"
                    : "border-[#e4e9f0]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1256af] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8 flex min-h-[220px] flex-col items-center text-center sm:min-h-[240px]">
                  <div
                    className={`mb-5 flex size-14 shrink-0 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-[#e7f1fc] text-[#1256af]"
                        : "bg-[#eef2f6] text-[#122a46]"
                    }`}
                  >
                    <Crown size={26} />
                  </div>

                  <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-[#122a46]">
                    {plan.name}
                  </h3>

                  <p className="min-h-12 text-[15px] leading-6 text-[#5c6b80]">
                    {plan.description}
                  </p>

                  <div className="mt-auto w-full pt-5">
                    <div className="flex flex-wrap items-baseline justify-center gap-x-1 gap-y-2">
                      <span className="text-[2.2rem] font-bold tracking-[-0.04em] text-[#101828]">
                        ₹{plan.price.toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm text-[#8b93a3]">
                        / {plan.duration}{" "}
                        {plan.duration === 1
                          ? "month"
                          : "months"}
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#98a2b3]">
                      Total plan price
                    </p>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="mb-8 flex flex-1 flex-col gap-3.5 border-t border-[#eef1f5] pt-6 text-left">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-[#1256af]"
                      />

                      <span className="text-sm leading-6 text-[#3e4d63]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Login CTA */}
                <button
                  type="button"
                  onClick={goToLogin}
                  className={plan.popular ? primaryBtn : quietBtn}
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-6 text-[#8b93a3]">
            Sign in to continue. Selecting a plan does not
            initiate a payment.
          </p>
        </div>

        {/* Final CTA */}
      </div>
    </section>
  );
}
