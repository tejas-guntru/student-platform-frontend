interface InfoCardProps {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}

export default function InfoCard({
  label,
  value,
}: InfoCardProps) {
  const displayValue =
    value === null ||
    value === undefined ||
    value === ""
      ? "-"
      : value;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-[#E0EBF4]
        bg-[#FBFDFF]
        p-4
        transition-all
        duration-200

        hover:border-[#BEDFF3]
        hover:bg-white
        hover:shadow-[0_10px_26px_rgba(8,119,232,0.06)]
      "
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-[3px]
          bg-gradient-to-b
          from-[#0877E8]
          to-[#38BDF8]
          opacity-0
          transition-opacity
          duration-200

          group-hover:opacity-100
        "
      />

      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.13em]
          text-[#91A5B5]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          break-words
          text-sm
          font-semibold
          leading-6
          text-[#4E7089]
        "
      >
        {displayValue}
      </p>
    </div>
  );
}