"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function CrosshairCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [visible, setVisible] = useState(false);
    const rafRef = useRef<number>(0);
    const posRef = useRef({ x: -100, y: -100 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        posRef.current = { x: e.clientX, y: e.clientY };
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(() => {
                setPos({ ...posRef.current });
                rafRef.current = 0;
            });
        }
    }, []);

    const handleMouseEnter = useCallback(() => setVisible(true), []);
    const handleMouseLeave = useCallback(() => setVisible(false), []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // 初始时检测鼠标是否已在页面内
        setVisible(true);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

    if (!visible) return null;

    return (
        <>
            {/* 隐藏默认光标 */}
            <style>{`* { cursor: none !important; }`}</style>

            {/* ====== 水平参考线 ====== */}
            <div
                className="crosshair-line crosshair-h"
                style={{ top: pos.y }}
            />

            {/* ====== 垂直参考线 ====== */}
            <div
                className="crosshair-line crosshair-v"
                style={{ left: pos.x }}
            />

            {/* ====== 十字准星中心 ====== */}
            <div
                className="crosshair-center"
                style={{
                    left: pos.x,
                    top: pos.y,
                }}
            >
                {/* 纯十字：水平线 + 垂直线 */}
                <span className="crosshair-arm crosshair-arm-h" />
                <span className="crosshair-arm crosshair-arm-v" />
            </div>


        </>
    );
}
