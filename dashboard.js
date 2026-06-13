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

let globalReportData = null;

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

  let stepIndex = 0;
  status.textContent = STEPS[0];
  
  const ticker = setInterval(() => {
    if (stepIndex < STEPS.length - 1) {
      stepIndex++;
      status.textContent = STEPS[stepIndex];
    }
  }, 500);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    clearInterval(ticker);
    btn.disabled = false;

    if (!response.ok) throw new Error('Transaction exception occurred.');
    
    const data = await response.json();
    status.textContent = '🚨 Investigation finalized! Real target logs loaded below:';
    
    globalReportData = data;
    renderResults(data);

  } catch (error) {
    clearInterval(ticker);
    btn.disabled = false;
    status.textContent = '❌ An error occurred connecting to live backend engines.';
    console.error(error);
  }
}

function renderResults(data) {
  const impostors = data.members.filter(m => m.verdict === 'IMPOSTOR');
  const sorted = [...data.members].sort((a, b) => b.suspicionScore - a.suspicionScore);

  let html = `
    <div class="summary-box">
      <h2>📋 Project Forensic Evaluation — ${data.projectName}</h2>
      <p style="margin-bottom: 12px; color: #ccc;">${data.summary}</p>
      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 ${impostors.length} IMPOSTORS DETECTED: ${impostors.map(m => `@${m.name}`).join(', ')}</p>`
        : `<p class="alert-clear">✅ System Stable: Everyone contributed cleanly.</p>`
      }
      <div class="powered-by" style="margin-top: 14px; font-size: 0.85rem; color: #777;">
        Verified Stack Validation: ${(data.sponsorsUsed || []).map(s => `<span style="background:#141424; padding:4px 8px; margin:0 4px; border-radius:4px; border:1px solid #ff4757; color:#fff; font-weight:bold;">${s}</span>`).join(' ')}
      </div>
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
          ${m.suspicionScore}<span style="font-size:1rem;color:#444;font-weight:400">/100</span>
        </div>
        <div class="score-sub">Suspicion Score</div>

        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>

        <div class="card-stats">
          Commits: <b>${m.commits}</b> &nbsp;|&nbsp;
          Lines added: <b>${m.linesAdded}</b><br>
          Last commit: <b>${m.lastCommitTime}</b>
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
  if (!globalReportData) return;
  const outputText = `OFFICIAL VERDICT LOG: ${globalReportData.projectName}\nSummary: ${globalReportData.summary}`;
  const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blob);
  element.download = `Evidence_Dossier.txt`;
  element.click();
}