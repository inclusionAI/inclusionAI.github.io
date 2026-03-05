---
title: "Ming-Omni-TTS: Simple and Efficient Unified Generation of Speech, Music, and Sound with Precise Control"
date: 2026-03-04T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming-omni-tts" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-omni-tts-0.5B">Hugging Face</a>｜ 🤖 <a href="https://modelscope.cn/models/inclusionAI/Ming-omni-tts-0.5B">ModelScope</a>

## The Introduction Video of Ming-Omni-TTS
<video src="https://gw.alipayobjects.com/v/huamei_7mmngh/afts/video/lRycTZ2_PFMAAAAAhbAAAAgADvHDAQFr" width="1024px" height="660px" controls autoplay muted playsinline></video>

## 🚀 Featured Abilities

**Ming-omni-tts is a high-performance unified audio generation model that achieves precise control over speech attributes and enables single-channel synthesis of speech, environmental sounds, and music. Powered by a custom 12.5Hz continuous tokenizer and Patch-by-Patch compression, it delivers competitive inference efficiency (3.1Hz). Additionally, the model features robust text normalization capabilities for the accurate and natural narration of complex mathematical and chemical expressions.**

- **🔊 Fine-grained Vocal Control:** Enables precise control over speech rate, pitch, volume, emotion, and dialects via simple instructions. It achieves 93% accuracy for Cantonese and 46.7% for emotional control, outperforming CosyVoice3.
- **🌌 Intelligent Voice Design:** Features 100+ premium built-in voices and supports zero-shot voice design through natural language descriptions. Its performance on the Instruct-TTS-Eval-zh benchmark is on par with Qwen3-TTS.
- **🎶 Immersive Unified Generation:** The industry's first autoregressive model to jointly generate speech, ambient sound, and music in a single channel. Built on a custom 12.5Hz continuous tokenizer and a DiT head architecture, it delivers a seamless, "in-the-scene" auditory experience.
- **⚡ High-efficiency Inference:** Introduces a "Patch-by-Patch" compression strategy that reduces the LLM inference frame rate to 3.1Hz. This significantly cuts latency and enables podcast-style audio generation while preserving naturalness and audio detail.
- **🧪 Professional Text Normalization:** The model accurately parses and narrates complex formats, including mathematical expressions and chemical equations, ensuring natural-sounding output for specialized applications.

## Model Structure

**Ming-omni-tts** is a unified audio language model for the generation of speech, music, and sound, based on a unified continuous audio tokenizer.

### Unified Continuous Audio Tokenizer.
<img width="1034" alt="结构图" src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/img/W3RqRLQx8DEAAAAAUDAAAAgADvHDAQFr/original" />

### Unified Audio Language Model for Speech, Music and Sound Generation.
<img width="1034" alt="结构图" src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/img/oop7QJpDNdIAAAAAV1AAAAgADvHDAQFr/original" />

## Benchmark Evaluations
<img width="1034" alt="结构图" src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/img/GBiVQ7tR2I4AAAAAdhAAAAgADvHDAQFr/original" />

## Voice Control – Support Structured and Natural Command Control

### Basic Attributes Control: Speed, Volume and Pitch Control for Voice Generating

| Input Prompt | Target Text | Instruction1 | TTS Result | Instruction2 | TTS Result |
|---|---|---|---|---|---|
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/aeTAQakwWNEAAAAATEAAAAgADvHDAQFr"></audio> | 导航开始，全程二十五公里，预计需要十二分钟。 | 语速：慢速 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/TFCuTp2s4zsAAAAAWdAAAAgADvHDAQFr"></audio> | 语速：快速 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/p_LSQIhGsz0AAAAAU5AAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/k5KRSI2CNSgAAAAATLAAAAgADvHDAQFr"></audio> | 烟雨弥漫下，山环绕着水耸立着，水环绕着山流淌着。 | 语速慢一点 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/-5mzR5hg8IEAAAAAaWAAAAgADvHDAQFr"></audio> | 语速快一点 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/FyqbQK0WaegAAAAAWdAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/99v-RLuQ4ycAAAAATUAAAAgADvHDAQFr"></audio> | 目前共享出行市场处于高速增长阶段。 | 音量：低 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/1FoCToj92ZQAAAAAXVAAAAgADvHDAQFr"></audio> | 音量：高 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/uSG7TYKE8lYAAAAAW5AAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/V9uNR4Qusu8AAAAATaAAAAgADvHDAQFr"></audio> | 北京在出行规模，城市影响力方面表现优异。 | 音量尽量低一点 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/y4fJSbVRySQAAAAAWUAAAAgADvHDAQFr"></audio> | 音量尽量高一点 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/nDiURo14NMgAAAAAW5AAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/aWH-S6z2w84AAAAAUdAAAAgADvHDAQFr"></audio> | 他们脱掉笨重的冬衣，走起路来腰杆挺直步履轻盈。 | 基频：低 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/yz2BQ5LKhCYAAAAAYnAAAAgADvHDAQFr"></audio> | 基频：高 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/T7cARZmurMsAAAAAYnAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/axg6Q69pHuIAAAAAS9AAAAgADvHDAQFr"></audio> | 自动驾驶将大幅提升出行安全，效率。 | 基频低一点 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/9K8TSJLgcLoAAAAAWCAAAAgADvHDAQFr"></audio> | 基频高一点 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/iVQ2T5AO2-MAAAAAWdAAAAgADvHDAQFr"></audio> |

### Same Dialect/Cross-Dialect Control: Generating Cantonese and Sichuanese from Mandarin and Native Prompts

| Instruction | Input Prompt | Conversion Type | Target Text | TTS Result |
|---|---|---|---|---|
| 方言：广粤话 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/6iIgRJ9J9a0AAAAASBAAAAgADvHDAQFr"></audio> | 广粤话 -> 广粤话 | 佢系头大冇脑脑大生草种 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/W5nrQK7A3a0AAAAAVLAAAAgADvHDAQFr"></audio> |
| 方言：广粤话 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/vmBcTb8VnzsAAAAASYAAAAgADvHDAQFr"></audio> | 广粤话 -> 广粤话 | 今个周末全场货品低至五折，数量有限，卖晒就冇喇。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ozLNSrCt6z0AAAAAYMAAAAgADvHDAQFr"></audio> |
| 请用广粤话表达 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/00SsRpmd9-YAAAAAUGAAAAgADvHDAQFr"></audio> | 广粤话 -> 广粤话 | 我觉得社会企业同个人都有责任 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/EhBHQIHlyPQAAAAAU2AAAAgADvHDAQFr"></audio> |
| 用广粤语说，越地道越好。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/oukbSYU6cqMAAAAATTAAAAgADvHDAQFr"></audio> | 普通话 -> 广粤话 | 你嚟探我，我真系好感动，好耐冇见你啦！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/yNaVSrfUzgAAAAAAUbAAAAgADvHDAQFr"></audio> |
| 以广粤话的口语风格来表达。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/GuXdRbooa6QAAAAATJAAAAgADvHDAQFr"></audio> | 普通话 -> 广粤话 | 快啲啦，唔好再拖拖拉拉，大家都等紧你开会呀 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/sH68TIFEII8AAAAAaxAAAAgADvHDAQFr"></audio> |
| 方言：川渝话 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/YCt4QK4B3acAAAAARRAAAAgADvHDAQFr"></audio> | 川渝话 -> 川渝话 | 你要自己打扮，不穿咋个晓得穿起漂不漂亮嘛？看我们这新款多时尚。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/AXQUQKtZAMYAAAAAXHAAAAgADvHDAQFr"></audio> |
| 方言：川渝话 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/PVg7R7gZYGsAAAAARqAAAAgADvHDAQFr"></audio> | 川渝话 -> 川渝话 | 赛尔号那个时候，才出来的时候，还是他那个机制，还是特别好耍的。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/PqKgRJGyLGoAAAAAYuAAAAgADvHDAQFr"></audio> |
| 请用川渝话表达 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ykyVRqY20kkAAAAAScAAAAgADvHDAQFr"></audio> | 川渝话 -> 川渝话 | 哎，刚刚晚上想吃点啥子？煮点火锅要得。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/piF7QrHgbJsAAAAAXwAAAAgADvHDAQFr"></audio> |
| 模仿川渝话的语气来表达 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/03u1S4o00HAAAAAAS8AAAAgADvHDAQFr"></audio> | 普通话 -> 川渝话 | 你晓不晓得？你啥我都喜欢，嗯，就是有一点不喜欢装。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/3u-xR7QaEmsAAAAAZeAAAAgADvHDAQFr"></audio> |
| 挑战一下用川渝话的味儿来朗读 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/uiGkS41JSlcAAAAAUeAAAAgADvHDAQFr"></audio> | 普通话 -> 川渝话 | 你那哈屋头还有电脑，那时候就已经先进了。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/0ulIS5QuxaIAAAAAXwAAAAgADvHDAQFr"></audio> |

### Cross-Emotion Control: Cross-Emotion Synthesis Using a Single Neutral Prompt

| Instruction | Input Prompt | Conversion Type | Target Text | TTS Result |
|---|---|---|---|---|
| 情感: 高兴 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/hvvOQ7pWZKoAAAAARjAAAAgADvHDAQFr"></audio> | 中性 -> 高兴 | If these examinations are held orally, they may be known colloquially as "orals". | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/j50VRKtr-dAAAAAAYMAAAAgADvHDAQFr"></audio> |
| 情感: 愤怒 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/9_5TTa0VHlsAAAAARRAAAAgADvHDAQFr"></audio> | 中性 -> 愤怒 | I'm done arguing with you. You're not worth my time! | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/2PA0Tbm4DSgAAAAAWdAAAAgADvHDAQFr"></audio> |
| 情感: 愤怒 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/uZhwTJh0QAIAAAAARBAAAAgADvHDAQFr"></audio> | 中性 -> 愤怒 | In cities, driving speeds are set by which lane a driver is in. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/oErORZR0tFcAAAAAXVAAAAgADvHDAQFr"></audio> |
| 情感: 悲伤 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/V4RFTqhlGLcAAAAARdAAAAgADvHDAQFr"></audio> | 中性 -> 悲伤 | Everything has changed. The promises and dreams we once had are shattered. How should I face this? | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/mVQCSoskXzQAAAAAbNAAAAgADvHDAQFr"></audio> |
| 情感: 高兴 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/-b0yR6meCSIAAAAARIAAAAgADvHDAQFr"></audio> | 中性 -> 高兴 | But it does not allow for adding new members to interfaces. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/cS22RKJajO0AAAAAVmAAAAgADvHDAQFr"></audio> |
| 情感: 愤怒 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/BRrMQo8culoAAAAASKAAAAgADvHDAQFr"></audio> | 愤怒 -> 愤怒 | 港湾道是每年农历新年举行的香港新春花车巡游的路线之一。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/RiNiSI4mUp0AAAAAY2AAAAgADvHDAQFr"></audio> |
| 情感: 悲伤 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/40xbTq2W880AAAAATJAAAAgADvHDAQFr"></audio> | 悲伤 -> 悲伤 | 我觉得自己好像在黑暗中迷失了，再也找不到出口了。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/DHvRRbNcsm8AAAAAZ6AAAAgADvHDAQFr"></audio> |
| 情感: 高兴 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/FZuOSqVJZdAAAAAASIAAAAgADvHDAQFr"></audio> | 中性 -> 高兴 | 我竟然抢到了陈奕迅的演唱会门票！太棒了！终于可以现场听一听他的歌声了！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/o4fbQ4Wt_2AAAAAAbNAAAAgADvHDAQFr"></audio> |
| 情感: 悲伤 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/kTzwQY5NehEAAAAARwAAAAgADvHDAQFr"></audio> | 悲伤 -> 悲伤 | 我们俩从一开始就君子之交，都说好啦，背信弃义出尔反尔的是她，我告诉你这件事我是受害者。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/kG7kRpinGeQAAAAAgBAAAAgADvHDAQFr"></audio> |
| 表达时要悲伤一点。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/A5E-R56hMMUAAAAAROAAAAgADvHDAQFr"></audio> | 悲伤 -> 悲伤 | 有些软体开发者也注意到软体度量已成为软体开发过程中的一部份。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ABxpTrKJ4VsAAAAAcEAAAAgADvHDAQFr"></audio> |
| 把这件事说得高兴一点。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/6kkjTZa42mkAAAAAS6AAAAgADvHDAQFr"></audio> | 高兴 -> 高兴 | I bought my first mountain bike with my own earnings, a Merida Warrior 500! Go me! | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/vWOxQY89SsYAAAAAZDAAAAgADvHDAQFr"></audio> |
| 表达时，请务必流露出高兴的情感。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/wURZSb548oIAAAAARFAAAAgADvHDAQFr"></audio> | 中性 -> 高兴 | I ran into a teacher I hadn't seen in years at the coffee shop today. He still remembered me, and we talked about so many fun memories. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/af1RSZuMkI4AAAAAcfAAAAgADvHDAQFr"></audio> |

## Built-in Premium Sounds: Over 100 Built-in, High-Quality Timbres

| Instruction | Describe | Target Text | TTS Result |
|---|---|---|---|
| 克隆一下灵小甄的说话腔调。 | 销售、直播带货: 声音明亮清脆，语速轻快且充满活力，语气中带有强烈的推荐感和亲和力，典型的带货主播风格。 | 这款产品的名字，叫变态坑爹牛肉丸。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/7N8iRr8xe3EAAAAAUvAAAAgADvHDAQFr"></audio> |
| 模仿灵梦的风格。 | 虚拟恋人: 充满糖分的高甜少女音，语气娇憨任性，完美演绎了想要人陪伴时的撒娇状态。 | 认为在中文歌曲里，夹杂几句英文就很时髦。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/3D3qQ78fn-EAAAAAWdAAAAgADvHDAQFr"></audio> |
| 麻烦学一下灵岩的口音 | 新闻、客服: 声音清晰正式且专业 | 届时会按照原定计划，与国防部签署相关以地换地协议。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/l0UxTZT1PoIAAAAAWdAAAAgADvHDAQFr"></audio> |
| 克隆一下灵娇的说话腔调。 | 邻家女孩、女大学生、Vlog博主: 清甜明亮的少女音，语感轻快活泼，在讲述生活趣事时充满画面感与青春朝气，极具感染力。 | 总裁问，刚才皮皮鲁唱的歌是谁的词谁的曲，大手笔呀。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/geK3S7w6LW4AAAAAYnAAAAgADvHDAQFr"></audio> |
| 克隆一下妩媚妲己的说话腔调。 | 妩媚角色: 声音甜美清脆，语调轻盈上扬，表现性感妩媚 | 新娘是一位俄国公主，坐着六只驯鹿拉的雪车，从芬兰一路而来。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/wEKmTIM9kBcAAAAAbNAAAAgADvHDAQFr"></audio> |
| 克隆一下灵绮木的说话腔调。 | 透着刻薄与傲慢的冷艳御姐音 | 这就是它第二个特色——灵活的音色设计能力，你可以直接用文字描述，比如"知性女主播的声音"，它就能给你生成。要是懒得想，它还内置了一百多种精品音色，什么动漫角色、短视频配音统统搞定！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/C06TTalAK-MAAAAAgDAAAAgADvHDAQFr"></audio> |
| 克隆一下灵若虚的说话腔调。 | 老奶奶形象，声音饱含岁月的温暖与慈爱，语速舒缓，透着对生活细节的满足感，极具治愈力。 | 这就是它第二个特色——灵活的音色设计能力，你可以直接用文字描述，比如"知性女主播的声音"，它就能给你生成。要是懒得想，它还内置了一百多种精品音色，什么动漫角色、短视频配音统统搞定！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/dCSUSZv-Al8AAAAAgEAAAAgADvHDAQFr"></audio> |
| 克隆一下花小呗的说话腔调。 | 儿童角色，声音清脆甜美，带有明显的幼态特征，语调轻快活泼 | 这就是它第二个特色——灵活的音色设计能力，你可以直接用文字描述，比如"知性女主播的声音"，它就能给你生成。要是懒得想，它还内置了一百多种精品音色，什么动漫角色、短视频配音统统搞定！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ETSOSa5henQAAAAAgDAAAAgADvHDAQFr"></audio> |
| 克隆一下灵浅忧的说话腔调。 | 小男孩，声音清脆明亮，充满元气 | 今天天气不错，要出去玩了。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/h3DEQr4HYgEAAAAAZeAAAAgADvHDAQFr"></audio> |

## Voice Design: Zero-Shot Synthesis of Custom Vocal Identities via Natural Language Descriptions

| Instruction | Target Text | TTS Result |
|---|---|---|
| 性别: 女童声音. 音高: 音高尖锐，持续偏高. 语速: 语速迅捷，语气急促. 音量: 音量响亮，情绪饱满. 年龄: 学龄儿童. 清晰度: 吐字清晰，发音用力. 流畅度: 表达流畅，伴强调性重复. 口音: 标准普通话. 音色质感: 童声清亮，略显尖锐. 情绪: 激动委屈，带有抗议. 语调: 声调高昂，语势急切. 性格: 急躁率真，不甘示弱. | 人家从那走过，他们就说我故意偷听，还说我是小广播，我偏要广播，偏要广播偏。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/7gTcQK9DiloAAAAAYMAAAAgADvHDAQFr"></audio> |
| 性别: 男性. 音高: 男性沉稳中低音. 语速: 语速舒缓，有自然停顿. 音量: 正常谈话音量. 年龄: 中老年男性. 清晰度: 吐字清晰，发音标准. 流畅度: 言语连贯，表达自然. 口音: 标准普通话. 音色质感: 音质温和，略显沧桑. 情绪: 饱含不舍与怀念，转为平静嘱托. 语调: 前段感叹意味，后段请求意味. 性格: 念旧重情，温和坦诚. | 这就是天望娃娃送给我的我一直舍不得丢掉它，你替我上交了吧。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/cuavRqYcUDwAAAAAZeAAAAgADvHDAQFr"></audio> |
| 性别: 男性语音特征. 音高: 男性中低音域，初始疑问时音调上扬. 语速: 整体偏快，表述急切清晰. 音量: 正常交谈音量，偶有强调加重. 年龄: 青年至中年男性. 清晰度: 吐字清晰，发音标准. 流畅度: 叙述流畅，偶有为强调而设的短暂停顿. 口音: 带有北方地区特征的普通话. 音色质感: 声音较为浑厚，略带一丝沙哑质感. 情绪: 从关切疑问过渡到解释性陈述，略显急切. 语调: 初始疑问扬起，后转为肯定叙述语调. 性格: 显得坦率直接，急于说明情况. | 没有欺负这孩子呢，报告团长没人欺负他，不是怎么的，他本来是给他师父小杨上门的，回来，就说鬼鬼的鬼。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/K2cPTZGvjigAAAAAcfAAAAgADvHDAQFr"></audio> |
| 性别: 女性. 音高: 女性高音，句末随情绪上扬. 语速: 语速偏缓，充满恳切感. 音量: 音量正常，激动处略有提高. 年龄: 中年女性. 清晰度: 吐字清晰，略带哭腔. 流畅度: 整体流畅，因情绪略显迟缓. 口音: 标准普通话. 音色质感: 音色略显沙哑，蕴含悲伤. 情绪: 悲伤焦虑，带有不解与恳求. 语调: 起伏较大，表达焦急质问. 性格: 情感浓烈，忧心忡忡. | 我们家好容易恢复成这个样子，你明知有危险，为什么还一定要拉着杉杉？ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/P5g5RbWeEmoAAAAAYnAAAAgADvHDAQFr"></audio> |
| 用活泼的童声带着喜悦和兴奋不间断地讲述一个有趣的故事。 | 我有个大哥叫小王，能吃饭也能喝汤，别看他手里没武器啊，说话赛过歪白的机关枪。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/3HnwSaVhsEYAAAAAZ6AAAAgADvHDAQFr"></audio> |
| 这是一个粤语地区长辈的声音，是一种带有地域特色的创意风格。他使用粤语（广东话），年长男性声音沉厚，语速较慢。语气在说教时显得严肃，但言语间仍透露出对家人的关心。 | 做人呢，最紧要就係开心。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/8zTHQoAqMMIAAAAAWdAAAAgADvHDAQFr"></audio> |
| 这是一个粤语地区长辈的声音，是一种带有地域特色的创意风格。他使用粤语（广东话），年长男性声音沉厚，语速较慢。语气在说教时显得严肃，但言语间仍透露出对家人的关心。 | 你睇你，成日挂住玩，书又唔读。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/_ENBQIG74HEAAAAAYMAAAAgADvHDAQFr"></audio> |
| 是一个粗犷豪放的东北大哥的声音，是一种极具地域辨识度的创意与特殊风格。他使用带有浓郁东北口音的普通话，中年男性声音洪亮，嗓门大。说话直来直去，语速快，语气中充满了幽默感和不拘小节的豪爽。 | 哎呀我的妈呀，这嘎冷的天儿，你穿这点儿？ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/31p-QbOP3C4AAAAAWCAAAAgADvHDAQFr"></audio> |
| 这是一种ASMR耳语，属于一种旨在引发特殊感官体验的创意风格。这个女性使用轻柔的普通话进行耳语，声音气音成分重。音量极低，紧贴麦克风，语速极慢，旨在制造触发听者颅内快感的声学刺激。 | 放松……现在……闭上你的眼睛…… | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/q3_mR4HJ_M0AAAAAWdAAAAgADvHDAQFr"></audio> |
| 这是一种ASMR耳语，属于一种旨在引发特殊感官体验的创意风格。这个女性使用轻柔的普通话进行耳语，声音气音成分重。音量极低，紧贴麦克风，语速极慢，旨在制造触发听者颅内快感的声学刺激。 | 听……这个声音……是不是……很舒服…… | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/5EhsSL92eVsAAAAAXVAAAAgADvHDAQFr"></audio> |
| 这是一个体育赛事激情解说员的声音，是极具感染力的创意与特殊风格。他使用高亢的普通话，中年男性声音沙哑（因长时间呐喊）。语速快如机枪，在关键时刻会瞬间爆发，语调充满了紧张、激动和不可思议的情绪。 | 球进了！进了进了进了！伟大的胜利！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/gngGSYd0VbMAAAAAVLAAAAgADvHDAQFr"></audio> |
| 这是一个宫斗剧中的威严皇后的声音，展现了充满张力的戏剧叙事风格。她使用雍容华贵的普通话，中年女性声音沉稳。语速雍容和缓，但每个字都掷地有声，语气表面波澜不惊，实则暗藏锋芒和久居上位的威压。 | 妹这话，是说给本宫听的吗？ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/_E3MRqNhfS4AAAAAUUAAAAgADvHDAQFr"></audio> |
| 这是一个宫斗剧中的威严皇后的声音，展现了充满张力的戏剧叙事风格。她使用雍容华贵的普通话，中年女性声音沉稳。语速雍容和缓，但每个字都掷地有声，语气表面波澜不惊，实则暗藏锋芒和久居上位的威压。 | 放肆！在本宫面前，岂容你如此喧哗？ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/tWpMT46dOD8AAAAAVmAAAAgADvHDAQFr"></audio> |
| 这是一个古装剧中的腹黑反派的声音，充满了戏剧性的叙事张力。他使用华丽而阴柔的普通话，青年男性声音说话时语速慢条斯理，语气看似温和，却在句尾带着一丝不易察觉的冷笑和威胁，让人不寒而栗。 | 呵呵，看来，你还是不太明白自己的处境啊。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/B4baRbcnfWcAAAAAWCAAAAgADvHDAQFr"></audio> |

## Podcast: Multi-person Conversation

| Input Speaker1 Prompt | Input Speaker2 Prompt | Target Text | TTS Result |
|---|---|---|---|
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/v95pQ5nsosUAAAAASxAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/XKa1ToBc-JEAAAAAT4AAAAgADvHDAQFr"></audio> | speaker_1: 你可以说一下，就大概说一下，可能虽然我也不知道，我看过那部电影没有。<br>speaker_2: 就是那个叫什么，变相一节课的嘛。<br>speaker_1: 嗯。<br>speaker_2: 一部搞笑的电影。<br>speaker_1: 一部搞笑的。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/RIy1QpdN3LwAAAAAgBAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ZDQfTq95nYYAAAAASmAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/l6IzRZ728CwAAAAATvAAAAgADvHDAQFr"></audio> | speaker_1: 所以你想成功的话，就推荐你看这些书。<br>speaker_2: 我会有时间去看一看的。<br>speaker_1: 要是像我看的话，我就会感觉特别的。<br>speaker_2: 枯燥。<br>speaker_1: 对枯燥无聊毕竟是古文也看不懂除非那些。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/3go1TZEAJJoAAAAAgBAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/xXhyTYMSJZkAAAAASmAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/m6VEQJqejDoAAAAATvAAAAgADvHDAQFr"></audio> | speaker_1: 知道家长在考虑什么让家长也知道孩子们在考虑什么。<br>speaker_2: 对。<br>speaker_1: 减少矛盾。<br>speaker_2: 对，就是感觉其实出这些电影或者电视剧，也是挺好的让彼此更加了解一下，我感觉如果是一个家长和一个小孩儿，去看电视剧的话，收获也是蛮多的。<br>speaker_1: 那你还有什么比较好的电影介绍给我呢。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/uu0ST4l4rQ8AAAAAgCAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/XJrBRYT-Jj8AAAAAV9AAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/9YC6RolhXrcAAAAAVUAAAAgADvHDAQFr"></audio> | speaker_1: 上个厕所，然后那有专门的人给你，就是你上厕所之前，专门有个人给你递纸了。<br>speaker_2: 对，上个厕所会出来给你递毛巾。<br>speaker_1: 啊对，让你去擦手这些什么的。<br>speaker_2: 是的。<br>speaker_1: 服务，服务非常周到，不过也有少数人就说，这个服务实在太久了，就是，就，就是像那种，就是那个。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ByrSQ5qItf0AAAAAgCAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/n3cQSJIg95YAAAAASxAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/tCEWQbwU9zQAAAAAT4AAAAgADvHDAQFr"></audio> | speaker_1: 什么东西啊？<br>speaker_2: 叫那个的哪吒的那个。<br>speaker_1: 啊，那个哪吒，但是我没有去看一看嘛。<br>speaker_2: 我也没看过。<br>speaker_1: 我当时好像是本来是要去看的。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/MeydQrs8TZQAAAAAc7AAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/trZlQozEWtMAAAAATLAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ZxHsQqtPXdMAAAAASFAAAAgADvHDAQFr"></audio> | speaker_1: 啊，我吃过。<br>speaker_2: 是不是。<br>speaker_1: 因为我之前去过山东一次吃过人家那杂粮煎饼。<br>speaker_2: 反正跟咱们这儿，不一样是吧，正宗的人家那是正宗的。<br>speaker_1: 本地的。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/HPcJSZYAIeAAAAAAf8AAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/y85ERp78RBYAAAAAVzAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/q--1Rq2h2lcAAAAARNAAAAgADvHDAQFr"></audio> | speaker_1: 那就之前的妆都毁掉了。<br>speaker_2: 嗯，是是是。<br>speaker_1: 然后之后就是睫毛。<br>speaker_2: 哦，对，那睫毛涂睫毛膏。<br>speaker_1: 画睫呃涂睫毛的时候，先夹一下睫毛，夹。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/-_FYQ7d-1z8AAAAAdyAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/hwvBRb8lU4YAAAAATfAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/fhZMTLl6-MEAAAAATeAAAAgADvHDAQFr"></audio> | speaker_1: 嗯哪三个字。<br>speaker_2: 足力健。<br>speaker_1: 哦听说过。<br>speaker_2: 那你给我讲讲。<br>speaker_1: 我听说这个足力健对老年人的脚底有好处，而且边走路都能健身是吗。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/MzBqSacDTPEAAAAAfgAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/o8saTrpFVfMAAAAASxAAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/6XeITLMlChoAAAAAT4AAAAgADvHDAQFr"></audio> | speaker_1: 就这样子，嗯，一般男生都是看什么电影啊？ 推理的吗？ 还是什么。<br>speaker_2: 也不是吧，就是看那种，嗯，具体也说不出哪种类型嘛。<br>speaker_1: 具体也说不出。<br>speaker_2: 嗯。<br>speaker_1: 就是都有看一点。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/saEdRIiikDoAAAAAgBAAAAgADvHDAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ATxQRLZ9WSoAAAAAS6AAAAgADvHDAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/qkYDQoa2gYkAAAAAV8AAAAgADvHDAQFr"></audio> | speaker_1: 是了，只有你，化化起妆了才能充实呢，自信心呃然后才，感觉自己的心情是美美哒的。<br>speaker_2: 你想化妆是，呃那就从眉毛开始说不是从打底开始说吧。<br>speaker_1: 嗯说，好想听呢。<br>speaker_2: 洁面以后就是拍水乳，水乳霜。<br>speaker_1: 嗯。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/EKRfT6xTVAcAAAAAgCAAAAgADvHDAQFr"></audio> |

## Music Generation

| Instruction | TTS Result |
|---|---|
| Genre: 迪斯科. Mood: 活力四射 / 精力充沛. Instrument: 电吉他. Theme: 运动. Duration: 30s | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/eNysR4tOLFUAAAAAgDAAAAgADvHDAQFr"></audio> |
| Genre: 当代古典音乐. Mood: 温暖 / 友善. Instrument: 合成拨弦. Theme: 节日. Duration: 60s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/UgvFSrBEaOkAAAAAgFAAAAgADvHDAQFr"></audio> |
| Genre: 电子舞曲. Mood: 自信 / 坚定. Instrument: 架子鼓. Theme: 节日. Duration: 47s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/NLdpQpltnesAAAAAgEAAAAgADvHDAQFr"></audio> |
| Genre: 独立民谣. Mood: 鼓舞人心 / 充满希望. Instrument: 合成铜管乐器. Theme: 节日. Duration: 63s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/XqPwTZHlUQoAAAAAgFAAAAgADvHDAQFr"></audio> |
| Genre: 流行摇滚. Mood: 温暖 / 友善. Instrument: 低音鼓. Theme: 旅行. Duration: 76s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/D7TiTbp7yPsAAAAAgGAAAAgADvHDAQFr"></audio> |
| Genre: 电子舞曲. Mood: 快乐. Instrument: 定音鼓. Theme: 好时光. Duration: 61s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/HP6AS51ywM8AAAAAgFAAAAgADvHDAQFr"></audio> |
| Genre: 流行乐. Mood: 温暖 / 友善. Instrument: 合成铜管乐器. Theme: 庆典与喜悦. Duration: 41s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/oOBFQ5vxF1MAAAAAgDAAAAgADvHDAQFr"></audio> |
| Genre: 当代古典音乐. Mood: 鼓舞人心 / 充满希望. Instrument: 合成拨弦. Theme: 庆典与喜悦. Duration: 45s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/1fXmTIwsVe0AAAAAgEAAAAgADvHDAQFr"></audio> |
| Genre: 电子舞曲. Mood: 鼓舞人心 / 充满希望. Instrument: 电吉他. Theme: 运动. Duration: 94s. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/187-S7uAug4AAAAAgIAAAAgADvHDAQFr"></audio> |

### Speech/Music Mono Generation: Single-Channel Generation of Speech and Music

| Instruction | Input Prompt | Target Text | TTS Result |
|---|---|---|---|
| Genre: 电子舞曲. Mood: 活力四射. Instrument: 合成铜管乐器. Theme: 运动. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/p9meS6fisIAAAAAAYvAAAAgADvHDAQFr"></audio> | 全神贯注，跟上这强劲的节奏，冲向终点吧！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/wjNoQaygcMcAAAAAXVAAAAgADvHDAQFr"></audio> |
| Genre: 流行摇滚. Mood: 快乐. Instrument: 电吉他. Theme: 旅行. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/A7ikT589TL8AAAAAZ8AAAAgADvHDAQFr"></audio> | 阳光洒满公路，带上行囊，出发去远方！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/1RvYSb26zDMAAAAAW5AAAAgADvHDAQFr"></audio> |
| Genre: 迪斯科. Mood: 兴奋. Instrument: 架子鼓. Theme: 生日. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/hejSSIe4Q28AAAAAdrAAAAgADvHDAQFr"></audio> | 派对时刻到！让我们在鼓点中祝你生日快乐！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/JWDUT6wgtzQAAAAAVmAAAAgADvHDAQFr"></audio> |
| Genre: 电子舞曲. Mood: 兴奋. Instrument: 合成铜管乐器. Theme: 运动. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/AGkUS7SXWtUAAAAAZPAAAAgADvHDAQFr"></audio> | 汗水在燃烧，感受这股能量，你就是最强的！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/8iKKSaeWib0AAAAAVmAAAAgADvHDAQFr"></audio> |
| Genre: 流行摇滚. Mood: 活力四射. Instrument: 架子鼓. Theme: 旅行. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/6fzBRLw0GBIAAAAAX7AAAAgADvHDAQFr"></audio> | 踏上未知的旅程，每一步都充满未知的惊喜！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/jmdkS42Q8vsAAAAAUvAAAAgADvHDAQFr"></audio> |
| Genre: 迪斯科. Mood: 快乐. Instrument: 电吉他. Theme: 生日. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/oSShQplG3fYAAAAAY8AAAAgADvHDAQFr"></audio> | 吹灭蜡烛前，先跟着旋律尽情摇摆吧！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/Ve-CRYwDgJ4AAAAAVLAAAAgADvHDAQFr"></audio> |
| Genre: 电子舞曲. Mood: 快乐. Instrument: 合成铜管乐器. Theme: 生日. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/LJLTSJkOlpIAAAAAYkAAAAgADvHDAQFr"></audio> | 这是属于你的闪耀时刻，生日派对正式开始！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ddyURow2Mj4AAAAAVmAAAAgADvHDAQFr"></audio> |
| Genre: 流行摇滚. Mood: 兴奋. Instrument: 电吉他. Theme: 运动. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/9WzqRZ4w4BcAAAAAe8AAAAgADvHDAQFr"></audio> | 超越极限，感受心跳的轰鸣，永不言弃！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/orOmT50eNIcAAAAAVmAAAAgADvHDAQFr"></audio> |
| Genre: 迪斯科. Mood: 活力四射. Instrument: 架子鼓. Theme: 旅行. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/qV3xR7HJKVoAAAAAdTAAAAgADvHDAQFr"></audio> | 在霓虹闪烁的异国街头，找寻失落的快乐！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/kAamRYOPwSgAAAAAVmAAAAgADvHDAQFr"></audio> |
| Genre: 流行摇滚. Mood: 快乐. Instrument: 合成铜管乐器. Theme: 运动. SNR: 5.0dB. | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/Rrm0TpFNud8AAAAAYDAAAAgADvHDAQFr"></audio> | 运动让生活更有趣，让我们一起快乐出发！ | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ecwfRqy8XugAAAAAVLAAAAgADvHDAQFr"></audio> |

## Sound Generation(TTA)

| Instruction | TTS Result |
|---|---|
| A motor is revving and changing gears | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/yPAnRqgKG7gAAAAAgCAAAAgADvHDAQFr"></audio> |
| Thunder and a gentle rain | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/2YO-Qa73VAIAAAAAgCAAAAgADvHDAQFr"></audio> |
| Continuous snoring of a person | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/wUo6TZDgEYMAAAAAgCAAAAgADvHDAQFr"></audio> |
| Nature sounds with a frog croaking | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/ONTTTa5RbAwAAAAAgCAAAAgADvHDAQFr"></audio> |
| A man talking as a stream of water trickles in the background | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/JrsRQbkYSasAAAAAgCAAAAgADvHDAQFr"></audio> |

### Speech/Sound Mono Generation: Single-Channel Generation of Speech and Sound

| Instruction | Input Prompt | Target Text | TTS Result |
|---|---|---|---|
| Birds chirping | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/VAjRQJl9qCAAAAAATLAAAAgADvHDAQFr"></audio> | 副主任及以上号别就诊人次，为二百零八点二万。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/YnfgQ7axbHIAAAAAepAAAAgADvHDAQFr"></audio> |
| Light rain | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/MIH3Qaq295gAAAAATIAAAAgADvHDAQFr"></audio> | 其中又有大部分百分之四十一点九认为，由该品牌影楼拍摄。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/6t9HQodaMB8AAAAAgBAAAAgADvHDAQFr"></audio> |
| Keyboard typing | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/SXXqSqNerk0AAAAATWAAAAgADvHDAQFr"></audio> | 本次有害昆虫科普展，是一场专门为孩子准备的科普教育活动。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/uASOTr6D3zIAAAAAgBAAAAgADvHDAQFr"></audio> |
| Fire engine siren | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/SSS3QIlsFkQAAAAATCAAAAgADvHDAQFr"></audio> | 他陪舅舅到简阳一所学校，考察捐资改建事宜。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/oIn1Rrg1eTEAAAAAdyAAAAgADvHDAQFr"></audio> |
| Rainstorm | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/Ey2URryqm6IAAAAATMAAAAgADvHDAQFr"></audio> | 请语音留言，告诉电话精灵您没有达到父母的哪些要求。 | <audio controls src="https://mdn.alipayobjects.com/huamei_7mmngh/afts/file/s0TbTIyQSI0AAAAAepAAAAgADvHDAQFr"></audio> |