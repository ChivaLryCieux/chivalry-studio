import { textClassificationCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...textClassificationCard,
  description:
    '系统评测从传统统计特征（TF-IDF / Naive Bayes）到深度网络（TextCNN / LSTM）与预训练模型（BERT）的文本分类全链路演进实验。A comparative NLP benchmark investigating text classification paradigms from statistical TF-IDF to pretrained transformers.',
  template: 'swiss-case',
  useLightFrame: true,
  isBilingual: true,
  caseStudy: {
    eyebrow: 'NLP Benchmark / 自然语言处理实验',
    headline:
      'Text Classification: From Word Frequency to Pretrained Models\n文本分类实验：从词频统计到预训练模型演进',
    deck: 'A comprehensive comparative study tracing the evolution of text classification, evaluating statistical bag-of-words, deep neural networks, and pretrained transformers under reproducible benchmarks.\n系统梳理与评测文本分类技术的演进脉络，在统一测试基准下对比词袋统计（TF-IDF / Naive Bayes）、深度语义编码（TextCNN / BiLSTM）与微调预训练模型（BERT / RoBERTa）的表征能力与工程效能。',
    accent: '#2563eb',
    repoPath: 'Chivalry Studio / NLP Benchmark Labs',
    imageFit: 'contain',
    isBilingual: true,
    metrics: [
      { label: 'Baseline\n传统基线', value: 'TF-IDF + NB / SVM' },
      { label: 'Neural Models\n深度神经网络', value: 'TextCNN & BiLSTM' },
      { label: 'Pretrained\n预训练模型', value: 'BERT / RoBERTa' },
      { label: 'Evaluation\n核心指标', value: 'Accuracy / Macro-F1' },
    ],
    sections: [
      {
        kicker: '01 / Statistical Baselines 统计基线',
        title:
          'Word frequency, sparse representations, and linear decision boundaries.\n词频统计、稀疏特征向量与线性分类边界。',
        body: 'Evaluating bag-of-words and TF-IDF representations paired with Naive Bayes, Logistic Regression, and SVMs. Examining sparsity challenges, n-gram limitations, and computational efficiency on raw corpora.\n以词袋模型（BoW）与 TF-IDF 稀疏向量为起点，结合朴素贝叶斯、逻辑回归与 SVM 评估传统特征工程的表达瓶颈，分析高维稀疏特征与词序缺失对语义判别的局限。',
      },
      {
        kicker: '02 / Deep Sequence Modeling 深度序列建模',
        title:
          'Distributed representations and local vs sequential feature extraction.\n分布式词向量与局部/时序特征捕获。',
        body: 'Transitioning to dense word embeddings (Word2Vec / GloVe) combined with TextCNN for local n-gram filters and BiLSTM with Attention for long-range temporal dependencies.\n引入稠密词嵌入表征，对比卷积神经网络（TextCNN）多尺度卷积核的局部特征提取，与双向长短期记忆网络（BiLSTM + Attention）对语序上下文依赖的建模表现。',
      },
      {
        kicker: '03 / Pretrained Transformers 预训练模型',
        title:
          'Bidirectional contextual embeddings and transfer learning.\n双向注意力上下文表征与迁移学习微调。',
        body: 'Fine-tuning pretrained Transformers (BERT, RoBERTa), leveraging multi-head self-attention to capture nuanced syntactic and semantic shifts across classification domains.\n基于预训练语言模型（BERT / RoBERTa）进行下游微调，利用多头自注意力机制捕获深层上下文双向表征，在复杂语境与长距离依赖下取得显著的泛化性能飞跃。',
      },
    ],
    highlights: [
      'Implemented end-to-end benchmark pipelines comparing three generations of NLP models. / 搭建横跨三代文本分类范式的端到端评测流水线。',
      'Analyzed trade-offs between computational overhead, latency, and classification accuracy. / 深入剖析算力开销、推理延迟与分类准确率之间的工程权衡。',
      'Visualized embedding spaces and attention heatmaps across semantic categories. / 对稠密特征空间与自注意力权重进行可视化分析与可解释性探究。',
      'Standardized preprocessing, tokenization, and cross-validation pipelines. / 建立标准化的文本预处理、分词与交叉验证对比基准。',
    ],
    stack: [
      'PyTorch',
      'Transformers',
      'scikit-learn',
      'HuggingFace',
      'BERT',
      'TextCNN',
      'BiLSTM',
      'TF-IDF',
      'Python',
    ],
    keywords: [
      '文本分类',
      'NLP实验',
      'TF-IDF',
      '词频统计',
      '预训练模型',
      'BERT',
      'TextCNN',
      '深度学习',
    ],
  },
} satisfies Project;
