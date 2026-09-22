import {
  Trophy,
} from "lucide-react";

interface RankCardProps {
  label: string;
  value: string;
}

export default function RankCard({
  label,
  value,
}: RankCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-[#DCEAF5]
        bg-[#FBFDFF]
        p-5
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B9DDF3]
        hover:bg-white
        hover:shadow-[0_14px_32px_rgba(8,119,232,0.07)]
      "
    >
      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#8097A9]
          "
        >
          {label}
        </p>

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <Trophy size={14} />
        </div>
      </div>

      <p
        className="
          mt-5
          text-3xl
          font-bold
          tracking-[-0.045em]
          text-[#173B63]
        "
      >
        {value}
      </p>
    </div>
  );
}