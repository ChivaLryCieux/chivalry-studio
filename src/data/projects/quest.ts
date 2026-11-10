import { questCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...questCard,
  description:
    'A personal Python quant trading framework that combines Binance Futures execution, TUI monitoring, Redis-based reporting, risk control, backtesting research, and operational logs.',
  detailImages: [
    '/images/projects/quidem/kmeans_20260106_000544.webp',
    '/images/projects/quidem/hmm_20260208_230739.webp',
    '/images/projects/quidem/bocpd_solusdt.webp',
  ],
  template: 'swiss-case',
  caseStudy: {
    eyebrow: 'Personal quant system / Binance futures',
    headline:
      'A local quant workbench where execution, risk, reporting, and research stay in one reproducible loop.',
    deck: 'Quest is not a generic PyPI package. It is a personal trading framework that organizes live or paper execution, terminal interaction, Redis status channels, email reports, exchange access, position risk, backtest research, and logs in one repository.',
    accent: '#c3182d',
    repoPath: 'https://github.com/ChivaLryCieux',
    imageFit: 'contain',
    metrics: [
      { label: 'Exchange', value: 'Binance' },
      { label: 'Mode', value: 'Paper / Live' },
      { label: 'State channel', value: 'Redis' },
      { label: 'Research', value: 'Backtest' },
    ],
    sections: [
      {
        kicker: '01 / Execution core',
        title:
          'Strategy code only decides whether to trade; the engine owns how trades are executed.',
        body: 'The core engine connects market data, strategy signals, risk checks, and order execution. bot.py drives exchange connection, historical warmup, realtime ticks, UI refresh, and heartbeat, while trader.py owns open and close actions, paper fills, fee estimation, position state, and trade journal pushes.',
      },
      {
        kicker: '02 / Operating surface',
        title:
          'A terminal-first interface keeps long-running trading visible without a web backend.',
        body: 'The TUI uses standard output, ANSI control sequences, colorama, and cross-platform keyboard input to show position direction, market state, key indicators, current price, floating PnL, open events, close events, errors, pause, resume, and exit controls.',
      },
      {
        kicker: '03 / Risk and review',
        title:
          'Redis reporting and backtests make trading behavior observable after the session ends.',
        body: 'Closed trades are queued in Redis for scheduled HTML mail reports, CSV attachments, equity curves, and archive files. Backtest modules reuse core strategy, indicator, and risk code, while HMM, clustering, BOCPD, and diagnostic replay scripts support research and post-loss analysis.',
      },
    ],
    highlights: [
      'Binance Futures REST and WebSocket access are isolated behind ccxt and websocket-client adapters.',
      'Paper mode records simulated orders without touching real exchange order endpoints.',
      'Risk management covers order sizing, leverage, taker fee estimation, stop loss, take profit, cooldown, circuit breaking, breakeven protection, and trailing stops.',
      'The report pipeline decouples the trading loop from email delivery through Redis, Resend, schedule, pandas, and matplotlib.',
      'Backtest and diagnostics reuse core modules to avoid a hard split between research logic and live trading logic.',
    ],
    stack: [
      'Python',
      'ccxt',
      'websocket-client',
      'pandas',
      'numpy',
      'Redis',
      'Resend',
      'matplotlib',
      'seaborn',
      'statsmodels',
      'hmmlearn',
      'scikit-learn',
    ],
    keywords: [
      'CTA',
      '模拟盘/实盘',
      '终端监控',
      'Redis 报告',
      '仓位风控',
      '回测研究',
    ],
  },
} satisfies Project;
