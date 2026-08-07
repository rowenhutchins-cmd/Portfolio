"use client";

import { usePathname } from "next/navigation";
import { useEagle } from "./EagleContext";

const PeekingHead = () => {
  const { state, treeVisible } = useEagle();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const visible = state !== "idle" && (!isHome || !treeVisible);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed left-2 top-1.5 z-9999 hidden h-11 w-11 lg:block">
      <svg
        width="44"
        height="44"
        viewBox="0 0 8 8"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="0" y="1" width="7" height="1" fill="#ffffff" />
        <rect x="0" y="2" width="8" height="1" fill="#ffffff" />
        <rect x="0" y="3" width="8" height="1" fill="#ffffff" />
        <rect x="0" y="4" width="7" height="1" fill="#ffffff" />
        <rect
          className="eagle-eye-blink"
          x="3"
          y="2"
          width="1"
          height="1"
          fill="#111111"
        />
        <rect x="7" y="2" width="1" height="1" fill="#f2c94c" />
        <rect x="7" y="3" width="1" height="1" fill="#e0a92e" />
      </svg>

      <style jsx>{`
        @keyframes eagle-blink {
          0%,
          88%,
          100% {
            transform: scaleY(1);
          }
          92% {
            transform: scaleY(0.1);
          }
        }
        :global(.eagle-eye-blink) {
          animation: eagle-blink 2.2s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default PeekingHead;
