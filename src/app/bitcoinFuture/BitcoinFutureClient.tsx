"use client";

import dynamic from "next/dynamic";

const PrismFuturePage = dynamic(
    () => import("@/components/project/prism/PrismFuturePage").then((mod) => mod.PrismFuturePage),
    { ssr: false },
);

export function BitcoinFutureClient() {
    return <PrismFuturePage />;
}
