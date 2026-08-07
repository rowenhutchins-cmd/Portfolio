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

            {/* feather trail, shed from the wing on landing */}
            <rect
              className="eagle-feather eagle-feather-1"
              x="14"
              y="4"
              width="1.6"
              height="0.6"
              fill="#ffffff"
              transform="rotate(-30 14.8 4.3)"
            />
            <rect
              className="eagle-feather eagle-feather-2"
              x="16"
              y="7"
              width="1.6"
              height="0.6"
              fill="#c0392b"
              transform="rotate(20 16.8 7.3)"
            />
            <rect
              className="eagle-feather eagle-feather-3"
              x="15"
              y="5.5"
              width="1.6"
              height="0.6"
              fill="#1e3a5f"
              transform="rotate(-10 15.8 5.8)"
            />
          </g>
        )}
      </svg>

      {perched && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[100px] top-[-26px] min-w-[190px] whitespace-nowrap rounded-[10px] border border-accent/40 bg-ink-2 px-2.5 py-1.5 text-center text-[11px] font-bold tracking-[0.03em] text-accent"
        >
          <span className="relative block h-[14px] leading-[14px]">
            <span className="eagle-bubble-a absolute inset-x-0 top-0 whitespace-nowrap">
              * screech *
            </span>
            <span className="eagle-bubble-b absolute inset-x-0 top-0 whitespace-nowrap">
              * freedom *
            </span>
            <span className="eagle-bubble-c absolute inset-x-0 top-0 whitespace-nowrap">
              * screech *
            </span>
            <span className="eagle-bubble-d absolute inset-x-0 top-0 whitespace-nowrap">
              * hire him *
            </span>
            <span className="eagle-bubble-e absolute inset-x-0 top-0 whitespace-nowrap">
              * screech *
            </span>
            <span className="eagle-bubble-f absolute inset-x-0 top-0 whitespace-nowrap">
              * he&apos;s a good developer *
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
          16% {
            opacity: 1;
          }
          17%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-bubble-a),
        :global(.eagle-bubble-b),
        :global(.eagle-bubble-c),
        :global(.eagle-bubble-d),
        :global(.eagle-bubble-e),
        :global(.eagle-bubble-f) {
          animation: eagle-bubble-cycle 21s steps(1) infinite;
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
        :global(.eagle-bubble-f) {
          animation-delay: -17.5s;
        }
        @keyframes eagle-feather-fall-1 {
          0% {
            opacity: 1;
            transform: translate(0%, 0%) rotate(-30deg);
          }
          10% {
            transform: translate(-260%, 955%) rotate(-55deg);
          }
          20% {
            transform: translate(120%, 2100%) rotate(-20deg);
          }
          28.3% {
            opacity: 1;
            transform: translate(-180%, 3245%) rotate(-45deg);
          }
          33.3%,
          100% {
            opacity: 0;
            transform: translate(80%, 4200%) rotate(-25deg);
          }
        }
        @keyframes eagle-feather-fall-2 {
          0% {
            opacity: 1;
            transform: translate(0%, 0%) rotate(20deg);
          }
          10% {
            transform: translate(220%, 807%) rotate(50deg);
          }
          20% {
            transform: translate(-140%, 1766%) rotate(10deg);
          }
          28.3% {
            opacity: 1;
            transform: translate(200%, 2775%) rotate(40deg);
          }
          33.3%,
          100% {
            opacity: 0;
            transform: translate(-100%, 3700%) rotate(15deg);
          }
        }
        @keyframes eagle-feather-fall-3 {
          0% {
            opacity: 1;
            transform: translate(0%, 0%) rotate(-10deg);
          }
          10% {
            transform: translate(-180%, 922%) rotate(-35deg);
          }
          20% {
            transform: translate(160%, 2039%) rotate(5deg);
          }
          28.3% {
            opacity: 1;
            transform: translate(-140%, 3103%) rotate(-30deg);
          }
          33.3%,
          100% {
            opacity: 0;
            transform: translate(120%, 3900%) rotate(-5deg);
          }
        }
        :global(.eagle-feather) {
          transform-box: fill-box;
          transform-origin: center;
        }
        :global(.eagle-feather-1) {
          animation: eagle-feather-fall-1 6s ease-in infinite;
          animation-delay: 0s;
        }
        :global(.eagle-feather-2) {
          animation: eagle-feather-fall-2 6s ease-in infinite;
          animation-delay: 1.5s;
        }
        :global(.eagle-feather-3) {
          animation: eagle-feather-fall-3 6s ease-in infinite;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
};

export default TreeBranch;
