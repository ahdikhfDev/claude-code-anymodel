# ThirtyCLI ⚡

> AI Coding Assistant — OpenRouter & 9Router supported.  
> by [ahdikhfDev](https://github.com/ahdikhfDev)

```
  ████████╗██╗  ██╗██╗██████╗ ████████╗██╗   ██╗  ██████╗██╗     ██╗
  ╚══██╔══╝██║  ██║██║██╔══██╗╚══██╔══╝╚██╗ ██╔╝  ██╔════╝██║     ██║
     ██║   ███████║██║██████╔╝   ██║    ╚████╔╝   ██║     ██║     ██║
     ██║   ██╔══██║██║██╔══██╗   ██║     ╚██╔╝    ██║     ██║     ██║
     ██║   ██║  ██║██║██║  ██║   ██║      ██║     ╚██████╗███████╗██║
     ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝      ╚═════╝╚══════╝╚═╝
```

---

## Install

```bash
git clone https://github.com/ahdikhfDev/ThirtyCLI.git
cd ThirtyCLI
chmod +x thirtycli.mjs
npm link         # supaya bisa ketik 'thirtycli' dari mana aja
```

## Jalankan

```bash
thirtycli
```

Pertama kali run, wizard akan muncul — pilih provider (OpenRouter / 9Router / Keduanya) dan masukkan API key.

## Reset config

```bash
thirtycli --reset
```

---

## Provider yang didukung

| Provider | Keterangan |
|---|---|
| **OpenRouter** | Cloud API, 300+ models, butuh API key dari [openrouter.ai](https://openrouter.ai/keys) |
| **9Router** | Local proxy, auto-fallback 40+ provider, install dulu: `npm install -g 9router` |
| **Keduanya** | 9Router prioritas utama, otomatis fallback ke OpenRouter kalau 9Router offline |

## Free models yang direkomendasikan

```
deepseek/deepseek-r1-0528:free   — reasoning kuat
google/gemini-2.5-flash:free     — cepat
qwen/qwen3-coder:free            — khusus coding
```

---

## License

MIT
