# Luo Ruiyang Portfolio Showcase Video (HyperFrames)

A 60-second cinematic, one-take continuous video journey presenting **Luo Ruiyang's** work across three core pillars:
1. **Game Design & Spatial Poetics** (*Aftermath*, *Signverse*)
2. **AI Systems & Multi-Agent Orchestration** (*Hyacinth*, *Lilac-CLI*, *Sermon*)
3. **Quantitative Finance & Crypto Systems** (*Quidem*, *Colonnade DApp*, *Solana Private Fork*, *SOA Paper*)

---

## 📽️ Structure & Specifications

- **Framework**: [HyperFrames](https://github.com/heygen-com/hyperframes) (HTML/CSS/GSAP Video Engine)
- **Duration**: 60.00 Seconds
- **Resolution**: 1920 × 1080 (16:9 Full HD)
- **Framerate**: 30 FPS
- **Style**: Seamless One-Take 3D Camera Rig with Swiss Typography, Neon HUD, and Dynamic Parallax Depth.
- **Language**: English

---

## 📁 Directory Structure

```text
video/
├── meta.json             # HyperFrames project manifest (duration, resolution, fps)
├── index.html            # Master composition & clips (data-start, data-duration)
├── styles.css            # Swiss typography, glassmorphic cards, HUD, dark mode styling
├── script.js             # GSAP continuous 3D camera timeline & HUD synchronizer
├── package.json          # Node scripts & dependencies
├── dist/                 # Rendered .mp4 export destination (git-ignored)
├── compositions/         # Sub-compositions (optional extensions)
└── assets/
    └── images/
        └── projects/     # Self-contained project visual assets
```

---

## 🚀 How to Run & Preview

### 1. Instant Browser Preview
You can directly double-click / open `video/index.html` in Chrome or Edge. It includes a built-in playback controller at the bottom with:
- Play / Pause toggle
- Realtime timecode scrubbing bar (0s - 60s)
- Playback speed switcher (0.5x, 1.0x, 2.0x)

### 2. Using HyperFrames CLI
Navigate into the `video/` directory:

```bash
cd video

# Start real-time studio preview
npx hyperframes preview

# Render final MP4 video via headless browser & FFmpeg
npx hyperframes render
```

---

## 🎬 Chapters Timeline Breakdown

| Timecode | Chapter | Key Highlights |
| :--- | :--- | :--- |
| **00:00 - 00:06** | **Prologue / Identity Matrix** | Digital Craftsman & Systems Architect, 3 core pillars introduction |
| **00:06 - 00:22** | **01 / Game Design & Poetics** | *Aftermath* (Embodied space) & *Signverse* (Synesthetic multimodal semantics) |
| **00:22 - 00:40** | **02 / AI & Multi-Agent Systems** | *Hyacinth* (DAG orchestrator), *Lilac-CLI* (Terminal agent harness), *Sermon* (AI memory) |
| **00:40 - 00:54** | **03 / Quantitative & Crypto** | *Quidem* (CTA engine), *Colonnade DApp* (ETH D3.js), *Solana Fork & SOA Paper* |
| **00:54 - 01:00** | **Epilogue / Connect** | Contact links (`ChivaLryCieux`), Shanghai coordinates & thank you |
