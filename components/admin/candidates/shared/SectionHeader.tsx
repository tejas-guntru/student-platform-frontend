interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="min-w-0">
      <h2
        className="
          text-lg
          font-bold
          tracking-[-0.025em]
          text-[#173B63]

          sm:text-xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-1
          text-xs
          leading-5
          text-[#8297A8]

          sm:text-sm
        "
      >
        {subtitle}
      </p>
    </div>
  );
}