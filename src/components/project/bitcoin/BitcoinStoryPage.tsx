import Link from "next/link";
import styles from "./bitcoin-story.module.css";
import {
    bitcoinMilestones,
    bitcoinPriceSeries,
    consensusMoments,
    satoshiHoldings,
    techPillars,
} from "@/data/bitcoinStory";
import { formatUsdCompact } from "@/lib/numberFormat";
import { BitcoinTechMap } from "./BitcoinTechMap";
import { BitcoinPriceStory } from "./BitcoinPriceStory";
import { SatoshiHoldingsViz } from "./SatoshiHoldingsViz";
import { PretextNarrative } from "./PretextNarrative";

export function BitcoinStoryPage() {
    const peakValue = satoshiHoldings.estimatedCoins * satoshiHoldings.archiveAthPrice;

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    Works
                </Link>
                <div className={styles.navMeta}>Satoshi / Bitcoin / Data Story</div>
            </nav>

            <section className={styles.hero}>
                <div>
                    <div className={styles.eyebrow}>Data Story</div>
                    <h1 className={styles.heroTitle}>神秘人中本聪与他的个人比特币项目</h1>
                    <p className={styles.heroSubtitle}>去中心化共识的 18 年野蛮生长</p>
                    <p className={styles.heroLead}>
                        这是从一个匿名名字开始的故事。这个页面不是简单复述比特币史，而是把白皮书里的技术零件、2009 年的创世区块、交易所时代的价格重估，以及约 110 万枚 BTC
                        所代表的制度级含义，重新组织成一个可视化叙事页面。
                    </p>
                    <Link href="/project/6" className={styles.heroCta}>
                        进入 R3F 3D 数据叙事版本
                    </Link>
                </div>

                <div className={styles.heroSide}>
                    <div className={styles.heroPanel}>
                        <div className={styles.panelLabel}>Whitepaper</div>
                        <div className={styles.panelValue}>2008.10</div>
                        <p className={styles.panelCopy}>
                            一份 8 页文档，把数字现金、点对点网络和工作量证明压缩进了同一套叙事框架。
                        </p>
                    </div>

                    <div className={styles.heroPanel}>
                        <div className={styles.panelLabel}>Estimated Satoshi Stack</div>
                        <div className={styles.panelValue}>1.1M BTC</div>
                        <p className={styles.panelCopy}>
                            这批长期静止的币，按 Binance 官方现货日线归档中的峰值 126,199.63 美元估算，账面价值约 {formatUsdCompact(peakValue)}。
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.statGrid}>
                <article className={styles.statCard}>
                    <div className={styles.statValue}>8 Pages</div>
                    <div className={styles.statTitle}>whitepaper length</div>
                    <p className={styles.statDetail}>极短，但足够把系统规则、攻击模型和货币发行逻辑一次性交代清楚。</p>
                </article>
                <article className={styles.statCard}>
                    <div className={styles.statValue}>50 BTC</div>
                    <div className={styles.statTitle}>genesis reward</div>
                    <p className={styles.statDetail}>创世区块让发行机制第一次真正运行，货币政策不再停留在描述里。</p>
                </article>
                <article className={styles.statCard}>
                    <div className={styles.statValue}>3,149 Days</div>
                    <div className={styles.statTitle}>binance archive sample</div>
                    <p className={styles.statDetail}>页面中的价格曲线使用 2017 年 8 月 17 日到 2026 年 3 月 31 日的 Binance 现货日线归档样本。</p>
                </article>
                <article className={styles.statCard}>
                    <div className={styles.statValue}>5.24%</div>
                    <div className={styles.statTitle}>of the 21M cap</div>
                    <p className={styles.statDetail}>如果 110 万枚估算成立，中本聪单独控制的仓位接近总量上限的二十分之一。</p>
                </article>
            </section>

            <PretextNarrative />

            <section className={styles.section}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>从一个神秘人开始，但真正扩张的是协议</h2>
                    <p className={styles.sectionBody}>
                        关于中本聪，最重要的并不是身份悬案，而是他把哪些旧技术拼在一起，以及拼接方式为什么有效。下面这张关系图强调的不是“发明了什么”，而是
                        Bitcoin 如何把分布式网络、密码学和区块链接成一台可自我维持的结算机器。
                    </p>
                </header>

                <div className={styles.vizShell}>
                    <BitcoinTechMap pillars={techPillars} />
                </div>
            </section>

            <section className={styles.section}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>白皮书与创世区块，把抽象规则压进第一块石头</h2>
                    <p className={styles.sectionBody}>
                        白皮书先定义了问题，再给出规则；创世区块则把这套规则实际启动。时间线里能看到它怎样从一篇邮件列表里的文本，变成一条持续出块、持续减半、持续被市场争夺的链。
                    </p>
                </header>

                <div className={styles.milestoneGrid}>
                    {bitcoinMilestones.map((milestone) => (
                        <article key={milestone.year} className={styles.milestoneCard}>
                            <div className={styles.milestoneYear}>{milestone.year}</div>
                            <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                            <div className={styles.milestoneValue}>{milestone.value}</div>
                            <p className={styles.milestoneDetail}>{milestone.detail}</p>
                        </article>
                    ))}
                </div>

                <div className={styles.inscriptionShell}>
                    <div className={styles.inscriptionMeta}>Genesis Inscription / Coinbase Text</div>
                    <blockquote className={styles.inscriptionQuote}>
                        The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
                    </blockquote>
                    <p className={styles.inscriptionTranslation}>
                        《泰晤士报》2009 年 1 月 3 日头条: “财政大臣正处于实施第二轮银行救助的边缘。”
                    </p>
                    <p className={styles.inscriptionBody}>
                        这句英文被中本聪刻进创世区块的 coinbase 交易里。它既是一个可验证的时间戳，也是一句明确的制度评论:
                        Bitcoin 从第一块开始，就不是为了重复旧金融体系，而是为了用代码、密码学和分布式共识给出另一种选择。
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.vizShell}>
                    <div className={styles.timeline}>
                        {consensusMoments.map((moment) => (
                            <article key={moment.year} className={styles.timelineRow}>
                                <div className={styles.timelineYear}>{moment.year}</div>
                                <div>
                                    <h3 className={styles.timelineTitle}>{moment.title}</h3>
                                    <p className={styles.timelineDetail}>{moment.detail}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>价格不是附属品，而是共识扩张的读数器</h2>
                    <p className={styles.sectionBody}>
                        价格曲线记录的不是单纯涨跌，而是市场对这套制度想象力的不断重估。把刻度切到对数后，可以更清楚地看见每轮崩塌之后，系统仍在更高的平台继续积累共识。
                    </p>
                </header>

                <BitcoinPriceStory series={bitcoinPriceSeries} />
            </section>

            <section className={styles.section}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>110 万枚 BTC: 把神话折算成资产规模</h2>
                    <p className={styles.sectionBody}>
                        中本聪持币量的估计存在误差，但数量级足够惊人。真正重要的不是这组数字本身，而是它背后的结构含义: 这不是一个财富故事，而是一个充满技术理性和理想主义的故事。最早的协议设计者持有的大量 BTC 几乎从未转出，而市场却在十多年里把这批沉默的币重新定价为历史级别的静态仓位。
                    </p>
                </header>

                <SatoshiHoldingsViz />
            </section>

            <section className={styles.section}>
                <div className={styles.epilogueShell}>
                    <div className={styles.epilogueMeta}>Epilogue / Why Stay Anonymous</div>
                    <h2 className={styles.epilogueTitle}>为什么中本聪不愿意公开身份？</h2>
                    <p className={styles.epilogueBody}>
                        这背后涉及比特币的去中心化叙事，这里不会深究。然而，如果中本聪真的怀抱一种技术理性主义的理想，那么对他而言，开创一种新技术和新的金融形态，同时给文明提供一种新的去中心化视角与可能性，或许比财富更重要。中本聪背后的隐姓埋名者，会以“中本聪”这个名字留在历史里。
                    </p>
                </div>
            </section>

            <div className={styles.footerNote}>
                数据口径说明: 价格曲线采用 Binance 公开归档 `BTCUSDT` 现货日线样本，时间范围为 2017 年 8 月 17 日至 2026 年 3 月 31 日；页面中的历史高点为 2025 年 10 月 6 日 UTC 的日内高点
                `126,199.63` 美元。若按北京时间理解，该交易日会跨到 2025 年 10 月 7 日。页面中的 110 万枚 BTC 为常见估算值，不应视作精确链上归属结论。
            </div>
        </main>
    );
}
