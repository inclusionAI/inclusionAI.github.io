---
title: "Ming-Lite-Omni V1.5 介绍"
date: 2025-07-18T00:00:03+08:00
weight: 1
math: true
draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-Lite-Omni-1.5">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni-1.5">ModelScope</a>



## 前言
本次发布的 Ming-lite-omni V1.5 是对 Ming-lite-omni (🤗<a href="https://huggingface.co/inclusionAI/Ming-Lite-Omni">Hugging Face</a>) 全模态能力的一次全面升级, 在包括图文理解、文档理解、视频理解、语音理解和合成、图像生成和编辑等任务上均有明显提升。Ming-lite-omni V1.5 基于Ling-lite-1.5 构建，总参数20.3B, MoE部分激活参数为3B，在各模态基准测试中取得较好的成绩。下面是我们本次更新在部分重要指标和模型架构上的提升的展示。


<div style="text-align:center;margin: auto; width: 70%;">
  <img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/2rsRTbFpQrcAAAAAZoAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
  <p style="font-size:14px; color:gray;">性能对比图</p>
</div>


<div style="text-align:center">
  <img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/A_LZTJcsc3EAAAAAXuAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
  <p style="font-size:14px; color:gray;">模型架构图</p>
</div>




## 详细介绍
为了实现这样的提升，我们将自研方案与学术界/开源社区的最新进展相结合，在以下几个部分做了有效尝试，并取得多个重要结论。

**图像/语音生成**

1. 图像生成侧采用<u>双分支解耦策略</u>提升模型对参考图的可学习参数量。具体来说，在图像进入 DiT 之前，我们使用不同的权重对参考图像与噪声图像分别进行处理，并增加额外两层transformer layers作为refiner进一步增强这一效果。
2. 为了解决图像编辑时的人物ID及场景ID一致性问题，我们新增了<u>ID & Scene Consistency Loss</u>，增大目标图编辑区域的权重、增大参考图非编辑区域的参考强度、降低参考图编辑区域的参考强度。
3. 引入<u>感知增强策略</u>。通过优化结构感知能力，如分割和关键点检测，提升模型对画面细节和空间关系的理解，增强编辑和生成过程的结构可控性，显著提高评测指标中与位置、结构、数量相关的得分，详见 [表A](#table1)。
4. 引入<u>多任务协同学习策略</u>。通过联合训练链路实现生成与编辑的相互促进，将分割任务转化为彩色上色编辑任务，显著提升分割指标和图像局部编辑的精度与可控性，使编辑区域边缘更光滑。
5. 语音生成解码器方面，我们实现了全新的音频解码器，直接接受来自LLM的输出特征实现上下文感知。
6. 语音生成效率方面，为了提高韵律性能和实时生成能力，我们将离散的Audio codec token进行BPE编码，使得音频帧率降低了35%。
7. 全方位数据升级
    - 获取高质量人物图像数据，标准包括：图像分辨率/质量、人脸细粒度、人脸大小等。
    - 采集名人数据，并做质量筛选和人脸裁剪获取名人图像数据。
    - 构建边缘图、分割图、文字图、人物表情图等训练子集，扩充模型能力边界。

**图像/文本/视频/语音理解**

1. MRoPE 时空感知位置编码。引入了MRoPE，通过时间、高度、宽度三维分块位置编码，赋予模型时空感知能力，实现高效跨模态联合建模，提升对视频、复杂图像场景的理解精度。
2. 高效全参数训练策略。优化学习率与多模态数据配比，将理解阶段需<u>分步冻结/解冻 LLM 的预训练流程</u>，升级为<u>高效全参数训练</u>，训练周期缩短 26.5%，保持性能无损。
3. 针对视频理解任务，采用从短视频到长视频的课程学习策略，逐步提升模型处理长视频的复杂度。
4. 针对复杂文档理解任务，引入 Chain-of-Thought 策略分步骤构建结构化推理路径，有效提升模型对复杂问题的解决能力。
5. 全方位数据升级  
    - 预训练阶段
      - 新增文本实体结构化数据，补全图谱盲区。
      - 扩充高质量商品数据，提升通识能力。
    - 指令微调阶段
      - 提升细粒度视觉感知（目标计数/颜色/场景识别）数据精准性。
      - 提高垂类识别（动植物/车辆/食材等）数据深度。
      - 从数据角度优化跨学科复杂图文推理能力。
      - 针对语音理解任务，将领域、主题、语种（包括方言）等信息引入到语音理解任务的指令文本中，增强模型的理解表现，实现对中英文，粤语，四川话，上海话，闽南语等方言的全面支持。

**用户偏好对齐**

为了保证我们模型的真实使用体验与常用Benchmark上的提升一致，我们自建了<u>体验评测集</u>，在内部进行多模型的人工对抗评分。得益于高质量的对齐偏好数据构建， Ming-lite-omni v1.5 在图文问答的内容准确性（低幻觉率）、相关性、格式美观性以及表述流畅性方面相比领先模型展现出一定优势， Ming-lite-omni v1.5在内部对抗评测集上相比Ming-lite-omni v1 胜和率为 87.07%, 使用体验得到了明显优化。  



<!-- | 评测维度          | Qwen2.5-VL-7B | Ming-Omni-Lite V1.5 |
|:---------------:|:---------------:|:---------------:|
| 相关性   | 4.308         | 4.5            |
| 流畅性   | 4.765         | 4.91           |
| 内容丰富性 | 3.828         | 3.69           |
| 格式合理性 | 4.727         | 4.8            |
| 正确性   | 3.741         | 3.92           |
| **均分**            | **4.274**         | **4.365**          | -->



<div style="text-align: center; margin: auto; width: 80%; line-height: 1.1;">
  <table style="margin: 0 auto;">
    <thead>
      <tr>
        <th style="text-align: center;padding: 5px;">自建体验集评测维度</th>
        <th style="text-align: center;padding: 5px;">Qwen2.5-VL-7B</th>
        <th style="text-align: center;padding: 5px;">Ming-Omni-Lite V1.5</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center;padding: 2px;">相关性</td>
        <td style="text-align: center;padding: 2px;">4.308</td>
        <td style="text-align: center;padding: 2px;">4.5</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">流畅性</td>
        <td style="text-align: center;padding: 2px;">4.765</td>
        <td style="text-align: center;padding: 2px;">4.91</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">内容丰富性</td>
        <td style="text-align: center;padding: 2px;">3.828</td>
        <td style="text-align: center;padding: 2px;">3.69</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">格式合理性</td>
        <td style="text-align: center;padding: 2px;">4.727</td>
        <td style="text-align: center;padding: 2px;">4.8</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">正确性</td>
        <td style="text-align: center;padding: 2px;">3.741</td>
        <td style="text-align: center;padding: 2px;">3.92</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;"><strong>均分</strong></td>
        <td style="text-align: center;padding: 2px;"><strong>4.274</strong></td>
        <td style="text-align: center;padding: 2px;"><strong>4.365</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<br>

## Demo展示
### 图像编辑
为了解决图像编辑时的人物ID及场景ID一致性问题，我们新增了<u>ID & Scene Consistency Loss</u>，增大目标图编辑区域的权重、增大参考图非编辑区域的参考强度、降低参考图编辑区域的参考强度。
<div style="text-align:center">
<img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/e-mDS5UyUogAAAAAgCAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
<video src="https://gw.alipayobjects.com/v/huamei_aukff7/afts/video/UoqbRYQnZYEAAAAAgCAAAAgAeuUHAQFr" controls></video>
</div>

{{< fullwidth class="example-container" >}}
{{< example data="cases/seg.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}

<!-- 
引入<u>多任务协同学习策略</u>。通过联合训练链路实现生成与编辑的相互促进，将分割任务转化为彩色上色编辑任务，显著提升分割指标和图像局部编辑的精度与可控性，使编辑区域边缘更光滑：

<a id="image1"></a>
<div style="text-align:center">
  <img src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/0.webp" alt="Image description" />
  【待补充】
  <p style="font-size:14px; color:gray;">图A【占位】</p>
</div> -->

### 图像生成

引入<u>感知增强策略</u>。通过优化结构感知能力，如分割和关键点检测，提升模型对画面细节和空间关系的理解，增强编辑和生成过程的结构可控性，显著提高GenEval评测指标中与位置、结构、数量相关的得分：
<a id="table1"></a>
|   | 1-Obj | 2-Obj | Counting | Colors | Position | Color Attr | Avg. |
|---| :---:   | :---:   | :---:      | :---: |:---: |:---: |:---: |
|Ming-lite-omni| 0.99   | 0.77   | 0.68      | 0.78 | 0.46 |0.42 |0.64 |
|Ming-lite-omni V1.5| 0.99   | 0.93   | 0.86      | 0.87 |0.90 |0.66 |0.87 |  

| 原图 | 生成的深度图 | 生成的检测框 | 生成的边缘轮廓 |
| :---: | :---: | :---: | :---: |
| ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466889319-bd19acce-c07d-4664-9890-41e4dff1ba8d.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466903529-996bcd35-a9a0-484b-98bf-2f2468f4df42.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466895795-1955ead5-6d94-4142-8d7b-e265352d2bcb.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752467020122-ad8b436c-bb33-4ef0-85b8-cf45ae8c9be1.webp) |


{{< fullwidth class="example-container" >}}
{{< example data="cases/chat.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}


### 语音合成

| 输入文本 | Ming-lite-omni | Ming-lite-omni V1.5 |
| --- | :---: | :---: |
| Tyler, Lucy, Michelle, we're going to space! | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en1_v1.wav" type="audio/wav"></audio>  | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en1_v1.5.wav" type="audio/wav"></audio>  |
| what is the forecast for California for rain | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en2_v1.wav" type="audio/wav"></audio>  | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en2_v1.5.wav" type="audio/wav"></audio>  |
| Television can make you dumb, but it can also be good education. | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en3_v1.wav" type="audio/wav"></audio>  | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en3_v1.5.wav" type="audio/wav"></audio>  |



{{< fullwidth class="example-container" >}}
{{< example data="cases/ocrchat.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}





## 开始使用 Ming-lite-omni v1.5

<!-- Ming-lite-omni v1.5的模型和代码已开源，欢迎大家试用、反馈和交流。后续我们会持续优化Ming-lite-omni，持续提升在全模态的效果同时，让Ming-lite-omni更加轻量化，同时强化Ming-lite-omni的多模推理能力和生成能力。 -->

Ming-lite-omni v1.5的模型和代码已开源，诚邀大家试用、反馈和交流。值得期待的是，我们即将发布量化加速版本的Ming-lite-omni，该版本将不仅进一步优化全模态效果，还使Ming-lite-omni更加轻量化，同时强化多模推理和生成能力。欢迎持续关注！
  - Github: https://github.com/inclusionAI/Ming
  - Hugging Face: https://huggingface.co/inclusionAI/Ming-Lite-Omni-1.5 
  - ModelScope: https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni-1.5