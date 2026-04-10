import bitcoinPriceDaily from "./bitcoinPriceDaily.json";

export interface BitcoinPricePoint {
    date: string;
    close: number;
    high: number;
}

export interface BitcoinMilestone {
    year: string;
    title: string;
    value: string;
    detail: string;
}

export interface TechPillar {
    id: string;
    label: string;
    kicker: string;
    detail: string;
}

export interface ConsensusMoment {
    year: string;
    title: string;
    detail: string;
}

export const bitcoinPriceSeries: BitcoinPricePoint[] = bitcoinPriceDaily;

export const bitcoinMilestones: BitcoinMilestone[] = [
    {
        year: "2008.10",
        title: "Bitcoin Whitepaper",
        value: "8 pages",
        detail: "《Bitcoin: A Peer-to-Peer Electronic Cash System》用一份极短的白皮书，把无中心记账、密码学签名、工作量证明和时间戳服务器拼成了一台全球共享账本。"
    },
    {
        year: "2009.01",
        title: "Genesis Block",
        value: "50 BTC",
        detail: "创世区块把第一笔 coinbase 奖励写进系统，也把一条报纸标题写进链上，让这条链从第一块开始就带有清晰的时代注脚。"
    },
    {
        year: "2010.05",
        title: "Pizza Day",
        value: "10,000 BTC ≈ $41",
        detail: "第一次真实世界商品交易给比特币提供了非常粗糙但关键的价格坐标，也让它第一次离开论坛，进入商品交换。"
    },
    {
        year: "2013.11",
        title: "First $1,000",
        value: "≈ $1K",
        detail: "这一轮上涨让 Bitcoin 从极客实验转成全球投机与意识形态讨论的对象，叙事开始扩大。"
    },
    {
        year: "2017.12",
        title: "Exchange Era",
        value: "≈ $19.8K high",
        detail: "交易所基础设施成熟后，价格开始进入更高频的全球化博弈阶段；后面的曲线使用 Binance 现货归档日线数据。"
    },
    {
        year: "2025.10.06",
        title: "Archive ATH",
        value: "$126,199.63",
        detail: "按当前页面使用的 Binance 现货日线归档样本，2025 年 10 月 6 日 UTC 的日内高点为 126,199.63 美元；北京时间口径会跨到 10 月 7 日。"
    }
];

export const techPillars: TechPillar[] = [
    {
        id: "distributed",
        label: "Distributed Computer",
        kicker: "把账本变成网络",
        detail: "白皮书并没有发明“分布式”本身，而是把任何人都能运行的节点、广播传播和最长链规则组合成一台去中心化结算机器。"
    },
    {
        id: "cryptography",
        label: "Cryptography",
        kicker: "把所有权变成数学证明",
        detail: "公私钥签名负责证明花费权，哈希函数负责把历史压成不可篡改的指纹；这让信任从机构背书转移到可验证计算。"
    },
    {
        id: "blockchain",
        label: "Chain of Blocks",
        kicker: "把时间压进区块",
        detail: "时间戳服务器把交易打包进区块，工作量证明把出块成本变成安全预算，区块链接把过去的历史锁成一条越来越难以回滚的链。"
    }
];

export const consensusMoments: ConsensusMoment[] = [
    {
        year: "2008",
        title: "白皮书发布",
        detail: "问题定义得很直接：如何在没有可信第三方的前提下防止双花。"
    },
    {
        year: "2009",
        title: "创世区块",
        detail: "系统启动，50 BTC 奖励出现，货币政策第一次被执行。"
    },
    {
        year: "2010",
        title: "真实世界定价",
        detail: "10,000 BTC 买两张披萨，把抽象代币拖进现实商品交换。"
    },
    {
        year: "2012",
        title: "第一次减半",
        detail: "区块奖励从 50 BTC 降到 25 BTC，发行节奏从代码进入市场预期。"
    },
    {
        year: "2017",
        title: "交易所时代",
        detail: "流动性、衍生品和媒体注意力把价格波动推到全球主流视野。"
    },
    {
        year: "2021",
        title: "机构化叙事",
        detail: "价格冲顶，Bitcoin 被重新包装成数字黄金、风险资产和宏观对冲工具。"
    }
];

export const satoshiHoldings = {
    estimatedCoins: 1_100_000,
    capLimit: 21_000_000,
    shareOfCap: 1_100_000 / 21_000_000,
    archiveAthPrice: 126_199.63,
    archiveAthDate: "2025-10-06",
    archiveLatestClose: 68_284.48,
    archiveLatestDate: "2026-03-31",
};
