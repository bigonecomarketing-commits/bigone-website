"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2600);
    const hideTimer = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 40,
      background: "#0a0a0c",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: fadeOut ? "none" : "auto",
    }}>
      <style>{`
        @keyframes logo-in {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.04) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes box-in {
          0%   { transform: scaleX(0); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes box-pulse {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 1; }
        }
        .loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .loader-logo {
          animation: logo-in 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
        }
        .loader-bars {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: center;
        }
        .loader-bar {
          height: 2px;
          border-radius: 99px;
          background: #fff;
          transform-origin: left center;
        }
        .loader-bar:nth-child(1) { width: 22px; animation: box-in 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.55s both, box-pulse 1.4s ease-in-out 1.1s infinite; }
        .loader-bar:nth-child(2) { width: 14px; animation: box-in 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.70s both, box-pulse 1.4s ease-in-out 1.26s infinite; }
        .loader-bar:nth-child(3) { width: 18px; animation: box-in 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.85s both, box-pulse 1.4s ease-in-out 1.42s infinite; }
        .loader-bar:nth-child(4) { width: 10px; animation: box-in 0.45s cubic-bezier(0.34,1.56,0.64,1) 1.00s both, box-pulse 1.4s ease-in-out 1.58s infinite; }
      `}</style>

      <div className="loader-wrap">
        {/* Logo — BO */}
        <div className="loader-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 28"
            width={120}
            height={28}
          >
            <text
              fill="white"
              x="7"
              y="22"
              fontSize="22"
              fontWeight="300"
              fontFamily="Arial, Helvetica, sans-serif"
              letterSpacing="1"
            >bigone.co</text>
          </svg>
        </div>

        {/* Animated bars */}
        <div className="loader-bars">
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
        </div>
      </div>

    </div>
  );
}
