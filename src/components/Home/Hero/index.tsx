"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STREAM_URL =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

const HEADLINES = [
  "Precision under pressure",
  "Veteran discipline, developer precision",
];

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headlineVisible, setHeadlineVisible] = useState(true);

  useEffect(() => {
    if (
      HEADLINES.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rotate = setInterval(() => {
      setHeadlineVisible(false);
      setTimeout(() => {
        setHeadlineIndex((index) => (index + 1) % HEADLINES.length);
        setHeadlineVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(rotate);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | undefined;
    let cancelled = false;

    const setup = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = STREAM_URL;
        return;
      }

      const { default: Hls } = await import("hls.js");
      if (cancelled) return;

      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: false });
        hls.loadSource(STREAM_URL);
        hls.attachMedia(video);
      }
    };

    setup();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#070b0a]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#070b0a_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#070b0a_0%,transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-y-0 left-1/4 w-px bg-white/10" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-white/10" />
      </div>

      <svg
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        width="1100"
        height="500"
        viewBox="0 0 1100 500"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="25" />
          </filter>
          <radialGradient id="heroGlowColor" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#5ed29c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="550"
          cy="120"
          rx="420"
          ry="160"
          fill="url(#heroGlowColor)"
          filter="url(#heroGlow)"
        />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-start justify-center px-6 pt-32 lg:px-10 lg:pt-40">
        <div className="liquid-glass flex h-[200px] w-[200px] translate-y-[-50px] flex-col justify-between rounded-2xl p-4">
          <span className="text-sm text-white/70">[ 2026 ]</span>
          <div className="flex flex-col gap-1.5">
            <p className="text-[18px] leading-[1.3] text-white">
              Built on <em className="italic">Military</em> discipline
            </p>
            <p className="text-[11px] leading-snug text-white/50">
              U.S. Army veteran turned full-stack developer. Active Secret
              clearance.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5ed29c]/40 bg-[#5ed29c]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5ed29c]">
          <ShieldCheck size={13} />
          Active Secret Clearance
        </span>

        <h1 className="mt-3 max-w-4xl text-[40px] font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-[52px] lg:text-[72px]">
          <span
            className={`inline transition-opacity duration-300 ${
              headlineVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {HEADLINES[headlineIndex]}
          </span>
          <span className="text-[#5ed29c]">.</span>
        </h1>

        <p className="mt-5 max-w-[512px] text-sm leading-relaxed text-white/70">
          Full-stack developer with a U.S. Army background in systems,
          logistics, and hands-on troubleshooting. React, JavaScript, and
          MySQL, shipped with the same discipline that kept a zero-incident
          record in the field.
        </p>

        <a
          href="#contact"
          className="motion-safe:hover:-translate-y-0.5 mt-8 inline-flex items-center gap-2 rounded-full bg-[#5ed29c] px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#070b0a] transition-transform duration-200"
        >
          Contact Me
          <ArrowRight size={16} />
        </a>
      </div>

      <style jsx>{`
        .liquid-glass {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @media (prefers-reduced-transparency: reduce) {
          .liquid-glass {
            background: rgba(7, 11, 10, 0.92);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
