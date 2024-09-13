"use client";
import Image from "next/image";

export default function PokeImage({ src, name }: { src: string; name: string }) {
  return (
    <Image
      src={src}
      alt={name}
      width={256 * 10}
      height={256 * 10}
      className="w-full h-full object-contain"
      style={{ aspectRatio: "256/256", objectFit: "cover" }}
    />
  );
}
