
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

import {
  collabCities,
  collabDisplayOrder,
  type CollabCollege,
} from "@/data/collabColleges";

type Institution = {
  id: string;
  college: CollabCollege;
  city: string;
  state: string;
};

export default function CollabColleges() {
  const [activeCity, setActiveCity] = useState("All");

  const institutions = useMemo<Institution[]>(() => {
    const all = collabCities.flatMap((location) =>
      location.colleges.map((college, index) => ({
        id: `${location.city}-${index}`,
        college,
        city: location.city,
        state: location.state,
      }))
    );

    const order = new Map(
      collabDisplayOrder.map((name, index) => [
        name,
        index,
      ])
    );

    return all.sort(
      (a, b) =>
        (order.get(a.college.name) ?? Infinity) -
        (order.get(b.college.name) ?? Infinity)
    );
  }, []);

  const cities = [
    "All",
    ...collabCities.map((location) => location.city),
  ];

  const visibleInstitutions =
    activeCity === "All"
      ? institutions
      : institutions.filter(
          (institution) => institution.city === activeCity
        );

  return (
    <section
      id="collaborations"
      aria-labelledby="collaborations-title"
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
      {/* Ambient lighting */}

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

      {/* Content */}

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
        {/* Header */}

        <div className="mx-auto max-w-4xl text-center">
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
              Our Network
            </span>
          </div>

          <h2
            id="collaborations-title"
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
            Our Collaborating
            <span className="text-[#24598a]">
              {" "}Institutions.
            </span>
          </h2>
        </div>

        {/* City filters */}

        <div
          className="
            mx-auto
            mt-12
            flex
            max-w-5xl
            justify-start
            gap-2
            overflow-x-auto
            pb-3
            sm:mt-14
            sm:justify-center
            [&::-webkit-scrollbar]:hidden
          "
          aria-label="Filter institutions by city"
        >
          {cities.map((city) => {
            const isActive = activeCity === city;

            return (
              <button
                key={city}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCity(city)}
                className={`
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#24598a]
                  sm:text-sm
                  ${
                    isActive
                      ? "border-[#24598a] bg-[#24598a] text-white shadow-[0_4px_14px_rgba(36,89,138,0.16)]"
                      : "border-[#dce7f3] bg-white text-[#64748b] hover:border-[#c9a227] hover:text-[#173b63]"
                  }
                `}
              >
                {city !== "All" && (
                  <MapPin
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                )}

                {city === "All"
                  ? "All Institutions"
                  : city}
              </button>
            );
          })}
        </div>

        {/* Divider */}

        <div
          className="
            mx-auto
            mb-10
            mt-7
            h-px
            max-w-5xl
            bg-gradient-to-r
            from-transparent
            via-[#c5d6e8]
            to-transparent
            sm:mb-12
          "
        />

        {/* Logo intro */}

        <p
          className="
            text-center
            text-xs
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#94a3b8]
          "
        >
          Institutions in our network
        </p>

        {/* Logo grid */}

        <div className="mx-auto mt-8 max-w-6xl">
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
            {visibleInstitutions.map((institution) => (
              <CollegeLogo
                key={institution.id}
                college={institution.college}
                city={institution.city}
              />
            ))}
          </div>

          {visibleInstitutions.length === 0 && (
            <p
              className="
                py-12
                text-center
                text-sm
                text-[#64748b]
              "
            >
              No institutions available for this city yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function CollegeLogo({
  college,
  city,
}: {
  college: CollabCollege;
  city: string;
}) {
  const displayName = college.fullName ?? college.name;

  return (
    <article
      className="
        group
        relative
        flex
        min-h-[165px]
        flex-col
        items-center
        justify-between
        overflow-hidden
        rounded-2xl
        border
        border-[#dce7f3]
        bg-white
        px-3
        py-4
        text-center
        shadow-[0_1px_3px_rgba(23,59,99,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#b8cee4]
        hover:shadow-[0_10px_30px_rgba(23,59,99,0.09)]
        sm:min-h-[180px]
        sm:px-4
        sm:py-5
        motion-reduce:transform-none
        motion-reduce:transition-none
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
          motion-reduce:transition-none
        "
      />

      {/* Logo */}

      <div
        className="
          flex
          h-[80px]
          w-full
          items-center
          justify-center
          sm:h-[90px]
        "
      >
        {college.logo ? (
          <Image
            src={college.logo}
            alt={`${college.name} logo`}
            width={160}
            height={90}
            sizes="(max-width: 640px) 140px, 160px"
            className="
              relative
              z-10
              h-auto
              max-h-[65px]
              w-auto
              max-w-[85%]
              object-contain
              opacity-85
              transition-all
              duration-300
              group-hover:scale-[1.04]
              group-hover:opacity-100
              sm:max-h-[74px]
              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          />
        ) : (
          <span
            className="
              text-lg
              font-bold
              text-[#173b63]
            "
          >
            {college.name}
          </span>
        )}
      </div>

      {/* Name */}

      <div className="mt-3 w-full">
        <h3
          className="
            text-[10px]
            font-bold
            leading-[1.45]
            text-[#a67c24]
            transition-colors
            duration-300
            group-hover:text-[#805b14]
            sm:text-[11px]
          "
        >
          {displayName}
        </h3>

        <p
          className="
            mt-1
            text-[9px]
            font-medium
            text-[#94a3b8]
            sm:text-[10px]
          "
        >
          {city}
        </p>
      </div>
    </article>
  );
}
