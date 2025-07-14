---
title: "Agentic Learning"
date: 2025-04-01T00:00:03+08:00
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


## Introduction

Agent exhibits powerful capabilities by interacting with the external environment and making decisions based on the feedback it receives from the environment.
For complex problems, it is often necessary for an agent to have multi-turn interactions with the environment to reach a solution. The complexity and dynamism of environments, coupled with the necessity for multi-turn interactions, pose numerous challenges in training agents.

We introduce **AgenticLearning**, an open-source agent training paradigm designed to empower researchers to train and evaluate autonomous agents effectively. AgenticLearning offers a framework for multi-turn interactions with the environment, enabling models to learn how to interact with the environment and make decisions based on its feedback, thereby enhancing the models' ability to leverage the environment to solve complex problems.


| Advancements  |  Models |                                         Tools                                         |                   Environment                   |                                                                    Training Framework                                                                    |
|:---------------------------------------------------------------------------------------:|:-------------------------:|:-------------------------------------------------------------------------------------:|:-----------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [**RAG-R1**](https://github.com/inclusionAI/AgenticLearning/blob/main/RAG-R1/README.md) |    Qwen2.5-7b-instruct    | offline retrieval<br>[online search](https://github.com/qingw-dev/aworld-mcp-servers) | [AWorld](https://github.com/inclusionAI/AWorld) | [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)<br>[verl](https://github.com/volcengine/verl)<br>[AReaL](https://github.com/inclusionAI/AReaL) |
|               [**FunReason**](https://github.com/BingguangHao/FunReason/)               | Qwen2.5-7b-Coder-instruct |                                       [BFCL](https://gorilla.cs.berkeley.edu/leaderboard.html#leaderboard)                                        | [AWorld](https://github.com/inclusionAI/AWorld) |                                                        [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)<br>[verl](https://github.com/volcengine/verl)                                                        |

## News

[2025/07/01] 🔥🔥🔥[**RAG-R1**](https://github.com/inclusionAI/AgenticLearning/blob/main/RAG-R1/README.md) We propose **RAG-R1**, a deepsearch training framework that incentivizing the search and reasoning capabilities of LLMs through multi-query parallelism.

[2025/05/16] 🔥🔥🔥[**FunReason**](https://github.com/BingguangHao/FunReason/) We propose **FunReason**, a novel framework that enhances LLMs' function calling capabilities through an automated data refinement strategy and a Self-Refinement Multiscale Loss approach.

## Advancements

### Deepsearch

#### [RAG-R1](https://github.com/inclusionAI/AgenticLearning/blob/main/RAG-R1/README.md)

- Tools: Search Engines (offline or [online](https://github.com/qingw-dev/aworld-mcp-servers))
- LLM: Qwen2.5-7b-instruct

![RAG-R1-framework](https://github.com/inclusionAI/AgenticLearning/raw/main/RAG-R1/assets/RAG-R1.png)

<h5 align="center">Overall framework of RAG-R1.</h5>

![RAG-R1-result](https://github.com/inclusionAI/AgenticLearning/raw/main/RAG-R1/assets/RAG-R1-result.png)

<h5 align="left">Performance comparisons on QA benchmarks under the EM metric. The best and second
best results are bold and underlined, respectively.</h5>

### FunctionCall

#### [FunReason](https://github.com/BingguangHao/FunReason/)

- Tools: Real Human Function calling (BFCLv2 live&non-live)
- LLM: Qwen2.5-7b-Coder-instruct

FunReason is a framework designed to enhance LLMs' function calling capabilities, achieving GPT-4o-comparable performance on BFCL, surpassing RL-based methods, mitigating catastrophic forgetting on HumanEval and MBPP, and using a data refinement strategy where natural CoT data outperforms artificial ones.

![FunReason-Performance](https://github.com/inclusionAI/AgenticLearning/raw/main/FunctionCall/assets/Fun_pipline.png)

<h5 align="center">Data refinement pipline of FunReason.</h5>

**Overview of FunReason's data refinement pipeline.** The pipeline consists of five stages: Function Call Classification, Query and Tool Identification, CoT Identification, Function and Parameter Identification, and Format Identification. Each stage ensures specific aspects of data quality, with failing examples either being discarded or regenerated.

![FunReason-Performance](https://github.com/inclusionAI/AgenticLearning/raw/main/FunctionCall/assets/Fun_per.png)

<h5 align="center">Performance of FunReason.</h5>

### Citation

Please cite our repo if our works are helpful for your research.
```
@article{RAG-R1,
  title={RAG-R1 : Incentivize the Search and Reasoning Capabilities of LLMs through Multi-query Parallelism}, 
  author={Zhiwen Tan and Jiaming Huang and Qintong Wu and Hongxuan Zhang and Chenyi Zhuang and Jinjie Gu},
  journal={arXiv preprint arXiv:2507.02962},
  year={2025}
}

@article{FunReason,
  title={FunReason: Enhancing Large Language Models' Function Calling via Self-Refinement Multiscale Loss and Automated Data Refinement},
  author={Bingguang Hao, Maolin Wang, Zengzhuang Xu, Cunyin Peng, Yicheng Chen, Xiangyu Zhao, Jinjie Gu, Chenyi Zhuang},
  journal={arXiv preprint arXiv:2505.20192},
  year={2025}
}
```

## Contact

For any question or feedback, please reach out to us at [ender.tzw@antgroup.com](mailto:ender.tzw@antgroup.com) or [chenyi.zcy@antgroup.com](mailto:chenyi.zcy@antgroup.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.