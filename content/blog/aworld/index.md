---
title: "AWorld: The Agent Runtime for Self-Improvement"
date: 2025-07-07T00:00:03+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
# draft: true
# comments: false
# description: "Desc Text."
# disable_share: false
# hide_meta: false
# hide_summary: false # to hide summary in list
# hide_footer: false
math: true
# search_hidden: false # to hide from search page
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
# use_hugo_toc: true
# show_toc: true
# toc_open: true # default expand all
# cover:
#     image: "path"
#     # can also paste direct link from external site
#     # ex. https://i.ibb.co/K0HVPBd/paper-mod-profilemode.png
#     alt: "<alt text>"
#     caption: "<text>"
#     relative: true # To use relative path for cover image, used in hugo Page-bundles
#     responsive_images: true
#     hidden: false
# header:
#   background: "" # background css value
#   background_image: ""
#   gradient: false
#   blur: false
---



*"Self-awareness: the hardest problem isn't solving within limits, it's discovering the own limitations"*
[![Twitter Follow](https://img.shields.io/twitter/follow/AWorld_AI?style=social)](https://x.com/InclusionAI666)
[![WeChat QR Code](https://img.shields.io/badge/WeChat-Add%20us-green?logo=wechat&logoColor=white)](https://raw.githubusercontent.com/inclusionAI/AWorld/main/readme_assets/aworld_wechat_qr.jpg)
[![Discord](https://img.shields.io/badge/Discord-Join%20us-blue?logo=discord&logoColor=white)](https://discord.gg/b4Asj2ynMw)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DeepWiki](https://img.shields.io/badge/DeepWiki-Explore-blueviolet?logo=wikipedia&logoColor=white)](https://deepwiki.com/inclusionAI/AWorld)
<!-- [![arXiv](https://img.shields.io/badge/arXiv-xxxx.xxxxx-b31b1b.svg)](https://arxiv.org/abs/xxxx.xxxxx) -->



## Table of Contents
- [News](#news) — Latest updates and announcements.
- [Introduction](#introduction) — Overview and purpose of the project.
- [Installation](#installation) — Step-by-step setup instructions.
- [Quick Start](#quick-start) — Get started with usage examples.
- [Architecture](#architecture) — Explore the multi-agent system design.
- [Demo](#demo) — See the project in action with demonstrations.
- [Contributing](#contributing) — How to get involved and contribute.
- [License](#license) — Project licensing details.

## News
- 🦤 [2025/07/07] AWorld, as a runtime, is now ready for agentic training. See [Self-Improvement section](#self-improvement-with-diverse-runtimes) for details. We have updated our score to 77.08 on the GAIA test. Learn how to construct a GAIA runtime in the [Demo section](#demo-of-gaia-agent-runtime).
- 🦩 [2025/06/19] We have updated our score to 72.43 on the GAIA test. Additionally, we have introduced a new local running mode. See `./README-local.md` for detailed instructions.
- 🐳 [2025/05/22] For quick GAIA evaluation, MCP tools, AWorld, and models are now available in a single Docker image. See <code>./README-docker.md</code> for instructions and [youtube video](https://www.youtube.com/watch?v=kkYWeVvJKrg) for demo.
- 🥳 [2025/05/13] AWorld has updated its state management for browser use and enhanced the video processing MCP server, achieving a score of 77.58 on GAIA validation (Pass@1 = 61.8) and maintaining its position as the top-ranked open-source framework. Learn more: [GAIA leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard)
- ✨ [2025/04/23] AWorld ranks 3rd on GAIA benchmark (69.7 avg) with impressive Pass@1 = 58.8, 1st among open-source frameworks. Reproduce with <code>python examples/gaia/run.py</code>


## Introduction
AWorld (Agent World) is a multi-agent playground that enables agents to collaborate and self-improve. The framework supports a wide range of applications, including but not limited to product prototype verification, foundation model training and Multi-Agent System (MAS) design meta-learning.

### Runtime Key Features
| 1. Agent Construction | 2. Topology Orchestration | 3. Environments |
|----------------------|--------------------------|-----------------|
| • ✅ Support for various model services <br> • ✅ Integration with MCP tools <br> • ✅ Custom tool support | • ✅ Protocol encapsulation between models and tools <br> • ✅ Protocol encapsulation among agents | • ✅ Runtime state management <br> • ✅ State tracing support <br> • ✅ Distributed, high-concurrency environments for training |

### Self-Improvement with Diverse Runtimes
By constructing diverse runtime environments (with tools, agents, or models in them), AWorld aims to find the limitations of a model and push intelligence forward. Here we will record some of our work to prove the effectiveness of our proposal.

| Category | Runtime | Performance | Key Information |
|-----|----------------|-------------|--------------|
| Tool Use | Function call runtime to be released | Competitive on BFCL benchmark  <br> ![Agent Framework](https://github.com/inclusionAI/AWorld/raw/main/readme_assets/funReason_BFCL.png) | [![Dataset](https://img.shields.io/badge/Dataset-Coming%20Soon-007ACC?style=for-the-badge&logo=dataset&logoColor=white)]() <br> [![Model](https://img.shields.io/badge/Model-Hugging%20Face-FF6B6B?style=for-the-badge&logo=huggingface&logoColor=white)](https://huggingface.co/Bingguang/FunReason) <br> [![Paper](https://img.shields.io/badge/Paper-arXiv-B31B1B?style=for-the-badge&logo=arxiv&logoColor=white)](https://arxiv.org/pdf/2505.20192) <br> [![Blog](https://img.shields.io/badge/Blog-Coming%20Soon-FF5722?style=for-the-badge&logo=blogger&logoColor=white)]() <br> [![Code](https://img.shields.io/badge/Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BingguangHao/FunReason)|
| Deep Search | Search runtime to be released | SOTA on HotpotQA benchmark  <br> ![Agent Framework](https://github.com/inclusionAI/AWorld/raw/main/readme_assets/HotpotQA_chart.png) | [![Dataset](https://img.shields.io/badge/Dataset-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/inclusionAI/AgenticLearning) <br> [![Model](https://img.shields.io/badge/Model-Hugging%20Face-FF6B6B?style=for-the-badge&logo=huggingface&logoColor=white)](https://huggingface.co/collections/endertzw/rag-r1-68481d7694b3fca8b809aa29) <br> [![Paper](https://img.shields.io/badge/Paper-arXiv-B31B1B?style=for-the-badge&logo=arxiv&logoColor=white)](https://arxiv.org/abs/2507.02962) <br> [![Code](https://img.shields.io/badge/Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/inclusionAI/AgenticLearning)|

### Demo of GAIA Agent-Runtime
![GAIA Agent Runtime Demo](https://github.com/inclusionAI/AWorld/raw/main/readme_assets/gaia_demo.gif)

Here we first introduce the **GAIA runtime**, which can be constructed on your local computer. It can be used for:

- **Product prototype verification**
- **Self-improvement training** (See [training pipeline](#backward) for details)

Follow the instructions in [`./examples/gaia/README.md`](https://github.com/inclusionAI/AWorld/blob/main/examples/gaia/README.md) to initialize the GAIA agent runtime and run the demo shown above.

> **Want to build your own multi-agent system? Check out the detailed tutorials below to get started! ⬇️⬇️⬇️** 

## Installation
 Python>=3.11:
```bash
git clone https://github.com/inclusionAI/AWorld
cd AWorld
python setup.py install
```

## Quick Start
> Here's a quick start guide to: (1) create your first agent; (2) equip it with a MCP tool; (3) assign a teammate; and (4) answer a user query through teamwork.

```python
from aworld.config.conf import AgentConfig
from aworld.agents.llm_agent import Agent
from aworld.runner import Runners
from aworld.core.agent.swarm import Swarm

if __name__ == '__main__':
    agent_config = AgentConfig(
        llm_provider="openai",
        llm_model_name="gpt-4o",

        # Set via environment variable or direct configuration
        # llm_api_key="YOUR_API_KEY", 
        # llm_base_url="https://api.openai.com/v1"
    )

    # Register the MCP tool here, or create a separate configuration file.
    mcp_config = {
        "mcpServers": {
            "amap-amap-sse": {
                "type": "sse",
                "url": "https://mcp.amap.com/sse?key=YOUR_API_KEY",
                "timeout": 5,
                "sse_read_timeout": 300
            }
        }
    }

    # Create your first agent equipped with an MCP tool
    search = Agent(
        conf=agent_config,
        name="search_agent",
        system_prompt="You are a helpful agent.",
        mcp_servers=["amap-amap-sse"], # MCP server name for agent to use
        mcp_config=mcp_config
    )

    # Add a new teammate to the agent
    summary = Agent(
        conf=agent_config,
        name="summary_agent",
        system_prompt="You are a helpful summary agent."
    )

    # Collaborate as a team; the default is a static workflow
    swarm = Swarm(search, summary)

    # Run agent team
    res = Runners.sync_run(input="Hotels within 1 kilometer of West Lake in Hangzhou",
                     swarm=swarm)
    print(res)
```

## Architecture
AWorld is designed to achieve two primary objectives: (1) provide an efficient forward process, and (2) facilitate diverse backward processes, including but not limited to foundation model training and system design meta-learning.

### Forward
> An illustration of the runtime, showing the message workflow when Agent1 receives a query from a user.

![](https://github.com/inclusionAI/AWorld/raw/main/readme_assets/runtime.jpg)

### Backward
> During training, an action-state rollout demonstration using AWorld's distributed environments.

![](https://github.com/inclusionAI/AWorld/raw/main/readme_assets/agent_training2.jpg)

<!-- > An illustration of training code that seamlessly integrates the learning framework (Swift, in this example) with AWorld as the environment.

```python
# git clone **
# git apply diff_patch
# run the code

``` -->

## Demo
> Running Pre-defined Agents (e.g., see [demo code](https://github.com/inclusionAI/AWorld/blob/main/examples/browsers/run.py)). Below are demonstration videos showcasing AWorld's capabilities across various agent configurations and environments.


<table>
  <tr>
    <th>Mode</th>
    <th>Type</th>
    <th>Demo</th>
  </tr>
  <tr>
    <td rowspan="2">Single Agent</td>
    <td>Browser use</td>
    <td>
      <a href="https://www.youtube.com/watch?v=R7keOLrRDoM" target="_blank">
        <img src="https://img.youtube.com/vi/R7keOLrRDoM/0.jpg" alt="AWorld Browser Demo on YouTube" width="95%">
        <br>
        <p align="center">▶️ Watch Browser Demo on YouTube</p>
      </a>
    </td>
  </tr>
  <tr>
    <td>Phone use</td>
    <td>
      <a href="https://www.youtube.com/watch?v=TYh3iqDeIoQ" target="_blank">
        <img src="https://img.youtube.com/vi/TYh3iqDeIoQ/0.jpg" alt="AWorld Mobile Demo on YouTube" width="95%">
        <br>
        <p align="center">▶️ Watch Mobile Demo on YouTube</p>
      </a>
    </td>
  </tr>
  <tr>
    <td rowspan="3">Multi Agent</td>
    <td>Cooperative Teams</td>
    <td>
       <a href="https://www.youtube.com/watch?v=sEsgasRrlTs" target="_blank">
        <img src="https://img.youtube.com/vi/sEsgasRrlTs/0.jpg" alt="AWorld Travel Demo on YouTube" width="95%">
        <br>
        <p align="center">▶️ Watch Travel Demo on YouTube</p>
      </a>
    </td>
  </tr>
  <tr>
    <td>Competitive Teams</td>
     <td>
       <a href="https://www.youtube.com/watch?v=_CPdhoP4YTg" target="_blank">
        <img src="https://img.youtube.com/vi/_CPdhoP4YTg/0.jpg" alt="AWorld Debate Demo on YouTube" width="95%">
        <br>
        <p align="center">▶️ Watch Debate Arena on YouTube</p>
      </a>
    </td>
  </tr>
  <tr>
    <td>Mixed of both Teams</td>
    <td align="center"><i>Coming Soon</i> 🚀</td>
  </tr>
</table>


## Contributing
We warmly welcome developers to join us in building and improving AWorld! Whether you're interested in enhancing the framework, fixing bugs, or adding new features, your contributions are valuable to us.

For academic citations or wish to contact us, please use the following BibTeX entry:

```bibtex
@software{aworld2025,
  author = {Agent Team at InclusionAI},
  title = {AWorld: Enabling Agent Self-Improvement through Interactive Experience with Dynamic Runtime},
  year = {2025},
  url = {https://github.com/inclusionAI/AWorld},
  version = {0.1.0},
  publisher = {GitHub},
  email = {chenyi.zcy at antgroup.com}
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Star History
![](https://api.star-history.com/svg?repos=inclusionAI/AWorld&type=Date)