"use client";

const companies = [
  {
    src: "/images/companyLogos/image1.png",
    name: "Company 1",
  },
  {
    src: "/images/companyLogos/image2.png",
    name: "Company 2",
  },
  {
    src: "/images/companyLogos/image3.png",
    name: "Company 3",
  },
  {
    src: "/images/companyLogos/image4.png",
    name: "Company 4",
  },
  {
    src: "/images/companyLogos/image5.png",
    name: "Company 5",
  },
  {
    src: "/images/companyLogos/image6.png",
    name: "Company 6",
  },
  {
    src: "/images/companyLogos/image7.png",
    name: "Company 7",
  },
  {
    src: "/images/companyLogos/image8.png",
    name: "Company 8",
  },
  {
    src: "/images/companyLogos/image9.png",
    name: "Company 9",
  },
  {
    src: "/images/companyLogos/image10.png",
    name: "Company 10",
  },
  {
    src: "/images/companyLogos/image11.png",
    name: "Company 11",
  },
  {
    src: "/images/companyLogos/image12.png",
    name: "Company 12",
  },
];

export default function CompaniesSection() {
  return (
    <section
      id="companies"
      className="
        relative
        overflow-hidden
        border-y
        border-[#dce7f3]
        bg-[#f7fbff]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          VERY SUBTLE AMBIENT LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          -top-48
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#24598a]/[0.045]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-52
          -left-44
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#c9a227]/[0.025]
          blur-[110px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#c5d6e8]
              bg-white
              px-4
              py-2
              shadow-[0_1px_3px_rgba(23,59,99,0.05)]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#c9a227]
              "
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#173b63]
              "
            >
              Career Outcomes
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-6
              text-3xl
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-[#122a46]
              sm:text-4xl
              md:text-5xl
              lg:text-[3.5rem]
            "
          >
            Proving Potential,
            <span className="text-[#24598a]">
              {" "}
              Placing Pride.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-[#64748b]
              sm:text-lg
              sm:leading-8
            "
          >
            Trailbliz graduates are now building at some of
            the world&apos;s most innovative companies.
          </p>
        </div>

        {/* =====================================================
            IMPACT NUMBERS
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-4xl
            grid-cols-3
            divide-x
            divide-[#dce7f3]
            sm:mt-16
          "
        >
          <Stat
            value="52,000+"
            label="Trained"
          />

          <Stat
            value="19,500+"
            label="Placed"
          />

          <Stat
            value="45+"
            label="Companies"
          />
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div
          className="
            mx-auto
            my-14
            h-px
            max-w-5xl
            bg-gradient-to-r
            from-transparent
            via-[#c5d6e8]
            to-transparent
            sm:my-16
          "
        />

        {/* =====================================================
            LOGO INTRO
        ===================================================== */}

        <div className="text-center">
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#94a3b8]
            "
          >
            Where our talent is building
          </p>
        </div>

        {/* =====================================================
            COMPANY LOGOS
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-8
            max-w-6xl
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              sm:gap-4
              md:grid-cols-4
              lg:grid-cols-6
            "
          >
            {companies.map(
              (company, index) => (
                <CompanyLogo
                  key={`${company.src}-${index}`}
                  src={company.src}
                  name={company.name}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        px-3
        text-center
        sm:px-8
      "
    >
      <div
        className="
          text-3xl
          font-bold
          tracking-[-0.045em]
          text-[#173b63]
          sm:text-4xl
          lg:text-5xl
        "
      >
        {value}
      </div>

      <p
        className="
          mt-2
          text-[11px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-[#64748b]
          sm:text-xs
        "
      >
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   COMPANY LOGO
========================================================= */

function CompanyLogo({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div
      className="
        group
        relative
        flex
        h-[105px]
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-[#dce7f3]
        bg-white
        p-5

        shadow-[0_1px_3px_rgba(23,59,99,0.05)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#b8cee4]
        hover:shadow-[0_10px_30px_rgba(23,59,99,0.09)]

        sm:h-[115px]
        lg:h-[120px]
      "
    >
      {/* Gold hover detail */}

      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          h-[2px]
          w-0
          -translate-x-1/2
          rounded-full
          bg-[#c9a227]

          transition-all
          duration-300

          group-hover:w-10
        "
      />

      {/* Logo */}

      <img
        src={src}
        alt={name}
        loading="lazy"
        className="
          relative
          z-10
          max-h-[64px]
          max-w-[85%]
          object-contain

          opacity-75
          saturate-[0.85]

          transition-all
          duration-300

          group-hover:scale-[1.04]
          group-hover:opacity-100
          group-hover:saturate-100

          sm:max-h-[70px]
          lg:max-h-[74px]
        "
      />
    </div>
  );
}