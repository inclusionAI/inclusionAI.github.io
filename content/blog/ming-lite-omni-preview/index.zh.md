---
title: "Ming-Lite-Omni-Preview: MOE架构的多模态大模型"
date: 2025-05-05T00:00:03+08:00
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



 {{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI">Hugging Face</a> | 🤖 <a href="https://modelscope.cn/organization/inclusionAI">ModelScope</a>


## 简介

Ming-Lite-Omni-Preview 构建自 [Ling-Lite](https://github.com/inclusionAI/Ling)，它是一个 MoE（专家混合）模型，能够感知文本、图像、音频和视频等多种模态，并以流式方式生成文本和自然语音。 为了更自然地处理多模态输入，我们对 Ling-Lite 进行了增强，为每种模态引入了专用路由模块。 因此，Ming-Omni 在处理多模态信息方面表现优异，并具有很强的可扩展性。


## 主要特性

- **Omni and Novel MoE Architecture**: 一种基于专家混合（MoE）的创新型 Omni 架构，在多个多模态评测中取得了领先性能。

- **Video understanding**: 支持视觉 Token 的 KV-Cache 动态压缩机制，既能理解数小时的长视频，也能对几秒钟的短视频进行精细分析。

- **Natural Speech Generation and Fine-grained Voice Dialogue**: 支持端到端对话中的方言理解与生成，具备一次性语音克隆能力，并通过音频分词器压缩提升语调表现力。


## 评测结果

### Image benchmark
<div align="center">

| Benchmarks       | Ming-Lite-Omni-Preview | Qwen2.5-VL-7B-Instruct | InternVL2.5-8B-MPO |
| :--------------- | :--------------------: | :--------------------: | :----------------: |
| AI2D             |         83.84          |          83.9          |    <b>84.5</b>     |
| HallusionBench   |      <b>54.68</b>      |          51.9          |        51.7        |
| MMBench_TEST_V11 |         79.63          |      <b>84.3</b>       |        82.0        |
| MMMU             |          57.0          |      <b>58.6</b>       |        54.8        |
| MMStar           |          62.0          |          63.9          |    <b>65.2</b>     |
| MMVet            |      <b>73.6</b>       |          67.1          |        68.1        |
| MathVista        |      <b>69.0</b>       |          68.2          |        67.9        |
| OCRBench         |          87.9          |          86.4          |    <b>88.2</b>     |
| Average          |      <b>70.96</b>      |          70.5          |        70.3        |

</div>


#### Object Recognition
<div align="center">

| Object Recognition          | Ming-Lite-Omni-Preview | Qwen2.5-VL-7B | InternVL-2.5-8B |
| :-------------------------- | :--------------------: | :-----------: | :-------------: |
| Plants                      |          52.1          |  <b>55.3</b>  |      32.8       |
| Animals                     |          52.6          |  <b>54.8</b>  |      36.5       |
| Home appliances & furniture |          93.5          |  <b>97.4</b>  |      90.9       |
| Personal Electronics        |      <b>96.1</b>       |     95.1      |      93.2       |
| Food & Ingredients          |          57.5          |  <b>60.0</b>  |      48.7       |
| Tableware                   |        <b>96.6         |     94.9      |      88.1       |
| Vehicles                    |          31.9          |  <b>40.9</b>  |      31.9       |
| Average                     |          68.6          |  <b>71.2</b>  |      60.3       |

</div>


### Video benchmark

<div align="center">

| Benchmarks         | Ming-Lite-Omni-Preview |   Qwen2.5VL-7B   |
| :----------------- | :--------------------: | :--------------: |
| VideoMME wo/w sub. |       63.9/67.6        | <b>65.1/71.6</b> |
| MVBench            |          67.0          |   <b>72.0</b>    |
| Video-MMMU         |          45.4          |   <b>47.44</b>   |
| LongVideoBench     |          53.7          |   <b>60.0</b>    |
</div>


### Audio benchmark
#### SpeechQA

<div align="center">

| Model                  | AlpacaEval  | CommonEval  |    SD-QA     |     MMSU     |  OpenBookQA  |    IFEval    |   AdvBench    |
| :--------------------- | :---------: | :---------: | :----------: | :----------: | :----------: | :----------: | :-----------: |
| Qwen2-Audio-chat       |    3.69     |    3.40     |    35.35     |    35.43     |    49.01     |    22.57     |     98.85     |
| Baichuan-Audio         |    4.00     |    3.39     |    49.64     |    48.80     |    63.30     |    41.32     |     86.73     |
| GLM-4-Voice            |    4.06     |    3.48     |    43.31     |    40.11     |    52.97     |    24.91     |     88.08     |
| Kimi-Audio             |    4.46     | <b>3.97</b> | <b>63.12</b> |    62.17     | <b>83.52</b> | <b>61.10</b> | <b>100.00</b> |
| Qwen2.5-Omni           | <b>4.49</b> |    3.93     |    55.71     | <b>61.32</b> |    81.10     |    52.87     |     99.42     |
| Ming-Lite-Omni-Preview |    4.25     |    3.88     |    58.95     |    46.06     |    60.00     |    46.71     |     96.53     |
</div>

#### ASR

<div align="center">

| **Model**              | **Aishell-1** | **Aishell-2 ios** | **Wenetspeech test-net** | **Wenet test-meeting** | **Librispeech test-clean** | **Librispeech test-other** |
| :--------------------- | :-----------: | :---------------: | :----------------------: | :--------------------: | :------------------------: | :------------------------: |
| Whisper Large-v3       |     5.14      |       4.76        |           9.68           |         18.54          |            1.9             |            3.65            |
| Qwen2-Audio            |     1.53      |       3.06        |           7.72           |          8.4           |         <b>1.6</b>         |            3.6             |
| GLM-4-voice Base       |     2.46      |         -         |            -             |           -            |            2.82            |            7.66            |
| Baichuan-Omni-1.5      |       -       |         -         |           6.9            |          8.4           |             -              |             -              |
| Qwen2.5-Omni           |  <b>1.18</b>  |    <b>2.36</b>    |        <b>5.9</b>        |          7.7           |            1.8             |         <b>3.4</b>         |
| Ming-Lite-Omni-Preview |     1.62      |       2.82        |           6.23           |       <b>6.9</b>       |            2.34            |            5.74            |

</div>


### Knowledge
<div align="center">

| Model                  | InfoSeek_H-mean | InfoSeek_unseen_question | InfoSeek_unseen_entity |
| :--------------------- | :-------------: | :----------------------: | :--------------------: |
| GPT-4o                 |  <b>36.05</b>   |            -             |           -            |
| PaLI-X                 |      22.06      |           23.5           |          20.8          |
| Qwen2.5-vl-32B         |      19.35      |          20.55           |         18.28          |
| Ming-Lite-Omni-Preview |      27.3       |           28.9           |          25.9          |
</div>



### OCR&GUI
<div align="center">

| Model            | Ming-Lite-Omni-Preview | Qwen2.5-VL-7B-Instruct |
| :--------------- | :--------------------: | :--------------------: |
| ChartQA_TEST     |          85.2          |      <b>87.3</b>       |
| DocVQA_TEST      |          93.2          |      <b>95.7</b>       |
| OCRBenchV2_en/zh |       52.2/51.6        |    <b>56.3/57.2</b>    |
| OmniDocBench↓    |       34.7/34.5        |    <b>30.8/39.8</b>    |
| TextVQA_VAL      |         82.36          |      <b>84.9</b>       |
| ScreenSpot       |          79.3          |      <b>84.7</b>       |
</div>



## 模型下载

你可以从 Huggingface 和 ModelScope 两个平台下载本模型。

<div align="center">

| **Model**              |   **Input modality**    | **Oput modality** |                                                                                     **Download**                                                                                      |
| :--------------------- | :---------------------: | :---------------: |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Ming-Lite-Omni-Preview | Image,text,viedio,audio | Image,text,audio  | [🤗 HuggingFace](https://huggingface.co/inclusionAI/Ming-Lite-Omni/tree/250504) <br>[🤖 ModelScope](https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni/files?version=250504) |
</div>
如果你在中国大陆，强烈建议你通过以下平台下载模型： 🤖 <a href="https://modelscope.cn/organization/inclusionAI">ModelScope</a>.


## 使用案例

### 视频音频问答

| MultiModal Input                                                                                                                          | QA                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <video src="https://github.com/user-attachments/assets/a1327779-030a-44d0-a073-bbc1abe04efc" controls width="70%" height="auto" ></video> | Q: [\<audio\>](./figures/cases/audioqa_audio.wav) (audio content: 请描述视频内容。)<br>A: The video features a woman performing a series of yoga poses on a rooftop with a scenic view of mountains and a clear blue sky. |
| <video src="https://github.com/user-attachments/assets/bdeb43ce-9048-4dc1-897c-aa1d7b6f3836" controls width="70%" height="auto" ></video> | Q: Is there any food in front of me? <br>A: Yes, there's candy on the table.                                                                                                                                              |






### 语音转语音（支持方言）
<video src="https://github.com/user-attachments/assets/842e3e18-ee4a-47ea-ba92-a009be5cf2a3" controls width="70%" height="auto"></video>








## 快速上手

Please download our model following [Model Downloads](#model-downloads), then you can refer to the following codes to run Ming-Lite-Omni-Preview model.

```python
import os
from transformers import AutoProcessor
from modeling_bailingmm import BailingMMNativeForConditionalGeneration

# build model
model = BailingMMNativeForConditionalGeneration.from_pretrained(
    "inclusionAI/Ming-Lite-Omni",
    torch_dtype=torch.bfloat16,
    low_cpu_mem_usage=True
).to("cuda")

assets_path = YOUR_ASSETS_PATH

# build processor
processor = AutoProcessor.from_pretrained("inclusionAI/Ming-Lite-Omni", trust_remote_code=True)
```

```python
# qa
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "text", "text": "请详细介绍鹦鹉的生活习性。"}
        ],
    },
]
# Output:

# 鹦鹉是一种非常聪明和社交性强的鸟类，它们的生活习性非常丰富和有趣。以下是一些关于鹦鹉生活习性的详细介绍：
# ### 1. **栖息地**
# 鹦鹉主要分布在热带和亚热带地区，包括非洲、亚洲、澳大利亚和南美洲。它们通常生活在森林、草原、沙漠和城市环境中。不同种类的鹦鹉对栖息地的要求有所不同，但大多数鹦鹉喜欢有丰富植被和水源的地方。
# ### 2. **饮食**
# 鹦鹉是杂食性动物，它们的饮食非常多样化。它们的食物包括种子、坚果、水果、蔬菜、花蜜和昆虫。鹦鹉的喙非常强壮，能够轻松地打开坚硬的果壳和坚果。一些鹦鹉还会吃泥土或沙子，以帮助消化和补充矿物质。
# ......

```

```python
# image qa
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "image", "image": os.path.join(assets_path, "flowers.jpg")},
            {"type": "text", "text": "What kind of flower is this?"},
        ],
    },
]
# Output:

# The flowers in this image are forget-me-nots. These delicate blooms are known for their small, five-petaled flowers that come in various shades of blue, pink, and white.
```

To enable thinking before response, adding the following system prompt before your question:

```python
cot_prompt = "SYSTEM: You are a helpful assistant. When the user asks a question, your response must include two parts: first, the reasoning process enclosed in <thinking>...</thinking> tags, then the final answer enclosed in <answer>...</answer> tags. The critical answer or key result should be placed within \\boxed{}.\n"
# And your input message should be like this:
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "image", "image": os.path.join(assets_path, "reasoning.png")},
            {"type": "text", "text": cot_prompt + "In the rectangle $A B C D$ pictured, $M_{1}$ is the midpoint of $D C, M_{2}$ the midpoint of $A M_{1}, M_{3}$ the midpoint of $B M_{2}$ and $M_{4}$ the midpoint of $C M_{3}$. Determine the ratio of the area of the quadrilateral $M_{1} M_{2} M_{3} M_{4}$ to the area of the rectangle $A B C D$.\nChoices:\n(A) $\frac{7}{16}$\n(B) $\frac{3}{16}$\n(C) $\frac{7}{32}$\n(D) $\frac{9}{32}$\n(E) $\frac{1}{5}$"},
        ],
    },
]
# Output:
# \<think\>\nOkay, so I have this problem about a rectangle ABCD ... (thinking process omitted) ... So, the correct answer is C.\n\</think\>\n\<answer\>\\boxed{C}\</answer\>\n\n
```

```python
# video qa
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "video", "video": os.path.join(assets_path, "yoga.mp4")},
            {"type": "text", "text": "What is the woman doing?"},
        ],
    },
]
# Output:

# The image shows a woman performing a yoga pose on a rooftop. She's in a dynamic yoga pose, with her arms and legs extended in various positions.

```

```python
# multi-turn chat
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "text", "text": "中国的首都是哪里？"},
        ],
    },
    {
        "role": "ASSISTANT",
        "content": [
            {"type": "text", "text": "北京"},
        ],
    },
    {
        "role": "HUMAN",
        "content": [
            {"type": "text", "text": "它的占地面积是多少？有多少常住人口？"},
        ],
    },
]
# Output:

# 北京市的总面积约为16,410.54平方公里，常住人口约为21,542,000人。
```

```python
# Preparation for inference
text = processor.apply_chat_template(messages, add_generation_prompt=True)
image_inputs, video_inputs, audio_inputs = processor.process_vision_info(messages)
inputs = processor(
    text=[text],
    images=image_inputs,
    videos=video_inputs,
    audios=audio_inputs,
    return_tensors="pt",
)
inputs = inputs.to(model.device)
for k in inputs.keys():
    if k == "pixel_values" or k == "pixel_values_videos" or k == "audio_feats":
        inputs[k] = inputs[k].to(dtype=torch.bfloat16)

# call generate
generated_ids = model.generate(
    **inputs,
    max_new_tokens=512,
    use_cache=False,
    eos_token_id=processor.gen_terminator,
)
generated_ids_trimmed = [
        out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
    ]
output_text = processor.batch_decode(
    generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
)[0]
print(output_text)
```


```python
# ASR
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "text", "text": "Please recognize the language of this speech and transcribe it. Format: oral."},
            {"type": "audio", "audio": 'data/wavs/BAC009S0915W0292.wav'},
        ],
    },
]
outputs = model.generate(messages, max_new_tokens=512)
print(outputs)
```

```python
# speech2speech
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "audio", "audio": 'data/wavs/BAC009S0915W0292.wav'},
        ],
    },
]
outputs = model.generate(messages, max_new_tokens=512, speaker='luna', output_audio_path='out.wav', output_audio=True)
print(outputs)
```


## 许可证与法律声明

本代码库遵循 [MIT 协议](../LICENSE)，法律免责声明见项目根目录下的 [LEGAL.md 文件](../LEGAL.md)。