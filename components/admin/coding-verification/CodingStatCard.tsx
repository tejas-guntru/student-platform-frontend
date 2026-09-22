interface CodingStatCardProps {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}

export default function CodingStatCard({
  label,
  value,
}: CodingStatCardProps) {
  const displayValue =
    value === null ||
    value === undefined ||
    value === ""
      ? "-"
      : value;

  const isSync =
    label.toLowerCase() ===
    "sync";

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-[#E0ECF5]
        bg-[#FBFDFF]
        p-4
        transition-all
        duration-200

        hover:border-[#C6E1F3]
        hover:bg-white
        hover:shadow-[0_10px_24px_rgba(8,119,232,0.06)]
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

      {isSync ? (
        <div className="mt-2">
          <SyncValue
            value={String(
              displayValue
            )}
          />
        </div>
      ) : (
        <p
          className="
            mt-2
            truncate
            text-lg
            font-bold
            tracking-[-0.025em]
            text-[#274E70]
          "
        >
          {displayValue}
        </p>
      )}
    </div>
  );
}

function SyncValue({
  value,
}: {
  value: string;
}) {
  const normalized =
    value.toUpperCase();

  if (
    normalized.includes("SUCCESS") ||
    normalized.includes("SYNCED") ||
    normalized.includes("COMPLETED")
  ) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-emerald-200
          bg-emerald-50
          px-2.5
          py-1
          text-[10px]
          font-bold
          text-emerald-700
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-emerald-500
          "
        />

        {formatSyncValue(value)}
      </span>
    );
  }

  if (
    normalized.includes("FAIL") ||
    normalized.includes("ERROR")
  ) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-red-200
          bg-red-50
          px-2.5
          py-1
          text-[10px]
          font-bold
          text-red-600
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-red-500
          "
        />

        {formatSyncValue(value)}
      </span>
    );
  }

  if (
    normalized.includes("PENDING") ||
    normalized.includes("PROCESS")
  ) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-amber-200
          bg-amber-50
          px-2.5
          py-1
          text-[10px]
          font-bold
          text-amber-700
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-amber-500
          "
        />

        {formatSyncValue(value)}
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        rounded-full
        border
        border-[#DCE8F2]
        bg-white
        px-2.5
        py-1
        text-[10px]
        font-bold
        text-[#6F879A]
      "
    >
      {formatSyncValue(value)}
    </span>
  );
}

function formatSyncValue(
  value: string
) {
  if (value === "-") {
    return value;
  }

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}