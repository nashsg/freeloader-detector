const STEPS = [
  '🔐 Daytona: spinning up secure sandbox...',
  '📂 Daytona: cloning repo, reading commit history...',
  '🌐 Bright Data: scraping GitHub contributor page...',
  '🔀 TokenRouter: routing to best AI model...',
  '🕵️ Kimi AI: analysing contribution patterns...',
  '⚖️ Kimi AI: calculating Suspicion Scores...',
  '📄 Packaging Evidence Dossier...',
  '🚨 Preparing impostor reveal...'
];

let globalData = null;

async function analyze() {
  const repoUrl = document.getElementById('repoUrl').value.trim();
  if (!repoUrl) {
    alert('Please paste a GitHub repo URL first!');
    return;
  }

  const btn = document.getElementById('analyzeBtn');
  const status = document.getElementById('status');
  const results = document.getElementById('results');

  btn.disabled = true;
  results.innerHTML = '';

  let i = 0;
  status.textContent = STEPS[0];
  
  const ticker = setInterval(() => {
    if (i < STEPS.length - 1) {
      i++;
      status.textContent = STEPS[i];
    }
  }, 600);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    clearInterval(ticker);
    btn.disabled = false;

    if (!response.ok) throw new Error('Route transaction execution exception');
    
    const data = await response.json();
    globalData = data;
    
    status.textContent = '🚨 Audit Complete! Targets Discovered:';
    renderResults(data);

  } catch (error) {
    clearInterval(ticker);
    btn.disabled = false;
    status.textContent = '❌ Failed to process repository data metrics.';
    console.error(error);
  }
}

function renderResults(data) {
  const impostors = data.members.filter(m => m.verdict === 'IMPOSTOR');
  const totalMembers = data.members.length;
  
  // NEW FEATURE: Code contribution ratio formula tracking
  const totalCommits = data.members.reduce((sum, m) => sum + m.commits, 0);
  const sorted = [...data.members].sort((a, b) => b.suspicionScore - a.suspicionScore);

  let html = `
    <div class="summary-box">
      <h2>📋 Project Forensic Evaluation — ${data.projectName}</h2>
      <p style="margin: 8px 0; font-size: 1.1rem; color: #ddd;">${data.summary}</p>
      
      <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin: 15px 0; font-family: monospace; border-left: 4px solid #ff4757;">
         📊 <b>WORKSPACE METRICS PROFILE:</b><br>
         • Total Group Members: ${totalMembers}<br>
         • Core Code Carry Contribution Ratio: <b>${((sorted[sorted.length - 1].commits / totalCommits) * 100).toFixed(1)}%</b> of total work done by 1 person.<br>
         • Traitor Concentration Level: <b>${((impostors.length / totalMembers) * 100).toFixed(0)}%</b> of the group slacked.
      </div>

      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 ${impostors.length} IMPOSTORS UNMASKED: ${impostors.map(m => `@${m.name}`).join(', ')}</p>`
        : `<p class="alert-clear">✅ System Clear: Perfect teamwork signature matched.</p>`
      }
    </div>
    <div class="grid">
  `;

  sorted.forEach(m => {
    const cardClass = m.verdict === 'IMPOSTOR' ? 'impostor' : 'innocent';
    const barClass = m.suspicionScore >= 70 ? 'bar-red' : 'bar-green';
    const scoreColor = m.suspicionScore >= 70 ? '#ff4757' : '#2ed573';

    html += `
      <div class="card ${cardClass}">
        <div class="card-name">@${m.name}</div>
        <span class="badge ${m.verdict}">${m.verdict}</span>
        <div class="score-big" style="color:${scoreColor}">
          ${m.suspicionScore}<span style="font-size:1rem;color:#ff4757;font-weight:400">/100</span>
        </div>
        <div class="score-sub">Suspicion Score</div>

        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>

        <div class="card-stats">
          Commits: <b>${m.commits}</b> &nbsp;|&nbsp;
          Lines added: <b>+${m.linesAdded}</b><br>
          Lines deleted: <b>-${m.linesDeleted || 0}</b> &nbsp;|&nbsp;
          Last active: <b>${m.lastCommitTime}</b>
        </div>

        <div class="card-evidence">🔍 ${m.evidence}</div>
        ${m.verdict === 'IMPOSTOR' ? '<div class="stamp go">IMPOSTOR</div>' : ''}
      </div>
    `;
  });

  html += `</div>
    <button class="btn-download" onclick="downloadReport()">
      📄 Download Evidence Dossier
    </button>
  `;

  document.getElementById('results').innerHTML = html;
}

function downloadReport() {
  if (!globalData) return;
  const content = `FREELOADER DETECTIVE EVIDENCE REPORT\n` +
                  `===================================\n` +
                  `Project: ${globalData.projectName}\n` +
                  `Summary: ${globalData.summary}\n`;
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Evidence_Dossier.txt';
  a.click();
}