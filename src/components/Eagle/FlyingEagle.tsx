"use client";

import { useEffect } from "react";
import { useEagle } from "./EagleContext";

const FlyingEagle = () => {
  const { state, flightId, completeLanding } = useEagle();

  useEffect(() => {
    if (
      state === "flying" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      completeLanding();
    }
  }, [state, flightId, completeLanding]);

  if (state !== "flying") {
    return null;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <div
      key={flightId}
      className="eagle-flyer pointer-events-none absolute z-20 h-12 w-[72px]"
      onAnimationEnd={completeLanding}
    >
      <svg
        className="eagle-frame-a absolute inset-0"
        width="72"
        height="48"
        viewBox="0 0 32 18"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="4" height="1" fill="#e8e8e8" />
        <rect x="0" y="8" width="6" height="2" fill="#e8e8e8" />
        <rect x="2" y="10" width="4" height="1" fill="#e8e8e8" />
        <rect x="8" y="6" width="11" height="1" fill="#3b82c4" />
        <rect x="6" y="5" width="11" height="1" fill="#3b82c4" />
        <rect x="4" y="4" width="11" height="1" fill="#2c5e91" />
        <rect x="2" y="3" width="11" height="1" fill="#2c5e91" />
        <rect x="0" y="2" width="11" height="1" fill="#c0392b" />
        <rect x="0" y="1" width="9" height="1" fill="#c0392b" />
        <rect x="0" y="0" width="7" height="1" fill="#c0392b" />
        <rect x="8" y="11" width="11" height="1" fill="#3b82c4" />
        <rect x="6" y="12" width="11" height="1" fill="#3b82c4" />
        <rect x="4" y="13" width="11" height="1" fill="#2c5e91" />
        <rect x="2" y="14" width="11" height="1" fill="#2c5e91" />
        <rect x="0" y="15" width="11" height="1" fill="#c0392b" />
        <rect x="0" y="16" width="9" height="1" fill="#c0392b" />
        <rect x="0" y="17" width="7" height="1" fill="#c0392b" />
        <rect x="5" y="7" width="15" height="1" fill="#1e3a5f" />
        <rect x="5" y="8" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="9" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="10" width="15" height="1" fill="#1e3a5f" />
        <rect x="20" y="7" width="7" height="1" fill="#ffffff" />
        <rect x="20" y="8" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="9" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="10" width="7" height="1" fill="#ffffff" />
        <rect x="23" y="8" width="1" height="1" fill="#111111" />
        <rect x="27" y="8" width="3" height="1" fill="#f2c94c" />
        <rect x="27" y="9" width="3" height="1" fill="#e0a92e" />
      </svg>
      <svg
        className="eagle-frame-b absolute inset-0"
        width="72"
        height="48"
        viewBox="0 0 32 14"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="4" height="1" fill="#e8e8e8" />
        <rect x="0" y="7" width="6" height="2" fill="#e8e8e8" />
        <rect x="2" y="9" width="4" height="1" fill="#e8e8e8" />
        <rect x="9" y="5" width="10" height="1" fill="#3b82c4" />
        <rect x="7" y="4" width="10" height="1" fill="#3b82c4" />
        <rect x="5" y="3" width="10" height="1" fill="#2c5e91" />
        <rect x="3" y="2" width="10" height="1" fill="#2c5e91" />
        <rect x="2" y="1" width="9" height="1" fill="#c0392b" />
        <rect x="1" y="0" width="8" height="1" fill="#c0392b" />
        <rect x="7" y="7" width="8" height="1" fill="#2c5e91" />
        <rect x="6" y="8" width="7" height="1" fill="#1e3a5f" />
        <rect x="5" y="6" width="15" height="1" fill="#1e3a5f" />
        <rect x="5" y="7" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="8" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="9" width="15" height="1" fill="#1e3a5f" />
        <rect x="20" y="6" width="7" height="1" fill="#ffffff" />
        <rect x="20" y="7" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="8" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="9" width="7" height="1" fill="#ffffff" />
        <rect x="23" y="7" width="1" height="1" fill="#111111" />
        <rect x="27" y="7" width="3" height="1" fill="#f2c94c" />
        <rect x="27" y="8" width="3" height="1" fill="#e0a92e" />
      </svg>

      <style jsx>{`
        @keyframes eagle-flight {
          0% {
            left: -14%;
            top: 82%;
            transform: scale(0.8) rotate(-6deg);
          }
          26% {
            top: 92%;
            transform: scale(0.85) rotate(4deg);
          }
          50% {
            left: 30%;
            top: 60%;
            transform: scale(0.95) rotate(-4deg);
          }
          74% {
            left: 62%;
            top: 20%;
            transform: scale(1) rotate(6deg);
          }
          91% {
            left: calc(100% - 210px);
            top: 180px;
            transform: scale(1) rotate(-2deg);
          }
          100% {
            left: calc(100% - 199px);
            top: 164px;
            transform: scale(1) rotate(0deg);
          }
        }
        :global(.eagle-flyer) {
          animation: eagle-flight 4.6s ease-in-out 1 forwards;
        }
        @keyframes eagle-frame-toggle {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-frame-a) {
          animation: eagle-frame-toggle 0.3s steps(1) infinite;
        }
        :global(.eagle-frame-b) {
          animation: eagle-frame-toggle 0.3s steps(1) infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default FlyingEagle;
