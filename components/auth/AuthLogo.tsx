import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="mb-8 flex justify-center sm:mb-10">
      <Image
        src="/tbz.png"
        alt="Trailbliz"
        width={260}
        height={80}
        priority
        className="
          h-auto
          w-[220px]
          object-contain
          sm:w-[245px]
        "
      />
    </div>
  );
}