---
title: "Introducing Ring-lite V1.5"
date: 2025-08-02T00:00:03+08:00
weight: 1
math: true
draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

## Overview
We present Ring-lite-0731, a Mixture-of-Experts (MoE)-based large language model optimized via reinforcement learning (RL) to achieve efficient and robust reasoning capabilities. Built upon the publicly available Ling-lite model, a 16.8 billion parameter model with 2.75 billion activated parameters, our approach matches the performance of state-of-the-art (SOTA) small-scale reasoning models on challenging benchmarks (e.g., AIME, LiveCodeBench, GPQA-Diamond) while activating only one-third of the parameters required by comparable models. To accomplish this, we introduce a joint training pipeline integrating distillation with RL, revealing undocumented challenges in MoE RL
training. First, we identify optimization instability during RL training, and we propose Constrained Contextual Computation Policy Optimization(C3PO), a novel approach that enhances training stability and improves computational throughput via algorithm-system co-design methodology. Second, we empirically demonstrate that selecting distillation checkpoints based on entropy loss for RL training, rather than validation metrics, yields superior performance-efficiency trade-offs in subsequent RL training. Finally, we develop a two-stage training paradigm to harmonize multi-domain data integration, enhancing reasoning ability while effectively improving performance across various downstream general tasks.

**Highlights**

+ 🚀 **Reasoning Model with only 2.75B activated parameters**: Our model is built upon a Mixture-of-Experts (MoE)-based large language model with only 2.75 billion activated parameters;
+ 🚀 **High-performance across Benchmarks**: We achieve comparable performance.[TODO]
+ 🚀 **Fully Open-Source**: We fully release our datasets and model weights.
+ 🚀 **Fusion with Two-Stage RL**: We integrate two-stage RL to improve comprehensive abilities on both reasoning and general tasks. 


## Contextual Computation Policy Optimization(C3PO)
We introduce <u>C</u>onstrained <u>C</u>ontextual <u>C</u>omputation <u>P</u>olicy <u>O</u>ptimization(C3PO), an innovative token-level optimization framework designed to mitigate training instability while enhancing throughput consistency. 
<div style="text-align:left;margin: auto; width:80%;">
  <img src="./pics/c3po.jpg" alt="Image description" />
  <p style="font-size:10px; color:gray;">C3PO</p>
</div>

## SFT and RL



## Training Data
<div style="text-align:left;margin: auto; width: 100%;">
  <img src="./pics/data-pipeline.png" alt="Image description" />
  <p style="font-size:14px; color:gray;">Data Pipeline</p>
</div>

### Reasoning Data
Compared to our Ring-lite, we additionaly increase the difficulty of our reasoning data, include vairous logical games, such as [TODO].  

### General Data
Different from previous released version ring-lite, our Ring-lite-V1.5 has significantly improved its performance upon a wide range of LLM benchmarks. Our model not only excels at reasoning-related tasks, but also shows competitive performance on various general tasks.  

## Training Pipeline

<div style="text-align:left;margin: auto; width: 100%;">
  <img src="./pics/pipeline.png" alt="Image description" />
  <p style="font-size:14px; color:gray;">Training Pipeline</p>
</div>

### Reasoning RL
We apply RL on various reasoning tasks, including math, stem, code, logical games. 
[TODO]: math/code lift difficulty and sources
[TODO]: STEM verifiers
[TODO]: introduce logical games and verifiers.

### General RL
Our general RL training incorporates various sources of general tasks, including instruction following, question asnwering, text summarizaiton, ect. We first apply general RL training with both a strong reward model and rule-based verifier. 

[TODO]: rule-based verifier for instruction following/words count limitation
[TODO]: reward model: open-form question

## Evaluation

### Ring-lite

#### Reasoning Benchmarks



## Citation

```bibtex
@misc{lingteam2025ringlitescalablereasoningc3postabilized,
      title={Ring-lite: Scalable Reasoning via C3PO-Stabilized Reinforcement Learning for LLMs}, 
      author={Ling Team and Bin Hu and Cai Chen and Deng Zhao and Ding Liu and Dingnan Jin and Feng Zhu and Hao Dai and Hongzhi Luan and Jia Guo and Jiaming Liu and Jiewei Wu and Jun Mei and Jun Zhou and Junbo Zhao and Junwu Xiong and Kaihong Zhang and Kuan Xu and Lei Liang and Liang Jiang and Liangcheng Fu and Longfei Zheng and Qiang Gao and Qing Cui and Quan Wan and Shaomian Zheng and Shuaicheng Li and Tongkai Yang and Wang Ren and Xiaodong Yan and Xiaopei Wan and Xiaoyun Feng and Xin Zhao and Xinxing Yang and Xinyu Kong and Xuemin Yang and Yang Li and Yingting Wu and Yongkang Liu and Zhankai Xu and Zhenduo Zhang and Zhenglei Zhou and Zhenyu Huang and Zhiqiang Zhang and Zihao Wang and Zujie Wen},
      year={2025},
      eprint={2506.14731},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2506.14731}, 
}
```