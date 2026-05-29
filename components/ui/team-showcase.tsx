'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

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

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <>
      {/* ── MOBILE layout: compact 2-col grid (photo + name) ── */}
      <div className="team-mobile grid grid-cols-2 gap-x-3 gap-y-4 w-full md:hidden">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-2.5">
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: 44, height: 52, borderRadius: 8,
                objectFit: 'cover', objectPosition: 'top',
                filter: 'grayscale(1) brightness(0.75)',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.02em', color: '#0a0a0a', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {member.name}
              </p>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 3 }}>
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP layout: original staggered grid ── */}
      <div className="hidden md:flex flex-row items-start gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8 px-10">
        {/* Left: photo grid */}
        <div className="flex gap-3 flex-shrink-0" style={{ overflow: 'visible', padding: '12px' }}>
          <div className="team-col-1 flex flex-col gap-3" style={{ overflow: 'visible' }}>
            {col1.map((member) => (
              <PhotoCard key={member.id} member={member} className="team-card" hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>
          <div className="team-col-2 flex flex-col gap-3 mt-[68px]" style={{ overflow: 'visible' }}>
            {col2.map((member) => (
              <PhotoCard key={member.id} member={member} className="team-card" hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>
          <div className="team-col-3 flex flex-col gap-3 mt-[32px]" style={{ overflow: 'visible' }}>
            {col3.map((member) => (
              <PhotoCard key={member.id} member={member} className="team-card" hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </div>
        </div>
        {/* Right: name list */}
        <div className="flex flex-col gap-5 pt-2 flex-1">
          {members.map((member) => (
            <MemberRow key={member.id} member={member} hoveredId={hoveredId} onHover={setHoveredId} />
          ))}
        </div>
      </div>
    </>
  );
}

function PhotoCard({ member, className, hoveredId, onHover }: {
  member: TeamMember; className: string; hoveredId: string | null; onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn('flex-shrink-0 cursor-pointer', className)}
      style={{
        position: 'relative',
        zIndex: isActive ? 50 : 1,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, filter 0.3s ease',
        transform: isActive ? 'scale(1.75)' : isDimmed ? 'scale(0.96)' : 'scale(1)',
        opacity: isDimmed ? 0.45 : 1,
        filter: isDimmed ? 'blur(2.5px)' : 'none',
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className="relative rounded-xl w-full overflow-hidden"
        style={{
          boxShadow: isActive
            ? '0 24px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full block"
          style={{
            transition: 'filter 0.4s ease',
            filter: isActive ? 'grayscale(0) brightness(1.05)' : 'grayscale(1) brightness(0.7)',
          }}
        />
      </div>
    </div>
  );
}

function MemberRow({ member, hoveredId, onHover }: {
  member: TeamMember; hoveredId: string | null; onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  return (
    <div
      className="cursor-pointer"
      style={{
        transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
        opacity: isDimmed ? 0.3 : 1,
        transform: isActive ? 'scale(1.06) translateX(6px)' : 'scale(1) translateX(0px)',
        filter: isDimmed ? 'blur(0.5px)' : 'none',
        transformOrigin: 'left center',
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="rounded-[5px] flex-shrink-0 bg-black"
          style={{
            height: isActive ? '14px' : '12px',
            width: isActive ? '22px' : '16px',
            opacity: isActive ? 1 : 0.25,
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        />
        <span
          style={{
            fontSize: isActive ? '20px' : '17px',
            fontWeight: isActive ? 700 : 600,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: isActive ? '#000000' : 'rgba(0,0,0,0.75)',
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {member.name}
        </span>
      </div>
      <p
        style={{
          marginTop: 6,
          paddingLeft: isActive ? '32px' : '27px',
          fontSize: isActive ? '11px' : '9px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: isActive ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)',
          transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {member.role}
      </p>
    </div>
  );
}
