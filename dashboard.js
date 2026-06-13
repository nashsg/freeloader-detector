const STEPS = [
  '🔐 [DAYTONA] Instantiating isolated secure Linux sandbox container...',
  '📂 [DAYTONA] Cloning repository workspace and extracting git commit tree metadata...',
  '🌐 [BRIGHT DATA] Initializing data-center proxy channels to cross-reference profiles...',
  '🔀 [TOKENROUTER] Mapping system payload and optimizing latency channels...',
  '🤖 [KIMI AI] Scanning structural contribution density and timeline consistency...',
  '⚖️ [KIMI AI] Calculating vector Suspicion Scores and generating analytical text descriptions...',
  '📄 [SENSENOVA U1] Directing deep expert skills pipeline to structure academic dossier forms...',
  '🚨 Finalizing Among Us identity evaluation stamp matrix...'
];

// Global runtime placeholder to cache active calculations for SenseNova compilation tasks
let currentGlobalAnalysisData = null;

async function analyze() {
  const repoUrl = document.getElementById('repoUrl').value.trim();
  if (!repoUrl) {
    alert('Please provide a valid repository URL first!');
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
    i++;
    if (i < STEPS.length) status.textContent = STEPS[i];
  }, 750);

  try {
    const res = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    const text = await res.text();
    const data = JSON.parse(text);

    clearInterval(ticker);
    btn.disabled = false;

    if (!data.success) throw new Error(data.error || 'Pipeline transaction failed');

    status.textContent = '🚨 Audit Finalized! Submitting suspect profiles for extradition below:';
    currentGlobalAnalysisData = data.analysis; 
    renderResults(data.analysis);

  } catch (err) {
    clearInterval(ticker);
    btn.disabled = false;
    status.textContent = '❌ System Exception: ' + err.message;
    console.error(err);
  }
}

function renderResults(data) {
  const impostors = data.members.filter(m => m.verdict === 'IMPOSTOR');
  const sorted = [...data.members].sort((a, b) => b.suspicionScore - a.suspicionScore);

  let html = `
    <div class="summary-box">
      <h2>📋 Project Forensic Audit Result — ${data.projectName}</h2>
      <p>${data.summary}</p>
      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 ${impostors.length} IMPOSTOR${impostors.length > 1 ? 'S' : ''} DETECTED: ${impostors.map(m => m.name).join(', ')}</p>`
        : `<p class="alert-clear">✅ System Clear: No clear slackers detected on team infrastructure.</p>`
      }
      <div class="powered-by">
        Verified Hardware Integrations:
        ${(data.sponsorsUsed || []).map(s => `<span>${s}</span>`).join('')}
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
          ${m.suspicionScore}<span style="font-size:1rem;color:#444;font-weight:400">/100</span>
        </div>
        <div class="score-sub">Suspicion Score</div>
        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>
        <div class="card-stats">
          Commits: <b>${m.commits}</b> &nbsp;|&nbsp;
          Net Code Impact: <b>+${m.linesAdded}</b> lines<br>
          Last Verified Activity: <b>${m.lastCommitTime}</b>
        </div>
        <div class="card-evidence">🔍 Assessment: ${m.evidence}</div>
        ${m.verdict === 'IMPOSTOR' ? '<div class="stamp go">IMPOSTOR</div>' : ''}
      </div>
    `;
  });

  html += `</div>
    <button class="btn-download" onclick="downloadReport()">
      📄 Download Evidence Dossier (SenseNova U1 Compiled)
    </button>
  `;

  document.getElementById('results').innerHTML = html;
}

// =========================================================================
// [SPONSOR 5 FRONTEND CALL] - SenseNova Dossier Generator Action
// =========================================================================
async function downloadReport() {
  if (!currentGlobalAnalysisData) {
    alert("No active audit telemetry available to map.");
    return;
  }
  
  try {
    const res = await fetch('/generate-dossier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auditData: currentGlobalAnalysisData })
    });
    
    const data = await res.json();
    
    const blob = new Blob([data.pdfContent], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Evidence_Dossier_Report_${currentGlobalAnalysisData.projectName.replace(/\s+/g, '_')}.txt`;
    a.click();
  } catch (e) {
    console.error("Dossier compilation failed:", e);
  }
}