try {
    // Connects directly to our updated live API route path
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl })
    });

    clearInterval(ticker);
    btn.disabled = false;

    if (!response.ok) throw new Error('Analytical transaction failed');
    
    const data = await response.json();
    status.textContent = '🚨 Investigation finalized! Real target logs loaded below:';
    
    // Render the data directly into your pre-existing original card layouts!
    renderResults(data);

  } catch (error) {
    clearInterval(ticker);
    btn.disabled = false;
    status.textContent = '❌ An error occurred connecting to live backend engines.';
    console.error(error);
  }