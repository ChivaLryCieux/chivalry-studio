'use client';

import { useEffect, useRef } from 'react';

export default function CrosshairCursor() {
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setOpacity = (value: string) => {
      if (hLineRef.current) hLineRef.current.style.opacity = value;
      if (vLineRef.current) vLineRef.current.style.opacity = value;
      if (centerRef.current) centerRef.current.style.opacity = value;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (hLineRef.current) {
        hLineRef.current.style.top = `${y}px`;
        hLineRef.current.style.opacity = '1';
      }
      if (vLineRef.current) {
        vLineRef.current.style.left = `${x}px`;
        vLineRef.current.style.opacity = '1';
      }
      if (centerRef.current) {
        centerRef.current.style.left = `${x}px`;
        centerRef.current.style.top = `${y}px`;
        centerRef.current.style.opacity = '1';
      }
    };

    const handleMouseEnter = () => setOpacity('1');
    const handleMouseLeave = () => setOpacity('0');

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 仅在支持鼠标且具备细粒度指针的设备上隐藏默认光标 */}
      <style>{`@media (hover: hover) and (pointer: fine) { * { cursor: none !important; } }`}</style>

      {/* ====== 水平参考线 ====== */}
      <div ref={hLineRef} className="crosshair-line crosshair-h" style={{ top: -100 }} />

      {/* ====== 垂直参考线 ====== */}
      <div ref={vLineRef} className="crosshair-line crosshair-v" style={{ left: -100 }} />

      {/* ====== 十字准星中心 ====== */}
      <div ref={centerRef} className="crosshair-center" style={{ left: -100, top: -100 }}>
        {/* 纯十字：水平线 + 垂直线 */}
        <span className="crosshair-arm crosshair-arm-h" />
        <span className="crosshair-arm crosshair-arm-v" />
      </div>
    </>
  );
}
