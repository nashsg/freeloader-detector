function renderResults(data) {
  const impostors = data.members.filter(m => m.verdict === 'IMPOSTOR');
  const sorted = [...data.members].sort((a, b) => b.suspicionScore - a.suspicionScore);

  let html = `
    <div class="summary-box">
      <h2>📋 Audit Forensic Evaluation — ${data.projectName}</h2>
      <p>${data.summary}</p>
      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 ${impostors.length} IMPOSTORS DETECTED: ${impostors.map(m => `@${m.name}`).join(', ')}</p>`
        : `<p class="alert-clear">✅ System Stable: Everyone contributed equally.</p>`
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
        <div class="card-name">@${m.name}</div>
        <span class="badge ${m.verdict}">${m.verdict}</span>
        <div class="score-big" style="color:${scoreColor}">
          ${m.suspicionScore}<span style="font-size:1rem;color:#555;font-weight:400">/100</span>
        </div>
        <div class="score-sub">Suspicion Score</div>
        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>
        <div class="card-stats">
          Real Commits: <b>${m.commits}</b> &nbsp;|&nbsp;
          Real Volume: <b>~${m.linesAdded} lines</b>
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