<div align="center">

```
  ████████╗██╗  ██╗██╗██████╗ ████████╗██╗   ██╗  ██████╗██╗     ██╗
  ╚══██╔══╝██║  ██║██║██╔══██╗╚══██╔══╝╚██╗ ██╔╝  ██╔════╝██║     ██║
     ██║   ███████║██║██████╔╝   ██║    ╚████╔╝   ██║     ██║     ██║
     ██║   ██╔══██║██║██╔══██╗   ██║     ╚██╔╝    ██║     ██║     ██║
     ██║   ██║  ██║██║██║  ██║   ██║      ██║     ╚██████╗███████╗██║
     ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝      ╚═════╝╚══════╝╚═╝
```

**AI Coding Assistant — Open Source**  
Supports OpenRouter · 9Router Local · 9Router Hosted  
by [ahdikhfDev](https://github.com/ahdikhfDev)

![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen) ![License](https://img.shields.io/badge/license-MIT-cyan) ![Version](https://img.shields.io/badge/version-1.0.0-blueviolet)

</div>

---

## ✨ Features

- 🤖 **300+ AI Models** via OpenRouter (termasuk model gratis)
- ⚡ **9Router Support** — local (`localhost`) dan hosted (custom URL)
- 🔄 **Auto Fallback** — 9Router offline? otomatis switch ke OpenRouter
- 🎨 **Cyberpunk UI** — terminal interface neon cyan/green
- 🔧 **Setup Wizard** — pertama run langsung tanya config, tidak perlu edit file manual
- 💾 **Config tersimpan** — setup sekali, pakai selamanya

---

## 🚀 Install

```bash
git clone https://github.com/ahdikhfDev/claude-code-anymodel.git ThirtyCLI
cd ThirtyCLI
npm link
```

> Butuh Node.js ≥ 18

---

## 💻 Cara Pakai

Cukup ketik di terminal manapun:

```bash
thirtycli
```

**Pertama kali run** → wizard muncul otomatis, tinggal pilih dan isi:

```
  Mau pakai provider apa?

  [1] OpenRouter   — cloud API, 300+ models, butuh API key
  [2] 9Router      — local/hosted proxy, auto-fallback
  [3] Keduanya     — 9Router prioritas, fallback ke OpenRouter
```

Setelah setup → langsung masuk CLI. Tidak perlu setup ulang.

---

## 🔌 Provider

### OpenRouter
Dapetin API key gratis di **[openrouter.ai/keys](https://openrouter.ai/keys)**

Free models yang direkomendasikan:
| Model | Keterangan |
|---|---|
| `deepseek/deepseek-r1-0528:free` | Reasoning kuat, gratis |
| `google/gemini-2.5-flash:free` | Cepat, gratis |
| `qwen/qwen3-coder:free` | Khusus coding, gratis |

### 9Router — Local
Install 9Router di mesin lo dulu:
```bash
npm install -g 9router
9router
```
Endpoint: `http://localhost:20128/v1`

### 9Router — Hosted
Kalau lo udah hosting 9Router sendiri (VPS/tunnel), masukkan URL-nya pas wizard:
```
9Router URL: https://ai.akf.biz.id/v1
API Key: sk-xxxx  (kalau endpoint lo dilindungi key)
```

---

## ⚙️ Commands

```bash
thirtycli           # jalankan CLI
thirtycli --reset   # reset config, munculin wizard lagi
```

---

## 📁 Struktur

```
ThirtyCLI/
├── cli.js           ← engine utama
├── thirtycli.mjs    ← launcher (ini yang dijalankan)
├── package.json
├── vendor/          ← ripgrep binary
├── .env.example     ← template config
└── .gitignore
```

---

## 🔄 Reset / Ganti Provider

```bash
thirtycli --reset
```

Config tersimpan di `.thirtycli.json` di folder ThirtyCLI.

---

## 📄 License

MIT — [ahdikhfDev](https://github.com/ahdikhfDev)
