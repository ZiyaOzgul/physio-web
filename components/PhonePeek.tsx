import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

/**
 * The top of a phone rising out of a card: dark bezel on three sides, the screenshot cut off by the card's bottom edge.
 * For small previews where a whole phone would be a tiny, unreadable picture.
 */
export default function PhonePeek({ src, alt, className = "" }: Props) {
  return (
    <div className={`relative h-72 rounded-[14px] border border-line bg-stage overflow-clip ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2 top-7 w-[62%] max-w-[250px] rounded-t-[30px] bg-ink p-[7px] pb-0">
        <div className="relative w-full aspect-[390/844] rounded-t-[24px] overflow-hidden bg-ground">
          <Image src={src} alt={alt} fill sizes="250px" className="object-cover object-top select-none" />
        </div>
      </div>
    </div>
  );
}
