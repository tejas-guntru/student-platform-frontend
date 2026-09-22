interface MiniStatProps {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}

export default function MiniStat({
  label,
  value,
}: MiniStatProps) {
  const displayValue =
    value === null ||
    value === undefined ||
    value === ""
      ? "-"
      : value;

  return (
    <div
      className="
        rounded-[15px]
        border
        border-[#E2EDF5]
        bg-white
        p-3
        transition-all
        duration-200

        hover:border-[#C7E1F2]
        hover:shadow-[0_7px_18px_rgba(8,119,232,0.05)]
      "
    >
      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.11em]
          text-[#94A7B6]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          truncate
          text-sm
          font-bold
          text-[#456982]
        "
      >
        {displayValue}
      </p>
    </div>
  );
}