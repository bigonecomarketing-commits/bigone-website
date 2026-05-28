"use client";
import React from 'react';

const Loader = () => {
  const loaderCss = `
    .loader {
      --duration: 3s;
      --primary: rgba(0, 0, 0, 1);
      --primary-light: #333333;
      --primary-rgba: rgba(0, 0, 0, 0);
      width: 200px;
      height: 320px;
      position: relative;
      perspective: 800px;
      transform-style: preserve-3d;
    }
    @media (prefers-reduced-motion) {
      .loader { --duration: 0; }
    }
    .loader:before, .loader:after {
      --r: 20.5deg;
      content: '';
      width: 320px;
      height: 140px;
      position: absolute;
      right: 32%;
      bottom: -11px;
      background: #e5e7eb;
      transform: translateZ(200px) rotate(var(--r));
      animation: ground var(--duration) linear infinite;
      backface-visibility: hidden;
    }
    .loader:after {
      --r: -20.5deg;
      right: auto;
      left: 32%;
    }
    .box {
      --b: calc(var(--duration) / 2);
      width: 48px;
      height: 48px;
      position: absolute;
      transform-style: preserve-3d;
      animation: box-jump var(--duration) linear infinite;
    }
    .box:before, .box:after {
      --rx: 0deg;
      --ry: 0deg;
      --x: 0;
      --y: 0;
      --z: 0;
      content: '';
      width: 100%;
      height: 100%;
      background: var(--primary);
      position: absolute;
      transform: rotateX(var(--rx)) rotateY(var(--ry)) translate3d(var(--x), var(--y), var(--z));
    }
    .box0  { animation: box-move0  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box1  { animation: box-move1  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box2  { animation: box-move2  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box3  { animation: box-move3  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box4  { animation: box-move4  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box5  { animation: box-move5  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box6  { animation: box-move6  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }
    .box7  { animation: box-move7  var(--duration) linear infinite, box-jump var(--duration) linear infinite; }

    .box div {
      width: 48px;
      height: 48px;
      background: var(--primary);
      position: absolute;
      transform-style: preserve-3d;
    }
    .box div:before, .box div:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .box div:before {
      background: var(--primary-light);
      transform: rotateY(-90deg) translateX(-100%);
      transform-origin: 0 0;
    }
    .box div:after {
      background: var(--primary);
      transform: rotateX(90deg) translateY(-100%);
      transform-origin: 0 0;
    }

    @keyframes box-move0 {
      12% { transform: translate(0, -32px); }
      25%, 52% { transform: translate(48px, -32px); }
      60% { transform: translate(48px, -32px); }
      67%, 100% { transform: translate(96px, -32px); }
    }
    @keyframes box-move1 {
      12% { transform: translate(0, -32px); }
      25%, 52% { transform: translate(-48px, -32px); }
      60% { transform: translate(-48px, -32px); }
      67%, 100% { transform: translate(-96px, -32px); }
    }
    @keyframes box-move2 {
      0%, 40% { transform: translate(0, 0); }
      50% { transform: translate(48px, 0); }
      60% { transform: translate(48px, -48px); }
      70%, 100% { transform: translate(96px, -48px); }
    }
    @keyframes box-move3 {
      0%, 40% { transform: translate(0, 0); }
      50% { transform: translate(-48px, 0); }
      60% { transform: translate(-48px, -48px); }
      70%, 100% { transform: translate(-96px, -48px); }
    }
    @keyframes box-move4 {
      0%, 30% { transform: translate(0, 0); }
      40% { transform: translate(48px, 0); }
      50% { transform: translate(48px, -48px); }
      60% { transform: translate(96px, -48px); }
      70%, 100% { transform: translate(96px, -96px); }
    }
    @keyframes box-move5 {
      0%, 30% { transform: translate(0, 0); }
      40% { transform: translate(-48px, 0); }
      50% { transform: translate(-48px, -48px); }
      60% { transform: translate(-96px, -48px); }
      70%, 100% { transform: translate(-96px, -96px); }
    }
    @keyframes box-move6 {
      0%, 20% { transform: translate(0, 0); }
      30% { transform: translate(48px, 0); }
      40% { transform: translate(48px, -48px); }
      50% { transform: translate(96px, -48px); }
      60% { transform: translate(96px, -96px); }
      70%, 100% { transform: translate(144px, -96px); }
    }
    @keyframes box-move7 {
      0%, 20% { transform: translate(0, 0); }
      30% { transform: translate(-48px, 0); }
      40% { transform: translate(-48px, -48px); }
      50% { transform: translate(-96px, -48px); }
      60% { transform: translate(-96px, -96px); }
      70%, 100% { transform: translate(-144px, -96px); }
    }

    @keyframes box-jump {
      0%, 100% { transform: translateY(0px) translateZ(0px); }
      12%, 88% { transform: translateY(-12px) translateZ(0px); }
    }

    @keyframes ground {
      0%, 65% { transform: translateZ(200px) rotate(var(--r)); }
      72%, 100% { transform: translateZ(0px) rotate(var(--r)); }
    }

    .ground {
      width: 200px;
      height: 64px;
      position: absolute;
      bottom: 16px;
      left: 0;
      transform-style: preserve-3d;
    }
    .ground div {
      width: 200px;
      height: 64px;
      background: var(--primary);
      position: absolute;
      transform-style: preserve-3d;
    }
    .ground div:before, .ground div:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .ground div:before {
      background: var(--primary-light);
      transform: rotateY(-90deg) translateX(-100%);
      transform-origin: 0 0;
    }
    .ground div:after {
      background: var(--primary);
      transform: rotateX(90deg) translateY(-100%);
      transform-origin: 0 0;
    }
  `;

  const boxes = Array.from({ length: 8 }, (_, i) => i);

  return (
    <>
      <style>{loaderCss}</style>
      <div className="loader">
        {boxes.map(i => (
          <div key={i} className={`box box${i}`}>
            <div></div>
          </div>
        ))}
        <div className="ground">
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
