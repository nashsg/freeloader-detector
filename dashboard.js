// ============================================
// DASHBOARD.JS
// All frontend logic for Freeloader Detective
// Handles: analyze button, status steps,
// rendering cards, download report
// ============================================

// Steps shown in status bar while AI is working
// Each step matches a real sponsor doing real work
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

// ============================================
// ANALYZE FUNCTION
// Runs when user clicks Investigate button
// ============================================
async function analyze() {
  const repoUrl = document.getElementById('repoUrl').value.trim();
  if (!repoUrl) {
    alert('Please paste a GitHub repo URL first!');
    return;
  }

  const btn = document.getElementById('analyzeBtn');
  const status = document.getElementById('status');
  const results = document.getElementById('results');

  // Reset UI
  btn.disabled = true;
  results.innerHTML = '';

  // Start cycling through status steps
  let i = 0;
  status.textContent = STEPS[0];
  const ticker = setInterval(() => {
    i++;
    if (i < STEPS.length) status.textContent = STEPS[i];
  }, 800);

  try {
    // Call the backend server
    const res = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    // Get response as text first so we can debug if needed
    const text = await res.text();
    console.log('Raw server response:', text);

    // Now parse as JSON
    const data = JSON.parse(text);

    clearInterval(ticker);
    btn.disabled = false;

    if (!data.success) throw new Error(data.error || 'Server error');

    status.textContent = '✅ Investigation complete — verdict below!';
    renderResults(data.analysis);

  } catch (err) {
    clearInterval(ticker);
    btn.disabled = false;
    status.textContent = '❌ ' + err.message;
    console.error('Frontend error:', err);
  }
}

// ============================================
// RENDER RESULTS
// Builds the cards UI from the analysis JSON
// ============================================
function renderResults(data) {
  // Find all impostors for the alert message
  const impostors = data.members.filter(m => m.verdict === 'IMPOSTOR');

  // Sort by suspicion score — worst person shown first
  const sorted = [...data.members].sort((a, b) => b.suspicionScore - a.suspicionScore);

  // Build summary box
  let html = `
    <div class="summary-box">
      <h2>📋 Detective Report — ${data.projectName}</h2>
      <p>${data.summary}</p>
      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 ${impostors.length} IMPOSTOR${impostors.length > 1 ? 'S' : ''} DETECTED: ${impostors.map(m => m.name).join(', ')}</p>`
        : `<p class="alert-clear">✅ No clear freeloaders found.</p>`
      }
      <div class="powered-by">
        Powered by:
        ${(data.sponsorsUsed || []).map(s => `<span>${s}</span>`).join('')}
      </div>
    </div>
    <div class="grid">
  `;

  // Build one card per member
  sorted.forEach(m => {
    // Card border color based on verdict
    const cardClass = m.verdict === 'IMPOSTOR' ? 'impostor'
                    : m.verdict === 'SUSPICIOUS' ? 'suspicious'
                    : 'innocent';

    // Score bar color based on score number
    const barClass = m.suspicionScore >= 70 ? 'bar-red'
                   : m.suspicionScore >= 40 ? 'bar-orange'
                   : 'bar-green';

    // Big score number color
    const scoreColor = m.suspicionScore >= 70 ? '#ff4757'
                     : m.suspicionScore >= 40 ? '#ffa502'
                     : '#2ed573';

    html += `
      <div class="card ${cardClass}">

        <!-- Member name and verdict badge -->
        <div class="card-name">${m.name}</div>
        <span class="badge ${m.verdict}">${m.verdict}</span>

        <!-- Big suspicion score -->
        <div class="score-big" style="color:${scoreColor}">
          ${m.suspicionScore}
          <span style="font-size:1rem;color:#444;font-weight:400">/100</span>
        </div>
        <div class="score-sub">Suspicion Score</div>

        <!-- Score progress bar -->
        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>

        <!-- Git stats -->
        <div class="card-stats">
          Commits: <b>${m.commits}</b> &nbsp;|&nbsp;
          Lines added: <b>${m.linesAdded}</b><br>
          Last commit: <b>${m.lastCommitTime}</b>
        </div>

        <!-- Kimi AI evidence sentence -->
        <div class="card-evidence">🔍 ${m.evidence}</div>

        <!-- Red IMPOSTOR stamp only on impostors -->
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

// ============================================
// DOWNLOAD REPORT
// Saves results as a .txt file
// ============================================
function downloadReport() {
  const content = document.getElementById('results').innerText;
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'evidence-dossier.txt';
  a.click();
}