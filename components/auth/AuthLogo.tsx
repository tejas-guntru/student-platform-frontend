import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="mb-10 flex justify-center">
      <Image
        src="/trailbliz.png"
        alt="Trailbliz"
        width={170}
        height={40}
        priority
        className="h-auto max-h-10 w-auto object-contain"
      />
    </div>
  );
}