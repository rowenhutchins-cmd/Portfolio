"use client";

import { useEffect, useRef } from "react";
import { useEagle } from "./EagleContext";

const TreeBranch = () => {
  const { state, trigger, dismiss, setTreeVisible } = useEagle();
  const active = state !== "idle";
  const perched = state === "perched";

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTreeVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [setTreeVisible]);

  return (
    <div
      ref={containerRef}
      className="absolute right-6 top-28 z-20 hidden w-[280px] flex-col items-end lg:flex"
    >
      <svg
        className={
          active
            ? "pointer-events-none"
            : "pointer-events-none invisible"
        }
        width="280"
        height="190"
        viewBox="0 0 48 30"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* trunk, bleeding off the right edge */}
        <rect x="42" y="0" width="6" height="30" fill="#4a3826" />
        <rect x="42" y="0" width="2" height="30" fill="#5b4632" />

        {/* canopy */}
        <rect x="34" y="0" width="8" height="3" fill="#2d7a5a" />
        <rect x="30" y="3" width="8" height="3" fill="#3fae7d" />
        <rect x="38" y="2" width="8" height="4" fill="#5ed29c" />
        <rect x="32" y="7" width="10" height="3" fill="#2d7a5a" />
        <rect x="40" y="8" width="6" height="3" fill="#3fae7d" />

        {/* branch, trunk to tip, no gap under the eagle's feet */}
        <rect x="30" y="11" width="12" height="3" fill="#5b4632" />
        <rect x="16" y="12" width="16" height="2" fill="#4a3826" />
        <rect x="6" y="13" width="12" height="1" fill="#4a3826" />
        <rect x="4" y="12" width="2" height="2" fill="#3fae7d" />

        {perched && (
          <g>
            {/* tail */}
            <rect x="24" y="9" width="4" height="2" fill="#e8e8e8" />
            <rect x="25" y="11" width="4" height="1" fill="#e8e8e8" />
            {/* folded body/wing, banded */}
            <rect x="15" y="3" width="10" height="2" fill="#1e3a5f" />
            <rect x="15" y="5" width="10" height="2" fill="#c0392b" />
            <rect x="15" y="7" width="10" height="2" fill="#1e3a5f" />
            <rect x="16" y="9" width="9" height="2" fill="#c0392b" />
            {/* head, facing left */}
            <rect x="10" y="0" width="7" height="2" fill="#ffffff" />
            <rect x="9" y="2" width="8" height="2" fill="#ffffff" />
            <rect x="10" y="4" width="6" height="1" fill="#ffffff" />
            <rect
              className="eagle-eye-blink"
              x="13"
              y="2"
              width="1"
              height="1"
              fill="#111111"
            />
            {/* beak */}
            <rect x="7" y="2" width="2" height="1" fill="#f2c94c" />
            <rect x="7" y="3" width="2" height="1" fill="#e0a92e" />
            {/* feet, resting on the branch's top surface */}
            <rect x="17" y="11" width="2" height="2" fill="#f2c94c" />
            <rect x="21" y="11" width="2" height="2" fill="#f2c94c" />
          </g>
        )}
      </svg>

      {perched && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[100px] top-[-26px] min-w-[104px] whitespace-nowrap rounded-[10px] border border-accent/40 bg-ink-2 px-2.5 py-1.5 text-center text-[11px] font-bold tracking-[0.03em] text-accent"
        >
          <span className="relative block h-[14px] leading-[14px]">
            <span className="eagle-bubble-a absolute inset-x-0 top-0 whitespace-nowrap">
              * screech *
            </span>
            <span className="eagle-bubble-b absolute inset-x-0 top-0 whitespace-nowrap">
              * freedom *
            </span>
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={trigger}
          className="rounded-full bg-accent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] text-ink transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
        >
          Click me if you&apos;re a patriot
        </button>
        {active && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss the eagle"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-xs text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white"
          >
            ✕
          </button>
        )}
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
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-bubble-a) {
          animation: eagle-bubble-cycle 7s steps(1) infinite;
        }
        :global(.eagle-bubble-b) {
          animation: eagle-bubble-cycle 7s steps(1) infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default TreeBranch;
