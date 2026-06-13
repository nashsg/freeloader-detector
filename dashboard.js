const STEPS = [
  '🔐 DAYTONA: Spinning up isolated pipeline sandboxes...',
  '📂 DAYTONA: Scanning branch history logs...',
  '🌐 BRIGHT DATA: Crawling community contribution parameters...',
  '🔀 TOKENROUTER: Connecting to highest available model gateway...',
  '🕵️ KIMI AI: Tracking repository file modifications...',
  '⚖️ KIMI AI: Scoring work anomalies...',
  '📄 COMPILING EVIDENCE DOSSIER CONSOLE...',
  '🚨 PREPARING FORENSIC STAMP LOGS...'
];

let globalReportData = null;

// ============================================================================
// 🚨 EMERGENCY INTRO MEETING CONTROLLER
// ============================================================================
function triggerEmergencySequence() {
  const repoUrl = document.getElementById('repoUrl').value.trim();
  if (!repoUrl) {
    alert('ENTER A TARGET REPOSITORY URL FIRST!');
    return;
  }

  const btn = document.getElementById('analyzeBtn');
  const emergencyScreen = document.getElementById('emergencyScreen');
  const statusLabel = document.getElementById('emergencyStatus');

  // Lock trigger down
  btn.disabled = true;
  
  // 🎵 PLAY HIGH-IMPACT ARCADE SIREN ALARM TRACK
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let osc = audioContext.createOscillator();
    let gain = audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, audioContext.currentTime);
    // Oscillate pitch up and down like a real siren alarm loop!
    osc.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.3);
    osc.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 0.6);
    osc.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.9);
    
    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start();
    osc.stop(audioContext.currentTime + 1.2);
  } catch(e) {
    console.log('Audio contextual channel skipped.');
  }

  // Turn on screen flashes
  emergencyScreen.classList.add('siren-active');

  // Cycle states through the overlay text viewbox
  let stepIdx = 0;
  statusLabel.textContent = STEPS[0];

  const loop = setInterval(() => {
    stepIdx++;
    if (stepIdx < STEPS.length) {
      statusLabel.textContent = STEPS[stepIdx];
    } else {
      clearInterval(loop);
      // Sequence completed, dump to dashboard render
      emergencyScreen.classList.remove('siren-active');
      executeAnalysisTransaction(repoUrl, btn);
    }
  }, 450);
}

// ============================================================================
// 📡 FETCH ACTION CALL
// ============================================================================
async function executeAnalysisTransaction(repoUrl, btn) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    btn.disabled = false;
    if (!response.ok) throw new Error('System pipeline crashed.');

    const data = await response.json();
    globalReportData = data;
    renderArcadeResults(data);

  } catch (error) {
    btn.disabled = false;
    document.getElementById('results').innerHTML = `<div class="summary-box"><h2>❌ SYSTEM FAULT DETECTED CORES OFFLINE</h2></div>`;
    console.error(error);
  }
}

// ============================================================================
// 🎨 ARCADE GRID RENDERER
// ============================================================================
function renderArcadeResults(data) {
  const impostors = data.members.filter(m => m.verdict !== 'INNOCENT');
  
  let html = `
    <div class="summary-box">
      <h2>📋 FORENSIC DOSSIER LOG — ${data.projectName}</h2>
      <p style="color: #ced6e0;">${data.summary}</p>
      ${impostors.length > 0
        ? `<p class="alert-impostor">🚨 WARNING: ${impostors.length} ANOMALOUS USERS EXPELLED TO THE WALL OF SHAME</p>`
        : `<p class="alert-clear">✅ WORKSPACE SECURE: CLEAR CONTRIBUTION STABILITY TRACKED</p>`
      }
    </div>
    <div class="grid">
  `;

  data.members.forEach(m => {
    let cardClass = 'innocent';
    let barClass = 'bar-green';
    let badgeLabel = 'CREWMATE';
    let stampHtml = '';

    if (m.verdict === 'IMPOSTOR') {
      cardClass = 'impostor';
      barClass = 'bar-red';
      badgeLabel = 'SLOPPY IMPOSTOR';
      stampHtml = '<div class="stamp go">IMPOSTOR</div>';
    } else if (m.verdict === 'GHOST') {
      cardClass = 'ghost';
      barClass = 'bar-orange';
      badgeLabel = 'DEAD BODY GHOST';
      stampHtml = '<div class="stamp ghost-stamp go">DEAD BODY</div>';
    }

    html += `
      <div class="card ${cardClass}">
        <div class="card-name">@${m.name}</div>
        <span class="badge ${m.verdict}">${badgeLabel}</span>
        
        <div class="score-big" style="color: ${m.verdict === 'INNOCENT' ? '#2ed573' : (m.verdict === 'GHOST' ? '#ffa502' : '#ff4757')}">
          ${m.suspicionScore}<span style="font-size:1.2rem; color:#fff;">/100</span>
        </div>
        <div class="score-sub">SUSPICION LEVEL</div>

        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width:${m.suspicionScore}%"></div>
        </div>

        <div class="card-stats">
          🎮 COMMITS: <b>${m.commits}</b><br>
          📈 ADDED: <b>+${m.linesAdded}</b><br>
          📉 DELETED: <b>-${m.linesDeleted}</b><br>
          ⏰ ACTIVE TIME: <b>${m.lastCommitTime}</b>
        </div>

        <div class="card-evidence">🔍 AUDIT: ${m.evidence}</div>
        ${stampHtml}
      </div>
    `;
  });

  html += `</div>
    <button class="btn-download" onclick="downloadForensicDossier()">
      [ DOWNLOAD EVIDENCE DOSSIER ]
    </button>
  `;

  document.getElementById('results').innerHTML = html;
}

function downloadForensicDossier() {
  if (!globalReportData) return;
  let text = `=====================================================\n  FREELOADER DETECTIVE ARCADE BLACK-BOX DOWNLOAD\n=====================================================\n`;
  text += `Target: ${globalReportData.projectName}\nSummary: ${globalReportData.summary}\n\n`;
  globalReportData.members.forEach(m => {
    text += `[${m.verdict}] @${m.name} -> Suspicion: ${m.suspicionScore}/100 | Commits: ${m.commits} | Lines: +${m.linesAdded}/-${m.linesDeleted}\nEvidence: ${m.evidence}\n\n`;
  });
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Arcade_Report_${globalReportData.projectName}.txt`;
  a.click();
}