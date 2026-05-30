"use client";

import Image from "next/image";

const LOGOS = [
  { src: "/clients/brilliant.png",   alt: "Brilliant Solutions"  },
  { src: "/clients/samcity.png",     alt: "Samcity"              },
  { src: "/clients/ptg.png",         alt: "PTG"                  },
  { src: "/clients/karahan.png",     alt: "Karahan"              },
  { src: "/clients/iso.png",         alt: "ISO"                  },
  { src: "/clients/zemi.png",        alt: "Zemi Express"         },
  { src: "/clients/seven-group.png", alt: "Seven Group"          },
  { src: "/clients/aka-kargo.png",   alt: "Aka Kargo"            },
  { src: "/clients/versal.png",      alt: "Versal"               },
  { src: "/clients/rtl.png",         alt: "RTL"                  },
  { src: "/clients/cte.png",         alt: "CTE"                  },
  { src: "/clients/new.png",         alt: "New"                  },
];

/* Double for seamless loop */
const TRACK = [...LOGOS, ...LOGOS];

export default function Clients() {
  return (
    <section
      id="clients"
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "96px 0 0 0",
      }}
    >
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 64, padding: "0 24px" }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 14,
          }}>
            Trusted by
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.5vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--black)",
            margin: 0,
          }}>
            Companies we&apos;ve grown.
          </h2>
        </div>

        {/* Infinite scroll strip */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Edge fades */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 180, zIndex: 2,
            background: "linear-gradient(to right, #ffffff 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 180, zIndex: 2,
            background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          <div style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            animation: "clients-scroll 36s linear infinite",
          }}>
            {TRACK.map((logo, i) => (
              <div
                key={i}
                className="client-logo-wrap"
                style={{
                  flexShrink: 0,
                  padding: "0 48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={300}
                  height={96}
                  className="client-logo"
                  style={{
                    height: 48,
                    width: "auto",
                    maxWidth: 220,
                    minWidth: 60,
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Instagram fan */}
        <div style={{ display: "flex", justifyContent: "center", padding: "64px 24px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            {[
              { src: "/instagram/sevengroup.jpg",   rot: "-7deg"  },
              { src: "/instagram/brilliant.jpg",    rot: "4deg"   },
              { src: "/instagram/samcity.jpg",      rot: "-3deg"  },
              { src: "/instagram/ctelog.jpg",       rot: "5deg"   },
              { src: "/instagram/mgb.jpg",          rot: "-4deg"  },
              { src: "/instagram/akacargo.jpg",     rot: "3deg"   },
              { src: "/instagram/karahan.jpg",      rot: "-5deg"  },
              { src: "/instagram/supportpro.jpg",   rot: "2deg"   },
              { src: "/instagram/ptg.jpg",          rot: "-3deg"  },
              { src: "/instagram/emdcargo.jpg",     rot: "4deg"   },
              { src: "/instagram/neweldworld.jpg",  rot: "-6deg"  },
              { src: "/instagram/21trucking.jpg",   rot: "3deg"   },
            ].map(({ src, rot }, i) => (
              <div
                key={i}
                className="insta-card"
                style={{
                  flexShrink: 0,
                  width: 190,
                  marginLeft: i === 0 ? 0 : -65,
                  zIndex: i + 1,
                  transform: `rotate(${rot})`,
                  cursor: "pointer",
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 8,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
                }}
              >
                <img
                  src={src}
                  alt="Instagram"
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    borderRadius: 10,
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes clients-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes instagram-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .client-logo {
          filter: grayscale(1);
          opacity: 0.45;
          transition: filter 0.35s ease, opacity 0.35s ease;
        }

        .client-logo-wrap:hover .client-logo {
          filter: grayscale(0);
          opacity: 1;
        }

        .insta-card:hover {
          transform: rotate(0deg) scale(1.12) translateY(-12px) !important;
          box-shadow: 0 24px 56px rgba(0,0,0,0.22), 0 6px 16px rgba(0,0,0,0.12) !important;
          z-index: 99 !important;
        }
      `}</style>
    </section>
  );
}
