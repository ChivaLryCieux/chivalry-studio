"use client";

import { type CSSProperties, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { layoutNextLine, prepareWithSegments, setLocale, type LayoutCursor, type PreparedTextWithSegments } from "@chenglou/pretext";
import styles from "./bitcoin-story.module.css";

interface NarrativeSlice {
    label: string;
    metric: string;
    text: string;
}

const slices: NarrativeSlice[] = [
    {
        label: "Origin",
        metric: "2008 / 8 pages",
        text: "中本聪先提出的不是一种资产，而是一套把陌生人重新组织起来的结算方法。白皮书把签名、哈希、时间戳和工作量证明压缩成一条可以自我校验的公共账本。它真正锋利的地方在于，把信任从机构账本里抽离出来，交给每个节点都能复算的规则。八页文本并不长，却把双花问题、网络传播、最长链原则和发行节奏放进同一个系统，让一个原本只存在于密码学邮件列表里的想法，具备了启动全球实验的最小结构。",
    },
    {
        label: "Ignition",
        metric: "2009 / 50 BTC",
        text: "创世区块让规则第一次落地。那句报纸头条像一枚钉子，把比特币的技术起点钉在金融危机的现场，也把它的制度姿态钉进链上历史。第一笔 coinbase 奖励并不能被花费，却宣告了发行机制、区块间隔和工作量证明开始运转。它像一次冷启动：没有公司发布会，没有中心服务器背书，只有软件、节点和一段被刻进链里的新闻文本，共同证明这个系统诞生在旧金融秩序最脆弱的时刻。",
    },
    {
        label: "Repricing",
        metric: "2017-2026",
        text: "交易所时代之后，价格曲线成为共识扩张的读数器。每一次暴涨和回撤，都在重新回答同一个问题：一个没有中心担保的网络，究竟可以承载多少信任。2017 年之后，流动性、杠杆、媒体叙事和机构资金不断叠加，价格不再只是投机曲线，也成为外部世界理解比特币的入口。对数坐标下的走势尤其重要，因为它把多轮泡沫、清算和重新定价放进同一幅图里，让读者看到共识不是线性增长，而是在崩塌后一次次换到更高的平台继续积累。",
    },
    {
        label: "Silence",
        metric: "1.1M BTC",
        text: "中本聪最强的叙事动作，可能不是出现，而是消失。那批长期静止的币，把财富、克制、匿名性和协议独立性，全部压成了一组沉默的数据。如果约 110 万枚 BTC 的估算接近真实，它们既是巨大的账面财富，也是一个几乎从未被兑现的承诺。市场不断给这批币重新标价，而链上历史却始终保持安静。正因为没有公开身份、没有持续发声、没有动用这部分早期仓位，中本聪才从一个开发者名字变成了协议自身独立性的象征。",
    },
];

function useMeasuredWidth<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState(720);

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

function useScrollProgress(ref: RefObject<HTMLElement | null>) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            if (frame) {
                return;
            }

            frame = requestAnimationFrame(() => {
                frame = 0;
                const element = ref.current;

                if (!element) {
                    return;
                }

                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight || 1;
                const start = viewportHeight * 0.82;
                const end = -rect.height + viewportHeight * 0.18;
                const nextProgress = (start - rect.top) / (start - end);

                setProgress(Math.min(Math.max(nextProgress, 0), 1));
            });
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, [ref]);

    return progress;
}

interface FlowLine {
    text: string;
    width: number;
    x: number;
    y: number;
    row: number;
}

function layoutAroundCoin(
    prepared: PreparedTextWithSegments,
    maxTextWidth: number,
    fontSize: number,
    lineHeight: number,
    progress: number
) {
    const coinRadius = fontSize * 2.2;
    const gutter = fontSize * 0.95;
    const coinY = fontSize * 4.65;
    const minWidth = Math.min(maxTextWidth, fontSize * 7);
    const splitMinWidth = Math.min(maxTextWidth, fontSize * 4.5);
    const inset = Math.min(maxTextWidth * 0.22, coinRadius + gutter + splitMinWidth);
    const travelStart = inset;
    const travelEnd = Math.max(maxTextWidth - inset, travelStart);
    const coinX = travelStart + progress * (travelEnd - travelStart);
    const lines: FlowLine[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lineIndex = 0;

    while (lineIndex < 80) {
        const lineMiddleY = lineIndex * lineHeight + fontSize * 0.72;
        const verticalDistance = Math.abs(lineMiddleY - coinY);
        const intersectsCoin = verticalDistance < coinRadius + lineHeight * 0.4;
        let x = 0;
        let availableWidth = maxTextWidth;

        if (intersectsCoin && coinX > -coinRadius && coinX < maxTextWidth + coinRadius) {
            const chord = Math.sqrt(Math.max(coinRadius ** 2 - verticalDistance ** 2, 0));
            const obstacleLeft = Math.max(coinX - chord - gutter, 0);
            const obstacleRight = Math.min(coinX + chord + gutter, maxTextWidth);
            const leftWidth = Math.max(obstacleLeft, 0);
            const rightWidth = Math.max(maxTextWidth - obstacleRight, 0);

            if (leftWidth >= splitMinWidth && rightWidth >= splitMinWidth) {
                const leftLine = layoutNextLine(prepared, cursor, leftWidth);

                if (leftLine === null) {
                    break;
                }

                lines.push({
                    text: leftLine.text,
                    width: leftLine.width,
                    x: 0,
                    y: lineIndex * lineHeight + fontSize,
                    row: lineIndex,
                });
                cursor = leftLine.end;

                const rightLine = layoutNextLine(prepared, cursor, rightWidth);

                if (rightLine === null) {
                    break;
                }

                lines.push({
                    text: rightLine.text,
                    width: rightLine.width,
                    x: obstacleRight,
                    y: lineIndex * lineHeight + fontSize,
                    row: lineIndex,
                });
                cursor = rightLine.end;
                lineIndex += 1;
                continue;
            }

            if (rightWidth >= minWidth) {
                x = obstacleRight;
                availableWidth = rightWidth;
            } else if (leftWidth >= minWidth) {
                availableWidth = leftWidth;
            }
        }

        const nextLine = layoutNextLine(prepared, cursor, availableWidth);

        if (nextLine === null) {
            break;
        }

        lines.push({
            text: nextLine.text,
            width: nextLine.width,
            x,
            y: lineIndex * lineHeight + fontSize,
            row: lineIndex,
        });
        cursor = nextLine.end;
        lineIndex += 1;
    }

    const contentBottom = lines.length > 0 ? lines[lines.length - 1].y + lineHeight : fontSize;

    return {
        coinRadius,
        coinX,
        coinY,
        height: Math.max(contentBottom + fontSize, coinY + coinRadius + fontSize),
        lines,
    };
}

export function PretextNarrative() {
    const { ref, width } = useMeasuredWidth<HTMLDivElement>();
    const progress = useScrollProgress(ref);
    const textWidth = Math.max(Math.min(width - 52, 860), 270);
    const fontSize = width < 560 ? 22 : 25;
    const lineHeight = width < 560 ? 36 : 42;
    const font = `600 ${fontSize}px "Helvetica Neue", Arial, sans-serif`;

    useEffect(() => {
        setLocale("zh");
    }, []);

    const laidOutSlices = useMemo(
        () =>
            slices.map((slice) => {
                const prepared = prepareWithSegments(slice.text, font);
                return {
                    ...slice,
                    ...layoutAroundCoin(prepared, textWidth, fontSize, lineHeight, progress),
                };
            }),
        [font, fontSize, lineHeight, progress, textWidth]
    );

    return (
        <section className={styles.pretextSection} aria-labelledby="pretext-narrative-title">
            <div className={styles.pretextIntro}>
                <div className={styles.eyebrow}>Narrative Engine</div>
                <h2 id="pretext-narrative-title" className={styles.sectionTitle}>
                    把中本聪的故事拆成四个可读的数据切片
                </h2>
                <p className={styles.sectionBody}>
                    叙事的节奏来自文字本身：起点、点火、重估、沉默。每一段都围绕一个关键数值展开，让匿名人物、区块链机制和市场曲线在同一条阅读路径里互相照亮。
                </p>
            </div>

            <div ref={ref} className={styles.pretextRail}>
                {laidOutSlices.map((slice, index) => {
                    const svgHeight = slice.height + 22;
                    const longestLine = Math.max(...slice.lines.map((line) => line.width), 1);

                    return (
                        <article
                            key={slice.label}
                            className={styles.pretextCard}
                            style={{ "--slice-index": index } as CSSProperties}
                        >
                            <div className={styles.pretextIndex}>{String(index + 1).padStart(2, "0")}</div>
                            <div className={styles.pretextMeta}>
                                <span>{slice.label}</span>
                                <strong>{slice.metric}</strong>
                            </div>
                            <svg
                                className={styles.pretextText}
                                viewBox={`0 0 ${textWidth} ${svgHeight}`}
                                role="img"
                                aria-label={slice.text}
                            >
                                <defs>
                                    <radialGradient id={`coinFace-${slice.label}`} cx="38%" cy="28%" r="70%">
                                        <stop offset="0%" stopColor="#fff1b5" />
                                        <stop offset="42%" stopColor="#f0a229" />
                                        <stop offset="100%" stopColor="#8d4d12" />
                                    </radialGradient>
                                </defs>
                                <g
                                    className={styles.pretextCoin}
                                    transform={`translate(${slice.coinX} ${slice.coinY})`}
                                    aria-hidden="true"
                                >
                                    <circle r={slice.coinRadius} fill={`url(#coinFace-${slice.label})`} />
                                    <circle r={slice.coinRadius * 0.76} fill="none" stroke="rgba(54,30,8,0.58)" strokeWidth="3" />
                                    <text
                                        className={styles.pretextCoinMark}
                                        x="0"
                                        y={slice.coinRadius * 0.32}
                                        fontSize={slice.coinRadius * 1.05}
                                        textAnchor="middle"
                                    >
                                        ₿
                                    </text>
                                </g>
                                {slice.lines.map((line, lineIndex) => (
                                    <g
                                        key={`${slice.label}-${lineIndex}`}
                                        className={styles.pretextLineGroup}
                                        style={{ "--line-index": lineIndex } as CSSProperties}
                                        transform={`translate(${line.x} ${line.y})`}
                                    >
                                        <text
                                            className={styles.pretextLine}
                                            x="0"
                                            y="0"
                                            style={{ fontSize, fontWeight: 600 } as CSSProperties}
                                        >
                                            {line.text}
                                        </text>
                                        <line
                                            className={styles.pretextMeasure}
                                            x1="0"
                                            x2={Math.max(line.width, 18)}
                                            y1="12"
                                            y2="12"
                                        />
                                        <circle
                                            className={styles.pretextPulse}
                                            cx={Math.max(line.width, 18)}
                                            cy="12"
                                            r={2 + (line.width / longestLine) * 3}
                                        />
                                    </g>
                                ))}
                            </svg>

                            <div className={styles.pretextBars} aria-hidden="true">
                                {slice.lines.map((line, lineIndex) => (
                                    <span
                                        key={`${slice.label}-bar-${lineIndex}`}
                                        style={
                                            {
                                                "--bar-width": `${Math.max((line.width / longestLine) * 100, 12)}%`,
                                                "--line-index": lineIndex,
                                            } as CSSProperties
                                        }
                                    />
                                ))}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
