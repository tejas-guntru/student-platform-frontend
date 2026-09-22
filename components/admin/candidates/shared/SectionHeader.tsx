interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        {subtitle}
      </p>
    </div>
  );
}