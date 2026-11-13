"use client";

import React from "react";
import Image from "next/image";

interface IPhoneFrameProps {
  className?: string;
  /** A screenshot of the app at 390 x 844 (the screen's own aspect), without the phone's status bar. */
  screenSrc?: string;
  altText?: string;
  /** Shown under the phone, not on top of the screen. */
  caption?: string;
  /** Live content instead of a screenshot (e.g. the 3D viewer). */
  children?: React.ReactNode;
  /** Kept for old call sites; there is no screen selector any more. */
  showSelector?: boolean;
}

/**
 * A plain phone: one dark bezel around a screen with the app's aspect ratio (390 x 844). The screenshot fills the
 * screen edge to edge; there is no fake status bar, notch, reflection or info card drawn over it.
 */
export default function IPhoneFrame({ className = "", screenSrc, altText = "", caption, children }: IPhoneFrameProps) {
  return (
    <figure className={`flex flex-col items-center ${className}`}>
      <div className="w-[248px] sm:w-[272px] rounded-[42px] bg-ink p-[9px]">
        <div className="relative w-full aspect-[390/844] rounded-[33px] overflow-hidden bg-ground">
          {children ? (
            <div className="absolute inset-0 bg-stage">{children}</div>
          ) : screenSrc ? (
            <Image src={screenSrc} alt={altText} fill sizes="(max-width: 640px) 230px, 254px" className="object-cover object-top select-none" />
          ) : null}
        </div>
      </div>
      {caption && <figcaption className="mt-4 text-[13px] text-ink-soft text-center">{caption}</figcaption>}
    </figure>
  );
}
