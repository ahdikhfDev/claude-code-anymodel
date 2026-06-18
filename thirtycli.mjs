#!/usr/bin/env node
// ┌─────────────────────────────────────────┐
// │  ThirtyCLI — AI Coding Assistant        │
// │  github.com/ahdikhfDev/ThirtyCLI        │
// └─────────────────────────────────────────┘

import { execSync, spawn } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = path.join(__dir, '.thirtycli.json');

// ── ANSI colors ────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  cyan:   '\x1b[96m',
  green:  '\x1b[92m',
  yellow: '\x1b[93m',
  dim:    '\x1b[2m',
  bold:   '\x1b[1m',
  red:    '\x1b[91m',
  black:  '\x1b[30m',
  bg:     '\x1b[48;5;16m',
};

// ── Splash screen cyberpunk ─────────────────────────────────────
function splash() {
  console.clear();
  console.log(`
${c.cyan}${c.bold}  ████████╗██╗  ██╗██╗██████╗ ████████╗██╗   ██╗
  ╚══██╔══╝██║  ██║██║██╔══██╗╚══██╔══╝╚██╗ ██╔╝
     ██║   ███████║██║██████╔╝   ██║    ╚████╔╝ 
     ██║   ██╔══██║██║██╔══██╗   ██║     ╚██╔╝  
     ██║   ██║  ██║██║██║  ██║   ██║      ██║   
     ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝  ${c.reset}
${c.green}  ██████╗██╗     ██╗${c.reset}
${c.green}  ██╔════╝██║     ██║${c.reset}
${c.green}  ██║     ██║     ██║${c.reset}
${c.green}  ██║     ██║     ██║${c.reset}
${c.green}  ╚██████╗███████╗██║${c.reset}
${c.green}   ╚═════╝╚══════╝╚═╝${c.reset}

${c.dim}  ╔══════════════════════════════════════════════╗
  ║  AI Coding Assistant  ·  by ahdikhfDev      ║
  ║  OpenRouter · 9Router · 300+ Models         ║
  ╚══════════════════════════════════════════════╝${c.reset}
`);
}

// ── Read/write config ───────────────────────────────────────────
function loadConfig() {
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function saveConfig(config) {
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// ── Prompt helper ───────────────────────────────────────────────
function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function choose(question, options) {
  return new Promise(async resolve => {
    console.log(`\n${c.cyan}${c.bold}  ${question}${c.reset}\n`);
    options.forEach((opt, i) => {
      console.log(`  ${c.green}[${i + 1}]${c.reset} ${opt.label}  ${c.dim}${opt.desc}${c.reset}`);
    });
    console.log();
    const ans = await prompt(`  ${c.yellow}Pilih [1-${options.length}]: ${c.reset}`);
    const idx = parseInt(ans) - 1;
    resolve(options[idx] || options[0]);
  });
}

// ── Check 9Router running ───────────────────────────────────────
async function check9Router() {
  try {
    execSync('curl -s http://localhost:20128/v1/models --max-time 2 > /dev/null 2>&1');
    return true;
  } catch {
    return false;
  }
}

// ── Setup wizard (first run) ────────────────────────────────────
async function setup() {
  console.log(`\n${c.cyan}  ┌─ SETUP WIZARD ─────────────────────────────┐${c.reset}`);
  console.log(`${c.cyan}  │  Pertama kali? Kita setup dulu bentar.     │${c.reset}`);
  console.log(`${c.cyan}  └────────────────────────────────────────────┘${c.reset}\n`);

  const nineRunning = await check9Router();

  const providerOpts = [
    { label: 'OpenRouter', desc: '— cloud API, 300+ models, butuh API key', value: 'openrouter' },
    { label: '9Router   ', desc: `— local proxy${nineRunning ? c.green + ' ✓ terdeteksi!' + c.reset : c.dim + ' (belum running)' + c.reset}`, value: '9router' },
    { label: 'Keduanya  ', desc: '— 9Router dulu, fallback ke OpenRouter', value: 'both' },
  ];

  const provider = await choose('Mau pakai provider apa?', providerOpts);
  const config = { provider: provider.value };

  if (provider.value === 'openrouter' || provider.value === 'both') {
    console.log(`\n  ${c.dim}Dapetin API key gratis di: https://openrouter.ai/keys${c.reset}`);
    config.openrouter_key = await prompt(`  ${c.yellow}OpenRouter API Key: ${c.reset}`);

    const modelOpts = [
      { label: 'deepseek/deepseek-r1-0528:free', desc: '— free, reasoning kuat', value: 'deepseek/deepseek-r1-0528:free' },
      { label: 'google/gemini-2.5-flash:free   ', desc: '— free, cepat', value: 'google/gemini-2.5-flash:free' },
      { label: 'qwen/qwen3-coder:free           ', desc: '— free, khusus coding', value: 'qwen/qwen3-coder:free' },
      { label: 'Custom model ID                 ', desc: '— ketik sendiri', value: 'custom' },
    ];
    const model = await choose('Default model:', modelOpts);
    if (model.value === 'custom') {
      config.model = await prompt(`  ${c.yellow}Model ID: ${c.reset}`);
    } else {
      config.model = model.value;
    }
  }

  if (provider.value === '9router' || provider.value === 'both') {
    if (!nineRunning) {
      console.log(`\n  ${c.yellow}⚠  9Router lokal tidak terdeteksi.${c.reset}`);
    }

    const modeOpts = [
      { label: 'Local  ', desc: '— http://localhost:20128/v1', value: 'local' },
      { label: 'Remote ', desc: '— custom URL (mis. https://ai.akf.biz.id/v1)', value: 'remote' },
    ];
    const mode = await choose('9Router endpoint:', modeOpts);

    if (mode.value === 'local') {
      const port = await prompt(`  ${c.dim}Port? (enter = 20128): ${c.reset}`);
      config.nine_url = `http://localhost:${port || '20128'}/v1`;
      config.nine_key = null;
    } else {
      const url = await prompt(`  ${c.yellow}9Router URL (mis. https://ai.akf.biz.id/v1): ${c.reset}`);
      config.nine_url = url || 'https://ai.akf.biz.id/v1';
      const key = await prompt(`  ${c.yellow}API Key (enter kalau tidak ada): ${c.reset}`);
      config.nine_key = key || null;
    }
  }

  saveConfig(config);
  console.log(`\n  ${c.green}✓ Config tersimpan!${c.reset}\n`);
  return config;
}

// ── Resolve env vars dari config ────────────────────────────────
async function resolveEnv(config) {
  const env = { ...process.env };

  if (config.provider === '9router') {
    env.ANTHROPIC_BASE_URL = config.nine_url;
    env.ANTHROPIC_API_KEY = config.nine_key || 'thirtycli';
    console.log(`  ${c.green}✓ 9Router${c.reset} ${c.dim}→ ${config.nine_url}${c.reset}`);

  } else if (config.provider === 'openrouter') {
    env.ANTHROPIC_BASE_URL = 'https://openrouter.ai/api/v1';
    env.ANTHROPIC_API_KEY = config.openrouter_key;
    if (config.model) env.ANTHROPIC_MODEL = config.model;
    console.log(`  ${c.green}✓ OpenRouter${c.reset} ${c.dim}→ ${config.model || 'default'}${c.reset}`);

  } else if (config.provider === 'both') {
    // Coba 9Router dulu, fallback ke OpenRouter
    const running = await check9Router();
    if (running) {
      env.ANTHROPIC_BASE_URL = config.nine_url;
      env.ANTHROPIC_API_KEY = config.nine_key || 'thirtycli';
      console.log(`  ${c.green}✓ 9Router${c.reset} ${c.dim}(aktif)${c.reset}`);
    } else {
      env.ANTHROPIC_BASE_URL = 'https://openrouter.ai/api/v1';
      env.ANTHROPIC_API_KEY = config.openrouter_key;
      if (config.model) env.ANTHROPIC_MODEL = config.model;
      console.log(`  ${c.yellow}⚡ 9Router offline → fallback OpenRouter${c.reset}`);
    }
  }

  return env;
}

// ── Main ────────────────────────────────────────────────────────
async function main() {
  splash();

  // Handle --reset flag
  if (process.argv.includes('--reset')) {
    const cfg = loadConfig();
    if (cfg) {
      writeFileSync(CONFIG_FILE, '{}');
      console.log(`  ${c.green}✓ Config direset.${c.reset}\n`);
    }
  }

  let config = loadConfig();
  const firstRun = !config || !config.provider;

  if (firstRun) {
    config = await setup();
  }

  const env = await resolveEnv(config);

  console.log(`\n${c.dim}  ─────────────────────────────────────────────${c.reset}`);
  console.log(`  ${c.cyan}${c.bold}ThirtyCLI${c.reset} ${c.dim}v1.0.0 — launching...${c.reset}`);
  console.log(`${c.dim}  ─────────────────────────────────────────────${c.reset}\n`);

  // Launch cli.js dengan env yang udah di-set
  const cliPath = path.join(__dir, 'cli.js');
  const args = process.argv.slice(2).filter(a => a !== '--reset');

  const child = spawn(process.execPath, [cliPath, ...args], {
    env,
    stdio: 'inherit',
    cwd: process.cwd(),
  });

  child.on('exit', code => process.exit(code || 0));
}

main().catch(e => {
  console.error(`\n  ${c.red}Error: ${e.message}${c.reset}\n`);
  process.exit(1);
});
