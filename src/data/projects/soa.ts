import { soaCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...soaCard,
  description:
    'A bilingual Swiss-style project page for the paper on consortium blockchain and polycentric governance of state-owned asset transactions.',
  detailImages: [
    '/images/projects/soa/soa-paper-homepage.webp',
    '/images/projects/soa/SOA-display.webp',
  ],
  template: 'swiss-case',
  isBilingual: true,
  useLightFrame: true,
  caseStudy: {
    eyebrow: 'Research Paper / 学术论文',
    headline:
      'Consortium Blockchain for State-Owned Asset Transaction Polycentric Governance\n国有资产交易复合治理的联盟链框架',
    deck: 'An integrated framework combining evolutionary game theory and Mesa-based agent simulation to redesign SOA governance from delayed audit to real-time, incentive-compatible supervision.\n通过进化博弈与 Mesa 智能体仿真，推动国有资产治理从滞后审计转向实时、激励相容的链上监管。',
    accent: '#b61f2a',
    repoPath: 'DOI: 10.5281/zenodo.19202351',
    imageFit: 'contain',
    isBilingual: true,
    useLightFrame: true,
    metrics: [
      { label: 'Compliance\n合规收敛', value: '85.2%' },
      { label: 'Convergence\n收敛迭代', value: '30 steps' },
      { label: 'Byzantine tolerance\n拜占庭鲁棒性', value: '20%' },
      { label: 'Regime uplift\n相对基线提升', value: '3x' },
    ],
    sections: [
      {
        kicker: '01 / Framework 架构',
        title:
          'A four-layer consortium blockchain links governance roles, contracts, consensus, and applications.\n四层联盟链将治理主体、合约规则、共识协议与应用层打通。',
        body: 'The architecture connects SASAC regulators, exchanges, auditors, and enterprises through permissioned identity, PBFT consensus, and threshold-triggered smart contracts, enabling polycentric but coordinated supervision.\n系统以 CA + DID 身份体系、PBFT 共识与阈值触发合约形成“多中心协同监管”，在分布式节点中保持统一规则与可追溯执行。',
      },
      {
        kicker: '02 / Theory 理论',
        title:
          'Threshold functions reveal a penalty-detection substitution law.\n阈值函数揭示了惩罚强度与检测概率的替代关系。',
        body: 'The model derives λ* = f(B, Ce, p, D) and p* = g(B, Ce, λ, D). In on-chain regimes (p > 0.7), required penalty intensity drops to λ* in [0.15, 0.45], far below off-chain regimes where λ* rises to [1.8, 3.2].\n论文推导 λ* 与 p* 两个关键阈值：当检测概率提升到链上区间（p > 0.7）时，达成稳定合规所需惩罚系数显著降低，形成可工程化的政策替代关系。',
      },
      {
        kicker: '03 / Simulation 仿真',
        title:
          'Mesa ABM validates ESS predictions under bounded rationality.\nMesa 智能体仿真在有限理性条件下验证了 ESS 预测。',
        body: 'With λ = 2.5 and p = 0.85, compliance converges to 85.2% (SD = 3.1%) versus 27.8% baseline (SD = 6.4%). A compliance ridge around λ·p > 0.6 and resilience beyond 20% Byzantine infiltration confirm robust mechanism design.\n在异质主体、噪声决策与无标度网络下，链上机制依然快速收敛并具备抗串谋能力，证明该治理框架具有现实可实施性。',
      },
    ],
    highlights: [
      'Formal mapping from blockchain design parameters (λ, p, τ) to payoff structure in the regulator-enterprise game. / 将链上设计参数映射到监管博弈收益结构。',
      'Derived operational thresholds for mechanism design before deployment. / 在部署前即可给出可执行的阈值设计目标。',
      'Demonstrated 85.2% compliance equilibrium under treatment conditions with rapid divergence from 50% initial state. / 从 50% 初始状态快速分化并稳定到 85.2% 合规水平。',
      'Maintained over 80% compliance under 20% Byzantine node infiltration. / 在 20% 拜占庭节点渗透下仍保持 80% 以上合规。',
      'Identified the policy substitution ridge λ·p > 0.6 for practical regulator tuning. / 识别 λ·p > 0.6 的政策调参“合规脊线”。',
      'Provided concrete recommendation: λ ≥ 2.5 and p ≥ 0.85 for transactions above ¥10M. / 给出面向千万元级交易的参数建议：λ ≥ 2.5、p ≥ 0.85。',
    ],
    stack: [
      'Consortium Blockchain',
      'PBFT Consensus',
      'Smart Contract Governance',
      'Evolutionary Game Theory',
      'Mesa ABM',
      'Polycentric Governance',
      'DID + CA Identity',
      'Mechanism Design',
    ],
    keywords: [
      '联盟链治理',
      '国有资产交易',
      'Polycentric Governance',
      'Evolutionary Game',
      'Mesa Simulation',
      '机制设计',
    ],
  },
} satisfies Project;
