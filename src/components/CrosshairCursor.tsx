'use client';

import { useEffect, useRef } from 'react';

export default function CrosshairCursor() {
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pointerX = -100;
    let pointerY = -100;
    let frameId = 0;

    const setOpacity = (value: string) => {
      if (hLineRef.current) hLineRef.current.style.opacity = value;
      if (vLineRef.current) vLineRef.current.style.opacity = value;
      if (centerRef.current) centerRef.current.style.opacity = value;
    };

    // transform 合成层位移,避免 top/left 逐帧触发布局
    const applyPosition = () => {
      frameId = 0;
      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${pointerY}px, 0)`;
        hLineRef.current.style.opacity = '1';
      }
      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${pointerX}px, 0, 0)`;
        vLineRef.current.style.opacity = '1';
      }
      if (centerRef.current) {
        centerRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
        centerRef.current.style.opacity = '1';
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frameId === 0) {
        frameId = window.requestAnimationFrame(applyPosition);
      }
    };

    const handleMouseEnter = () => setOpacity('1');
    const handleMouseLeave = () => setOpacity('0');

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* ====== 水平参考线 ====== */}
      <div
        ref={hLineRef}
        className="crosshair-line crosshair-h"
        style={{ transform: 'translate3d(0, -100px, 0)' }}
      />

      {/* ====== 垂直参考线 ====== */}
      <div
        ref={vLineRef}
        className="crosshair-line crosshair-v"
        style={{ transform: 'translate3d(-100px, 0, 0)' }}
      />

      {/* ====== 十字准星中心 ====== */}
      <div
        ref={centerRef}
        className="crosshair-center"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      >
        {/* 纯十字:水平线 + 垂直线 */}
        <span className="crosshair-arm crosshair-arm-h" />
        <span className="crosshair-arm crosshair-arm-v" />
      </div>
    </>
  );
}
