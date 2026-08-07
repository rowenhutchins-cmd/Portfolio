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
        viewBox="0 0 9 8"
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
        <rect x="7" y="2" width="2" height="1" fill="#f2c94c" />
        <rect x="7" y="3" width="2" height="1" fill="#e0a92e" />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-20 min-w-[190px] whitespace-nowrap rounded-[10px] border border-accent/40 bg-ink-2 px-2.5 py-1.5 text-center text-[11px] font-bold tracking-[0.03em] text-accent"
      >
        <span className="relative block h-[14px] leading-[14px]">
          <span className="eagle-bubble-a absolute inset-x-0 top-0 whitespace-nowrap">
            * screech *
          </span>
          <span className="eagle-bubble-b absolute inset-x-0 top-0 whitespace-nowrap">
            * freedom *
          </span>
          <span className="eagle-bubble-c absolute inset-x-0 top-0 whitespace-nowrap">
            * hire him *
          </span>
          <span className="eagle-bubble-d absolute inset-x-0 top-0 whitespace-nowrap">
            * screech *
          </span>
          <span className="eagle-bubble-e absolute inset-x-0 top-0 whitespace-nowrap">
            * he&apos;s a good developer *
          </span>
        </span>
      </div>

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
        @keyframes eagle-bubble-cycle {
          0%,
          19% {
            opacity: 1;
          }
          20%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-bubble-a),
        :global(.eagle-bubble-b),
        :global(.eagle-bubble-c),
        :global(.eagle-bubble-d),
        :global(.eagle-bubble-e) {
          animation: eagle-bubble-cycle 17.5s steps(1) infinite;
        }
        :global(.eagle-bubble-b) {
          animation-delay: -3.5s;
        }
        :global(.eagle-bubble-c) {
          animation-delay: -7s;
        }
        :global(.eagle-bubble-d) {
          animation-delay: -10.5s;
        }
        :global(.eagle-bubble-e) {
          animation-delay: -14s;
        }
      `}</style>
    </div>
  );
};

export default PeekingHead;
