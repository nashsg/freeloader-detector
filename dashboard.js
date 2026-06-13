const STEPS = [
  '🔐 [DAYTONA] Launching secure container sandbox isolate...',
  '📂 [DAYTONA] Cloning git workspace tree logs and extracting commits...',
  '🌐 [BRIGHT DATA] Scraping public profile metadata verification metrics...',
  '🔀 [TOKENROUTER] Computing low-latency model routing mapping pathways...',
  '🕵️ [KIMI AI] Running contribution density structural analytics...',
  '⚖️ [KIMI AI] Formatting vector suspicion algorithm scorecards...',
  '🚨 Finalizing Among Us identity evaluation stamp matrix...'
];

let globalReportData = null;

async function analyze() {
  const repoUrl = document.getElementById('repoUrl').value.trim();
  if (!repoUrl) {
    alert('Please paste a GitHub repository URL to scan!');
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
  }, 750);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    clearInterval(ticker);
    btn.disabled = false;

    if (!response.ok) throw new Error('Server link transaction exception');
    
    const data = await response.json();
    status.textContent = '🚨 Investigation finalized! Suspect logs populated below:';
    
    globalReportData = data;
    renderResults(data);

  } catch (error) {
    clearInterval(ticker);
    btn.disabled = false;
    status.textContent = '❌ Connection lost with analytical scanning engines.';
    console.error(error);
  }
}

function renderResults(data) {
  const impostors = data.members.filter(m => m.verdict === 'IMPOSTOR');
  const sorted = [...data.members].sort((a, b) => b.suspicionScore - a.suspicionScore);

  let html = `
    <div class="summary-box">
      <h2>📋 Audit Forensic Evaluation — ${data.projectName || 'Repo Scan'}</h2>
      <p>${data.summary}</p>
      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 ${impostors.length} IMPOSTOR DETECTED: ${impostors.map(m => m.name).join(', ')}</p>`
        : `<p class="alert-clear">✅ System Stable: No clear freeloaders traced in this workspace run.</p>`
      }
      <div class="powered-by" style="margin-top: 14px; font-size: 0.85rem; color: #aaa;">
        Hardware Validation Stack: ${(data.sponsorsUsed || []).map(s => `<span style="background:#141424; padding:5px 10px; margin:0 4px; border-radius:6px; border:1px solid #ff4757; color:#fff; font-weight:bold;">${s}</span>`).join(' ')}
      </div>
    </div>
    <div class="grid">
  `;

  sorted.forEach(m => {
    const cardClass = m.verdict === 'IMPOSTOR' ? 'impostor' : m.verdict === 'SUSPICIOUS' ? 'suspicious' : 'innocent';
    const barClass = m.suspicionScore >= 70 ? 'bar-red' : m.suspicionScore >= 40 ? 'bar-orange' : 'bar-green';
    const scoreColor = m.suspicionScore >= 70 ? '#ff4757' : m.suspicionScore >= 40 ? '#ffa502' : '#2ed573';

    html += `
      <div class="card ${cardClass}">
        <div class="card-name">${m.name}</div>
        <span class="badge ${m.verdict}">${m.verdict}</span>
        <div class="score-big" style="color:${scoreColor}">
          ${m.suspicionScore}<span style="font-size:1rem;color:#555;font-weight:400">/100</span>
        </div>
        <div class="score-sub">Suspicion Score</div>
        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>
        <div class="card-stats">
          Commits Pushed: <b>${m.commits}</b> &nbsp;|&nbsp;
          Code Volume: <b>+${m.linesAdded || 0} lines</b>
        </div>
        <div class="card-evidence">🔍 Analysis: ${m.evidence}</div>
        ${m.verdict === 'IMPOSTOR' ? '<div class="stamp go">IMPOSTOR</div>' : ''}
      </div>
    `;
  });

  html += `</div>
    <button class="btn-download" onclick="downloadReport()">
      📄 Download Evidence Dossier Report
    </button>
  `;

  document.getElementById('results').innerHTML = html;
}

function downloadReport() {
  if (!globalReportData) return;
  
  const outputText = `====================================================\n` +
                     `🚨 OFFICIAL EVIDENCE DOSSIER: PROJECT FREELOADER AUDIT\n` +
                     `====================================================\n` +
                     `Scan Timestamp: ${new Date().toLocaleString()}\n` +
                     `Target Focus: ${globalReportData.projectName}\n\n` +
                     `Executive Verdict Summary:\n${globalReportData.summary}\n\n` +
                     `Individual Workspace Metrics:\n` +
                     globalReportData.members.map(m => ` • ${m.name} [Status: ${m.verdict}] -> Suspicion Index: ${m.suspicionScore}/100\n   Evidence Detail: ${m.evidence}`).join('\n\n') +
                     `\n\n====================================================\n` +
                     `Verified Sponsor Integrity Audit Logging: \n` + 
                     globalReportData.sponsorsUsed.map(s => ` - [OK] Verified: ${s}`).join('\n');

  const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blob);
  element.download = `Evidence_Dossier_${globalReportData.projectName.replace(/\s+/g, '_')}.txt`;
  element.click();
}