import { SUBSTANCE_DATABASE } from '../data.js';

export function initChecker(container) {
  container.innerHTML = `
    <div class="card fade-in">
      <div class="card-header">
        <div class="card-title-group">
          <div class="icon-wrapper primary-bg">
            <i data-lucide="search" class="icon-primary"></i>
          </div>
          <div>
            <h2>WADA Substance Checker</h2>
            <p>Verify medications and active ingredients against the official WADA Prohibited List.</p>
          </div>
        </div>
      </div>
      
      <div class="search-section">
        <div class="search-bar-wrapper">
          <i data-lucide="search" class="search-input-icon"></i>
          <input type="text" id="substance-search" placeholder="Type a substance or medication brand (e.g. Clenbuterol, Ibuprofen, Ventolin)..." autocomplete="off" />
        </div>
        <div class="popular-tags">
          <span>Popular checks:</span>
          <button class="tag-btn" data-search="Ibuprofen">Ibuprofen</button>
          <button class="tag-btn" data-search="Salbutamol">Salbutamol</button>
          <button class="tag-btn" data-search="Pseudoephedrine">Pseudoephedrine</button>
          <button class="tag-btn" data-search="Caffeine">Caffeine</button>
        </div>
      </div>
      
      <div class="warning-banner glass">
        <i data-lucide="alert-triangle" class="warning-icon text-warning"></i>
        <div>
          <strong>Disclaimer:</strong> This is an educational tool. Always cross-check with your National Anti-Doping Organization (NADO) or <strong>Global DRO</strong> before using any substance. Under the principle of Strict Liability, you are 100% responsible.
        </div>
      </div>

      <div class="results-layout">
        <div class="results-list-container">
          <h3>Database Records (<span id="results-count">0</span>)</h3>
          <div id="substances-list" class="substances-grid"></div>
        </div>
        
        <div id="substance-detail-view" class="detail-container empty">
          <div class="detail-placeholder">
            <i data-lucide="info" class="placeholder-icon"></i>
            <p>Select a substance from the list to view its complete WADA status, timing details, and therapeutic guidelines.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const searchInput = container.querySelector('#substance-search');
  const substancesList = container.querySelector('#substances-list');
  const resultsCount = container.querySelector('#results-count');
  const detailView = container.querySelector('#substance-detail-view');
  const popularBtns = container.querySelectorAll('.tag-btn');

  // Render list of substances
  function renderSubstances(filterText = "") {
    const query = filterText.toLowerCase().trim();
    const filtered = SUBSTANCE_DATABASE.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      item.details.toLowerCase().includes(query)
    );

    resultsCount.textContent = filtered.length;

    if (filtered.length === 0) {
      substancesList.innerHTML = `
        <div class="no-results">
          <i data-lucide="x-circle" class="error-icon"></i>
          <p>No substances found matching "${filterText}". Try searching for generic active ingredients.</p>
        </div>
      `;
      // Re-initialize lucide icons inside no-results
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    substancesList.innerHTML = filtered.map(item => {
      let statusClass = "status-allowed";
      if (item.status === "Prohibited") statusClass = "status-prohibited";
      if (item.status === "Conditional") statusClass = "status-conditional";

      return `
        <div class="substance-card item-card cursor-pointer" data-id="${item.id}">
          <div class="substance-info">
            <h4 class="substance-name">${item.name}</h4>
            <span class="substance-cat">${item.category}</span>
          </div>
          <span class="badge ${statusClass}">${item.status}</span>
        </div>
      `;
    }).join('');

    // Add click events
    container.querySelectorAll('.substance-card').forEach(card => {
      card.addEventListener('click', () => {
        // Toggle active class
        container.querySelectorAll('.substance-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const id = card.getAttribute('data-id');
        const substance = SUBSTANCE_DATABASE.find(item => item.id === id);
        if (substance) {
          showDetail(substance);
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function showDetail(item) {
    let statusClass = "status-allowed";
    let statusDesc = "This substance is permitted for use at all times. No TUE is required.";
    let iconName = "check-circle";

    if (item.status === "Prohibited") {
      statusClass = "status-prohibited";
      statusDesc = "Banned at all times (both in and out of competition). Presence leads to an ADRV.";
      iconName = "x-circle";
    } else if (item.status === "Conditional") {
      statusClass = "status-conditional";
      statusDesc = "Subject to strict restrictions, thresholds, or administrative routes (TUE or specific limits).";
      iconName = "alert-circle";
    }

    detailView.classList.remove('empty');
    detailView.innerHTML = `
      <div class="detail-card fade-in">
        <div class="detail-header">
          <div>
            <h3>${item.name}</h3>
            <span class="substance-cat">${item.category}</span>
          </div>
          <span class="badge ${statusClass} large-badge">${item.status}</span>
        </div>

        <div class="detail-divider"></div>

        <div class="detail-body">
          <div class="detail-section">
            <div class="section-title-icon">
              <i data-lucide="clock" class="text-primary"></i>
              <h4>Status Timing</h4>
            </div>
            <p class="highlight-info">${item.timing}</p>
          </div>

          <div class="detail-section">
            <div class="section-title-icon">
              <i data-lucide="file-text" class="text-primary"></i>
              <h4>WADA Classification Info</h4>
            </div>
            <p>${item.details}</p>
          </div>

          <div class="detail-section alert-box ${item.status === 'Prohibited' ? 'bg-danger-light' : item.status === 'Conditional' ? 'bg-warning-light' : 'bg-success-light'}">
            <div class="section-title-icon">
              <i data-lucide="shield-alert" class="${item.status === 'Prohibited' ? 'text-danger' : item.status === 'Conditional' ? 'text-warning' : 'text-success'}"></i>
              <h4>Therapeutic Use Exemption (TUE) Guidance</h4>
            </div>
            <p><strong>Exemption Level:</strong> ${item.tueApplicable} Likelihood</p>
            <p class="margin-top-xs">${item.tueDetails}</p>
          </div>

          <div class="detail-section">
            <div class="section-title-icon">
              <i data-lucide="shuffle" class="text-primary"></i>
              <h4>Safe Alternative Medications</h4>
            </div>
            <div class="alternative-box">
              <i data-lucide="check" class="text-success inline-icon"></i>
              <span>${item.alternatives}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  // Event Listeners
  searchInput.addEventListener('input', (e) => {
    renderSubstances(e.target.value);
  });

  popularBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const searchVal = btn.getAttribute('data-search');
      searchInput.value = searchVal;
      renderSubstances(searchVal);
      // Auto-trigger detail view of first item
      setTimeout(() => {
        const firstCard = substancesList.querySelector('.substance-card');
        if (firstCard) firstCard.click();
      }, 50);
    });
  });

  // Initial render
  renderSubstances();
  if (window.lucide) window.lucide.createIcons();
}
