# Bundled visuals and typography

Five default gym photos were created with Codex's built-in image generation tool for this project. They are original generated visuals, not externally hotlinked stock files. The reference mockups guided the premium dark athletic mood. The lime geometric logo and PWA icons were authored locally as vector/raster assets.

| Asset | Creative prompt brief |
| --- | --- |
| `default-heroes/strength.webp` | Premium editorial strength training in a dark modern gym; athletic adult lifting, dramatic directional light, graphite palette, space for overlay text, no embedded words/logos |
| `default-heroes/classes.webp` | Adult woman leading energetic group fitness in a contemporary gym; photographic athletic campaign mood, charcoal backdrop and cinematic contrast, no typography |
| `default-heroes/training.webp` | Focused personal-training interaction with adult coach/client in a premium gym; realistic photography, warm restrained lighting, clean composition for a mobile hero |
| `default-heroes/nutrition.webp` | Healthy colorful high-protein meal photography; vegetables and balanced ingredients, dark tabletop, premium natural detail, composition suitable for nutrition cards |
| `default-heroes/facility.webp` | Spacious modern training facility with weights/equipment, graphite finishes and subtle lime mood lighting; polished architectural photography, no text |

These are production creative briefs summarizing the generation prompts. Optimized hero outputs use WebP at up to 1800 px width and quality 83. Matching `default-promotions/*.webp` files are compact 640 px thumbnails at quality 76. First launch uses local assets; Admin can replace slides or restore defaults. Uploaded replacements go through backend validation/optimization.

**Sora** is the locally bundled variable heading/numeric font; **Manrope** is the locally bundled variable UI/body font. Both Latin WOFF2 subsets support weights 400–800 and use `font-display: swap`. Font files and their individual SIL Open Font License notices live in `fonts`. Sources: [Google Fonts Sora](https://github.com/google/fonts/tree/main/ofl/sora), [Google Fonts Manrope](https://github.com/google/fonts/tree/main/ofl/manrope). No Google Fonts network request is needed at runtime.

The locally bundled Socket.IO client in `../js/vendor` comes from the locked `socket.io-client` dependency and includes its MIT notice in that folder.
