---
title: "Segmentation-as-Editing for Unified Multimodal AI"
date: 2025-09-13T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-Lite-Omni-1.5">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni-1.5">ModelScope</a>

# Ming-lite-omni 1.5: Segmentation-as-Editing for Unified Multimodal AI

### The Hype and the Hidden Question

The multimodal AI world has been thriving.

From the debut of Qwen-Image to the interactive editing hype sparked by Nano Banana, image editing has rapidly become the next battlefield for generative AI.

Editing fundamentally requires two distinct skill sets:
- **Know *where*, *what*, and *how* to change** (understanding the image)
- **Produce the change with high visual quality** (generating the image)

Its rich gameplay and strong interactivity have pulled in users, developers, and creators alike.

But behind the noise, few are asking:

> **Beneath this prosperity, how close are we to a truly unified “understanding + generation” AI?**

### Understanding and Generation: Two Hands, Often Out of Sync

For years, we’ve chased an ambitious goal:

Build a unified multimodal model that understands the world like a scientist (e.g., image segmentation) while creating it like an artist (e.g., image editing).

In theory, these abilities should be mutually reinforcing:

> *“The deeper the understanding, the better the creation; the more the creation, the deeper the understanding.”*

Reality is messier.

In AI today:
- **Understanding = the left hand:** precise abstractions, semantic reasoning, boundaries.
- **Generation = the right hand:** coherent pixels, style, aesthetics.

But training a model to recognize 10,000 cat photos doesn’t magically make it capable of painting cats, and painting cats repeatedly doesn’t make it understand cats better.

Worse, in multitask training, the two often compete for resources — optimizations for understanding can hurt generation, and vice versa.

**We’re missing a catalyst: a task that forces the left and right hands to evolve together.**

---

### The Struggle: 16% Segmentation and Out-of-Control Generation

Before finding our solution, our unified model was struggling with generative segmentation:

Given an instruction like “*segment the banana in the upper-right corner*”, we wanted the model to output a segmentation mask directly.

The results were painful.

![Struggling with Segmentation](https://mdn.alipayobjects.com/huamei_wp0xz6/afts/img/A*2BAkRZ9WGTcAAAAAgCAAAAgAevzJAQ/original)

On RefCOCO-val, our cIoU plateaued at **~16%**.

The root cause is the **distribution gap**.

Generative models thrive on natural, continuous image distributions. Segmentation masks, however, are synthetic, abstract, binary maps — as unnatural as it gets for an image generator.

It was like asking a painter to draw an X-ray: doable, but far from their artistic instincts.

Here, generation wasn’t helping segmentation — it was tripping it up.

We needed a new task that:
1. Met the precision demands of **understanding**.
2. Played to the strengths of **generation**.

### The “Aha” Moment: Dressing Segmentation in Color

Here’s the analogy that unlocked it for us:

> *If you want a child to mark an object, is it easier to have them draw a tight outline with a pencil, or fill it in with bright colors?*

Obviously, the latter.

Instead of forcing our model to output abstract black-and-white masks, we **turned the segmentation task into a color-editing task**.

**Example:**
- **Instruction:** “*segment the banana in the upper-right*”
- **Old way:** Output a mask ❌
- **New way:** Directly edit the image: “*paint the banana purple*”, “*make the banana red*”, etc. ✅

![Segmentation as Editing](https://mdn.alipayobjects.com/huamei_wp0xz6/afts/img/A*-_O6RLOxXKcAAAAAgBAAAAgAevzJAQ/original)

This brought the task’s data distribution back to the realm of natural images — where generative models shine.

### Why This Works: The Hidden Catalyst

That small twist turned out to be exactly the catalyst we’d been searching for.

- **Boosting Understanding:**
To color the banana without bleeding outside the boundary, the model must internally nail pixel-perfect segmentation. The segmentation step became an **implicit prerequisite** to editing.

- **Unleashing Generation:**
No more awkward synthetic masks — the model is doing what it knows best: image-to-image editing. All its strengths in shading, texture, and edge blending go into making the change look natural.

For the first time, the left hand and right hand weren’t fighting — **they were helping each other**.

---

### The Numbers: From 16% to 72.4% — and Beyond

#### 1. SOTA-level Segmentation

The cIoU score didn’t just improve — it soared from 16% to **72.4%** on RefCOCO-val, a relative gain of over **350%**.

Qualitatively, the model outperformed competitors in pinpointing and segmenting targets, even in reasoning-heavy cases.

Against Qwen-Image and Nano Banana, our model:
- Located small or occluded targets more reliably.
- Produced boundaries that were visually and semantically aligned with instructions.

![Segmentation Comparison 1](https://mdn.alipayobjects.com/huamei_wp0xz6/afts/img/A*DwJpSZyoW-YAAAAAgJAAAAgAevzJAQ/original)
*Our model (right) accurately locates and segments the target subject. Qwen-Image (second from left) fails to locate the correct target, while Nano-banana (third from left) fails to accurately segment the man's head and has loose boundary lines.*

![Segmentation Comparison 2](https://mdn.alipayobjects.com/huamei_wp0xz6/afts/img/A*yL2MR7vLQdEAAAAAgEAAAAgAevzJAQ/original)
*For the prompt "please segment the girl with red mask," our model (right) is precise. Qwen-Image (second from left) misses the feet, and Nano-banana (third from left) alters the subject's proportions.*

During evaluation, thanks to the high consistency of non-edited regions in our model, we can directly derive the segmentation mask by calculating the difference between the edited result and the original image. The results show that our model's performance on segmentation is now on par with specialized vision models.

| Model Category | Model Name | RefCOCO (val) | RefCOCO+ (val) | RefCOCOg (val) |
| :--- | :--- | :---: | :---: | :---: |
| **Vision Specialist Models** | VLT | 67.5 | 56.3 | 55.0 |
| | CRIS | 70.5 | 62.3 | 59.9 |
| | LAVT | 72.7 | 62.1 | 61.2 |
| | PolyFormer-B | 74.8 | 67.6 | 67.8 |
| **MLLM + Specialist (SAM)** | LISA-7B | 74.1 | 62.4 | 66.4 |
| | PixelLM-7B | 73.0 | 66.3 | 69.3 |
| **Generative Models** | Qwen-Image-Edit* | 30.3 | 28.8 | 34.0 |
| | **Ming-Lite-Omni1.5 (Ours)** | **72.4** | **62.8** | **64.3** |
*<small>Due to its lower metrics, Qwen-Image-Edit was evaluated on a random sample of 500 images per test subset.</small>*

#### 2. Sharper, More Controllable Editing

The beauty of this method is that it not only fixed the segmentation weakness but also dramatically enhanced the model's general editing capabilities.

Because the model has learned an unprecedented "respect for boundaries" through thousands of "precise coloring" exercises, this "muscle memory" for fine-grained control has transferred to all editing tasks. Our edit controllability score saw a significant jump from **7.69 to 8.12** across sub-tasks like background, color, and material changes.

![Editing Controllability Comparison](https://mdn.alipayobjects.com/huamei_wp0xz6/afts/img/A*szjcQqQkC80AAAAAgIAAAAgAevzJAQ/original)
*Prompt: "remove the bow tie of the man on the far right." Our model (right) precisely removes only the target bow tie while maintaining background consistency. Qwen (second from left) incorrectly removes multiple bow ties and introduces inconsistencies. Nano-banana (third from left) also struggles with consistency.*

#### 3. Stronger ID Consistency

A core challenge in portrait editing is maintaining identity. Our model excels here as well. Whether changing a hairstyle or adjusting an expression, the model skillfully preserves the person's core features.

![ID Consistency Comparison](https://mdn.alipayobjects.com/huamei_wp0xz6/afts/img/A*Tc2-RoAHys8AAAAAd9AAAAgAevzJAQ/original)
*Top Row (Turn head): Our model (right) maintains ID and background consistency, unlike competitors. Middle Row (Smile): Our model (right) correctly follows the prompt while preserving ID, avoiding distortions seen in others. Bottom Row (Change background): Our model (right) excels at preserving the subject's ID and appearance during a background swap.*

**See More Editing Consistency in Action:**
<video src="https://gw.alipayobjects.com/v/huamei_wp0xz6/afts/video/A*CcqdTbafkt8AAAAAgEAAAAgAevzJAQ" width="704px" height="740px" controls></video>

---

### An Honest Look: Where We Can Still Improve

Despite the leap forward, challenges remain:
- **Large pose changes** (e.g., standing → running) need more reliability.
- **Multi-step or compound instructions** require better parsing and execution.
- **Instruction diversity support** needs expansion.

These are our next milestones.

### Takeaway: The Next Catalysts Are Out There

From 16% to 72.4% — this wasn’t driven by a massive architecture overhaul or billion-image datasets.

It came from **one change in task design**.

The lesson: Instead of gluing capabilities together after the fact, **find naturally cooperative tasks** — where solving the problem requires multiple abilities to mesh seamlessly.

“Segmentation-as-editing” is just the first example.

We suspect 3D understanding, video generation, and other domains have their own hidden catalysts, waiting to be discovered.

**At last, AI’s left and right hands have learned to high-five.**

**And this is only the overture.**

Try out our open-source model **Ming-lite-omni 1.5** on our [**GitHub Page / Demo Page**](https://github.com/inclusionAI/Ming/blob/main/cookbook.ipynb). Please star our repo if you like it!


<!-- ---

Try out our open-source model **Ming-lite-omni 1.5** on our [**GitHub Page / Demo Page**](占位符：你的GitHub/Demo链接). Please star our repo if you like it!

To cite our work:
```

``` -->