import { solanaCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...solanaCard,
  description:
    'A private hard-fork experiment that redesigns Solana inflation parameters, isolates mainnet assumptions, and validates a local block-producing network through RPC.',
  detailImages: [
    '/images/projects/solana/solana-economics.svg',
    '/images/projects/solana/solana-validation.svg',
  ],
  template: 'swiss-case',
  caseStudy: {
    eyebrow: 'Private hard fork / Token economics',
    headline:
      'A Solana local network rebuilt around a smaller supply and a fixed private-chain inflation model.',
    deck: "This work keeps Solana's account, stake, vote, fee, rent, epoch, and reward machinery intact, while replacing mainnet-oriented genesis defaults with a reproducible private development chain.",
    accent: '#0b8f7a',
    repoPath: 'https://github.com/ChivaLryCieux',
    metrics: [
      { label: 'Initial mint', value: '10M SOL' },
      { label: 'Validator stake', value: '100K SOL' },
      { label: 'Annual inflation', value: '0.5%' },
      { label: 'Foundation share', value: '0%' },
    ],
    sections: [
      {
        kicker: '01 / Genesis boundary',
        title:
          'The default chain identity moves from mainnet semantics to development semantics.',
        body: 'The genesis CLI now defaults to the Development cluster type. That avoids automatic injection of historical mainnet allocation accounts and makes the private chain start from an intentionally smaller, cleaner ledger.',
      },
      {
        kicker: '02 / Economic redesign',
        title: 'Inflation is simplified into a fixed private-fork curve.',
        body: "A new private_fork inflation constructor sets initial and terminal annual inflation to 0.5%, taper to 1.0, and foundation parameters to zero. Rewards still flow through Solana's existing epoch reward pipeline.",
      },
      {
        kicker: '03 / Local validation',
        title: 'The fork is verified as a running block-producing network.',
        body: 'A private-localnet script starts solana-test-validator with a short 64-slot epoch, 8 ticks per slot, a dedicated ledger, and faucet funding. RPC checks confirm genesis hash, advancing slots, inflation governor values, and zero mainnet non-circulating accounts.',
      },
    ],
    highlights: [
      'Added a private inflation option and a Development default path for genesis creation.',
      'Reduced local test-validator mint from 500,000,000 SOL to 10,000,000 SOL.',
      'Reduced bootstrap validator stake from 1,000,000 SOL to 100,000 SOL.',
      'Excluded mainnet-beta non-circulating supply lists from Development cluster supply reporting.',
      'Validated getGenesisHash, getEpochInfo, getInflationGovernor, and getSupply over local RPC.',
    ],
    stack: [
      'Rust',
      'Solana validator',
      'GenesisConfig',
      'Inflation',
      'Bank runtime',
      'RPC',
      'Shell automation',
      'cargo test',
    ],
    keywords: [
      '私有硬分叉',
      '通胀重设计',
      '本地验证网',
      '创世配置',
      '质押奖励',
      '供应隔离',
    ],
  },
} satisfies Project;
