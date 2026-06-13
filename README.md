🔍 Freeloader Detective

> "Every poly and uni student has had a freeloader in their group project — we built the AI that catches them, scores them, and gives you a PDF to send your lecturer."

Built at **Agent Forge Hackathon 2025** @ SMU, Singapore

## 🎯 The Problem

Every poly and university student knows this situation:
- 4 people in a group project
- 3 people do all the work
- 1 person does nothing
- Everyone gets the same grade

It's nearly impossible to **prove** to your lecturer exactly who slacked off — until now.

## 💡 The Solution

Freeloader Detective is an AI-powered group project auditing tool that works like an Among Us impostor reveal.

Paste your GitHub repo URL → our AI stack investigates every teammate's contribution → exposes the impostors with hard evidence → generates a downloadable Evidence Dossier to send your lecturer.

## 🕹️ How It Works

Student pastes GitHub URL
        ↓
Daytona spins up secure sandbox → clones repo → extracts git metadata
        ↓
Bright Data scrapes public GitHub contributor page for extra evidence
        ↓
TokenRouter routes data to the best AI model
        ↓
Kimi AI analyses contributions → assigns Suspicion Score 0-100 per person
        ↓
SenseNova generates Evidence Dossier PDF
        ↓
Among Us-style IMPOSTOR reveal screen 🚨

## 🚨 Features

### Core
- 🔗 Paste any GitHub repo URL and scan instantly
- 🔐 Daytona secure sandbox — safely clones repo without touching your machine
- 📊 Suspicion Score 0–100 per teammate
- ⚖️ Three verdicts — INNOCENT / SUSPICIOUS / IMPOSTOR
- 🔍 One line of hard evidence per person
- 🎮 Among Us-style animated IMPOSTOR stamp reveal
- 📄 Downloadable Evidence Dossier PDF
- 👤 Anonymous report mode — your name stripped before sending

### Detection Logic
- ⏰ **Last-minute detector** — flags commits made within 12 hours of deadline
- 📋 **Copy-paste detector** — flags suspiciously large single commits
- 👻 **Ghost member alert** — flags anyone with zero commits
- 📈 **Contribution timeline** — visual activity graph across project duration
- 🌐 **Bright Data cross-check** — compares git data against public GitHub profile

## 🤖 AI Stack

| Sponsor | Role in app |
| **Daytona** | Secure sandbox — clones repo, extracts git commit metadata |
| **Kimi AI** | Lead Detective — analyses contributions, assigns Suspicion Scores |
| **Bright Data** | Scrapes public GitHub contributor page for extra evidence |
| **TokenRouter** | Routes API calls to best available model efficiently |
| **SenseNova U1** | Generates visual Evidence Dossier PDF report |

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

# Clone this repo
git clone https://github.com/yourusername/freeloader-detective

# Go into the folder
cd freeloader-detective

# Install dependencies
npm install

# Add your API keys in server.js
# Replace the placeholders at the top of server.js with your real keys

# Run the server
node server.js

# Open in browser
# Go to http://localhost:3000

## 📸 Demo

> Paste any GitHub repo URL → click Investigate → watch the Among Us reveal

Example repos to test with:
- Any public GitHub repo with multiple contributors
- Works with private repos too when run locally

## 👥 The Problem It Solves

| Without Freeloader Detective | With Freeloader Detective |
| "I think John didn't do anything" | "John has a Suspicion Score of 91/100" |
| No proof for lecturer | Downloadable Evidence Dossier PDF |
| Drama in the group chat | Anonymous submission mode |
| Everyone gets same grade | Lecturer has data to grade fairly |

## 🏆 Built At

**Agent Forge Hackathon 2025**
Organised by AI Builders × SMU AI Club
Singapore Management University
June 2025
