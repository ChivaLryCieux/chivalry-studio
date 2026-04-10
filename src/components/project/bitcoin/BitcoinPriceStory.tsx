"use client";

import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./bitcoin-story.module.css";
import { bitcoinMilestones, satoshiHoldings, type BitcoinPricePoint } from "@/data/bitcoinStory";
import { formatUsdCompact } from "@/lib/numberFormat";

type ScaleMode = "linear" | "log";

interface HoverState {
    point: BitcoinPricePoint & { parsedDate: Date };
    x: number;
    y: number;
}

const parseDate = d3.timeParse("%Y-%m-%d");
const formatDate = d3.timeFormat("%b %d, %Y");
const annotationDates = new Set(["2017-12-17", "2020-03-13", "2021-11-10", "2025-10-06", "2026-03-31"]);

function useContainerWidth<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState(960);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            setWidth(entry.contentRect.width);
        });

        observer.observe(element);
        setWidth(element.getBoundingClientRect().width);

        return () => observer.disconnect();
    }, []);

    return { ref, width };
}

interface BitcoinPriceStoryProps {
    series: BitcoinPricePoint[];
}

export function BitcoinPriceStory({ series }: BitcoinPriceStoryProps) {
    const [mode, setMode] = useState<ScaleMode>("log");
    const [hovered, setHovered] = useState<HoverState | null>(null);
    const { ref, width } = useContainerWidth<HTMLDivElement>();
    const height = 420;
    const margin = { top: 24, right: 18, bottom: 42, left: 18 };
    const innerWidth = Math.max(width - margin.left - margin.right, 240);
    const innerHeight = height - margin.top - margin.bottom;

    const points = useMemo(
        () =>
            series.map((point) => ({
                ...point,
                parsedDate: parseDate(point.date) ?? new Date(`${point.date}T00:00:00Z`),
            })),
        [series]
    );

    const xDomain = d3.extent(points, (point) => point.parsedDate) as [Date, Date];
    const yMax = d3.max(points, (point) => point.high) ?? 70000;

    const xScale = d3.scaleTime(xDomain, [0, innerWidth]);
    const yScale =
        mode === "log"
            ? d3.scaleLog().domain([500, yMax]).range([innerHeight, 0]).nice()
            : d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

    const line = d3
        .line<(typeof points)[number]>()
        .x((point) => xScale(point.parsedDate))
        .y((point) => yScale(Math.max(point.close, mode === "log" ? 500 : 0)))
        .curve(d3.curveCatmullRom.alpha(0.5));

    const area = d3
        .area<(typeof points)[number]>()
        .x((point) => xScale(point.parsedDate))
        .y0(innerHeight)
        .y1((point) => yScale(Math.max(point.close, mode === "log" ? 500 : 0)))
        .curve(d3.curveCatmullRom.alpha(0.5));

    const handlePointerMove = (event: PointerEvent<SVGRectElement>) => {
        const [pointerX] = d3.pointer(event);
        const hoveredDate = xScale.invert(pointerX - margin.left);
        const bisector = d3.bisector<(typeof points)[number], Date>((point) => point.parsedDate).center;
        const index = bisector(points, hoveredDate);
        const point = points[index];

        if (!point) {
            return;
        }

        setHovered({
            point,
            x: xScale(point.parsedDate) + margin.left,
            y: yScale(Math.max(point.close, mode === "log" ? 500 : 0)) + margin.top,
        });
    };

    const archivePeakValue = satoshiHoldings.estimatedCoins * satoshiHoldings.archiveAthPrice;

    return (
        <div className={styles.priceLayout}>
            <div className={styles.chartShell}>
                <div className={styles.chartHeader}>
                    <div>
                        <div className={styles.chartTitle}>Price Repricing Arc</div>
                        <p className={styles.chartSubcopy}>
                            这条曲线使用 Binance 现货归档日线样本，从 2017 年 8 月 17 日上线交易到 2026 年 3 月 31 日。切换线性与对数刻度，可以看到
                            Bitcoin 如何从早期交易所时代一路被重估到 2025 年 10 月高点，再回到 2026 年一季度收盘区间。
                        </p>
                    </div>

                    <div className={styles.chartToggle}>
                        <button
                            type="button"
                            className={mode === "log" ? styles.toggleActive : ""}
                            onClick={() => setMode("log")}
                        >
                            LOG
                        </button>
                        <button
                            type="button"
                            className={mode === "linear" ? styles.toggleActive : ""}
                            onClick={() => setMode("linear")}
                        >
                            LINEAR
                        </button>
                    </div>
                </div>

                <div ref={ref} className={styles.chartFrame}>
                    <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg} role="img" aria-label="Bitcoin price chart">
                        <defs>
                            <linearGradient id="btcArea" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="rgba(240, 162, 41, 0.48)" />
                                <stop offset="100%" stopColor="rgba(240, 162, 41, 0.02)" />
                            </linearGradient>
                        </defs>

                        <g transform={`translate(${margin.left}, ${margin.top})`}>
                            {xScale.ticks(width < 640 ? 4 : 6).map((tick) => (
                                <text
                                    key={tick.toISOString()}
                                    x={xScale(tick)}
                                    y={innerHeight + 24}
                                    fill="rgba(245,239,230,0.48)"
                                    fontSize="11"
                                    textAnchor="middle"
                                >
                                    {d3.timeFormat("%Y")(tick)}
                                </text>
                            ))}

                            <path d={area(points) ?? ""} fill="url(#btcArea)" />
                            <path
                                d={line(points) ?? ""}
                                fill="none"
                                stroke="rgba(240, 162, 41, 0.98)"
                                strokeWidth={3}
                                strokeLinecap="round"
                            />

                            {points
                                .filter((point) => annotationDates.has(point.date))
                                .map((point) => (
                                    <g key={point.date} transform={`translate(${xScale(point.parsedDate)}, ${yScale(Math.max(point.close, mode === "log" ? 500 : 0))})`}>
                                        <circle r={5} fill="#f0a229" />
                                        <line y1={0} y2={-42} stroke="rgba(240, 162, 41, 0.38)" />
                                        <text
                                            y={-50}
                                            textAnchor="middle"
                                            fill="rgba(245,239,230,0.86)"
                                            fontSize="11"
                                        >
                                            {point.date}
                                        </text>
                                    </g>
                                ))}

                            {hovered ? (
                                <g transform={`translate(${hovered.x - margin.left}, ${hovered.y - margin.top})`}>
                                    <line y1={innerHeight - hovered.y + margin.top} y2={0} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
                                    <circle r={7} fill="#0a0908" stroke="#ffd58e" strokeWidth={3} />
                                </g>
                            ) : null}
                        </g>

                        <rect
                            x={margin.left}
                            y={margin.top}
                            width={innerWidth}
                            height={innerHeight}
                            fill="transparent"
                            onPointerMove={handlePointerMove}
                            onPointerLeave={() => setHovered(null)}
                        />
                    </svg>

                    {hovered ? (
                        <div
                            className={styles.chartTooltip}
                            style={{
                                left: `${Math.min(Math.max(hovered.x, 100), width - 100)}px`,
                                top: `${Math.max(hovered.y, 110)}px`,
                            }}
                        >
                            <div className={styles.tooltipDate}>{formatDate(hovered.point.parsedDate)}</div>
                            <div className={styles.tooltipValue}>{formatUsdCompact(hovered.point.close)}</div>
                            <div className={styles.tooltipSub}>日内高点 {formatUsdCompact(hovered.point.high)}</div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={styles.chartSidebar}>
                <div className={styles.noteCard}>
                    <div className={styles.noteTitle}>Sample Window</div>
                    <div className={styles.noteValue}>2017.08.17 → 2026.03.31</div>
                    <p className={styles.noteBody}>
                        这里使用的是 Binance 现货 `BTCUSDT` 归档日线。白皮书与创世区块发生在链启动阶段，价格曲线则从交易所上线后开始进入连续市场读数。
                    </p>
                </div>

                <div className={styles.noteCard}>
                    <div className={styles.noteTitle}>Archive ATH</div>
                    <div className={styles.noteValue}>$126,199.63</div>
                    <p className={styles.noteBody}>
                        按 Binance 官方现货日线归档，峰值出现在 2025 年 10 月 6 日 UTC。若按约 110 万枚 BTC 估算，中本聪那部分持仓峰值大约来到
                        {` ${formatUsdCompact(archivePeakValue)} `}。
                    </p>
                </div>

                <div className={styles.noteCard}>
                    <div className={styles.noteTitle}>Narrative Markers</div>
                    <div className={styles.noteBody}>
                        {bitcoinMilestones.slice(2).map((milestone) => (
                            <p key={milestone.year} style={{ marginTop: 10 }}>
                                <strong>{milestone.year}</strong> {milestone.title}: {milestone.value}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
