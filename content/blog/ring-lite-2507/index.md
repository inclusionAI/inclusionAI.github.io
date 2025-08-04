---
title: "Introducing Ring-lite-2507"
date: 2025-08-02T00:00:03+08:00
weight: 1
math: true
#draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

## Overview
We present **Ring-lite-2507**, an upgraded version of our previously released lightweight reasoning model, **Ring-lite**. Building upon **16.8B** Mixture-of-Experts (MoE)-based large language model with **2.75B** activated parameters, **Ring-lite-2507** further pushes its reasoning ability to an advanced level, meanwhile, it demonstrates superior performance on a comprehensive range of LLM benchmarks, including general text understanding, alignment, coding, logical and agentic tasks. Thanks to our innovative and robust reinforcement learning training pipeline, **Ring-lite-2507** distinguished itself from latest public dense models under 10B parameters by showing competitive performance across various tasks while activating only **1/3** of their parameter size.  

To address the optimization instability of MoE RL training, we propose a novel approach, Constrained Contextual Computation Policy Optimization(C3PO), which enhances training stability and improves computational throughput via algorithm-system co-design. Meanwhile, we systematically investigate the dynamic relations between long-chain-of-thought SFT and RL training, surrendering the optimal practice for selecting the suitable fine-tuned model for RL scaling, rather than soley on the validation metrics, yields superior performance-efficiency trade-offs in our RL training pipeline. Finally, we develop a two-stage training paradigm to harmonize multi-domain data integration, enhancing reasoning ability while effectively improving performance across various downstream general tasks.


**Highlights**

+ 🚀 **Superior performance across tasks**: Ring-lite-2507 demonstrates outstanding performance across both reasoning and general tasks;
+ 🔥 **Only 2.75B activated parameters**: Ring-lite-2507 is built upon a Mixture-of-Experts (MoE)-based large language model with only 2.75 billion activated parameters;
+ ⛓️‍💥 **Algorithm-system co-design**: We proposed novel C3PO approach and employ token efficiency to improve training stability and effectiveness;
+ 🔍 **Publicly available**: We fully release our training recipe and model weights.


## Evaluation

We evaluate our models comprehensively across two core domains: reasoning domamin and general domain, using a diverse set of public benchmarks categorized by their primary measured capability.

### Knowledge Understanding

| **Benchmark**   | **Ring-lite-0731** | **Ring-lite** | **Qwen3-8B-Thinking** 
| :-------------: | :---------------: | :-----------: | :-------------------: | 
| MMLU-Pro (EM)         | 72.50	    | 63.44	    | **72.56** | 
| GPQA-Diamond (Pass@1) | **69.35**	    | 63.51	    | 62.00 | 
| SuperGPQA (EM)        | 40.05	    | 13.97	    | **40.36** | 
| SimpleQA (Correct)    | 3.65	    | 1.50	    | **4.67**  |           
| ARC-c (Pass@1)        | **94.66**	    | 73.18	    | 93.47 | 
| Phybench (Pass@1)     | 28.51	    | **29.19**    | 22.14 |    


### Math

| **Benchmark**   | **Ring-lite-2507** | **Ring-lite-2506** | **Qwen3-8B-Thinking** 
| :-------------: | :---------------: | :-----------: | :-------------------: | 
| MATH-500 (Pass@1)             |   **97.95**	|   96.80	|   97.30       |
| CNMO 2024 (Pass@1)            |   75.09	|   **77.26**	|   74.57       |
| AIME 2024 (Pass@1)            |   **79.79**	|   79.00	|   74.90       |
| AIME 2025 (Pass@1)            |   **72.92**	|   69.50	|   67.19       |
| LiveMathBench (Pass@1)        |   83.37	|   **85.08**	|   81.90       |
| TheoremQA (Pass@1)            |   70.00	|   **70.19**	|   68.81       |
| OlympiadBench (math) (Pass@1) |   80.64	|   **82.86**	|   80.20       |

### Coding 

| **Benchmark**   | **Ring-lite-2507** | **Ring-lite-2506** | **Qwen3-8B-Thinking** 
| :-------------: | :---------------: | :-----------: | :-------------------: |
| LiveCodeBench(2408-2505) (Pass@1)     |**60.35**	    |   59.53   |	55.12   |
| Codeforces(Percentile) (Pass@1)       |**1830**	    |   1673    |	1580    |
| Codeforces(Rating)                    |**92.16**	    |   88.00   |	79.44   |

### Reasoning \& Agentic

| **Benchmark**   | **Ring-lite-2507** | **Ring-lite-2506** | **Qwen3-8B-Thinking** 
| :-------------: | :---------------: | :-----------: | :-------------------: | 
| DROP (zero-shot F1)    |   **89.27**  	  | 60.21   |	87.13   |
| BBH (EM)               |   **88.65**	  | 50.84   |	87.30   |
| ARCPrize (Pass@1)      |   **19.00**	  | 3.12    |	3.88    |
| MuSR (EM)              |   **77.19**	  | 66.77   |	76.92   |
| BFCL_Live (Pass@1)     |   74.81	  | 66.76   |	**75.99**   |

### Alignment

| **Benchmark**   | **Ring-lite-2507** | **Ring-lite-2506** | **Qwen3-8B-Thinking** 
| :-------------: | :---------------: | :-----------: | :-------------------: | 
| IFEval (Prompt Strict)    |   84.66   |   54.34   |	**85.40**   |
| AlignBench v1.1(gpt-4.1)  |   **80.90**   |	69.60   |	74.70   |
| FoFo (gpt-4-turbo)        |   **85.02**	|   67.81   |	81.93   |
| ArenaHard (gpt-4.1)       |   **88.85**	|   56.12   |	86.14   |


## Constrained Contextual Computation Policy Optimization(C3PO)
We introduce <u>C</u>onstrained <u>C</u>ontextual <u>C</u>omputation <u>P</u>olicy <u>O</u>ptimization(C3PO), an innovative token-level optimization framework designed to mitigate training instability while enhancing throughput consistency. Different from sampling-level filtering, C3PO operates at the token level by sampling tokens to form a token-level global batch, each training step maintains consistent token input to optimizer, which results in reduced gradient variance and consequently achieving stable optimization.

<div style="text-align:center;margin: auto; width:400px;">
  <img src="./assets/C3PO_overview_formal.png" alt="Image description" />
  <p style="font-size:14px; color:gray;">C3PO</p>
</div>

## Balancing Token efficiency between Distillation and RL
While distillation is effective, we find it requires more training tokens to achieve comparable performance compared to RL training. 
Instead, we observe that varying the number of training epochs of the distilled model significantly influences the trend of entropy loss, thereby determining the exploration scope for RL. Based on our experiments, increasing the number of SFT training epochs leads to a rapid collapse of entropy. However, insufficient SFT training inevitably results in inferior performance. To systematically quantify the choice of optimal SFT epoch, we employ token efficiency to determine the suitable checkpoint for RL scaling.


## Training Data
We follow a stringent data processing pipeline.
<div style="text-align:center;margin: auto; width: 500px;">
  <img src="./assets/data-pipeline.png" alt="Image description" />
  <p style="font-size:14px; color:gray;">Data Pipeline</p>
</div>

## Training Pipeline
<div style="text-align:center;margin: auto; width: 400px;">
  <img src="./assets/0731-pipeline.png" alt="Image description" />
  <p style="font-size:14px; color:gray;">Training Pipeline</p>
</div>

### Reasoning RL
Compared to our Ring-lite, we expand our reasoning dataset by incorporating more chanlleging math, coding and STEM dataset. Sepecifically, we adopted 67K math data, 32K coding data, 9.9K scientific data for reasoning RL training. In addition, we amplify our reasoning dataset by including more than 19K logical games, such as ARC-AGI, Countdown, sudoku, AlphaMaze, etc. For each type of problems, we specifically design the suitable reward function to make sure our training examples are verifiable. We apply RL on various reasoning tasks, including math, stem, code, logical games. 


### General RL
Except for reasoning tasks, our Ring-lite-0731 has significantly expanded the collection of general RL training dataset. Our general RL does not sacrifices performance on reasoning tasks, instead, it imporved the overal text understanding ability across a broad range of general benchmarks. 
Our general RL training incorporates various sources of general tasks, including instruction following, question answering, text summarizaiton, ect. For open-formed question, we adopt a strong reward model to assign reward scores for the problems. Besides, we also incorporated rule-based verifier to tackle problems which can be easily verified, such as the instruction-following problems. 



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
