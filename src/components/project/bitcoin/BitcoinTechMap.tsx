"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import styles from "./bitcoin-story.module.css";
import type { TechPillar } from "@/data/bitcoinStory";

interface NodeDatum extends d3.SimulationNodeDatum {
    id: string;
    label: string;
    group: string;
    size: number;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
    source: string;
    target: string;
}

const nodeSeed: NodeDatum[] = [
    { id: "bitcoin", label: "Bitcoin", group: "core", size: 26 },
    { id: "distributed", label: "Distributed Systems", group: "pillar", size: 18 },
    { id: "cryptography", label: "Cryptography", group: "pillar", size: 18 },
    { id: "blockchain", label: "Blockchain", group: "pillar", size: 18 },
    { id: "nodes", label: "Nodes", group: "distributed", size: 10 },
    { id: "broadcast", label: "Broadcast", group: "distributed", size: 10 },
    { id: "keys", label: "Keys", group: "cryptography", size: 10 },
    { id: "hash", label: "Hash", group: "cryptography", size: 10 },
    { id: "pow", label: "Proof-of-Work", group: "blockchain", size: 10 },
    { id: "timestamp", label: "Timestamp", group: "blockchain", size: 10 },
    { id: "incentives", label: "Incentives", group: "core", size: 10 },
];

const linkSeed: LinkDatum[] = [
    { source: "bitcoin", target: "distributed" },
    { source: "bitcoin", target: "cryptography" },
    { source: "bitcoin", target: "blockchain" },
    { source: "bitcoin", target: "incentives" },
    { source: "distributed", target: "nodes" },
    { source: "distributed", target: "broadcast" },
    { source: "cryptography", target: "keys" },
    { source: "cryptography", target: "hash" },
    { source: "blockchain", target: "pow" },
    { source: "blockchain", target: "timestamp" },
];

const focusMap: Record<string, string[]> = {
    distributed: ["distributed", "nodes", "broadcast", "bitcoin"],
    cryptography: ["cryptography", "keys", "hash", "bitcoin"],
    blockchain: ["blockchain", "pow", "timestamp", "bitcoin"],
};

interface BitcoinTechMapProps {
    pillars: TechPillar[];
}

export function BitcoinTechMap({ pillars }: BitcoinTechMapProps) {
    const [activeId, setActiveId] = useState<TechPillar["id"]>("distributed");
    const [nodes, setNodes] = useState<NodeDatum[]>([]);

    useEffect(() => {
        const simulationNodes = nodeSeed.map((node) => ({ ...node }));
        const simulationLinks = linkSeed.map((link) => ({ ...link }));

        const simulation = d3
            .forceSimulation(simulationNodes)
            .force("charge", d3.forceManyBody<NodeDatum>().strength(-240))
            .force("center", d3.forceCenter(330, 220))
            .force("collision", d3.forceCollide<NodeDatum>().radius((d) => d.size + 26))
            .force(
                "link",
                d3
                    .forceLink<NodeDatum, LinkDatum>(simulationLinks)
                    .id((d) => d.id)
                    .distance((link) => (link.source === "bitcoin" ? 110 : 85))
                    .strength(0.8)
            );

        for (let index = 0; index < 240; index += 1) {
            simulation.tick();
        }

        simulation.stop();
        setNodes(simulationNodes);
    }, []);

    const activeNodes = new Set(focusMap[activeId]);

    return (
        <div className={styles.mapLayout}>
            <div className={styles.pillarList}>
                {pillars.map((pillar) => {
                    const isActive = pillar.id === activeId;

                    return (
                        <button
                            key={pillar.id}
                            type="button"
                            className={`${styles.pillarButton} ${isActive ? styles.pillarButtonActive : ""}`}
                            onMouseEnter={() => setActiveId(pillar.id)}
                            onFocus={() => setActiveId(pillar.id)}
                            onClick={() => setActiveId(pillar.id)}
                        >
                            <div className={styles.pillarKicker}>{pillar.kicker}</div>
                            <div className={styles.pillarLabel}>{pillar.label}</div>
                            <p className={styles.pillarDetail}>{pillar.detail}</p>
                        </button>
                    );
                })}
            </div>

            <div className={styles.mapCanvas}>
                <svg viewBox="0 0 660 440" width="100%" height="100%" aria-label="Bitcoin whitepaper technology map">
                    {linkSeed.map((link) => {
                        const sourceNode = nodes.find((node) => node.id === link.source);
                        const targetNode = nodes.find((node) => node.id === link.target);

                        if (!sourceNode || !targetNode) {
                            return null;
                        }

                        const isHighlighted = activeNodes.has(link.source) && activeNodes.has(link.target);

                        return (
                            <line
                                key={`${link.source}-${link.target}`}
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke={isHighlighted ? "rgba(240, 162, 41, 0.75)" : "rgba(255, 255, 255, 0.12)"}
                                strokeWidth={isHighlighted ? 2.2 : 1.1}
                            />
                        );
                    })}

                    {nodes.map((node) => {
                        const isHighlighted = activeNodes.has(node.id);
                        const fill =
                            node.group === "core"
                                ? "rgba(240, 162, 41, 0.95)"
                                : isHighlighted
                                    ? "rgba(255, 213, 142, 0.92)"
                                    : "rgba(245, 239, 230, 0.16)";

                        const textFill = isHighlighted || node.group === "core" ? "#130e08" : "rgba(245, 239, 230, 0.9)";

                        return (
                            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                                <circle
                                    r={node.size + (isHighlighted ? 6 : 0)}
                                    fill={fill}
                                    stroke={isHighlighted ? "rgba(240, 162, 41, 0.8)" : "rgba(255, 255, 255, 0.1)"}
                                    strokeWidth={1.2}
                                />
                                <text
                                    textAnchor="middle"
                                    dy="0.33em"
                                    fill={textFill}
                                    fontSize={node.group === "core" ? 13 : 10}
                                    fontFamily="var(--font-sans), sans-serif"
                                    fontWeight={600}
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
