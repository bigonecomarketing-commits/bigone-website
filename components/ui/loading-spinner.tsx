"use client";

export default function LoadingSpinner({ size = 160 }: { size?: number }) {
  const sz = size;
  const ballSz = Math.round(sz * 0.1375); // ~22px at 160
  const trackInset = sz * 0.18;
  const innerInset = sz * 0.14;
  const ballTop = sz * 0.09 - ballSz / 2;
  const ballLeft = sz / 2 - ballSz / 2;
  const transformOrigin = `50% ${sz / 2 - sz * 0.09 + ballSz / 2}px`;

  return (
    <>
      <style>{`
        @keyframes pl-rotate       { to { transform: rotate(360deg);  } }
        @keyframes pl-ball-counter { to { transform: rotate(-360deg); } }
      `}</style>

      {/* Outer ring wrapper — rotates */}
      <div style={{
        position: "relative",
        width: sz,
        height: sz,
        animation: "pl-rotate 1.5s linear infinite",
      }}>

        {/* Outer ring */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #dde0e8 0%, #f2f4f8 50%, #dde0e8 100%)",
          boxShadow: `0 8px 24px rgba(0,0,0,0.12), inset -4px -4px 8px rgba(255,255,255,0.9), inset 4px 4px 8px rgba(0,0,0,0.12)`,
        }} />

        {/* Inner depth ring */}
        <div style={{
          position: "absolute",
          inset: innerInset,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,0,0,0.06)",
        }} />

        {/* Track cover — matches page background to create groove */}
        <div style={{
          position: "absolute",
          inset: trackInset,
          borderRadius: "50%",
          background: "#e8eaf0",
          boxShadow: "inset -3px -3px 6px rgba(255,255,255,0.85), inset 3px 3px 6px rgba(0,0,0,0.10)",
        }} />

        {/* Ball — counter-rotates to stay upright */}
        <div style={{
          position: "absolute",
          width: ballSz,
          height: ballSz,
          top: ballTop,
          left: ballLeft,
          transformOrigin,
          animation: "pl-ball-counter 1.5s linear infinite",
        }}>
          {/* Base texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(230,232,238,0.85) 35%, rgba(200,203,212,0.95) 75%, rgba(180,183,194,1) 100%)",
          }} />
          {/* Drop shadow */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)",
          }} />
          {/* Inner shading */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 60% 65%, rgba(0,0,0,0.08) 0%, transparent 60%)",
          }} />
          {/* Rim shadow */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.10)",
          }} />
        </div>
      </div>
    </>
  );
}
