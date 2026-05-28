"use client";
import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    _ytAPICallbacks: (() => void)[];
  }
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    if (window.YT?.Player) { resolve(); return; }
    if (!window._ytAPICallbacks) window._ytAPICallbacks = [];
    window._ytAPICallbacks.push(resolve);
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) return;
    window.onYouTubeIframeAPIReady = () => window._ytAPICallbacks?.forEach(cb => cb());
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
}

const VIDEOS = [
  { name: "Karahan Logistics LLC", handle: "@karahan.logistics",    followers: "1,252", youtubeId: "A46Im-0ekgI", accent: "#3b5bdb" },
  { name: "Brilliant Solutions",   handle: "@brilliant_solutionss", followers: "1,269", youtubeId: "cpTmuqWSr6c", accent: "#e67700" },
  { name: "Samcity Express",       handle: "@samcity_express.inc",  followers: "441",   youtubeId: null,          accent: "#2f9e44" },
  { name: "CTE-Log Group",         handle: "@ctelog_group",         followers: "899",   youtubeId: null,          accent: "#c92a2a" },
  { name: "The Support Pro",       handle: "@the_supportpro",       followers: "1,457", youtubeId: null,          accent: "#7048e8" },
];

/** Styled dark thumbnail — matches site aesthetic, full 9:16 portrait */
function StyledThumb({ video }: { video: typeof VIDEOS[0] }) {
  const initials = video.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(160deg, #111114 0%, #1a1a20 60%, ${video.accent}22 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {/* Glow blob */}
      <div style={{
        position: "absolute",
        width: 200, height: 200,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${video.accent}33 0%, transparent 70%)`,
        top: "30%", left: "50%", transform: "translate(-50%, -50%)",
      }} />
      {/* Monogram */}
      <div style={{
        position: "relative",
        width: 80, height: 80, borderRadius: 20,
        background: `${video.accent}22`,
        border: `1.5px solid ${video.accent}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
        backdropFilter: "blur(8px)",
      }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 28, color: video.accent, letterSpacing: "-0.02em",
        }}>{initials}</span>
      </div>
      {/* Company name */}
      <p style={{
        position: "relative",
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: 15, color: "#fff", letterSpacing: "-0.02em",
        textAlign: "center", padding: "0 20px", margin: 0, lineHeight: 1.3,
      }}>{video.name}</p>
      <p style={{
        position: "relative",
        fontSize: 11, color: "rgba(255,255,255,0.4)",
        margin: "6px 0 0", fontWeight: 500,
      }}>{video.handle}</p>
      {/* "Coming soon" badge */}
      <div style={{
        position: "relative",
        marginTop: 24,
        padding: "5px 12px", borderRadius: 20,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Video coming soon
        </span>
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [activated, setActivated] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const initPlayer = useCallback(() => {
    if (!video.youtubeId || !containerRef.current) return;
    loadYouTubeAPI().then(() => {
      const div = document.createElement("div");
      div.className = `yt-wrap-${video.youtubeId}`;
      div.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      containerRef.current!.appendChild(div);
      playerRef.current = new window.YT.Player(div, {
        videoId: video.youtubeId!,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => { setReady(true); playerRef.current.playVideo(); },
          onStateChange: (e: any) => setPlaying(e.data === window.YT.PlayerState.PLAYING),
        },
      });
    });
  }, [video.youtubeId]);

  const handleClick = () => {
    if (!video.youtubeId) return;
    if (!activated) { setActivated(true); initPlayer(); return; }
    if (!ready) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  useEffect(() => () => { playerRef.current?.destroy(); }, []);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        cursor: video.youtubeId ? "pointer" : "default",
        background: "#111114",
        aspectRatio: "9/16",
        boxShadow: "none",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
      }}
      className={video.youtubeId ? "video-review-card" : ""}
    >
      {/* YouTube iframe — oversize to clip Shorts UI bars (top nav + bottom actions) */}
      {video.youtubeId && (
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            top: "-25%", left: 0,
            width: "100%", height: "150%",
            zIndex: 1,
            opacity: activated ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        >
          <style>{`
            .yt-wrap-${video.youtubeId},
            .yt-wrap-${video.youtubeId} iframe {
              width: 100% !important;
              height: 100% !important;
              position: absolute !important;
              top: 0 !important; left: 0 !important;
              border: none !important;
              pointer-events: none !important;
            }
          `}</style>
        </div>
      )}

      {/* Black mask bars — cover any YouTube UI that bleeds through top/bottom */}
      {video.youtubeId && (
        <>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "12%", zIndex: 6, background: "#111114",
            opacity: activated ? 1 : 0, transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "18%", zIndex: 6, background: "#111114",
            opacity: activated ? 1 : 0, transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }} />
        </>
      )}

      {/* Transparent click blocker above iframe */}
      {video.youtubeId && activated && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 8,
          background: "transparent", pointerEvents: "all",
        }} onClick={handleClick} />
      )}

      {/* Styled thumbnail — always behind, fades out when video activates */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        opacity: activated ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}>
        <StyledThumb video={video} />
      </div>

      {/* Bottom gradient over thumbnail */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
        opacity: activated ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Play/pause button */}
      {video.youtubeId && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: playing ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: playing
              ? "0 0 0 1px rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
            transition: "all 0.25s ease",
            opacity: playing ? 0.25 : hovered ? 1 : 0,
          }}>
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <rect x="4" y="3" width="5" height="16" rx="2" fill="rgba(255,255,255,0.9)" />
                <rect x="13" y="3" width="5" height="16" rx="2" fill="rgba(255,255,255,0.9)" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M7 4l13 7-13 7V4z" fill={activated ? "rgba(255,255,255,0.9)" : "#000"} />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Bottom info overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
        padding: "20px",
        opacity: activated ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: 15,
          fontWeight: 700, color: "#fff",
          margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2,
        }}>{video.name}</p>
        <p style={{
          fontSize: 11, color: "rgba(255,255,255,0.55)",
          margin: "4px 0 0", fontWeight: 500,
        }}>{video.handle} · {video.followers} followers</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="resp-section" style={{ background: "var(--white)" }}>
      <div className="resp-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 14 }}>Video Reviews</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 110px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)", margin: 0 }}>
              Real results.<br />Real clients.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--gray-500)", maxWidth: 300, lineHeight: 1.7 }}>
            Logistics companies we've grown from scratch — hear it from them directly.
          </p>
        </div>

        {/* Horizontal scroll row */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            overflowY: "visible",
            paddingBottom: 8,
            paddingTop: 8,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }} className="reels-row">
            {VIDEOS.map((v) => (
              <div key={v.handle} className="reel-card">
                <VideoCard video={v} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reels-row::-webkit-scrollbar { display: none; }
        .reels-row { -ms-overflow-style: none; scrollbar-width: none; }
        .video-review-card { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease; }
        .video-review-card:hover { transform: translateY(-6px) scale(1.02); }
      `}</style>
    </section>
  );
}
