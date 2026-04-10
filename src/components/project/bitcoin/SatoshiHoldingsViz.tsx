"use client";

import { useState } from "react";
import * as d3 from "d3";
import styles from "./bitcoin-story.module.css";
import { satoshiHoldings } from "@/data/bitcoinStory";
import { formatNumberCompact, formatUsdCompact } from "@/lib/numberFormat";

type SliceId = "satoshi" | "rest";

interface SliceDatum {
    id: SliceId;
    label: string;
    value: number;
    color: string;
}

export function SatoshiHoldingsViz() {
    const [hoveredSlice, setHoveredSlice] = useState<SliceId>("satoshi");

    const data: SliceDatum[] = [
        { id: "satoshi", label: "Estimated Satoshi Holdings", value: satoshiHoldings.estimatedCoins, color: "#f0a229" },
        { id: "rest", label: "Remaining 21M Cap", value: satoshiHoldings.capLimit - satoshiHoldings.estimatedCoins, color: "rgba(245,239,230,0.16)" },
    ];

    const pie = d3.pie<SliceDatum>().sort(null).value((datum) => datum.value);
    const arc = d3.arc<d3.PieArcDatum<SliceDatum>>().innerRadius(110).outerRadius(156);
    const activeArc = d3.arc<d3.PieArcDatum<SliceDatum>>().innerRadius(110).outerRadius(168);
    const archivePeakValue = satoshiHoldings.estimatedCoins * satoshiHoldings.archiveAthPrice;

    return (
        <div className={styles.holdingsLayout}>
            <div className={styles.vizShell}>
                <div className={styles.donutWrap}>
                    <svg viewBox="0 0 380 380" width="100%" height="100%" aria-label="Estimated Satoshi Bitcoin holdings share">
                        <g transform="translate(190,190)">
                            {pie(data).map((slice) => {
                                const isActive = hoveredSlice === slice.data.id;

                                return (
                                    <path
                                        key={slice.data.id}
                                        d={(isActive ? activeArc : arc)(slice) ?? ""}
                                        fill={slice.data.color}
                                        stroke="rgba(255,255,255,0.06)"
                                        strokeWidth={1.2}
                                        onMouseEnter={() => setHoveredSlice(slice.data.id)}
                                    />
                                );
                            })}
                        </g>
                    </svg>

                    <div className={styles.donutCenter}>
                        <div className={styles.donutValue}>{(satoshiHoldings.shareOfCap * 100).toFixed(2)}%</div>
                        <div className={styles.donutLabel}>of the 21M hard cap</div>
                    </div>
                </div>
            </div>

            <div className={styles.holdingsMetrics}>
                <div className={styles.noteCard}>
                    <div className={styles.noteTitle}>Estimated Coins</div>
                    <div className={styles.noteValue}>{formatNumberCompact(satoshiHoldings.estimatedCoins)}</div>
                    <p className={styles.noteBody}>
                        如果中本聪控制的地址群大约持有 110 万枚 BTC，那么这部分仓位单独就接近总量上限的二十分之一。
                    </p>
                </div>

                <div className={styles.noteCard}>
                    <div className={styles.noteTitle}>Peak Mark-to-Market</div>
                    <div className={styles.noteValue}>{formatUsdCompact(archivePeakValue)}</div>
                    <p className={styles.noteBody}>
                        按 Binance 官方现货日线归档口径，2025 年 10 月 6 日 UTC 的日内高点约为 126,199.63 美元。用这个价格估算，110 万枚 BTC 的账面峰值约为 1388 亿美元。
                    </p>
                </div>

                <div className={styles.noteCard}>
                    <div className={styles.noteTitle}>What It Means</div>
                    <p className={styles.noteBody}>
                        那批币之所以重要，不只是因为数量大，而是因为它们长期静止。它们像一组未被兑现的原始承诺，把协议早期的克制、匿名性和自我约束，一直保留在链上历史里。
                    </p>
                </div>
            </div>
        </div>
    );
}
