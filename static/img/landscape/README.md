# Landscape project logos

Drop project logo images in this folder to have them appear on the
[`/landscape`](../../../src/pages/landscape.tsx) page.

## How to add a logo

1. Add the image file here, e.g. `static/img/landscape/aworld.png`
   (PNG/SVG with a transparent background works best; square aspect ratio,
   ideally ≥ 104×104 px so it stays crisp inside the 52×52 slot).
2. Open `src/data/landscape.ts` and set the matching project's `logo` field to
   the site-root path, e.g.:

   ```ts
   {
     name: "AWorld",
     description: "Search, understand, reproduce, and improve an idea with ease",
     logo: "/img/landscape/aworld.png",
   }
   ```

Until a `logo` is set, the page renders a dashed "Logo" placeholder box so the
slot is visually reserved.

## Suggested file names

| Layer                       | Project       | Suggested file      |
| --------------------------- | ------------- | ------------------- |
| AI Service                  | Ling Guang    | `ling-guang.png`    |
| AI Service                  | MA XIAO CAI   | `ma-xiao-cai.png`   |
| AI Service                  | AQ            | `aq.png`            |
| AI Service                  | Life Services | `life-services.png` |
| Agent Infra                 | AWorld        | `aworld.png`        |
| Agent Infra                 | AEnvironment  | `aenvironment.png`  |
| Agent Infra                 | ASearcher     | `asearcher.png`     |
| Model Infra                 | cuLA          | `cula.png`          |
| Model Infra                 | Humming       | `humming.png`       |
| Model Infra                 | DLRover       | `dlrover.png`       |
| Model Infra                 | ATorch        | `atorch.png`        |
| Model Infra                 | AReaL         | `areal.png`         |
| Model Infra                 | Asystem       | `asystem.png`       |
| Model Infra                 | dInfer        | `dinfer.png`        |
| Model Infra                 | dFactory      | `dfactory.png`      |
| Model                       | Ling          | `ling.png`          |
| Model                       | Ming          | `ming.png`          |
| Model                       | Ring          | `ring.png`          |
| Model                       | LLaDA         | `llada.png`         |
| Embodied Intelligence Model | LingBot-Depth | `lingbot-depth.png` |
| Embodied Intelligence Model | LingBot-Map   | `lingbot-map.png`   |
| Embodied Intelligence Model | LingBot-VLA   | `lingbot-vla.png`   |
| Embodied Intelligence Model | LingBot-VA    | `lingbot-va.png`    |
| Embodied Intelligence Model | LingBot-World | `lingbot-world.png` |
