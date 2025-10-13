---
title: "Ming-UniAudio: 用于统一表征的联合理解、生成和编辑的语音语言大模型"
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

{{< button href="https://github.com/inclusionAI/Ming-UniAudio" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-UniAudio-16B-A3B">Hugging Face</a>｜ 🤖 <a href="https://modelscope.cn/models/inclusionAI/Ming-UniAudio-16B-A3B">ModelScope</a>

## Ming-UniAudio的视频介绍
<video src="https://gw.alipayobjects.com/v/huamei_xb4oy7/afts/video/oVK9TY4AEBwAAAAAgWAAAAgADmiGAQFr" width="1024px" height="660px" controls autoplay muted playsinline></video>

## 语音编辑的视频展示
<video src="https://gw.alipayobjects.com/v/huamei_xb4oy7/afts/video/-FcPSYBMkDMAAAAAgoAAAAgADmiGAQFr" width="1024px" height="660px" controls autoplay muted playsinline></video>

## 编辑任务的视频demo展示

| | |
| :---: | :---: |
| <video src="https://gw.alipayobjects.com/v/huamei_xb4oy7/afts/video/xGZ4R5Tg09MAAAAAgGAAAAgADmiGAQFr" controls width="100%"></video> | <video src="https://gw.alipayobjects.com/v/huamei_xb4oy7/afts/video/QORqR68bUPYAAAAAgHAAAAgADmiGAQFr" controls width="100%"></video> |
| <video src="https://gw.alipayobjects.com/v/huamei_xb4oy7/afts/video/MHIuTbHoLVoAAAAAgGAAAAgADmiGAQFr" controls width="100%"></video> | <video src="https://gw.alipayobjects.com/v/huamei_xb4oy7/afts/video/k6NERayHTS8AAAAAgGAAAAgADmiGAQFr" controls width="100%"></video> |


<!-- # Ming-UniVision: Joint Image Understanding and Generation via a Unified Continuous Tokenizer -->

## 🚀 技术亮点

1.  **首个面向理解与生成任务的统一连续语音分词器:** **MingTok-Audio** 是一种基于 VAE 框架与因果 Transformer 架构的统一连续语音分词器，首个有效融合语义与声学特征的连续语音分词器，通过层次化特征表示与 LLM 形成闭环系统，同时适用于理解与生成任务。
2.  **首个采用统一连续分词器、同时支持理解与生成的语音大模型:** **Ming-UniAudio** 是端到端的统一语音语言模型，仅用一个 LLM 主干即可同时完成理解与生成，并配备扩散头以保证高保真语音合成。
3.  **首个无需时序约束、支持语义与声学任务的通用自由形式语音编辑模型:** 我们提出了首个指令引导的自由形式语音编辑框架，无需显式指定编辑区域即可实现全面的语义与声学编辑；同时发布 Ming-Freeform-Audio-Edit，首个面向该任务的开源评测集。
4.  **首个自由形式语音编辑基准:** 我们推出 Audio-Edit-Benchmark，首个开源自由形式评测集，涵盖四类语义与五类声学编辑任务，用于系统评估模型的编辑能力。

## 多项指令引导的自由形式语音编辑的任务展示

### 语义编辑 - 插入

| Instruction | Transcription | Target Transcription | Before Edit | Speechedit Result |
|---|---|---|---|---|
| insert '简直' after the character or word at index 8. | 真是个浪漫的邂逅可以说是英雄救美了 | 真是个浪漫的邂逅简直可以说是英雄救美了 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/JdKpT5F_JtcAAAAASHAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/WfvQQKsB4dQAAAAAScAAAAgADmiGAQFr"></audio> |
| insert '真正' before the character or word '好'. | 就有道而正焉可谓好学也已 | 就有道而正焉可谓真正好学也已 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/EQA0RrEZEy4AAAAASSAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/afDpSI_C_P0AAAAASmAAAAgADmiGAQFr"></audio> |
| insert 'clearly' before the character or word at index 8. | Its legal status in Trinidad was insufficient to preserve its ecological status. | Its legal status in Trinidad was insufficient clearly to preserve its ecological status. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/pNLORqb9lUcAAAAASLAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/UtbRRY_BLdgAAAAASTAAAAgADmiGAQFr"></audio> |
| insert 'successfully' after the character or word 'profession'. | Previously an attorney Korona left the profession to pursue a career in music. | Previously an attorney Korona left the profession successfully to pursue a career in music. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/HJoKS4foKaQAAAAASYAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/H7YbQr6zTyEAAAAASpAAAAgADmiGAQFr"></audio> |

### 语义编辑 - 替换

| Instruction | Transcription | Target Transcription | Before Edit | Speechedit Result |
|---|---|---|---|---|
| substitute '妈妈' with '爸爸'. | 我想对于妈妈来说会比任何礼物都要温暖 | 我想对于爸爸来说会比任何礼物都要温暖 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/8CQiSIZebqAAAAAATdAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/CtYrQq7gmmkAAAAAUgAAAAgADmiGAQFr"></audio> |
| substitute the characters or words from index 8 to index 10 with '五万元'. | 当时我想等筹齐两万元聘礼就送她妈回家 | 当时我想等筹齐五万元聘礼就送她妈回家 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/9N09RL4k5AoAAAAASEAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/-63tQ5FSxWoAAAAASAAAAAgADmiGAQFr"></audio> |
| substitute 'get pictures off' with 'transfer photos from'. | I'm trying to explain to my mother how to get pictures off her phone. | I'm trying to explain to my mother how to transfer photos from her phone. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Wur_RKhjsTkAAAAASGAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/x-PGQIC1dJsAAAAASTAAAAgADmiGAQFr"></audio> |
| substitute the words from index 8 to index 9 with 'could become'. | Considering the growth of human population insects might be the food of the future. | Considering the growth of human population insects could become the food of the future. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Pu-_TY8088EAAAAASxAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/aVQ9SoLVfM0AAAAAS4AAAAgADmiGAQFr"></audio> |

### 语义编辑 - 删除

| Instruction | Transcription | Target Transcription | Before Edit | Speechedit Result |
|---|---|---|---|---|
| delete '比普通的茶叶要'. | 花草茶的口味一般比普通的茶叶要苦一些 | 花草茶的口味一般苦一些 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/C1jQTKJCUSgAAAAASJAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Pl2CR4QVw2EAAAAARYAAAAgADmiGAQFr"></audio> |
| delete the characters or words from index 11 to index 15. | 我吃了点燕麦片煎鸡蛋还喝了点橙汁 | 我吃了点燕麦片煎鸡蛋汁 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/txKrRLpnBH4AAAAASIAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/C5LvS67ATOEAAAAARjAAAAgADmiGAQFr"></audio> |
| delete 'times'. | The classification of this gibbon has changed several times in the past few years. | The classification of this gibbon has changed several in the past few years. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/M5h2TbiN37wAAAAATAAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/PxcTTrVjcrAAAAAAS4AAAAgADmiGAQFr"></audio> |
| delete the characters or words from index 2 to index 6. | On the second day the boy climbed to the top of a cliff near the camp | On climbed to the top of a cliff near the camp | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/yHJ3Q54WNY4AAAAASCAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/EKtETaHIfPUAAAAARhAAAAgADmiGAQFr"></audio> |

### 声学编辑 - 方言转换

| Instruction | Transcription | Before Edit | Speechedit Result |
|---|---|---|---|
| Change the accent of the speech to Dongbei. | 之后，他考取导游证，成为拱北口岸中旅的导游。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/RmuPT4u48BIAAAAATAAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/GcUzTLgBYYQAAAAAUTAAAAgADmiGAQFr"></audio> |
| Change the accent of the speech to Chengdu. | 只有当科技为本地社群创造价值的时候，才能真正有意义。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Cd0GRauyLh8AAAAAUMAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/wGu6Q7fB96EAAAAAUyAAAAgADmiGAQFr"></audio> |
| Change the accent of the speech to Chengdu. | 我得用回想与幻想补充我所缺少的饮食，安慰我所得到的痛苦。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/jnf2RKh_lskAAAAAURAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/N90aR4CNHy4AAAAAVSAAAAgADmiGAQFr"></audio> |
| Change the accent of the speech to Guangxi. | 全国恶性肿瘤发病，及死亡第一位的是肺癌。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/-X4eSpyIon4AAAAAVRAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/8CDxQq717cUAAAAAWKAAAAgADmiGAQFr"></audio> |

### 声学编辑 - 变速

| Instruction | Transcription | Before Edit | Speechedit Result |
|---|---|---|---|
| adjusts the speed to 0.5. | 我用胸抵住车把，掌握方向，速度一点也不比别人慢。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/R9HrRKU4XJgAAAAAVPAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Z7rBRKF0VcoAAAAAc_AAAAgADmiGAQFr"></audio> |
| adjusts the speed to 0.7. | There is a growing body of case law on Bayh-Dole. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/MBcXTKBliGMAAAAASgAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/oh3UTIJzHysAAAAAUgAAAAgADmiGAQFr"></audio> |
| adjusts the speed to 1.3. | Cribb was born near Bristol but moved to London before starting professional fighting. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/D9lDQo0Zjz8AAAAAUBAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Kc2kTZ-Wh5IAAAAAT0AAAAgADmiGAQFr"></audio> |
| adjusts the speed to 2. | 切实帮助困难群众解决生产生活中，遇到的困难和问题。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/PHbSSJZGnjEAAAAAUDAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/KmPERIhGVTIAAAAASjAAAAgADmiGAQFr"></audio> |

### 声学编辑 - 变调

| Instruction | Transcription | Before Edit | Speechedit Result |
|---|---|---|---|
| shifts the pitch by 3 steps. | 因为外面有战争，家里又有战争带来的悲伤和匮乏。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/sA5dRL1s_pkAAAAAURAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/wMaHQaX_gZ4AAAAAVrAAAAgADmiGAQFr"></audio> |
| shifts the pitch by 5 steps. | 自动驾驶将大幅提升出行安全，效率。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/q2-QTp1S49QAAAAATzAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/ar7qRrxbA-0AAAAAU_AAAAgADmiGAQFr"></audio> |
| shifts the pitch by -1 steps. | The heart of the campus has a number of historic buildings. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/_2E0Q6STH2YAAAAASiAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/fwtWQaSWCeoAAAAATVAAAAgADmiGAQFr"></audio> |
| shifts the pitch by -1 steps. | Stevenson is also the director of music ministries at Angeles Mesa Presbyterian Church. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/qFzmT7Q_LGIAAAAAVAAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/3lSvSLJcx9oAAAAAWjAAAAgADmiGAQFr"></audio> |

### 声学编辑 - 变音量

| Instruction | Transcription | Before Edit | Speechedit Result |
|---|---|---|---|
| adjusts the volume to 1.4. | A woman sits as she shows the designs she has made in the floor. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/IKI3Sq9VfrUAAAAAS7AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/ZipySrVXlRsAAAAAT6AAAAgADmiGAQFr"></audio> |
| adjusts the volume to 1.6. | For example, they both consist of predominately older, hence redder, stars. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/-STIR7ZWR4cAAAAAT6AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/YStPSoQ1o_MAAAAAVLAAAAgADmiGAQFr"></audio> |
| adjusts the volume to 0.9. | 伏羲的儿孙们看见伏羲捉来了鱼，也都欢欢喜喜跑来问长问短。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/n1qOS4vXT44AAAAAUnAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/DuTPR5fSJrwAAAAAWKAAAAgADmiGAQFr"></audio> |
| adjusts the volume to 0.3. | 他们还告诉巨人，那座城市里群英荟萃。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/3DgxTLQAwaQAAAAATuAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/qA3JSqPKPRkAAAAAU5AAAAgADmiGAQFr"></audio> |

### 声学编辑 - 降噪

| Instruction | Transcription | Before Edit | Speechedit Result |
|---|---|---|---|
| denoise the audio. | Be shape of example,before deriving this formula we explained what we mean by problems of this kind we now generalize these ideas for general binomial experiments. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/1OAFTqgJIwcAAAAAU5AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/0EAKT6Mi0KkAAAAAZ3AAAAgADmiGAQFr"></audio> |
| denoise the audio. | Summoned to himself with firmness no surrender his superiors had also preached this saying it was the way of eternal honor his comrades were old. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/DfUMTKdSXL8AAAAAU5AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/89QhSLDv0-oAAAAAZrAAAAgADmiGAQFr"></audio> |
| denoise the audio. | There are people who travel long distances to assure my continued existence we have also seen the power of faith at work among us it was muscular but it wasn't symmetrical. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/ROrmQJzxSHgAAAAAU5AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/niWWSLMGNeIAAAAAZxAAAAgADmiGAQFr"></audio> |
| denoise the audio. | Theory eventually proved inexact the heavens refused to give up their weeping but what has been happening recently might be described as creeping mannerism clever. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/DJ-YR6aHUYIAAAAAU5AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/woakSZCLjzMAAAAAZxAAAAgADmiGAQFr"></audio> |

### 声学编辑 - 加背景音

| Instruction | Before Edit | Speechedit Result |
|---|---|---|
| add rain to audio. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/74mRQJBHEDsAAAAASkAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/RxFHSZGgWgsAAAAAU_AAAAgADmiGAQFr"></audio> |
| add car sound to audio. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/37sbT4bQ95sAAAAARsAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/bUK1Qo4QxhwAAAAATbAAAAgADmiGAQFr"></audio> |
| add carefree music to audio. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/SYorQ6L3vSwAAAAAUMAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/c1rCSpdBOUYAAAAAYTAAAAgADmiGAQFr"></audio> |
| add groovy music to audio. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/LNqDTKx-eq4AAAAARWAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/NfMfTaa1aDIAAAAASpAAAAgADmiGAQFr"></audio> |

### 声学编辑 - 情感转换

| Instruction | Transcription | Before Edit | Speechedit Result |
|---|---|---|---|
| change the emotion to happy mood. | 比尔想再看小主人一眼然后走进森林安静地死去。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/EodrRIWu_ucAAAAASuAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/dO35RbVvSTIAAAAAVFAAAAgADmiGAQFr"></audio> |
| change the emotion to happy mood. | 世界爱眼日是每年十月的第二个星期四。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Yf78Q7yF5YoAAAAASMAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/nlUUS5Jv3zcAAAAATVAAAAgADmiGAQFr"></audio> |
| change the emotion to happy mood. | 我会玩很多游戏呢听说多喝水能治百病。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/5bCPTJ9cRswAAAAASWAAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/LH_vTb1udC0AAAAAUZAAAAgADmiGAQFr"></audio> |
| change the emotion to happy mood. | 建议戴口罩空气质量轻度污染。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/x1h0RpWyfooAAAAAR9AAAAgADmiGAQFr"></audio> | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/P1CQSpx5x_8AAAAATIAAAAgADmiGAQFr"></audio> |



## 语音理解任务展示

### 中英文语音识别

| Input | Transcription |
|---|---|
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/HgRPQI-yCT0AAAAASQAAAAgADmiGAQFr"></audio> | 呃很久没有看到看过如此不带价值判断的电影 |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/jPUNTKLTwwMAAAAAaBAAAAgADmiGAQFr"></audio> | 桃花庄人塔俱乐部是位于杭州市德清县的一个俱乐部 |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/lfRkQp3qH68AAAAAbDAAAAgADmiGAQFr"></audio> | he was excited and at the same time uneasy maybe the girl had already forgotten him |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/ROdTTobjQk4AAAAAaYAAAAgADmiGAQFr"></audio> | it's true that everything has its destiny but one day that destiny will be realized |

### 方言理解

| Input | Transcription |
|---|---|
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/VMJDRb-I-poAAAAASkAAAAgADmiGAQFr"></audio> | [方言-粤语] 你做乜嘢啊系咪唔想倾偈啊。 |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/kd0sRqfBceUAAAAARfAAAAgADmiGAQFr"></audio> | [方言-上海话] 阿拉考试还没定下来唻。 |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/6JfkSJqSF5YAAAAARyAAAAgADmiGAQFr"></audio> | [方言-闽南语] 宝贝较早休困晚安。 |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/VY5oTKxs3LgAAAAASTAAAAgADmiGAQFr"></audio> | [方言-川渝方言] 我难受得很别个都睡了。 |

### 上下文语音识别

| Input | Prompt | Transcription |
|---|---|---|
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/kPmlSarKaTgAAAAAgBAAAAgADmiGAQFr"></audio> | Please recognize the language of this speech and transcribe it. Format: oral. This is an audio about Banking. This audio may contains the following words or phrases:Zelle,daily A C H transfer limit,cashier's checks,transaction memos,F D I C regulations,cryptocurrency wallet,K Y C requirements. | Hey Chris, you won't believe what happened when I tried sending rent through Zelle yesterday. I hit some daily ACH transfer limit! My landlord's insisting on cashier's checks now. Remember how Sarah's Venmo payment got flagged last month? The bank's fraud detection system kept asking about transaction memos and 'source of funds' verification. Honestly, these FDIC regulations around peer-to-peer payments are getting ridiculous. I had to provide three months of bank statements just to increase my wire transfer threshold. Oh, and don't even get me started on cryptocurrency wallet KYC requirements. |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/A-j2QKPsWvAAAAAAgCAAAAgADmiGAQFr"></audio> | Please recognize the language of this speech and transcribe it. Format: oral. This is an audio about Banking. This audio may contains the following words or phrases:Priority Pass lounges,T S A Pre Check,rewards structure,bonus miles,Citibank's Prestige Card,Visa Infinite,E M V chip security protocols,dynamic currency conversion. | So listen, I finally canceled my Chase Sapphire Reserve last week. Remember how they touted those Priority Pass lounges and Luxury Hotel Collection benefits? Turns out I only used the T S A Pre Check credit once this whole year! The annual fee jumped to five hundred fifty dollars, plus they started requiring eighteen thousand points to waive it. My Amex Platinum isn't any better that seven hundred dollar fee just hit, and their new rewards structure requires thirty thousand in annual spending for bonus miles. Oh, and get this Citibank's Prestige Card now charges two hundred bucks for authorized users! Honestly, these Visa Infinite perks like concierge services and purchase protection sound fancy, but when do regular people actually use E M V chip security protocols or dynamic currency conversion? |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/6L8lRpfRvhoAAAAAgBAAAAgADmiGAQFr"></audio> | Please recognize the language of this speech and transcribe it. Format: oral. This is an audio about 酒店常旅客计划. This audio may contains the following words or phrases:至悦大使,重庆来福士洲际,酒廊待遇,万豪旅享家,钛金会员. | 诶？小李，我最近在研究IHG的会员体系，这个‘至悦大使’的达标条件也太苛刻了吧！‘三百权益’里，洲际的认可房晚才给三十晚。你说，他们家的‘先行者任务’算不算‘里程碑奖励’啊？对了，我之前用积分兑换重庆来福士洲际的行政套房，礼宾部居然没给酒廊待遇，反而现金订房的客人能拿到双早。万豪旅享家的‘钛金会员’都能自动匹配套房升级券，IHG这个动态定价系统真是让人头大！ |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/bwa5Trrt_8AAAAAAgBAAAAgADmiGAQFr"></audio> | Please recognize the language of this speech and transcribe it. Format: oral. This is an audio about 汽车行业. This audio may contains the following words or phrases:汽车之家曹雷,矩阵式 L E D 大灯,四十八伏轻混系统,可变气门升程技术,M B U X 超联屏,Sportback,Allroad. | 嘿，老李，你看到‘汽车之家’曹雷发的文章没？说新款奥迪A3加长到四米六了。昨儿我去4S店试驾，销售说这车配了啥矩阵式LED大灯，还有四十八伏轻混系统。不过，宝马1系那个B48发动机也改了‘可变气门升程技术’，奔驰A级更夸张，直接把MBUX超联屏塞进紧凑车里！要我说啊，现在车企搞细分市场真够拼的！听说奥迪还要出Sportback、Allroad等四个版本呢，连自适应巡航都标配了！ |


## 语音生成

### 一句话音色克隆

| Input Prompt | Target Text | TTS Result |
|---|---|---|
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/FjxTQqU_YwkAAAAATuAAAAgADmiGAQFr"></audio> | 全球每年有超过一百三十五万人，因交通事故而死亡。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/2vMrQpm1ok8AAAAATEAAAAgADmiGAQFr"></audio> |
| <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/wmxOR52zO5kAAAAAS3AAAAgADmiGAQFr"></audio> | The stained glass offered a hypnotic atmosphere. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Wu73RaH8UfsAAAAAR3AAAAgADmiGAQFr"></audio> |

### 多语种语音生成

| Input Prompt Text | Input Prompt audio | Target Text | TTS Result |
|---|---|---|---|
| We asked over twenty different people, and they all said it was his. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/J5M7R7mrCIoAAAAAS3AAAAgADmiGAQFr"></audio> | The stained glass offered a hypnotic atmosphere. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Pr_3Tqem6_gAAAAATbAAAAgADmiGAQFr"></audio> |
| The wedding was photographed by celebrity wedding photographer Kid Chan. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/jOIAQrN4ZOsAAAAAUIAAAAgADmiGAQFr"></audio> | Bender also conducted extensive research on autism. | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/kPl1TY7Mcz8AAAAAUmAAAAgADmiGAQFr"></audio> |
| 关于不少万达广场的注册资本金更改。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Exe3SJb_Xk8AAAAATFAAAAgADmiGAQFr"></audio> | 哎，这些情况在北京这样的大都市，是无法避免的。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/xOqOSoogXqcAAAAAVLAAAAgADmiGAQFr"></audio> |
| 长春周二之前晴天多云五月七日是晴天。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/pmrSSLsTKMoAAAAAT6AAAAgADmiGAQFr"></audio> | 两人一直对婚变封口，使传闻闹得热烘烘。 | <audio controls src="https://mdn.alipayobjects.com/huamei_xb4oy7/afts/file/Wrd3Rpb6PnUAAAAAT6AAAAgADmiGAQFr"></audio> |

