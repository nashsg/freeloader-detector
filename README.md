# 🔍 Freeloader Detective

> *“Every poly and uni student has had a freeloader in their group project — we built the AI that catches them, scores them, and gives you a PDF to send your lecturer.”*

Built at **Agent Forge Hackathon 2025** @ SMU, Singapore

## 🎯 Problem

Group projects often mean:
- 4 people in a team
- 3 people do all the work
- 1 person does nothing
- Everyone gets the same grade

It’s almost impossible to **prove** who slacked off — until now.

## 💡 Solution

**Freeloader Detective** is an AI‑powered auditing tool for group projects.  
Think *Among Us impostor reveal*, but for GitHub repos.

Paste your repo URL → our AI stack investigates contributions → exposes freeloaders with hard evidence → generates a downloadable **Evidence Dossier PDF** for your lecturer.

## 🕹️ How It Works

1. Student pastes GitHub repo URL  
2. **Daytona** spins up secure sandbox → clones repo → extracts commit metadata  
3. **Bright Data** scrapes public GitHub contributor pages for extra evidence  
4. **TokenRouter** routes data to the best AI model  
5. **Kimi AI** analyses contributions → assigns Suspicion Score (0–100)  
6. **SenseNova** generates Evidence Dossier PDF  
7. 🚨 *Among Us‑style IMPOSTOR reveal screen*

## 🚨 Features

### Core
- 🔗 Paste any GitHub repo URL and scan instantly  
- 🔐 Secure sandbox cloning (Daytona)  
- 📊 Suspicion Score (0–100 per teammate)  
- ⚖️ Verdicts: **INNOCENT / SUSPICIOUS / IMPOSTOR**  
- 🔍 One line of hard evidence per person  
- 🎮 Animated IMPOSTOR stamp reveal  
- 📄 Downloadable Evidence Dossier PDF  
- 👤 Anonymous report mode (name stripped before sending)

### Detection Logic
- ⏰ **Last‑minute detector** — flags commits within 12h of deadline  
- 📋 **Copy‑paste detector** — flags suspiciously large single commits  
- 👻 **Ghost member alert** — flags anyone with zero commits  
- 📈 **Contribution timeline** — activity graph across project duration  
- 🌐 **Bright Data cross‑check** — compares git data vs public profile

## 🤖 AI Stack

| Sponsor        | Role in App |
|----------------|-------------|
| **Daytona**    | Secure sandbox — clones repo, extracts commit metadata |
| **Kimi AI**    | Lead Detective — analyses contributions, assigns Suspicion Scores |
| **Bright Data**| Scrapes public GitHub contributor pages |
| **TokenRouter**| Routes API calls to best available model |
| **SenseNova U1** | Generates Evidence Dossier PDF |

## 🛠️ Tech Stack

- **Frontend** — HTML, CSS, JavaScript  
- **Backend** — Node.js, Express  
- **AI** — Kimi K2 via TokenRouter  
- **Sandbox** — Daytona  
- **Scraping** — Bright Data  
- **Reports** — SenseNova U1  

## 🚀 Setup & Run

### Prerequisites
- Node.js v20+  
- API keys for: Kimi AI, Daytona, Bright Data, TokenRouter, SenseNova  

### Installation

```bash
# Clone this repo
git clone https://github.com/yourusername/freeloader-detective

# Go into the folder
cd freeloader-detective

# Install dependencies
npm install

# Add your API keys in server.js
# Replace placeholders at the top of server.js with your real keys

# Run the server
node server.js

# Open in browser
http://localhost:3000
```

## 📸 Demo

Paste any GitHub repo URL → click **Investigate** → watch the *Among Us* reveal.  

Example repos to test:
- Any public GitHub repo with multiple contributors  
- Works with private repos too when run locally  

## 👥 Problem Solved

| Without Freeloader Detective | With Freeloader Detective |
|------------------------------|---------------------------|
| “I think John didn’t do anything” | “John has a Suspicion Score of 91/100” |
| No proof for lecturer | Downloadable Evidence Dossier PDF |
| Drama in group chat | Anonymous submission mode |
| Everyone gets same grade | Lecturer has data to grade fairly |

## 🏆 Built At

**Agent Forge Hackathon 2025**  
Organised by AI Builders × SMU AI Club  
Singapore Management University  
June 2025  
