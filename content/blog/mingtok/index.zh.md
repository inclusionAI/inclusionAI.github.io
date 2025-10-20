---
title: "Ming-UniVision：在连续的视觉世界里，统一理解与生成"
date: 2025-10-01T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming-UniVision" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-UniVision-16B-A3B">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-UniVision-16B-A3B">ModelScope</a>
# Ming-UniVision：在连续的视觉世界里，统一理解与生成
<video src="https://gw.alipayobjects.com/v/huamei_qlf8jc/afts/video/A*ZBkgTruOxA4AAAAAgyAAAAgAehi-AQ" width="768px" height="580px" controls></video>
---
## 🚀 技术亮点

1.  **业界首个连续统一的视觉令牌化器：**
    **MingTok** 在单一连续潜空间内无缝支持图像理解与生成，彻底消除了量化过程，并有效打通了不同模态。
2.  **首个采用连续视觉 Token 的 NTP 式自回归 MLLM：**
    基于 MingTok，**Ming-UniVision** 在一个共享的“下一词元预测 (NTP)”框架下统一了视觉与语言，实现了对多种视觉任务的端到端自回归建模。
3.  **缓解表征竞争 → 实现 3.5 倍收敛加速：**
    统一的连续表征协同了语义理解与生成的目标，在不牺牲性能的前提下，显著加速了模型的联合训练过程。
4.  **单一特征空间内的多轮上下文学习：**
    所有操作（理解、生成、编辑）均在同一个连续空间内完成，彻底避免了代价高昂的跨空间转换，使得训练与推理过程更简洁、更高效。


## 挑战：‘看’与‘画’的逆向天性

自回归（Autoregression），这种通过“预测下一个 token”来建模世界的强大范式，已经成功统一了语言、音频等多种模态。下一个前沿领域，是将视觉**理解**（看懂图像）与视觉**生成**（画出图像）也纳入这个统一的序列预测框架。

然而，这一宏伟目标面临一个深层的挑战：在很多方面，理解与生成是互为逆向的任务。
*   **理解：** 像素 → 高维、抽象的语义概念
*   **生成：** 概念 → 精细、高保真的像素细节

这两种任务对底层视觉表征有着截然不同，甚至是相互竞争的偏好。

### 为何现有方案存在不足

现有模型尝试通过两种有限的策略来统一它们：
1.  **非对称设计：** 为每个任务使用不同的、异构的特征空间。这导致在多轮交互中，模型必须在不同空间之间进行低效的“往返”，从而引入延迟和工程复杂性。
2.  **共享离散令牌：** 统一了令牌空间，但引入了量化误差。这既损害了生成图像的保真度，也削弱了其理解能力。

### 我们的解决方案：Ming-UniVision 与 MingTok

为了打破这一僵局，我们推出了 **Ming-UniVision**，一个构建于颠覆性创新 **MingTok** 之上的新一代自回归视觉语言模型。

**MingTok** 是首个基于连续潜空间的视觉令牌化器。它提供了一个真正统一且高效的表征，构成了 Ming-UniVision 统一“下一词元预测 (NTP)”框架的基石——在一个统一的上下文学习多模态闭环中，将图像理解、生成和编辑融为一体。

## 核心设计：三段式架构，调和表征竞争

Ming-UniVision 的核心是 **MingTok** 令牌化器，它是一个三段式序列架构，旨在优雅地调和理解与生成对表征的竞争性需求。

![Figure 1: Architecture Comparison](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*VVx0SJQR5K4AAAAARBAAAAgAehi-AQ/original)
*图1：(a) 现有模型使用分离的视觉表征。(b) MingTok 使用统一方案生成语义与生成表征。(c) 这种统一方法带来了超过 3.5 倍的训练收敛加速。*

1.  **低维编码器 (Low-level Encoder)：** 将输入图像映射为一串紧凑、连续的潜码，为高效的自回归生成进行优化。
2.  **语义解码器 (Semantic Decoder)：** 将潜码自回归地“精炼”为与 CLIP 等顶级理解模型对齐的高维语义特征。
3.  **像素解码器 (Pixel Decoder)：** 作为质量保证模块，确保可以从语义特征中高保真地重建原始图像，保证表征过程的高保真度。

> **关键创新：** MingTok 创造了一个统一、可微的接口。用于理解的高维特征可以直接作为下一轮生成或编辑任务的条件，**彻底消除了代价高昂的“像素空间绕行”**。

## 突破：效率的根本性飞跃

通过集成 MingTok，Ming-UniVision 在理解和生成任务上均取得了极具竞争力的结果。其共享的连续潜空间从两个层面实现了效率的根本性提升，解决了困扰以往架构的瓶颈。

![Figure 2: Benchmark Results](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*oi4-RqyoAvIAAAAARPAAAAgAehi-AQ/original)
*图 2：在通用识别任务上，我们的方法性能接近分离表征模型，并显著优于其他统一表征模型。在生成方面，我们的模型在颜色、位置等细粒度控制上表现出明显优势。*

### 1. 训练效率革命：超过 3.5 倍的收敛加速

传统方法在对齐异构表征时会产生“任务竞争”，拖慢学习速度。MingTok 从根本上解决了这个问题。

*   **协同增强：** 我们的实验证明，统一表征不仅避免了性能权衡，反而促进了理解与生成能力的协同增强。
*   **>3.5倍加速：** 由于避免了低效的对齐工作，模型可以将全部精力用于核心任务学习，从而将达到同等性能水平的时间缩短为原来的不到三分之一。

![Figure 3: Pre-training Performance](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*dkPxS4hNZx8AAAAARAAAAAgAehi-AQ/original)
*图3：在使用统一的 MingTok 表征进行联合训练时，其性能与纯生成训练的差距极小，证明了统一方案的优越性。*

### 2. 交互效率革命：告别“像素往返”

多轮交互（如“生成→编辑→再生成”）的效率取决于“理解-生成”循环的速度。这正是传统架构的症结所在。

| 架构类型 | 多轮交互能力 | 核心瓶颈 | 交互路径 | 效率与保真度 |
| :--- | :--- | :--- | :--- | :--- |
| DiT-based Models | ❌ 原生不支持 | 非自回归、无状态 | 不适用 (需完全重启) | 低 |
| 混合/分离架构 | ⚠️ 支持，但低效 | 空间不统一 | `潜码 → 像素 → 特征` | 低、复杂、有信息衰减 |
| **Ming-UniVision** | ✅ **原生且高效**| **统一连续空间** | **`特征 → 特征`** | **高，且高保真** |

如上表所示，任何分离式架构都无法摆脱低效的 `潜码 → 像素 → 特征` 往返宿命。这种“像素绕行”不仅延迟巨大，还会导致上下文信息在多轮传递中不断衰减。

**Ming-UniVision** 实现了 **`特征 → 特征` 的直接闭环**。来自理解任务的高维特征可以直接被下一轮生成任务无缝利用，解锁了真正连贯的多模态序列建模。这使得过去需要多个专用模型才能完成的任务，如今可以在一个统一框架内自然涌现：

*   **迭代式图像增强：** 先执行超分辨率，然后直接在结果之上继续上色或去噪。
*   **生成式思维链：** 先执行一个理解任务（如“分割出图中的汽车”），然后直接对该区域应用编辑指令。

![Figure 4: Multi-turn Interaction Demo](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*B3ckSaNK1cMAAAAARzAAAAgAehi-AQ/original)
*图4：“超分→上色”和“分割→编辑”等多轮任务，现在可以在一个无缝的流程中完成。*

理解、生成与编辑，不再是孤立的管道，而是被编织在一场**连续的视觉对话**之中。

---

## 总结与展望

我们相信，像 MingTok 这样统一、连续的视觉表征，为构建更灵活、更直观、更接近人类认知方式的多模态交互系统开辟了新的可能性。

我们深知这只是漫长探索中的一步。我们已将代码和初步的模型权重开源，希望能为社区提供一个可用的基石，并激发更多关于统一表征的讨论。我们期待与业界同仁交流学习，共同推动多模态人工智能的发展。

### 项目链接

*   **GitHub:** (https://github.com/inclusionAI/Ming-UniVision)
*   **技术报告:** (https://arxiv.org/pdf/2510.06590)
*   **模型链接:** <a href="https://huggingface.co/inclusionAI/Ming-UniVision-16B-A3B">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-UniVision-16B-A3B">ModelScope</a>


