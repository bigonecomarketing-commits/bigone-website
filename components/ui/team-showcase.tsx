'use client';

import { useState, useEffect, useRef } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  { id: '1',  name: 'Murod Naimov',          role: 'CEO & Founder',           image: '/team/murod-naimov.jpg'         },
  { id: '2',  name: 'MuhammadAli',            role: 'Co-owner',                image: '/team/muhammadali.jpg'          },
  { id: '3',  name: "Khayrullayev Ulug'bek",  role: 'Ads Manager',             image: '/team/khayrullayev-ulugbek.jpg' },
  { id: '4',  name: 'Zayniddinov Javokhir',   role: 'Chief Marketing Officer', image: '/team/zayniddinov-javokhir.jpg' },
  { id: '5',  name: 'Qobiljonov Abdulaziz',   role: 'SMM Manager',             image: '/team/abdulaziz.jpg'            },
  { id: '6',  name: 'Jumaboyev Otabek',        role: 'Video Editor',            image: '/team/jumaboyev-otabek.jpg'     },
  { id: '7',  name: 'Ashuraliyev Sardorbek',  role: 'Graphic Designer',        image: '/team/sardorbek.jpg'            },
  { id: '8',  name: "G'aniyev Diyorbek",      role: 'Videographer',            image: '/team/ganiyev-diyorbek.jpg'     },
  { id: '9',  name: 'Jack',                   role: 'Film Maker',              image: '/team/jack.jpg'                 },
  { id: '10', name: 'Mahmudov Mirshod',        role: 'Graphic Designer',        image: '/team/mirshod.jpg'              },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [compact, setCompact] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      setCompact(entries[0].contentRect.width < 640);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  const photoColW  = compact ? 50  : 110;
  const colGap     = compact ? 5   : 12;
  const col2Top    = compact ? 32  : 68;
  const col3Top    = compact ? 16  : 32;
  const wrapGap    = compact ? 8   : 40;
  const wrapPad    = compact ? '4px 0' : '32px 40px';
  const namesGap   = compact ? 8   : 20;

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        userSelect: 'none',
        width: '100%',
        gap: wrapGap,
        padding: wrapPad,
        maxWidth: compact ? undefined : '64rem',
        margin: compact ? undefined : '0 auto',
      }}
    >
      {/* Left: staggered photo columns */}
      <div style={{ display: 'flex', flexShrink: 0, gap: colGap, overflow: 'visible', padding: compact ? 4 : 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: colGap, width: photoColW }}>
          {col1.map(m => <PhotoCard key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} compact={compact} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: colGap, width: photoColW, marginTop: col2Top }}>
          {col2.map(m => <PhotoCard key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} compact={compact} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: colGap, width: photoColW, marginTop: col3Top }}>
          {col3.map(m => <PhotoCard key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} compact={compact} />)}
        </div>
      </div>

      {/* Right: name list */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, gap: namesGap, paddingTop: compact ? 2 : 8 }}>
        {members.map(m => <MemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} compact={compact} />)}
      </div>
    </div>
  );
}

function PhotoCard({ member, hoveredId, onHover, compact }: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  compact: boolean;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className="team-card"
      style={{
        flexShrink: 0,
        cursor: 'pointer',
        position: 'relative',
        zIndex: isActive ? 50 : 1,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, filter 0.3s ease',
        transform: isActive ? `scale(${compact ? 1.5 : 1.75})` : isDimmed ? 'scale(0.96)' : 'scale(1)',
        opacity: isDimmed ? 0.45 : 1,
        filter: isDimmed ? 'blur(2px)' : 'none',
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: compact ? 6 : 12,
          boxShadow: isActive
            ? '0 24px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%',
            display: 'block',
            transition: 'filter 0.4s ease',
            filter: isActive ? 'grayscale(0) brightness(1.05)' : 'grayscale(1) brightness(0.7)',
          }}
        />
      </div>
    </div>
  );
}

function MemberRow({ member, hoveredId, onHover, compact }: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  compact: boolean;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  const baseName  = compact ? 10  : 17;
  const activeName = compact ? 12 : 20;
  const baseRole  = compact ? 6   : 9;
  const activeRole = compact ? 7  : 11;

  return (
    <div
      style={{
        cursor: 'pointer',
        transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
        opacity: isDimmed ? 0.3 : 1,
        transform: isActive ? 'scale(1.04) translateX(3px)' : 'scale(1) translateX(0px)',
        filter: isDimmed ? 'blur(0.5px)' : 'none',
        transformOrigin: 'left center',
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 10 }}>
        <span
          style={{
            display: 'block',
            flexShrink: 0,
            borderRadius: compact ? 3 : 5,
            background: '#000',
            height: isActive ? (compact ? 9 : 14) : (compact ? 7 : 12),
            width:  isActive ? (compact ? 13 : 22) : (compact ? 9 : 16),
            opacity: isActive ? 1 : 0.25,
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        />
        <span
          style={{
            fontSize: isActive ? activeName : baseName,
            fontWeight: isActive ? 700 : 600,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: isActive ? '#000' : 'rgba(0,0,0,0.75)',
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {member.name}
        </span>
      </div>
      <p
        style={{
          marginTop: compact ? 2 : 6,
          paddingLeft: isActive ? (compact ? 18 : 32) : (compact ? 14 : 27),
          fontSize: isActive ? activeRole : baseRole,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: isActive ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)',
          transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          margin: 0,
        }}
      >
        {member.role}
      </p>
    </div>
  );
}
