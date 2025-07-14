---
title: "Ming-Omni: A Unified Multimodal Model for Perception and Generation"
date: 2025-06-11T00:00:03+08:00
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

<!-- # Ming-Lite-Omni -->

{{< button href="https://github.com/inclusionAI/Ming/tree/Ming-Lite-Omni-Preview/Ming-unify" label="GITHUB" external=true >}} 📑 <a href="https://arxiv.org/abs/2506.09344">Technical Report</a>｜📖<a href="https://lucaria-academy.github.io/Ming-Omni/">Project Page</a> ｜🤗 <a href="https://huggingface.co/inclusionAI/Ming-Lite-Omni">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni">ModelScope</a>

## Introduction

Ming-lite-omni, a light version of Ming-omni, which is derived from [Ling-lite](https://github.com/inclusionAI/Ling) and features 2.8 billion activated parameter. Ming-lite-omni is a unified multimodal model capable of processing images, text, audio, and video, while demonstrating strong proficiency in both speech and image generation. Ming-lite-omni employs dedicated encoders to extract tokens from different modalities, which are then processed by Ling, an MoE architecture equipped with newly proposed modality-specific routers. This design enables a single model to efficiently process and fuse multimodal inputs within a unified framework, thereby facilitating diverse tasks without requiring separate models, task-specific fine-tuning, or structural redesign. Importantly, Ming-lite-omni extends beyond conventional multimodal models by supporting audio and image generation. This is achieved through the integration of an advanced audio decoder for natural-sounding speech and Ming-Lite-Uni for high-quality image generation, which also allow the model to engage in context-aware chatting, perform text-to-speech conversion, and conduct versatile image editing. Our experimental results showcase Ming-lite-omni offers a powerful solution for unified perception and generation across all modalities. 
Notably, Ming-lite-omni is the first open-source model we are aware of to match GPT-4o in modality support, and we release all code and model weights to encourage further research and development in the community.


## 📌 Updates

* [2025.06.12] 🔥 Our [Technical Report](https://arxiv.org/abs/2506.09344) is in public on arxiv.
* [2025.05.28] 🔥 The official version of Ming-lite-omni is released, with better performance and image generation support.
* [2025.05.04] 🔥 We release the test version of Ming-lite-omni：[Ming-lite-omni-Preview](https://github.com/inclusionAI/Ming/tree/Ming-Lite-Omni-Preview).


## Key Features

- **Unified Omni-Modality Perception**: Ming-lite-omni, built on [Ling](https://github.com/inclusionAI/Ling), an MoE architecture LLM, resolves task conflicts and ensures coherent integration of tokens from different modalities through modality-specific routers.

- **Unified Perception and Generation**: Ming-lite-omni achieves unified understanding and generation, enabling the model to interpret multimodal instructions and user intent during generation, which helps enhance generation quality and improves usability across multiple tasks.

- **Innovative Generation Capabilities**: Ming-lite-omni can perceive all modalities and generate high-quality text, real-time speech, and vivid images simultaneously, delivering exceptional cross-modal performance across diverse tasks including image perception, audio-visual interaction, and image generation.


##  Evaluation
Ming-lite-omni delivers exceptional cross-modal performance, as validated across image perception, audio-visual interaction, and image generation tasks. Specifically, in the image perception task, Ming-lite-omni attained performance comparable to that of Qwen2.5-VL-7B by activating only 2.8B parameters. It delivers superior performance in end-to-end speech understanding and instruction following, surpassing Qwen2.5-Omni and Kimi-Audio. It also supports native-resolution image generation, editing, and style transfer, achieving a GenEval score of 0.64, outperforming mainstream models such as SDXL. In terms of FID, Ming-lite-omni reaches 4.85, setting a new SOTA across existing methods.



### Image benchmark
<div align="center">

| Benchmarks        | Ming-lite-omni |    Qwen2.5-VL-7B-Instruct    | InternVL2.5-8B-MPO |
|:------------------|:--------------:|:----------------------------:|:------------------:|
| AI2D              |      83.1      |             84.4             |    <b>84.5</b>     |
| HallusionBench    |  <b>55.0</b>   |             55.8             |        51.7        |
| MMBench_TEST_V11  |      80.8      |         <b>82.8</b>          |        82.0        |
| MMMU              |      56.3      |         <b>56.6</b>          |        54.8        |
| MMStar            |      64.7      |             65.3             |    <b>65.2</b>     |
| MMVet             |      71.3      |             71.6             |        68.1        |
| MathVista         |  <b>71.6</b>   |             68.1             |        67.9        |
| OCRBench          |  <b>88.4</b>   |             87.8             |        88.2        |
| Average           |      71.4      |         <b>71.5</b>          |        70.3        |

</div>


#### Encyclopedia Benchmarks  
<div align="center">

| Object Recognition   | Ming-lite-omni |  Qwen2.5-VL-7B-Instruct  |
|:---------------------|:--------------:|:------------------------:|
| Plants               |   **54.96**    |           47.8           |
| Animals              |    **56.7**    |          50.85           |
| Vehicles             |     41.91      |        **42.29**         |
| Food & Ingredients   |   **62.28**    |          54.09           |
| Dishes               |    **44.3**    |          39.07           |
| General              |     91.08      |        **92.42**         |
| Average              |   **58.54**    |          54.43           |

</div>

### Video benchmark

<div align="center">

| Benchmarks              | Ming-lite-omni | Qwen2.5VL-7B-Instruct |
|:------------------------|:--------------:|:---------------------:|
| VideoMME                |      67.0      |      <b>67.3</b>      |
| MVBench                 |      67.7      |      <b>67.4</b>      |
| Video-MMMU              |      46.3      |      <b>47.4</b>      |
| LongVideoBench          |      56.6      |         54.7          |
| Average                 |  <b>59.4</b>   |         59.2          |

</div>
Note: All models are evaluated based on 128 uniformly sampled frames.

### Audio benchmark
#### SpeechQA

<div align="center">

| Model            |    Average    | AlpacaEval  | CommonEval  |    SD-QA     |     MMSU     |  OpenBookQA  |    IFEval    |   AdvBench    |
|:-----------------|:-------------:|:-----------:|:-----------:|:------------:|:------------:|:------------:|:------------:|:-------------:|
| Qwen2-Audio-chat |     3.545     |    3.69     |    3.40     |    35.35     |    35.43     |    49.01     |    22.57     |     98.85     |
| Baichuan-Audio   |     3.695     |    4.00     |    3.39     |    49.64     |    48.80     |    63.30     |    41.32     |     86.73     |
| GLM-4-Voice      |     3.77      |    4.06     |    3.48     |    43.31     |    40.11     |    52.97     |    24.91     |     88.08     |
| Kimi-Audio       |     4.215     |    4.46     |    3.97     | <b>63.12</b> | <b>62.17</b> | <b>83.52</b> | <b>61.10</b> | <b>100.00</b> |
| Qwen2.5-Omni     |     4.21      |    4.49     |    3.93     |    55.71     |    61.32     |    81.10     |    52.87     |     99.42     |
| Ming-lite-omni   |  <b>4.34</b>  | <b>4.63</b> | <b>4.06</b> |    58.84     |    47.53     |    61.98     |    58.36     |     99.04     |
</div>

#### ASR

<div align="center">

|     Model      | aishell1 | aishell2_android | aishell2_ios | cv15_zh  | fleurs_zh | wenetspeech_meeting | wenetspeech_net | librispeech_test_clean | librispeech_test_other | multilingual_librispeech | cv15_en  | fleurs_en |  voxpopuli_v1.0_en   |
|:--------------:|:--------:|:----------------:|:------------:|:--------:|:---------:|:-------------------:|:---------------:|:----------------------:|:----------------------:|:------------------------:|:--------:|:---------:|:--------------------:|
| Ming-lite-omni |   1.47   |     **2.55**     |   **2.52**   |   6.31   |   2.96    |        5.95         |      5.46       |          1.44          |          2.80          |         **4.15**         | **6.89** | **3.39**  |       **5.80**       |
|  Qwen2.-Omni   |   1.18   |       2.75       |     2.63     | **5.20** |   3.00    |      **5.90**       |      7.70       |          1.80          |          3.40          |           7.56           |   7.60   |   4.10    |       **5.80**       |
|  Qwen2-Audio   |   1.53   |       2.92       |     2.92     |   6.90   |   7.50    |        7.16         |      8.42       |          1.60          |          3.60          |           5.40           |   8.60   |   6.90    |         6.84         |
|   Kimi-Audio   | **0.60** |       2.64       |     2.56     |   7.21   | **2.69**  |        6.28         |    **5.37**     |        **1.28**        |        **2.42**        |           5.88           |  10.31   |   4.44    |         7.97         |

</div>



### Information-Seeking Benchmark
<div align="center">

| Model          | InfoSeek_H-mean | InfoSeek_unseen_question | InfoSeek_unseen_entity |
|:---------------|:---------------:|:------------------------:|:----------------------:|
| GPT-4o         |  <b>36.05</b>   |            -             |           -            |
| PaLI-X         |      22.06      |           23.5           |          20.8          |
| Qwen2.5-vl-32B |      19.35      |          20.55           |         18.28          |
| Ming-lite-omni |      27.7       |         **30.4**         |        **25.4**        |
</div>



### OCR
<div align="center">

| Model              | Ming-lite-omni | Qwen2.5-VL-7B-Instruct  |
|:-------------------|:--------------:|:-----------------------:|
| ChartQA_TEST       |      85.1      |       <b>87.3</b>       |
| DocVQA_TEST        |       93       |       <b>95.7</b>       |
| OCRBenchV2_en/zh   |    53.3/52     |    <b>56.3/57.2</b>     |
| OmniDocBench↓      | 34/<b>34.4</b> |    <b>30.8</b>/39.8     |
| TextVQA_VAL        |      82.8      |       <b>84.9</b>       |
</div>

### GUI
<div align="center">

| Model                      | Ming-lite-omni | InternVL3 8B | Qwen2.5-VL-7B-Instruct | 
|:---------------------------|:--------------:|:------------:|:----------------------:|
| ScreenSpot                 |  <b>82.1</b>   |     79.5     |         78.9*          |
| ScreenSpot-V2              |  <b>84.1</b>   |     81.4     |           -            |
| AITZ(EM)                   |  <b>66.6</b>   |      -       |         57.6*          |
</div>
Note: * denotes the reproduced results.



### Unified Generation Benchmark

<div align="center">

| Model          | single_object | two_object |  counting  |  colors  | position | color_attr | GENEVAL  | DPGBench  |     FID↓      |
|:---------------|:-------------:|:----------:|:----------:|:--------:|:--------:|:----------:|:--------:|:---------:|:-------------:|
| Ming-lite-omni |  **0.9875**   | **0.7727** | **0.6812** |  0.7872  |   0.31   |    0.29    | **0.64** |   81.72   |   **4.85**    |
| Metaquery-XL   |       -       |     -      |     -      |    -     |    -     |     -      |   0.61   | **82.05** |     6.02      |
| SDv2.1         |     0.98      |    0.51    |    0.44    | **0.85** |   0.07   |    0.17    |   0.50   |   68.09   |     26.96     |
| Emu3-Gen       |     0.98      |    0.71    |    0.34    |   0.81   |   0.17   |    0.21    |   0.54   |   80.60   |       -       |
| SDXL           |     0.98      |    0.74    |    0.39    | **0.85** |   0.15   |    0.23    |   0.55   |   74.65   |     8.76      |
| Janus          |     0.97      |    0.68    |    0.30    |   0.84   | **0.46** |  **0.42**  |   0.61   |   79.68   |     10.10     |
| JanusFlow      |       -       |     -      |     -      |    -     |    -     |     -      |   0.63   |   80.09   |     9.51      |

</div>

Please refer to our technical report for more comprehensive evaluation results. 


## Model Downloads

You can download the model from both Huggingface and ModelScope.

<div align="center">

| **Model**      |   **Input modality**    | **Oput modality** |                                                                     **Download**                                                                     |
|:---------------| :---------------------: | :---------------: |:----------------------------------------------------------------------------------------------------------------------------------------------------:|
| Ming-Lite-Omni | Image,text,viedio,audio | Image,text,audio  | [🤗 HuggingFace](https://huggingface.co/inclusionAI/Ming-Lite-Omni) <br>[🤖 ModelScope](https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni) |
</div>
If you're in mainland China, we strongly recommend you to download our model from 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni">ModelScope</a>.

```
pip install modelscope
modelscope download --model inclusionAI/Ming-Lite-Omni --local_dir inclusionAI/Ming-Lite-Omni  --revision master
```

Note: This download process will take several minutes to several hours, depending on your network conditions.





## Use Cases

Additional demonstration cases are available on our project [page](https://lucaria-academy.github.io/Ming-Omni/).


## Environment Preparation


### Installation with pip
```shell
pip install -r requirements.txt
# for python 3.10
pip install data/matcha_tts-0.0.5.1-cp310-cp310-linux_x86_64.whl 
# for python 3.8 
# pip install data/matcha_tts-0.0.5.1-cp38-cp38-linux_x86_64.whl
pip install diffusers==0.33.0
pip install nvidia-cublas-cu12==12.4.5.8  # for H20 GPU
```

### Installation with docker

You can also initialize the environment by building the docker image. First clone this repository:
```shell
git clone --depth 1 https://github.com/inclusionAI/Ming.git
cd Ming
```
Then build the docker image with the provided Dockerfile in `docker/docker-py310-cu121`. This step might take a while:
```shell
docker build -t ming:py310-cu121 docker/docker-py310-cu121
```
At last, start the container with the current repo directory mounted:
```shell
docker run -it --gpus all -v "$(pwd)":/workspace/Ming ming:py310-cu121 ming:py310-cu121 /bin/bash
```
You can run the model with python interface. You may download the huggingface model in the repo directory first (`.../Ming/`) or mount the downloaded model path when starting the container.


## Example Usage

We provide a step-by-step running example:

Step 1 - Download the source code
```
git clone https://github.com/inclusionAI/Ming.git 
cd Ming
```
Step 2 - Download the model weights and create a soft link to the source code directory

Download our model following [Model Downloads](#model-downloads)

```shell
mkdir inclusionAI 
ln -s /path/to/inclusionAI/Ming-Lite-Omni inclusionAI/Ming-Lite-Omni
```

Step 3 - Enter the code directory, you can refer to the following codes to run the Ming-Lite-Omni model.
```
jupyter notebook cookbook.ipynb
```

We also provide a simple example on the usage of this repo. For detailed usage, please refer to [cookbook.ipynb](cookbook.ipynb).

```python
import torch
from transformers import AutoProcessor, GenerationConfig
from modeling_bailingmm import BailingMMNativeForConditionalGeneration

# load model
model = BailingMMNativeForConditionalGeneration.from_pretrained(
    "inclusionAI/Ming-Lite-Omni",
    torch_dtype=torch.bfloat16,
    low_cpu_mem_usage=True
).to("cuda")

# build processor
processor = AutoProcessor.from_pretrained("inclusionAI/Ming-Lite-Omni", trust_remote_code=True)

# qa
messages = [
    {
        "role": "HUMAN",
        "content": [
            {"type": "text", "text": "请详细介绍鹦鹉的生活习性。"}
        ],
    },
]

# 1. Format inputs using chat template
text = processor.apply_chat_template(messages, add_generation_prompt=True)

# 2. Extract vision/audio data
image_inputs, video_inputs, audio_inputs = processor.process_vision_info(messages)

# 3. Prepare tensor inputs
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

# 4. Configure generation
generation_config = GenerationConfig.from_dict({'no_repeat_ngram_size': 10})
generated_ids = model.generate(
    **inputs,
    max_new_tokens=512,
    use_cache=True,
    eos_token_id=processor.gen_terminator,
    generation_config=generation_config,
)
generated_ids_trimmed = [
        out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
    ]

# 5. Decode output
output_text = processor.batch_decode(
    generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
)[0]
print(output_text)
# Output:

# 鹦鹉是一种非常聪明和社交性强的鸟类，它们的生活习性非常丰富和有趣。以下是一些关于鹦鹉生活习性的详细介绍：
# ### 1. **栖息地**
# 鹦鹉主要分布在热带和亚热带地区，包括非洲、亚洲、澳大利亚和南美洲。它们通常生活在森林、草原、沙漠和城市环境中。不同种类的鹦鹉对栖息地的要求有所不同，但大多数鹦鹉喜欢有丰富植被和水源的地方。
# ### 2. **饮食**
# 鹦鹉是杂食性动物，它们的饮食非常多样化。它们的食物包括种子、坚果、水果、蔬菜、花蜜和昆虫。鹦鹉的喙非常强壮，能够轻松地打开坚硬的果壳和坚果。一些鹦鹉还会吃泥土或沙子，以帮助消化和补充矿物质。
# ......
```

Note: We test the examples on hardware of NVIDIA H800-80GB/H20-96G with CUDA 12.4. Loading inclusionAI/Ming-Lite-Omni in bfloat16 takes about 62G GPU memory.




## License and Legal Disclaimer

This code repository is licensed under the [MIT License](./LICENSE), and the Legal Disclaimer is located in the [LEGAL.md file](./LEGAL.md) under the project's root directory.

## Citation

If you find our work helpful, feel free to give us a cite.

```bibtex

@misc{Mingomni2025,
      title  = {Ming-Omni: A Unified Multimodal Model for Perception and Generation}, 
      author = {Inclusion AI},
      year = {2025},
      eprint = {2506.09344},
      archivePrefix = {arXiv},
      url = {https://arxiv.org/abs/2506.09344}
}
```

